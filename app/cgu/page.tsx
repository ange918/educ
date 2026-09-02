import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = { title: 'Conditions d\'utilisation — DAHOMEY-TECH' }

const SECTIONS: [string, string][] = [
  ['1. Objet', 'DAHOMEY-TECH est une marketplace mettant en relation des stylistes africains vérifiés avec des clients souhaitant découvrir et commander des créations de mode. L\'utilisation de la plateforme implique l\'acceptation pleine et entière des présentes conditions.'],
  ['2. Inscription', 'Toute personne souhaitant proposer ses créations sur la plateforme doit créer un compte styliste en fournissant des informations exactes et à jour. Le compte est personnel et ne doit pas être partagé.'],
  ['3. Contenu publié', 'Chaque styliste est seul responsable des photos, descriptions et prix qu\'il publie. Les contenus doivent être authentiques, ne pas porter atteinte aux droits de tiers, et refléter fidèlement les produits proposés.'],
  ['4. Commandes', 'Les commandes sont finalisées directement entre le client et le styliste via WhatsApp. DAHOMEY-TECH facilite la mise en relation mais n\'intervient pas dans la transaction, le paiement ou la livraison.'],
  ['5. Propriété des photos', 'Les photos publiées restent la propriété de leur auteur (styliste). Leur réutilisation, téléchargement ou reproduction sans autorisation est interdite.'],
  ['6. Suspension de compte', 'DAHOMEY-TECH se réserve le droit de suspendre tout compte en cas de non-respect des présentes conditions, de contenu frauduleux ou de comportement nuisant à la confiance entre utilisateurs.'],
  ['7. Modifications', 'Les présentes conditions peuvent être mises à jour à tout moment. Les utilisateurs seront informés de toute modification substantielle.'],
]

export default function CguPage() {
  return (
    <div style={{ background: '#F7F5EF', minHeight: '100vh', padding: '3rem 1.5rem 5rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <Link href="/" style={{ color: '#9AA093', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2rem' }}>
          <ArrowLeft size={14} /> Accueil
        </Link>
        <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: '#14201A', marginBottom: '0.5rem' }}>Conditions d'utilisation</h1>
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
