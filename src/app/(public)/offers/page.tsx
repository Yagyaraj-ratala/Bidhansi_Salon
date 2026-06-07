import prisma from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { Percent, Clock, MessageCircle, Calendar } from 'lucide-react'
import { getSeoMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return await getSeoMetadata('/offers')
}

export const revalidate = 3600

export default async function OffersPage() {
  const offers = await prisma.offer.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs font-bold tracking-widest text-rosegold uppercase">Seasonal Promotions</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-salonDark">Offers & Packages</h1>
          <div className="ornament-line"><div className="ornament-diamond" /></div>
          <p className="text-sm text-gray-500">Avail limited-time packages and bundle deals crafted for luxury pampering.</p>
        </div>

        {/* Offers list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white border border-rosegold/10 rounded-3xl overflow-hidden luxury-shadow flex flex-col justify-between h-full">
              <div>
                {/* Media */}
                <div className="relative h-56 w-full bg-blush">
                  <Image
                    src={offer.image}
                    alt={offer.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-rosegold text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1 border border-white/10 shadow-md">
                    <Percent className="w-3.5 h-3.5" />
                    <span>Special Package</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8">
                  <h3 className="font-serif font-bold text-2xl text-salonDark leading-tight">{offer.name}</h3>
                  
                  {/* Validity */}
                  <div className="flex items-center gap-1.5 text-xs text-gold font-bold uppercase tracking-wider mt-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{offer.validUntil}</span>
                  </div>

                  <p className="text-sm text-gray-600 mt-4 leading-relaxed">{offer.description}</p>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="p-6 sm:px-8 sm:pb-8 pt-0 border-t border-rosegold/5 bg-blush/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col text-center sm:text-left">
                  <span className="text-xs text-gray-400 font-semibold line-through">Original: {offer.originalPrice}</span>
                  <span className="text-2xl font-serif font-black text-rosegold mt-0.5">Now: {offer.discountPrice}</span>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <a
                    href={`https://wa.me/9779858022442?text=${encodeURIComponent(`Hello, I want to book the special offer: ${offer.name} for ${offer.discountPrice}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5 font-semibold text-xs"
                    title="Claim via WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 fill-emerald-600/10" />
                    <span>WhatsApp</span>
                  </a>
                  <Link
                    href="/book"
                    className="btn-premium btn-rosegold text-xs py-3 px-6 flex-grow text-center flex items-center justify-center gap-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Deal</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {offers.length === 0 && (
            <p className="text-gray-500 italic py-12 text-center col-span-full">No active packages or offers available at this moment. Stay tuned!</p>
          )}
        </div>

      </div>
    </div>
  )
}
