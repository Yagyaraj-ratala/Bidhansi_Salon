import Image from 'next/image'
import prisma from '@/lib/db'
import { Sparkles, Heart, Award, Users } from 'lucide-react'
import { getSeoMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return await getSeoMetadata('/about')
}

export const revalidate = 3600

export default async function AboutPage() {
  const team = await prisma.teamMember.findMany()

  const values = [
    { title: 'Luxury Comfort', desc: 'We deliver an unmatched premium salon environment matching international standards.', icon: Sparkles },
    { title: 'Client Centricity', desc: 'Your comfort and satisfaction are the focus of our customized services.', icon: Heart },
    { title: 'Certified Skill', desc: 'Our technicians are highly trained, holding certificates from recognized global academies.', icon: Award }
  ]

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs font-bold tracking-widest text-rosegold uppercase">Our Story</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-salonDark">About Bidhanshi</h1>
          <div className="ornament-line"><div className="ornament-diamond" /></div>
          <p className="text-sm text-gray-500">Unveiling the legacy behind Nepalgunj&apos;s leading beauty brand.</p>
        </div>

        {/* Brand Mission & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 relative h-[380px] w-full rounded-3xl overflow-hidden border border-gold/15 luxury-shadow">
            <Image
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop"
              alt="Bidhanshi Unisex Salon Interior Detail"
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 flex flex-col gap-5">
            <h2 className="text-3xl font-serif font-bold text-salonDark leading-snug">
              Creating A Sanctuary Of Self-Care & Confidence
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Bidhanshi Unisex Salon started as a boutique beauty parlour with a dream of delivering premium salon treatments to Nepalgunj. Today, we have grown into a dynamic multi-disciplinary center providing luxury hair styling, advanced skin-care therapies, scientific slimming treatments, and an elite beauty academy.
            </p>
            <p className="text-gray-600 leading-relaxed font-semibold italic text-rosegold">
              &ldquo;We believe that beauty is not just about looks; it is about styled self-care that fuels your confidence.&rdquo;
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our state-of-the-art facilities features imported, C-grade certified therapeutic equipment, premium hair care brands like L&apos;Oreal and Olaplex, and hygienic treatment beds to guarantee safety and premium results.
            </p>
          </div>
        </div>

        {/* Brand Values */}
        <div className="bg-white border border-rosegold/10 rounded-3xl p-8 sm:p-12 mb-24 luxury-shadow">
          <div className="text-center max-w-md mx-auto mb-10">
            <h3 className="text-2xl font-serif font-bold text-salonDark">Our Core Values</h3>
            <p className="text-xs text-gray-500 mt-1">What keeps Bidhanshi the best salon in Nepalgunj.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="p-4 rounded-full bg-blush border border-rosegold/10 text-rosegold">
                  <v.icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-lg text-salonDark">{v.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed max-w-xs">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Expert Team Section */}
        {team.length > 0 && (
          <div>
            <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
              <span className="text-xs font-bold tracking-widest text-rosegold uppercase">Meet the Experts</span>
              <h2 className="text-3xl font-serif font-bold text-salonDark">Our Elite Team</h2>
              <div className="ornament-line"><div className="ornament-diamond" /></div>
              <p className="text-sm text-gray-500">The professional stylists and instructors behind Bidhanshi.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((m) => (
                <div key={m.id} className="luxury-card overflow-hidden bg-white flex flex-col h-full shadow-sm">
                  <div className="relative h-72 w-full">
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex-grow flex flex-col justify-between gap-4">
                    <div>
                      <h3 className="font-serif font-bold text-xl text-salonDark">{m.name}</h3>
                      <p className="text-xs text-gold font-bold uppercase tracking-wider mt-0.5">{m.designation}</p>
                      <p className="text-xs text-rosegold font-semibold tracking-wide mt-1">Specialty: {m.specialty}</p>
                      <p className="text-sm text-gray-600 mt-3 leading-relaxed">{m.bio}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
