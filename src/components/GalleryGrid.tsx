'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ZoomIn } from 'lucide-react'

interface GalleryImage {
  id: string
  url: string
  caption: string
  category: string
}

interface GalleryGridProps {
  images: GalleryImage[]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null)

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'hair', name: 'Hair Salon' },
    { id: 'bridal', name: 'Bridal Makeovers' },
    { id: 'slimming', name: 'Slimming Centre' },
    { id: 'academy', name: 'Academy Classes' }
  ]

  const filteredImages = selectedCategory === 'all'
    ? images
    : images.filter(img => img.category === selectedCategory)

  return (
    <div className="space-y-10">
      {/* Category Toggles */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all border ${
              selectedCategory === cat.id
                ? 'bg-rosegold text-white border-rosegold shadow-md'
                : 'bg-white text-salonDark border-rosegold/10 hover:border-rosegold/40 hover:bg-blush/30'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Masonry Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            onClick={() => setActiveImage(img)}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border border-gold/10 luxury-shadow bg-blush"
          >
            <Image
              src={img.url}
              alt={img.caption}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-salonDark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
              <ZoomIn className="w-8 h-8 text-gold mb-2 transform scale-75 group-hover:scale-100 transition-transform duration-300" />
              <p className="text-white font-serif font-semibold text-lg">{img.caption}</p>
              <p className="text-xs text-gold uppercase tracking-wider font-bold mt-1">{img.category}</p>
            </div>
          </div>
        ))}

        {filteredImages.length === 0 && (
          <p className="text-gray-500 italic py-16 text-center col-span-full">No images found in this category.</p>
        )}
      </div>

      {/* Full screen view modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-4xl w-full flex flex-col items-center gap-4">
            <div className="relative aspect-square md:aspect-video w-full max-h-[75vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={activeImage.url}
                alt={activeImage.caption}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-center">
              <h3 className="text-white font-serif text-xl font-bold">{activeImage.caption}</h3>
              <span className="text-gold font-bold text-xs uppercase tracking-widest mt-1 block">{activeImage.category}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
