import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GitPad',
    start_url: '/',
    display: 'standalone',
    background_color: '#101010',
    theme_color: '#101010',
    icons: [
      { src: '/icons/GitPad.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/GitPad.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
