import prisma from '@/lib/db'
import Link from 'next/link'
import { Calendar, Phone, Sparkles } from 'lucide-react'
import { getSeoMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return await getSeoMetadata('/pricing')
}

export const revalidate = 3600

export default async function PricingPage() {
  // Fetch services, slimming, and academy data
  const services = await prisma.service.findMany({ orderBy: { category: 'asc' } })
  const slimming = await prisma.slimmingPackage.findMany()
  const academy = await prisma.academyCourse.findMany()

  const salonServices = services.filter(s => s.category === 'salon')
  const beautyServices = services.filter(s => s.category === 'beauty')

  return (
    <div className="py-16 sm:py-24 bg-gradient-to-b from-blush/40 via-white to-blush/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-20 flex flex-col gap-3">
          <span className="text-xs font-bold tracking-[0.2em] text-rosegold uppercase flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Elegant Menu</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-salonDark tracking-tight">
            Service Price Booklet
          </h1>
          <div className="ornament-line"><div className="ornament-diamond" /></div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Explore rates for our premium hair design, skin care treatments, scientific body shaping, and beauty certification courses.
          </p>
        </div>

        {/* Pricing Lists */}
        <div className="space-y-20 max-w-4xl mx-auto">
          
          {/* Salon Services */}
          {salonServices.length > 0 && (
            <div className="bg-white border border-rosegold/10 rounded-[2.5rem] p-6 sm:p-10 luxury-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold via-rosegold to-gold" />
              
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-salonDark text-center mb-10 tracking-wide">
                Hair Salon Treatments
              </h2>
              
              <div className="space-y-2">
                {salonServices.map((s) => (
                  <div
                    key={s.id}
                    className="py-5 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-blush/20 rounded-2xl transition-all duration-300 border border-transparent hover:border-rosegold/5"
                  >
                    <div className="flex-grow">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif font-bold text-lg text-salonDark group-hover:text-rosegold transition-colors">
                          {s.name}
                        </h3>
                        <div className="hidden sm:block flex-grow border-b border-dashed border-rosegold/20 mx-3" />
                        <span className="font-serif font-black text-rosegold text-lg shrink-0">
                          {s.price}
                        </span>
                      </div>
                      <p className="text-[10px] text-gold font-bold uppercase tracking-widest mt-1">
                        {s.subCategory} • Approx. {s.duration}
                      </p>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed max-w-2xl">
                        {s.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center shrink-0 justify-end mt-2 sm:mt-0">
                      <Link
                        href="/book"
                        className="px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-rosegold to-rosegold/95 text-white shadow-md shadow-rosegold/15 hover:shadow-lg hover:shadow-rosegold/30 hover:scale-105 transition-all duration-300"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Beauty Services */}
          {beautyServices.length > 0 && (
            <div className="bg-white border border-rosegold/10 rounded-[2.5rem] p-6 sm:p-10 luxury-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold via-rosegold to-gold" />
              
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-salonDark text-center mb-10 tracking-wide">
                Aesthetic Beauty Services
              </h2>
              
              <div className="space-y-2">
                {beautyServices.map((s) => (
                  <div
                    key={s.id}
                    className="py-5 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-blush/20 rounded-2xl transition-all duration-300 border border-transparent hover:border-rosegold/5"
                  >
                    <div className="flex-grow">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif font-bold text-lg text-salonDark group-hover:text-rosegold transition-colors">
                          {s.name}
                        </h3>
                        <div className="hidden sm:block flex-grow border-b border-dashed border-rosegold/20 mx-3" />
                        <span className="font-serif font-black text-rosegold text-lg shrink-0">
                          {s.price}
                        </span>
                      </div>
                      <p className="text-[10px] text-gold font-bold uppercase tracking-widest mt-1">
                        {s.subCategory} • Approx. {s.duration}
                      </p>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed max-w-2xl">
                        {s.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center shrink-0 justify-end mt-2 sm:mt-0">
                      <Link
                        href="/book"
                        className="px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-rosegold to-rosegold/95 text-white shadow-md shadow-rosegold/15 hover:shadow-lg hover:shadow-rosegold/30 hover:scale-105 transition-all duration-300"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Slimming Packages */}
          {slimming.length > 0 && (
            <div className="bg-white border border-rosegold/10 rounded-[2.5rem] p-6 sm:p-10 luxury-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold via-rosegold to-gold" />
              
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-salonDark text-center mb-10 tracking-wide">
                Slimming & Shaping Programs
              </h2>
              
              <div className="space-y-2">
                {slimming.map((p) => (
                  <div
                    key={p.id}
                    className="py-5 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-blush/20 rounded-2xl transition-all duration-300 border border-transparent hover:border-rosegold/5"
                  >
                    <div className="flex-grow">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif font-bold text-lg text-salonDark group-hover:text-rosegold transition-colors">
                          {p.name}
                        </h3>
                        <div className="hidden sm:block flex-grow border-b border-dashed border-rosegold/20 mx-3" />
                        <span className="font-serif font-black text-rosegold text-lg shrink-0">
                          {p.price}
                        </span>
                      </div>
                      <p className="text-[10px] text-gold font-bold uppercase tracking-widest mt-1">
                        Program Duration: {p.duration}
                      </p>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed max-w-2xl">
                        {p.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center shrink-0 justify-end mt-2 sm:mt-0">
                      <Link
                        href="/book"
                        className="px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-rosegold to-rosegold/95 text-white shadow-md shadow-rosegold/15 hover:shadow-lg hover:shadow-rosegold/30 hover:scale-105 transition-all duration-300"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Academy Fees */}
          {academy.length > 0 && (
            <div className="bg-white border border-rosegold/10 rounded-[2.5rem] p-6 sm:p-10 luxury-shadow relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold via-rosegold to-gold" />
              
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-salonDark text-center mb-10 tracking-wide">
                Academy Certification Courses
              </h2>
              
              <div className="space-y-2">
                {academy.map((c) => (
                  <div
                    key={c.id}
                    className="py-5 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-blush/20 rounded-2xl transition-all duration-300 border border-transparent hover:border-rosegold/5"
                  >
                    <div className="flex-grow">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="font-serif font-bold text-lg text-salonDark group-hover:text-rosegold transition-colors">
                          {c.name}
                        </h3>
                        <div className="hidden sm:block flex-grow border-b border-dashed border-rosegold/20 mx-3" />
                        <span className="font-serif font-black text-rosegold text-lg shrink-0">
                          {c.price}
                        </span>
                      </div>
                      <p className="text-[10px] text-gold font-bold uppercase tracking-widest mt-1">
                        Course Duration: {c.duration} • Global Certificate
                      </p>
                      <p className="text-xs text-gray-500 mt-2 leading-relaxed max-w-2xl">
                        {c.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center shrink-0 justify-end mt-2 sm:mt-0">
                      <Link
                        href="/book"
                        className="px-5 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-rosegold to-rosegold/95 text-white shadow-md shadow-rosegold/15 hover:shadow-lg hover:shadow-rosegold/30 hover:scale-105 transition-all duration-300"
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* CTA Footer */}
        <div className="text-center mt-20 max-w-xl mx-auto bg-gradient-to-tr from-rosegold/5 to-gold/5 border border-rosegold/15 p-8 rounded-3xl luxury-shadow relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-gold/10 rounded-full blur-xl" />
          <h3 className="font-serif font-bold text-xl text-salonDark">Request a Custom Beauty Package?</h3>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            Need customized rates for bridal party makeovers, bulk styling schedules, or specific slimming bundles?
          </p>
          
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link
              href="/book"
              className="btn-premium btn-rosegold text-sm py-2.5 px-6 flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
            <a
              href="tel:+977-9858022442"
              className="btn-premium border border-rosegold/35 hover:bg-white text-sm py-2.5 px-6 flex items-center gap-1.5 transition-all duration-300"
            >
              <Phone className="w-4 h-4 text-rosegold" />
              <span>Call Reception</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
