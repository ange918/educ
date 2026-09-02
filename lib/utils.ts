export function formatPrix(prix: number): string {
  return new Intl.NumberFormat('fr-FR').format(prix) + ' XOF'
}

// Formate une saisie de prix en supprimant tout caractère non numérique (donc
// tout point ou virgule qu'un utilisateur taperait comme séparateur de
// milliers), pour éviter qu'un champ number n'interprète "10.000" comme 10.
export function formatPrixInput(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  return digits ? new Intl.NumberFormat('fr-FR').format(Number(digits)) : ''
}

export function parsePrixInput(formatted: string): number {
  return Number(formatted.replace(/\D/g, '')) || 0
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
