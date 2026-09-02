'use client'
import Image, { type ImageProps } from 'next/image'

type ProtectedImageProps = ImageProps & { onImageClick?: () => void }

// Dissuade le clic-droit / glisser-déposer / appui long (mobile) sur les
// photos publiées publiquement. Ne bloque pas une vraie capture d'écran :
// aucune technique web ne peut le faire, ceci n'est qu'un frein basique.
export default function ProtectedImage({ onImageClick, style, ...props }: ProtectedImageProps) {
  return (
    <Image
      {...props}
      draggable={false}
      onContextMenu={e => e.preventDefault()}
      onClick={onImageClick}
      style={{
        ...style,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
        cursor: onImageClick ? 'pointer' : (style as React.CSSProperties | undefined)?.cursor,
      }}
    />
  )
}
