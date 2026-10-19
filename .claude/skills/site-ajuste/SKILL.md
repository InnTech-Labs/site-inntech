---
name: site-ajuste
description: Fluxo de ajuste em um site sob gestão (trocar texto, telefone, imagem, criar página, corrigir algo), da branch à prévia, aprovação, publicação e histórico. Use ao pedir qualquer alteração em um site existente.
---

# Ajuste em site existente

Fluxo: entender → branch → alteração → build e checagem → prévia → aprovação → publicar → histórico.
**Nada vai ao ar sem o "pode publicar" explícito do usuário.**

## 1. Entender
1. Identificar o site. Se não estiver claro, perguntar.
2. Ler `00-REGISTRO-DE-SITES.md` e o `SITE.md` do repositório (identidade, contatos oficiais, regras específicas, decisões). Não perguntar nada que já esteja lá.
3. Classificar o pedido:
   - **Claro** (ex.: "troca o telefone do rodapé"): fazer direto até a prévia.
   - **Ambíguo e trabalhoso de refazer** (ex.: "melhora a home"): fazer as perguntas necessárias antes, numa só mensagem.
4. Se o pedido prejudicar o site (SEO, desempenho, acessibilidade, conversão, LGPD), dizer claramente, propor a alternativa e deixar o usuário decidir.
5. Se faltar informação real (número, texto, foto), perguntar. Nunca inventar números, clientes, depoimentos ou certificações.

## 2. Fazer
1. Conectar o repositório e criar a branch a partir da `main`:
   - `ajuste/<descricao-curta>` para alterações;
   - `pagina/<nome>` para página nova.
   Nunca commitar direto na `main` nem forçar push.
2. Rodar `npm ci` e `npm run build` **antes** de mexer, para saber o estado de partida.
3. Fazer a alteração seguindo o padrão do repositório:
   - textos em `src/content/` (Markdown/JSON), não fixos no componente;
   - cores e fontes só pelos tokens de `src/styles/tokens.css`;
   - reaproveitar componentes existentes antes de criar novos; componente novo útil para outros sites é anotado para voltar ao template base;
   - imagens em WebP/AVIF, com largura, altura, `alt` descritivo e `loading="lazy"` abaixo da dobra;
   - página nova com title, description e Open Graph únicos, e incluída no menu/sitemap quando fizer sentido;
   - segredos nunca no código: variáveis de ambiente da hospedagem.
4. Mudou um contato (telefone, e-mail, WhatsApp, endereço)? Procurar **todas** as ocorrências no repositório (`grep`), inclusive dados estruturados, rodapé e links `wa.me`/`tel:`/`mailto:`, e atualizar o `SITE.md`.
5. Commits em português e claros ("Atualiza telefone do rodapé").

## 3. Checar (antes de mandar a prévia)
- [ ] Build sem erros e sem avisos novos
- [ ] Sem erros no console do navegador
- [ ] Links internos funcionando
- [ ] Layout conferido em 360 px, 768 px e 1280 px (capturas com Playwright das páginas tocadas)
- [ ] Formulário e WhatsApp testados, se foram tocados
- [ ] Página nova com title, description e Open Graph
- [ ] Imagens novas otimizadas e com alt
- [ ] `SITE.md` atualizado (pendências e decisões)

Se algo falhar, corrigir antes de seguir. Se não der para corrigir, avisar na entrega.

## 4. Prévia
1. Fazer push da branch e abrir PR para a `main` com: o que mudou, por quê, como conferir e link da prévia (deploy preview da hospedagem).
2. Responder ao usuário só com:
   - o que mudou (uma a três linhas);
   - link da prévia;
   - o que falta aprovar ou responder.

## 5. Publicar (só depois do "pode publicar")
1. Fazer o merge da PR na `main`.
2. Conferir o site no ar: a alteração está lá, a página carrega, formulário/WhatsApp ok se tocados.
3. Registrar no histórico do `SITE.md`: `AAAA-MM-DD — o que mudou — por quê (link da PR)`. Decisões novas vão em "Decisões tomadas".
4. Avisar o usuário em uma linha que está no ar.
