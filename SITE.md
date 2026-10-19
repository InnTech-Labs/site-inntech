# SITE.md — InnTech Labs

## Ficha
- Dono do site: InnTech Labs (INN TECH LTDA) · aprovação: Leo
- Domínio: inntechlabs.com.br | Registrador e DNS: Hostinger (acesso: Leo)
- Hospedagem: Netlify — projeto `inntechlabs`, time InnTechLabs | Repositório: InnTech-Labs/site-inntech
- E-mail do domínio: Hostinger Business Email — caixa principal com os aliases contato@, comercial@, financeiro@ e operacional@
- Status: no ar em inntechlabs.netlify.app (domínio inntechlabs.com.br sendo apontado) | No ar desde: 2026-10-19

## Objetivo e públicos
Objetivos, em ordem: (1) gerar pedidos de demonstração — CTA principal em todas as páginas; (2) ser cartão de visitas em reuniões, aberto no celular ou notebook do cliente; (3) vitrine dos produtos, começando pelo InnLoco.

Público: decisores e influenciadores de empresas médias e grandes, com força em operação industrial, energia, óleo e gás e offshore — SMS/Segurança do Trabalho, RH e T&D, Compras/Suprimentos, Inovação. Em menos de 10 segundos a pessoa precisa ver o que é, se serve para ela e como ver funcionando.

Abrangência: Brasil. A experiência industrial e offshore é argumento, não limite. Não destacar cidade.

Conversões medidas (eventos GA4): `pedido_demo`, `contato_enviado`, `aviso_innloco_campo`, `clique_whatsapp`, `clique_email`, `clique_entrar_demo`.

## Identidade
Fonte: Manual da Marca v2 (out/2026), logo v3 e kit v1.2. Arquivos oficiais em `public/marca/` e favicons em `public/`.
- Cores (tokens em `src/styles/tokens.css`): preto 0F0F10 (fundo) · grafite 1C1C1F (painéis) · cinza 3C3C40 (linhas) · vinho 6E1220 (áreas grandes) · vermelho C8243A (um ponto por peça) · vermelho aceso E0344A (só hover/ativo) · claro D9D7D3 (texto) · B5B2AD (texto secundário) · 8F8C88 (rótulos).
- Tipografia: Space Grotesk Bold (títulos), IBM Plex Sans 400/500 (texto), JetBrains Mono 500 (rótulos, caixa alta). Arquivos locais via Fontsource, `font-display: swap`.
- Logo: versão InnTech Labs (itálico com relevo), nunca abaixo de 150 px de largura, respiro de 2 módulos. Usar só os arquivos oficiais, sem redesenhar. Sobre vinho, a versão branca.
- Forma: chanfro a 45° nos cantos alto-esquerdo e baixo-direito; relevo como extrusão sólida a 45°; sem degradê, sem sombra suave, sem fundo branco; arredondado só no botão redondo (WhatsApp/avanço).
- Tom de voz: direto, frases curtas, em "a gente"/primeira pessoa do plural. Problema, estudo, solução. Prova, não promete. Nada didático, técnico ou "juridiquês".

## Mapa do site
| Página | URL | Objetivo | Observações |
|---|---|---|---|
| Home | `/` | Mostrar o que é, para quem, e levar à demo | Hero com ilustração do mapa da operação até chegar o vídeo do InnLoco |
| Soluções | `/solucoes` | Detalhar cada formato | LMS e Realidade Virtual prontos no conteúdo, ocultos (`"ativo": false`) |
| InnLoco | `/innloco` | Página do produto-vitrine | InnLoco Campo como "Em breve" com "Quero ser avisado"; galeria aparece quando houver mídia |
| Demonstração | `/demonstracao` | Pedido de acesso à área de demo | Botão "Entrar" → demo.inntechlabs.com.br |
| Sobre | `/sobre` | Posicionamento e forma de trabalho | Sem foto do fundador por enquanto |
| Contato | `/contato` | Formulário geral, WhatsApp e e-mail | |
| Privacidade | `/politica-de-privacidade` | LGPD | Texto em `src/content/legal/` |
| Cookies | `/politica-de-cookies` | LGPD | |
| Confirmações | `/pedido-recebido`, `/obrigado`, `/aviso-confirmado` | Pós-envio dos formulários | Fora do sitemap, `noindex` |

## Conversão e contatos
- WhatsApp/telefone: (22) 99232-7533 — botão flutuante em todas as páginas; mensagem "Olá! Vim pelo site da InnTech Labs e quero saber mais." + página de origem.
- E-mail público: contato@inntechlabs.com.br · pedidos de demo: comercial@inntechlabs.com.br
- Instagram: @inntechlabs · LinkedIn: ainda não existe (fica oculto até o link entrar em `site.json`).
- Formulários (Netlify Forms, honeypot `campo-robo`):
  - `solicitar-acesso-demo` → notificar comercial@ · sinaliza e-mail gratuito no campo `email_gratuito` (não bloqueia).
  - `contato` → notificar contato@.
  - `aviso-lancamento` → notificar comercial@.

## Integrações
- Netlify Forms (ativar Form detection e configurar as notificações por e-mail).
- Google Analytics 4: código pronto; só carrega após aceite no aviso de cookies. Falta o ID (`site.json → analytics.ga4`).
- Google Search Console: a configurar no lançamento.
- Área de demonstração: aplicação separada (repositório privado `demo-inntech`), em demo.inntechlabs.com.br. O pedido de acesso nasce no site (Netlify Forms) e segue para a demo por webhook.

## Regras específicas deste site
- Não citar clientes e não vincular a InnTech a outras empresas.
- Não publicar números (tempo de mercado, entregas, clientes) até a InnTech ter os próprios.
- Nada que possa ser tirado de contexto: sem comparação com concorrentes, sem promessa que não se prove.
- Texto curto: se cabe em 8 palavras, não usar 20.
- Treinamento presencial não entra no site.
- Imagens só de produtos reais (renders e capturas). Nada de banco de imagens genérico.
- Vermelho em um ponto por bloco; botão vermelho é reservado ao pedido de demonstração.
- Estrutura preparada para versão em inglês: textos em `src/content/pt/`.

## Decisões tomadas
- 2026-10-18 — Site em Astro estático a partir do `site-base`, hospedado na Netlify — padrão da gestão e pedido do briefing.
- 2026-10-18 — Hero com ilustração própria (mapa de uma operação com o marcador "você") até chegar o vídeo do InnLoco Comando — não há render ainda e o briefing veta banco de imagens.
- 2026-10-18 — "O que entregamos" usa as quatro soluções confirmadas (3D, interativo, gamificação, diálogo e procedimento) — "Plataformas" depende da confirmação do LMS.
- 2026-10-18 — Formulários pela Netlify Forms; a área de demo recebe os pedidos por webhook, para o pedido não se perder se a demo cair.
- 2026-10-18 — Textos e visual aprovados pelo Leo na prévia (portões 1 e 2).
- 2026-10-18 — LMS e Realidade Virtual ficam para depois (textos prontos, ocultos).
- 2026-10-18 — CNPJ e vídeo do InnLoco Comando entram depois que o projeto estiver funcionando.
- 2026-10-18 — Área de demonstração em repositório separado e privado (`demo-inntech`), na Netlify, sem contas novas.

## Pendências
- CNPJ da INN TECH LTDA para o rodapé e a política de privacidade (depois que o projeto estiver funcionando).
- "Plataformas de cursos / LMS" e "Realidade Virtual": decidir depois (textos prontos, ocultos).
- Sites de referência (2 ou 3) e o que agrada em cada um.
- Vídeo/render do InnLoco Comando (hero, página do produto e prints da demonstração).
- Link do LinkedIn quando existir.
- ID do GA4 e configuração do Search Console.
- Netlify: ativar Form detection e notificações dos três formulários.
- Área de demonstração: v1 em revisão (PR #1 de `demo-inntech`); depois, ligar o webhook dos pedidos neste projeto; conteúdo das demos a enviar.
- Repositório `site-inntech` está público: recomendado voltar para privado.
- Lançamento: checklist completo, teste em celular real (Android e iPhone), DNS na Hostinger preservando MX/SPF/DKIM/DMARC (portão de publicação).

## Histórico de alterações
- 2026-10-19 — v1 publicada (home, soluções, InnLoco, demonstração, sobre, contato, políticas) — aprovada pelo Leo; autorizou também levar ao domínio (PR #1)
