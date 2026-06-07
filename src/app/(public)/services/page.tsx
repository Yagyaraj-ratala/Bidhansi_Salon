import prisma from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { Scissors, Sparkles, MessageCircle, Calendar } from 'lucide-react'
import { getSeoMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return await getSeoMetadata('/services')
}

export const revalidate = 3600

export default async function ServicesPage() {
  // Fetch services from db
  const allServices = await prisma.service.findMany({
    orderBy: { name: 'asc' }
  })

  // Group by category
  const salonServices = allServices.filter(s => s.category === 'salon')
  const beautyServices = allServices.filter(s => s.category === 'beauty')

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs font-bold tracking-widest text-rosegold uppercase">Our Treatment Menu</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-salonDark">Salon & Beauty Services</h1>
          <div className="ornament-line"><div className="ornament-diamond" /></div>
          <p className="text-sm text-gray-500">Indulge in our collection of luxury therapies for hair and skin care.</p>
        </div>

        {/* 1. SALON SERVICES */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8 border-b border-rosegold/10 pb-4">
            <div className="p-2 rounded-xl bg-rosegold/5 text-rosegold">
              <Scissors className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-salonDark">Salon Hair Treatments</h2>
              <p className="text-xs text-gray-500 mt-0.5">Professional cuts, luxury coloring, keratin therapies, and structure repair.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {salonServices.map((item) => (
              <div key={item.id} className="luxury-card overflow-hidden bg-white flex flex-col justify-between shadow-sm">
                <div>
                  <div className="relative h-48 w-full bg-blush">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-rosegold text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 shadow-md">
                      {item.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif font-bold text-lg text-salonDark">{item.name}</h3>
                    </div>
                    <span className="text-[10px] font-bold text-gold uppercase tracking-wider block mt-1">{item.subCategory}</span>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-rosegold/5 flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500 font-semibold">Duration: {item.duration}</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/9779858022442?text=${encodeURIComponent(`Hello, I would like to ask about the Salon service: ${item.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 transition-colors"
                      title="WhatsApp Inquiry"
                    >
                      <MessageCircle className="w-4 h-4 fill-emerald-600/10" />
                    </a>
                    <Link
                      href="/book"
                      className="btn-premium btn-rosegold text-xs py-1.5 px-4 flex items-center gap-1"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Book Now</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {salonServices.length === 0 && (
              <p className="text-gray-500 italic py-6 col-span-full text-center">No hair salon services found.</p>
            )}
          </div>
        </div>

        {/* 2. BEAUTY SERVICES */}
        <div>
          <div className="flex items-center gap-3 mb-8 border-b border-rosegold/10 pb-4">
            <div className="p-2 rounded-xl bg-rosegold/5 text-rosegold">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-salonDark">Aesthetic Beauty Treatments</h2>
              <p className="text-xs text-gray-500 mt-0.5">Hydrating facials, organic waxing, HD makeup, and creative nail art.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beautyServices.map((item) => (
              <div key={item.id} className="luxury-card overflow-hidden bg-white flex flex-col justify-between shadow-sm">
                <div>
                  <div className="relative h-48 w-full bg-blush">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-rosegold text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 shadow-md">
                      {item.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-serif font-bold text-lg text-salonDark">{item.name}</h3>
                    </div>
                    <span className="text-[10px] font-bold text-gold uppercase tracking-wider block mt-1">{item.subCategory}</span>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-rosegold/5 flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500 font-semibold">Duration: {item.duration}</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/9779858022442?text=${encodeURIComponent(`Hello, I would like to ask about the Beauty service: ${item.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 transition-colors"
                      title="WhatsApp Inquiry"
                    >
                      <MessageCircle className="w-4 h-4 fill-emerald-600/10" />
                    </a>
                    <Link
                      href="/book"
                      className="btn-premium btn-rosegold text-xs py-1.5 px-4 flex items-center gap-1"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Book Now</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {beautyServices.length === 0 && (
              <p className="text-gray-500 italic py-6 col-span-full text-center">No beauty services found.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
