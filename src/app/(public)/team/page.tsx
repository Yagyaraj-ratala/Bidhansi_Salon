import prisma from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Phone } from 'lucide-react'
import { getSeoMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return await getSeoMetadata('/team')
}

export const revalidate = 3600

export default async function TeamPage() {
  const team = await prisma.teamMember.findMany({
    orderBy: { name: 'asc' }
  })

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs font-bold tracking-widest text-rosegold uppercase">Our Team</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-salonDark">Meet Our Experts</h1>
          <div className="ornament-line"><div className="ornament-diamond" /></div>
          <p className="text-sm text-gray-500">The passionate designers, medical therapists, and instructors crafting beauty at Bidhanshi.</p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.id} className="luxury-card overflow-hidden bg-white flex flex-col justify-between h-full shadow-sm">
              <div>
                {/* Media */}
                <div className="relative h-80 w-full bg-blush">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="p-6">
                  <span className="text-xs font-bold text-gold uppercase tracking-wider block">{member.designation}</span>
                  <h3 className="font-serif font-bold text-2xl text-salonDark mt-1">{member.name}</h3>
                  <div className="bg-blush/60 text-rosegold text-xs font-bold px-3 py-1.5 rounded-lg border border-rosegold/5 mt-3 w-fit">
                    Specialty: {member.specialty}
                  </div>
                  <p className="text-sm text-gray-600 mt-4 leading-relaxed">{member.bio}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-2 border-t border-rosegold/5 mt-2 flex gap-3">
                <Link
                  href="/book"
                  className="btn-premium btn-rosegold text-xs py-2.5 px-4 flex-1 flex items-center justify-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book with {member.name.split(' ')[0]}</span>
                </Link>
              </div>
            </div>
          ))}
          {team.length === 0 && (
            <p className="text-gray-500 italic py-12 text-center col-span-full font-semibold">No team members registered yet.</p>
          )}
        </div>

      </div>
    </div>
  )
}
