import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = { title: 'Politique de confidentialité — DAHOMEY-TECH' }

const SECTIONS: [string, string][] = [
  ['1. Données collectées', 'Lors de l\'inscription, DAHOMEY-TECH collecte : nom/atelier, email, téléphone, ville, et éventuellement WhatsApp, Instagram, bio et photo de profil. Ces informations sont fournies volontairement par l\'utilisateur.'],
  ['2. Utilisation des données', 'Les données sont utilisées pour créer et gérer le compte styliste, afficher son profil public, permettre aux clients de le contacter, et mesurer l\'audience de la plateforme (statistiques anonymisées).'],
  ['3. Partage des données', 'Les informations publiques du profil (nom, ville, photo, tenues, WhatsApp) sont visibles par tous les visiteurs de la plateforme, car elles servent à la mise en relation commerciale. Aucune donnée n\'est vendue à des tiers.'],
  ['4. Sécurité', 'Les données sont hébergées auprès de Supabase, avec authentification sécurisée et accès protégé par mot de passe chiffré. L\'accès aux données administratives est restreint.'],
  ['5. Droits des utilisateurs', 'Chaque styliste peut modifier ses informations à tout moment depuis son tableau de bord, ou demander la suppression complète de son compte et de ses données.'],
  ['6. Cookies', 'La plateforme peut utiliser des cookies techniques nécessaires au fonctionnement du site (session de connexion). Aucun cookie publicitaire tiers n\'est utilisé.'],
  ['7. Contact', 'Pour toute question relative à vos données personnelles, vous pouvez contacter l\'équipe DAHOMEY-TECH via les coordonnées indiquées en pied de page.'],
]

export default function ConfidentialitePage() {
  return (
    <div style={{ background: '#F7F5EF', minHeight: '100vh', padding: '3rem 1.5rem 5rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2rem' }}>
          <ArrowLeft size={14} /> Accueil
        </Link>
        <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: '#14201A', marginBottom: '0.5rem' }}>Politique de confidentialité</h1>
        <p style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', marginBottom: '2.5rem' }}>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}</p>

        <div style={{ background: '#FFFFFF', border: '1px solid #E7E3D8', borderRadius: '16px', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {SECTIONS.map(([titre, texte]) => (
            <div key={titre}>
              <h2 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 700, fontSize: '0.9rem', color: '#008751', marginBottom: '0.5rem' }}>{titre}</h2>
              <p style={{ color: '#6E7268', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', lineHeight: 1.7 }}>{texte}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
