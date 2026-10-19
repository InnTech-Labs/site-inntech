# site-base — template dos sites

Ponto de partida de todo site novo sob gestão. Astro, CSS próprio com tokens, componentes reaproveitáveis, SEO, formulário com anti-spam, WhatsApp e LGPD já resolvidos.

> Este repositório **não tem identidade de marca**. Cores, fontes, logo e textos são neutros e devem ser trocados em cada site.

## Rodar no computador

Requisitos: Node 22+.

```bash
npm install
npm run dev        # http://localhost:4321, com recarga automática
npm run build      # gera o site final em dist/
npm run preview    # serve o dist/ para conferir o build
```

## Criar um site a partir deste template

1. No GitHub, crie o repositório do site a partir deste (botão **Use this template**) ou copie os arquivos.
2. Preencha `SITE.md` (ficha do site: dono, identidade, contatos, decisões).
3. Edite `src/content/site.json`: nome, URL final, descrição, contatos, redes, navegação, CTA, Analytics.
4. Troque a identidade em `src/styles/tokens.css` (cores, fontes, raios) — ver "Fontes" abaixo.
5. Substitua `public/logo.svg`, `public/favicon.svg` e `public/og-image.png` (1200×630).
6. Troque o conteúdo de `src/pages/index.astro` pelos textos aprovados e crie as demais páginas.
7. Revise `src/pages/politica-de-privacidade.astro` com o dono do site.
8. Na Netlify: **Add new site → Import from GitHub**, escolha o repositório (build `npm run build`, pasta `dist`).
   Ative **Forms → Form detection** e configure a notificação por e-mail do formulário.

## Onde fica cada coisa

| O quê | Onde |
|---|---|
| Nome, contatos, redes, menu, CTA, Analytics | `src/content/site.json` |
| Textos de seções (FAQ, serviços, cursos…) | `src/content/*.json` ou `*.md` |
| Cores, fontes, espaçamentos | `src/styles/tokens.css` |
| Estilos globais e botões | `src/styles/global.css` |
| `<head>`, SEO, Open Graph, dados estruturados | `src/layouts/Base.astro` |
| Componentes | `src/components/` |
| Páginas (uma por arquivo, URL em português) | `src/pages/` |
| Imagens e arquivos estáticos | `public/` |
| Cabeçalhos, cache e redirects 301 | `netlify.toml` |
| Ficha do site (memória do projeto) | `SITE.md` |
| Processos (ajuste, site novo, revisão) | `.claude/skills/` |

## Componentes

| Componente | Uso |
|---|---|
| `Header` | Logo, menu (de `site.json`) e CTA. Menu do celular funciona sem JavaScript. |
| `Footer` | Contatos, redes e link da política de privacidade. Só mostra o que estiver preenchido. |
| `Hero` | Primeira dobra: `titulo` (h1), `subtitulo`, `cta`, `ctaSecundario`, `imagem`. |
| `CTA` | Faixa de chamada para ação. |
| `Card` | Serviços, cursos, diferenciais. Com `href`, o cartão inteiro é clicável. |
| `FAQ` | Perguntas em acordeão, com dados estruturados `FAQPage`. |
| `Formulario` | Netlify Forms + honeypot. Envia para `/obrigado`. |
| `WhatsApp` | Botão flutuante; a mensagem identifica a página de origem. Some se não houver número. |
| `ConsentimentoCookies` | Aviso LGPD. Só aparece se houver GA4; o Analytics só carrega após o aceite. |

Toda página usa o layout `Base`:

```astro
---
import Base from '../layouts/Base.astro';
---
<Base titulo="Serviços" descricao="Descrição única da página, até 155 caracteres.">
  ...
</Base>
```

## Fontes

Prefira fontes locais com o Fontsource (não dependem do Google e já usam `font-display: swap`):

```bash
npm install @fontsource-variable/inter
```

Importe no topo de `src/layouts/Base.astro` (`import '@fontsource-variable/inter';`) e aponte o token em `tokens.css` (`--fonte-texto: 'Inter Variable', system-ui, sans-serif;`).

## Imagens

- WebP ou AVIF, com `width`, `height` e `alt` descritivo.
- `loading="lazy"` em tudo abaixo da dobra; a imagem principal da primeira dobra usa `fetchpriority="high"`.
- Imagens decorativas: `alt=""`.

## Checagem automática

```bash
npm run checar:instalar   # primeira vez: baixa o Chromium do Playwright
npm run build && npm run preview   # deixe rodando
npm run checar            # em outro terminal
```

Percorre todas as páginas do sitemap em 360, 768 e 1280 px e aponta erros de console, links quebrados, imagens sem alt, rolagem horizontal e title/description faltando ou repetidos. Capturas e relatório ficam em `checagem/` (fora do Git). Para usar um Chrome já instalado: `CHROMIUM_PATH=/caminho/do/chrome npm run checar`.

## Regras

- `main` = site no ar. Toda mudança numa branch (`ajuste/…`, `pagina/…`, `revisao/aaaa-mm`) com PR e prévia; merge só com aprovação.
- Commits em português e claros.
- Segredos (chaves, tokens) nunca no código: use as variáveis de ambiente da Netlify.
- Prévias da Netlify não são indexadas (o build detecta `CONTEXT=deploy-preview`).
- Componente novo que sirva para outros sites volta para este template.
