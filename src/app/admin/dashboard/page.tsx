import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db'
import AdminConsole from '@/components/AdminConsole'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  // Check authorization
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value

  if (session !== 'authenticated') {
    redirect('/admin/login')
  }

  // Fetch all database records for the dashboard
  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: 'desc' }
  })
  const services = await prisma.service.findMany({
    orderBy: { category: 'asc' }
  })
  const slimming = await prisma.slimmingPackage.findMany({
    orderBy: { createdAt: 'desc' }
  })
  const academy = await prisma.academyCourse.findMany({
    orderBy: { createdAt: 'desc' }
  })
  const gallery = await prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' }
  })
  const beforeAfter = await prisma.beforeAfter.findMany({
    orderBy: { createdAt: 'desc' }
  })
  const blogs = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' }
  })
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' }
  })
  const team = await prisma.teamMember.findMany({
    orderBy: { createdAt: 'desc' }
  })
  const offers = await prisma.offer.findMany({
    orderBy: { createdAt: 'desc' }
  })
  const seo = await prisma.seoData.findMany({
    orderBy: { pagePath: 'asc' }
  })
  const settings = await prisma.settings.findMany()

  return (
    <AdminConsole
      appointments={appointments}
      services={services}
      slimming={slimming}
      academy={academy}
      gallery={gallery}
      beforeAfter={beforeAfter}
      blogs={blogs}
      testimonials={testimonials}
      team={team}
      offers={offers}
      seo={seo}
      settings={settings}
    />
  )
}
