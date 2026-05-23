export function formatPrix(prix: number): string {
  return new Intl.NumberFormat('fr-FR').format(prix) + ' XOF'
}

export function buildWhatsAppLink(numero: string, nomTenue: string, prix: number): string {
  const message = encodeURIComponent(
    `Bonjour, je suis intéressé(e) par ${nomTenue} à ${formatPrix(prix)}`
  )
  return `https://wa.me/${numero}?text=${message}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function getTenuesByStyliste(stylisteId: string, tenues: import('./mockData').Tenue[]) {
  return tenues.filter((t) => t.styliste_id === stylisteId)
}
