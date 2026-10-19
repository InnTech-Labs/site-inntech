// Dados do site e utilitários usados pelos componentes.
// Todo texto e contato vem de src/content/site.json — não fixe nada nos componentes.
import dados from '../content/site.json';

export const site = dados;

/** true quando o build é uma prévia da Netlify (não deve ser indexada). */
export const ehPrevia =
  process.env.CONTEXT === 'deploy-preview' || process.env.CONTEXT === 'branch-deploy';

/** Só os dígitos de um telefone. */
export function digitos(valor: string): string {
  return (valor || '').replace(/\D/g, '');
}

/** Link tel: com o número internacional (ex.: tel:+5522992327533). */
export function linkTelefone(): string | null {
  const numero = digitos(site.contato.telefoneInternacional || site.contato.telefone);
  return numero ? `tel:+${numero}` : null;
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

const NOMES_REDES: Record<string, string> = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  facebook: 'Facebook',
};

/** Redes sociais preenchidas, no formato { id, nome, url }. Rede sem link fica oculta. */
export function redesAtivas(): { id: string; nome: string; url: string }[] {
  return Object.entries(site.redes)
    .filter(([, url]) => Boolean(url))
    .map(([id, url]) => ({ id, nome: NOMES_REDES[id] ?? id, url: url as string }));
}

/** @usuario a partir do link do Instagram. */
export function usuarioInstagram(): string | null {
  const url = site.redes.instagram;
  if (!url) return null;
  const nome = url.replace(/\/+$/, '').split('/').pop();
  return nome ? `@${nome}` : null;
}

/** URL absoluta a partir de um caminho, usando o endereço do site. */
export function urlAbsoluta(caminho: string): string {
  return new URL(caminho, site.url).toString();
}
