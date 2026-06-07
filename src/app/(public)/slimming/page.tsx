import prisma from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { Activity, ShieldCheck, Heart, MessageCircle, Calendar } from 'lucide-react'
import { getSeoMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return await getSeoMetadata('/slimming')
}

export const revalidate = 3600

export default async function SlimmingPage() {
  const packages = await prisma.slimmingPackage.findMany()

  const benefits = [
    { title: 'Non-Invasive Cavitation', desc: 'Break down fat cells using safe soundwaves without surgery or incisions.', icon: ShieldCheck },
    { title: 'Radio-Frequency Lift', desc: 'Boost natural collagen production to firm, tighten, and lift loose skin.', icon: Activity },
    { title: 'Personalized Nutrition', desc: 'Get customized metabolic diets structured to sustain fat-loss results.', icon: Heart }
  ]

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs font-bold tracking-widest text-rosegold uppercase">Bidhanshi Slimming Centre</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-salonDark">Scientific Fat Loss</h1>
          <div className="ornament-line"><div className="ornament-diamond" /></div>
          <p className="text-sm text-gray-500">Achieve your body goals with safe, non-invasive, pain-free contouring sessions.</p>
        </div>

        {/* Benefits Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 bg-white border border-rosegold/10 rounded-3xl p-8 sm:p-12 luxury-shadow">
          {benefits.map((b, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3">
              <div className="p-4 rounded-full bg-rosegold/5 text-rosegold">
                <b.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-salonDark">{b.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Packages Grid */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-salonDark mb-8 text-center">Slimming & Shaping Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className="luxury-card overflow-hidden bg-white flex flex-col justify-between shadow-sm">
                <div>
                  <div className="relative h-48 w-full bg-blush">
                    <Image
                      src={pkg.image}
                      alt={pkg.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-rosegold text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 shadow-md">
                      {pkg.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-xl text-salonDark">{pkg.name}</h3>
                    <p className="text-xs text-gold font-bold tracking-wider uppercase mt-0.5">Duration: {pkg.duration}</p>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">{pkg.description}</p>
                    
                    {/* What's included list */}
                    <div className="mt-5 border-t border-rosegold/10 pt-4">
                      <h4 className="text-xs font-bold text-salonDark uppercase tracking-wider mb-2">Package Inclusions:</h4>
                      <ul className="space-y-1.5">
                        {pkg.details.split(',').map((det, index) => (
                          <li key={index} className="text-xs text-gray-500 flex items-center gap-1.5">
                            <span className="text-gold font-bold">✔</span>
                            <span>{det.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 flex items-center gap-2 mt-4">
                  <a
                    href={`https://wa.me/9779858022442?text=${encodeURIComponent(`Hello, I would like to inquire about the Slimming package: ${pkg.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2 font-semibold text-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-emerald-600/10" />
                    <span>WhatsApp</span>
                  </a>
                  <Link
                    href="/book"
                    className="btn-premium btn-rosegold text-sm py-2 px-5 flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Now</span>
                  </Link>
                </div>
              </div>
            ))}
            {packages.length === 0 && (
              <p className="text-gray-500 italic py-6 col-span-full text-center">No slimming packages configured yet.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
