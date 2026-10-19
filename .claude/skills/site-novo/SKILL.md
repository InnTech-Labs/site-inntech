---
name: site-novo
description: Criação de um site novo do briefing à publicação, com portões de aprovação (estrutura, visual, publicação), template base em Astro, checklist de lançamento e cadastro na gestão. Use ao pedir um site novo ou a substituição completa de um site.
---

# Site novo

Etapas: briefing → mapa do site e textos → direção visual → montagem → ajustes na prévia → checklist de lançamento → domínio e DNS → publicação.
**Portões:** não passar do mapa/textos, da direção visual nem da publicação sem confirmação explícita do usuário.
O site não herda identidade de nenhum outro: cores, fontes, logo, tom e conteúdo vêm só do briefing e dos arquivos desse site.

## 1. Briefing
Conduzir o questionário em blocos, perguntando só o que ainda não foi informado (conversa, arquivos enviados, registro). O que faltar vira pergunta, nunca suposição.

**Dono e objetivo**
- Nome, o que faz, para quem e o diferencial em uma frase.
- Objetivo principal (gerar contatos, vender, cartão de visitas, portal de acesso…) e como medir o sucesso.
- Públicos e o que cada um precisa encontrar.
- Abrangência: local, regional ou nacional.

**Conteúdo**
- Páginas desejadas; serviços, cursos ou produtos.
- Textos existentes; números e provas publicáveis (certificações, parcerias, tempo de mercado).
- Pode citar clientes? Há depoimentos autorizados?

**Conversão e contato**
- Canais (formulário, WhatsApp, e-mail, telefone, agendamento) e para onde vai cada contato.
- Telefone, e-mail, endereço e redes sociais oficiais.

**Identidade**
- Logo em vetor, cores, tipografia, manual de marca, fotos e vídeos.
- Sites de referência e o que agrada em cada um.

**Técnico**
- Domínio: existe? Onde está registrado? Quem acessa o DNS?
- E-mail no domínio: onde está hospedado?
- Integrações: plataforma de cursos, área de cliente, sistemas, CRM, pagamentos.
- Site atual a substituir (URLs antigas para redirect 301).
- Quem aprova (nome) e prazo.

Ao fechar: resumir o briefing em poucas linhas e registrar o que ficou pendente.

## 2. Mapa do site e textos → PORTÃO
1. Propor o mapa: páginas, URL em português, objetivo de cada uma e CTA principal.
2. Escrever os **textos finais**, prontos para publicar, no idioma definido no briefing e em nome do dono do site: títulos, textos, CTAs, title e description de cada página. Sem texto de preenchimento.
3. Informação real faltando (número, depoimento, certificação): perguntar ou marcar como pendência explícita. Nunca inventar.
4. Ao citar normas, leis ou regulamentos, confirmar a versão vigente em fonte oficial e sinalizar o que não foi verificado.
5. Entregar como documento para revisão e **esperar a aprovação**.

## 3. Direção visual → PORTÃO
1. Definir tokens a partir da identidade do site: cores (com contraste AA), tipografia, espaçamentos, raio, sombras.
2. Usar a skill de frontend design para fugir do visual genérico, sempre dentro da identidade do site.
3. Mockup da home e de uma página interna, com os textos aprovados.
4. Entregar e **esperar a aprovação**. Rodadas de ajuste até o "aprovado".

## 4. Montagem
1. Criar o repositório no GitHub a partir do template base (Astro + CSS próprio com tokens).
2. Preencher o `SITE.md` a partir de `03-MODELO-SITE.md`: ficha, objetivo, identidade, mapa, contatos, integrações, decisões e pendências.
3. Seguir a estrutura padrão: `src/components`, `src/layouts/Base.astro` (head, SEO, fontes, analytics), `src/pages` (uma página por arquivo, URLs em português), `src/content` (textos em Markdown/JSON), `src/styles/tokens.css`.
4. Padrões: JavaScript só onde agrega; partes interativas ou 3D como ilhas carregadas sob demanda; imagens WebP/AVIF com largura, altura, alt e lazy abaixo da dobra; fontes com `font-display: swap`; respeitar `prefers-reduced-motion`.
5. Formulário: Netlify Forms com notificação por e-mail e honeypot (ou serviço equivalente registrado no `SITE.md`). WhatsApp: link `wa.me` com mensagem que identifica a página de origem.
6. Conectar à Netlify com publicação automática a partir da `main`. Cada etapa da montagem vai numa branch com prévia.
7. README com como rodar, editar e publicar.

## 5. Ajustes na prévia
Rodadas de ajuste com o usuário, sempre com link da prévia e uma a três linhas do que mudou.

## 6. Checklist de lançamento
**Conteúdo:** textos revisados; contatos e redes conferidos; sem preenchimento, links mortos ou imagens provisórias.
**SEO:** title e description únicos; Open Graph 1200×630; `sitemap.xml` e `robots.txt`; dados estruturados (Organization/LocalBusiness); 404 personalizada; redirects 301 se substituir outro site.
**Técnico:** HTTPS; com e sem www no mesmo endereço; formulário testado de ponta a ponta com anti-spam; Lighthouse mobile ≥ 90 nas quatro categorias; teste em celular real (Android e iPhone — pedir ao usuário).
**Acessibilidade:** contraste, teclado, foco visível, alt, hierarquia de títulos.
**Dados e LGPD:** Analytics e Search Console (sitemap enviado); política de privacidade; aviso de cookies se houver rastreamento; formulários só com os dados necessários.

Entregar o checklist marcado, com o que falhou e o que depende do usuário.

## 7. Domínio e DNS → PORTÃO
1. Registrar no `SITE.md` onde está o domínio, quem acessa o DNS e onde está o e-mail.
2. Listar todos os registros DNS atuais antes de qualquer mudança. Preservar MX, SPF, DKIM e DMARC.
3. Apresentar exatamente quais registros serão criados ou alterados e **esperar a autorização** para publicar e mexer no DNS. O domínio continua no registrador atual.
4. Depois da mudança: testar o site com e sem www, HTTPS e o e-mail (envio e recebimento).

## 8. Publicação
1. Merge na `main` e conferência do site no ar.
2. `SITE.md` completo, com "No ar desde" e a primeira entrada do histórico.
3. Linha nova em `00-REGISTRO-DE-SITES.md` com status "no ar".
4. Tag `v1.0`.
5. Incluir o site na revisão mensal (oferecer criar a tarefa agendada).
6. Avisar o usuário: endereço no ar, o que ficou pendente e o que acompanhar nas primeiras semanas.
