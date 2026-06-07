import prisma from '@/lib/db'
import BookForm from '@/components/BookForm'
import { getSeoMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return await getSeoMetadata('/book')
}

export const revalidate = 3600

export default async function BookPage() {
  // Fetch services, slimming, and academy data server-side
  const services = await prisma.service.findMany({
    select: { name: true, category: true }
  })
  const slimmingPackages = await prisma.slimmingPackage.findMany({
    select: { name: true }
  })
  const academyCourses = await prisma.academyCourse.findMany({
    select: { name: true }
  })

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12 flex flex-col gap-3">
          <span className="text-xs font-bold tracking-widest text-rosegold uppercase">Schedule a Session</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-salonDark">Book Appointment</h1>
          <div className="ornament-line"><div className="ornament-diamond" /></div>
          <p className="text-sm text-gray-500">Pick your treatments, select timing slots, and confirm your request instantly.</p>
        </div>

        {/* Multi-step Form */}
        <BookForm
          services={services}
          slimmingPackages={slimmingPackages}
          academyCourses={academyCourses}
        />

      </div>
    </div>
  )
}
