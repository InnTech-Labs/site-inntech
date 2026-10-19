#!/usr/bin/env node
/**
 * Checagem automática do site (usada no checklist de toda alteração e na revisão mensal).
 *
 * O que faz:
 *  - lê todas as páginas do sitemap gerado no build (dist/sitemap-0.xml) + a 404;
 *  - abre cada página em 360, 768 e 1280 px e salva capturas em checagem/capturas/;
 *  - aponta erros de console, links internos quebrados, imagens sem alt,
 *    rolagem horizontal, páginas sem title/description e title/description repetidos.
 *
 * Uso:
 *   npm run build
 *   npm run preview          (em outro terminal; padrão http://localhost:4321)
 *   npm run checar           (ou: node scripts/checar.mjs http://localhost:4321)
 *
 * Primeira vez: npm run checar:instalar (baixa o Chromium do Playwright).
 * Sai com código 1 se encontrar problema, para poder rodar em automações.
 */
import { chromium } from 'playwright';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const BASE = (process.argv[2] || 'http://localhost:4321').replace(/\/$/, '');
const LARGURAS = [360, 768, 1280];
const PASTA = 'checagem';

async function paginasDoSitemap() {
  const arquivo = 'dist/sitemap-0.xml';
  if (!existsSync(arquivo)) {
    console.error('Sitemap não encontrado. Rode "npm run build" antes.');
    process.exit(1);
  }
  const xml = await readFile(arquivo, 'utf8');
  const caminhos = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  return [...new Set([...caminhos, '/404'])];
}

function nomeArquivo(caminho, largura) {
  const base = caminho === '/' ? 'inicio' : caminho.replace(/^\//, '').replace(/\//g, '_');
  return `${PASTA}/capturas/${base}-${largura}.png`;
}

const problemas = [];
const anotar = (pagina, tipo, detalhe) => problemas.push({ pagina, tipo, detalhe });

const paginas = await paginasDoSitemap();
await mkdir(`${PASTA}/capturas`, { recursive: true });

// CHROMIUM_PATH permite usar um Chrome/Chromium já instalado na máquina, em vez do baixado pelo Playwright.
const navegador = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const contexto = await navegador.newContext();
const titulos = new Map();
const descricoes = new Map();
const linksInternos = new Set();

for (const caminho of paginas) {
  const pagina = await contexto.newPage();
  const errosConsole = [];
  pagina.on('console', (msg) => msg.type() === 'error' && errosConsole.push(msg.text()));
  pagina.on('pageerror', (erro) => errosConsole.push(erro.message));

  for (const largura of LARGURAS) {
    await pagina.setViewportSize({ width: largura, height: 900 });
    const resposta = await pagina.goto(BASE + caminho, { waitUntil: 'networkidle' });
    const status = resposta?.status() ?? 0;
    if (caminho !== '/404' && status !== 200) anotar(caminho, 'status', `HTTP ${status}`);

    const rolagem = await pagina.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (rolagem > 1) anotar(caminho, 'rolagem horizontal', `${rolagem}px a mais em ${largura}px`);

    await pagina.screenshot({ path: nomeArquivo(caminho, largura), fullPage: true });
  }

  const info = await pagina.evaluate(() => ({
    titulo: document.title,
    descricao: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    ogImagem: document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '',
    h1: document.querySelectorAll('h1').length,
    semAlt: [...document.images].filter((img) => !img.hasAttribute('alt')).map((img) => img.src),
    links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
  }));

  if (!info.titulo) anotar(caminho, 'SEO', 'sem <title>');
  if (!info.descricao) anotar(caminho, 'SEO', 'sem meta description');
  if (!info.ogImagem) anotar(caminho, 'SEO', 'sem og:image');
  if (info.h1 !== 1) anotar(caminho, 'acessibilidade', `${info.h1} <h1> na página (o certo é 1)`);
  info.semAlt.forEach((src) => anotar(caminho, 'acessibilidade', `imagem sem alt: ${src}`));
  errosConsole.forEach((erro) => anotar(caminho, 'console', erro));

  if (caminho !== '/404') {
    titulos.set(info.titulo, [...(titulos.get(info.titulo) || []), caminho]);
    descricoes.set(info.descricao, [...(descricoes.get(info.descricao) || []), caminho]);
  }

  for (const href of info.links) {
    if (!href || href.startsWith('#') || /^(mailto:|tel:|https?:)/.test(href)) continue;
    linksInternos.add(href.split('#')[0]);
  }
  await pagina.close();
}

for (const [titulo, onde] of titulos) if (onde.length > 1) anotar(onde.join(', '), 'SEO', `title repetido: "${titulo}"`);
for (const [descricao, onde] of descricoes) if (onde.length > 1) anotar(onde.join(', '), 'SEO', `description repetida: "${descricao.slice(0, 60)}…"`);

for (const href of linksInternos) {
  const resposta = await contexto.request.get(BASE + href);
  if (resposta.status() >= 400) anotar(href, 'link quebrado', `HTTP ${resposta.status()}`);
}

await navegador.close();

const relatorio = [
  `Checagem — ${new Date().toISOString().slice(0, 16).replace('T', ' ')} — ${BASE}`,
  `Páginas: ${paginas.length} · Larguras: ${LARGURAS.join(', ')} px · Capturas em ${PASTA}/capturas/`,
  '',
  problemas.length
    ? problemas.map((p) => `- [${p.tipo}] ${p.pagina}: ${p.detalhe}`).join('\n')
    : 'Nenhum problema encontrado.',
].join('\n');

await writeFile(`${PASTA}/relatorio.txt`, relatorio + '\n');
console.log(relatorio);
process.exit(problemas.length ? 1 : 0);
