// robots.txt gerado no build. Em prévias da Netlify, bloqueia a indexação.
import type { APIRoute } from 'astro';
import { site, ehPrevia } from '../lib/site';

export const GET: APIRoute = () => {
  const conteudo = ehPrevia
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\nDisallow: /obrigado\n\nSitemap: ${new URL('/sitemap-index.xml', site.url)}\n`;
  return new Response(conteudo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
