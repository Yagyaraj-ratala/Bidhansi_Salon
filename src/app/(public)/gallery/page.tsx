import prisma from '@/lib/db'
import GalleryGrid from '@/components/GalleryGrid'
import { getSeoMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return await getSeoMetadata('/gallery')
}

export const revalidate = 3600

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs font-bold tracking-widest text-rosegold uppercase">Our Portfolio</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-salonDark">Salon Photo Gallery</h1>
          <div className="ornament-line"><div className="ornament-diamond" /></div>
          <p className="text-sm text-gray-500">Take a visual tour of our bridal transformations, hair work, and modern interiors.</p>
        </div>

        {/* Gallery Grid Wrapper */}
        <GalleryGrid images={images} />

      </div>
    </div>
  )
}
