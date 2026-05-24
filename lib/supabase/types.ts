export type Styliste = {
  id: string
  nom: string
  bio?: string
  ville: string
  pays: string
  telephone?: string
  whatsapp?: string
  instagram?: string
  email?: string
  photo_url?: string
  slug?: string
  verified: boolean
  created_at: string
  updated_at: string
}

export type Tenue = {
  id: string
  styliste_id: string
  nom: string
  description?: string
  prix: number
  devise: string
  categorie: string
  disponible: boolean
  stock: number
  tailles: string[]
  couleurs: string[]
  photos: string[]
  photo_principale?: string
  whatsapp_message?: string
  vues: number
  created_at: string
  updated_at: string
  stylistes?: Styliste
}

export type Commande = {
  id: string
  tenue_id: string
  styliste_id: string
  acheteur_nom?: string
  acheteur_telephone?: string
  acheteur_email?: string
  taille?: string
  couleur?: string
  message?: string
  statut: 'en_attente' | 'confirmé' | 'annulé' | 'livré'
  created_at: string
}

export type Categorie = {
  id: string
  nom: string
  slug: string
  icone?: string
  ordre: number
}
