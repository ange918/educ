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
  is_admin?: boolean
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
  montant?: number
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

export type Client = {
  id: string
  styliste_id: string
  nom_complet: string
  telephone: string
  genre: 'homme' | 'femme' | 'enfant'
  created_at: string
}

export type Measurement = {
  id: string
  client_id: string
  styliste_id: string
  date_livraison: string | null
  notes: string | null
  data: Record<string, number>
  created_at: string
}
