// Dados do site e utilitários usados pelos componentes.
// Todo texto e contato vem de src/content/site.json — não fixe nada nos componentes.
import dados from '../content/site.json';

export const site = dados;

/** true quando o build é uma prévia da Netlify (não deve ser indexada). */
export const ehPrevia =
  process.env.CONTEXT === 'deploy-preview' || process.env.CONTEXT === 'branch-deploy';

/** Só os dígitos de um telefone, para links tel: e wa.me. */
export function digitos(valor: string): string {
  return (valor || '').replace(/\D/g, '');
}

/**
 * Link do WhatsApp com mensagem pré-preenchida que identifica a página de origem.
 * Retorna null quando o site não tem WhatsApp cadastrado.
 */
export function linkWhatsapp(paginaTitulo?: string): string | null {
  const numero = digitos(site.contato.whatsapp);
  if (!numero) return null;
  const base = site.contato.whatsappMensagem;
  const mensagem = paginaTitulo ? `${base} (página: ${paginaTitulo})` : base;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

/** Redes sociais preenchidas, no formato { nome, url }. */
export function redesAtivas(): { nome: string; url: string }[] {
  return Object.entries(site.redes)
    .filter(([, url]) => Boolean(url))
    .map(([nome, url]) => ({ nome, url: url as string }));
}

/** URL absoluta a partir de um caminho, usando o endereço do site. */
export function urlAbsoluta(caminho: string): string {
  return new URL(caminho, site.url).toString();
}
