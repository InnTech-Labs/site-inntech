---
name: revisao-mensal
description: Revisão mensal de um site sob gestão: saúde, desempenho, SEO, conteúdo, conversão e segurança, com relatório priorizado e PR de correções. Use ao pedir revisão, auditoria ou diagnóstico de um site.
---

# Revisão mensal de site

Objetivo: entregar um diagnóstico curto e priorizado de um site e deixar as correções seguras prontas numa PR. **Nunca publica:** nada de merge na `main`, nada de mudança de DNS ou de configuração da hospedagem.

## 1. Contexto
1. Identificar o site. Se não estiver claro qual, perguntar (ou, numa execução agendada, revisar o site indicado no pedido).
2. Ler `00-REGISTRO-DE-SITES.md` (domínio, hospedagem, repositório, status).
3. Conectar e clonar o repositório. Ler o `SITE.md` inteiro: contatos oficiais, integrações, regras específicas, decisões e pendências. Não reabrir pontos já registrados como decisão.
4. Criar a branch `revisao/<aaaa-mm>` a partir da `main`.

## 2. Checagens
Registrar cada achado com: área, evidência (URL, arquivo, linha ou número), gravidade e correção proposta.

**Saúde**
- `npm ci` e `npm run build`: erros e avisos.
- Site no ar responde com HTTPS válido; com e sem www levam ao mesmo endereço.
- Subir a prévia local (`npm run preview`) e, com Playwright, percorrer todas as páginas do sitemap: erros de console, links internos quebrados (status ≠ 200), imagens sem `alt`.
- Capturas em 360, 768 e 1280 px das páginas principais; procurar rolagem horizontal e elementos sobrepostos.
- Formulários e WhatsApp: conferir destino, honeypot e mensagem pré-preenchida. Não enviar formulário real no site em produção sem autorização.

**Desempenho**
- Lighthouse mobile nas páginas principais (`npx lighthouse <url> --form-factor=mobile --output=json`), se o Chrome estiver disponível. Meta ≥ 90 nas quatro categorias.
- Imagens pesadas (> 200 KB), sem WebP/AVIF, sem largura/altura ou sem `loading="lazy"` abaixo da dobra; scripts de terceiros pesados.
- Respeito a `prefers-reduced-motion` em animações.

**SEO**
- Title e description presentes e únicos por página; Open Graph com imagem 1200×630.
- `sitemap.xml`, `robots.txt`, página 404, dados estruturados.
- Se houver acesso a Search Console/Analytics (conector), trazer: erros de indexação, Core Web Vitals, buscas que geram visitas, páginas com muitas impressões e poucos cliques, páginas com muita saída. Sem acesso: dizer isso no relatório, sem estimar números.

**Conteúdo**
- Telefones, e-mails, WhatsApp, endereço e redes conferem com o `SITE.md`.
- Datas, anos, números, serviços e cursos possivelmente desatualizados; páginas paradas há muito tempo (`git log` por arquivo).
- Nunca inventar ou "atualizar" números, clientes ou certificações: o que depender de informação real vira pergunta ao usuário.

**Conversão**
- CTAs claros em cada página, caminho até contato e WhatsApp em até um clique.

**Manutenção e segurança**
- `npm outdated` e `npm audit`.
- Vencimento do domínio e lista de quem tem acesso: se não for possível verificar daqui, registrar como item a confirmar.
- Nenhum segredo commitado (chaves, tokens, senhas).

## 3. Correções
Corrigir direto na branch só o que é seguro e não muda conteúdo de negócio: alt de imagens, meta tags faltantes, links quebrados internos, otimização de imagens, atualizações de dependências patch/minor sem quebra, avisos de build. Rodar o build e repetir as checagens tocadas. Commits em português e claros.

Não corrigir sem o usuário: textos e números de negócio, mudanças de layout ou de estrutura, atualizações major de dependências, qualquer coisa de DNS, hospedagem ou domínio.

## 4. Entrega
1. Atualizar "Pendências" no `SITE.md` com o que ficou para decidir.
2. Abrir PR para a `main` com título `Revisão mensal <aaaa-mm> — <site>` contendo: o que mudou, por quê, como conferir e link da prévia.
3. Enviar o relatório ao usuário neste formato:

```
Revisão <aaaa-mm> — <site>

Crítico (resolver já)
- …

Importante
- …

Melhoria
- …

Corrigido na PR: <link> · Prévia: <link>
Precisa de você: <decisões e informações pendentes>

Sugestões (1 a 3, com o porquê e o dado que as apoia)
- …
```

Se uma categoria não tiver achados, escrever "nada a apontar". Relatório curto: nada de recapitular as etapas.

4. Depois que o usuário aprovar e a PR for publicada, registrar no histórico do `SITE.md`: data, o que mudou, por quê e link da PR.
