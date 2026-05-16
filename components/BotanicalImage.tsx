'use client'

interface Props {
  src: string
  className: string
}

/**
 * Decorative botanical overlay.
 * Silently disappears via onError if the image file hasn't been placed yet —
 * no existsSync needed, no Node.js imports in client bundles.
 */
export default function BotanicalImage({ src, className }: Props) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={className}
      onError={(e) => {
        ;(e.target as HTMLImageElement).style.display = 'none'
      }}
    />
  )
}
