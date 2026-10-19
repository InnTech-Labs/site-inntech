// Configuração do Astro.
// O endereço público do site vem de src/content/site.json (campo "url").
// Ele é usado no sitemap, nas URLs canônicas e no Open Graph.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import site from './src/content/site.json' with { type: 'json' };

export default defineConfig({
  site: site.url,
  trailingSlash: 'never',
  build: {
    // Gera /contato.html em vez de /contato/index.html, combinando com trailingSlash: 'never'.
    format: 'file',
  },
  integrations: [
    sitemap({
      // Páginas que não devem aparecer no Google.
      filter: (page) => !page.includes('/obrigado'),
    }),
  ],
});
