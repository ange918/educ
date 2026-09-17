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

export function buildWhatsAppMessageLink(numero: string, message: string): string {
  return `https://wa.me/${numero}?text=${encodeURIComponent(message)}`
}

// Redimensionne/compresse une photo côté client avant l'envoi vers Supabase
// Storage. Les photos prises directement avec l'appareil photo d'un téléphone
// pèsent souvent 8 à 15 Mo : ce poids fait régulièrement échouer l'optimisation
// d'image de Next.js/Vercel à l'affichage (l'upload réussit, mais la photo ne
// s'affiche jamais). On les ramène à une taille raisonnable avant l'envoi.
export function compressImage(file: File, maxDimension = 1600, quality = 0.82): Promise<File> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !file.type.startsWith('image/') || file.type === 'image/gif') {
      resolve(file)
      return
    }
    const img = new window.Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const { width, height } = img
      if (width <= maxDimension && height <= maxDimension && file.size <= 2 * 1024 * 1024) {
        resolve(file)
        return
      }
      const scale = Math.min(1, maxDimension / Math.max(width, height))
      const targetWidth = Math.round(width * scale)
      const targetHeight = Math.round(height * scale)
      const canvas = document.createElement('canvas')
      canvas.width = targetWidth
      canvas.height = targetHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) { resolve(file); return }
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
      canvas.toBlob((blob) => {
        if (!blob) { resolve(file); return }
        const name = file.name.replace(/\.\w+$/, '') + '.jpg'
        resolve(new File([blob], name, { type: 'image/jpeg' }))
      }, 'image/jpeg', quality)
    }
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file) }
    img.src = url
  })
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
