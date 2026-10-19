# Instruções para o Claude neste repositório

1. Leia o `SITE.md` antes de qualquer alteração: identidade, contatos oficiais, regras, decisões e pendências.
2. Siga a skill do fluxo certo, em `.claude/skills/`:
   - `site-ajuste` — qualquer alteração em site existente;
   - `site-novo` — site novo do briefing à publicação;
   - `revisao-mensal` — revisão, auditoria ou diagnóstico.
3. Nunca commitar direto na `main` nem forçar push. Branch → PR com prévia → aprovação explícita do usuário → merge.
4. Rode `npm run build` antes e depois, e `npm run checar` com a prévia local rodando.
5. Textos em `src/content/`, identidade em `src/styles/tokens.css`. Nada de cor, fonte ou contato fixo nos componentes.
6. Nunca invente números, clientes, depoimentos ou certificações. Faltou informação real: pergunte ou registre em "Pendências" no `SITE.md`.
7. Segredos nunca no repositório.
8. Toda mudança publicada entra no histórico do `SITE.md`.
