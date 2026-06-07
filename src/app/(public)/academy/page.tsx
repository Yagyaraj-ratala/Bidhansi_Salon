import prisma from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { GraduationCap, Award, BookOpen, MessageCircle, Calendar } from 'lucide-react'
import { getSeoMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return await getSeoMetadata('/academy')
}

export const revalidate = 3600

export default async function AcademyPage() {
  const courses = await prisma.academyCourse.findMany()

  const pillars = [
    { title: 'Hands-on Practice', desc: 'Work directly on live styling models inside our fully equipped training lab.', icon: GraduationCap },
    { title: 'Global Syllabus', desc: 'Courses structured according to international beauty standards and techniques.', icon: BookOpen },
    { title: 'Registered Certificate', desc: 'Secure industry certificates validated to start your salon or apply abroad.', icon: Award }
  ]

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs font-bold tracking-widest text-rosegold uppercase">Bidhanshi Beauty Academy</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-salonDark">Beauty & Makeup Academy</h1>
          <div className="ornament-line"><div className="ornament-diamond" /></div>
          <p className="text-sm text-gray-500">Learn from seasoned stylists and earn professional certificates to launch your career.</p>
        </div>

        {/* Pillars of Academy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 bg-white border border-rosegold/10 rounded-3xl p-8 sm:p-12 luxury-shadow">
          {pillars.map((p, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-3">
              <div className="p-4 rounded-full bg-rosegold/5 text-rosegold">
                <p.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-salonDark">{p.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Course Grid */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-salonDark mb-8 text-center">Our Training Courses</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="luxury-card overflow-hidden bg-white flex flex-col sm:flex-row h-full shadow-sm">
                {/* Media */}
                <div className="relative h-64 sm:h-auto sm:w-2/5 shrink-0 bg-blush">
                  <Image
                    src={course.image}
                    alt={course.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-rosegold text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 shadow-md">
                    {course.price}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-grow flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-salonDark leading-tight">{course.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-gold font-bold uppercase tracking-wider">
                      <span>Duration: {course.duration}</span>
                      <span>•</span>
                      <span>Certificate: {course.certificate}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">{course.description}</p>
                    
                    {/* Syllabus preview */}
                    <div className="mt-4 border-t border-rosegold/5 pt-3">
                      <span className="text-[11px] font-bold text-salonDark uppercase tracking-wider block mb-1.5">Syllabus Modules:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {course.syllabus.split(',').map((item, idx) => (
                          <span key={idx} className="bg-blush text-rosegold font-bold text-[10px] px-2 py-0.5 rounded-full border border-rosegold/5">
                            {item.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-rosegold/5 mt-1">
                    <a
                      href={`https://wa.me/9779858022442?text=${encodeURIComponent(`Hello, I would like to inquire about the Academy course: ${course.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5 font-semibold text-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-emerald-600/10" />
                      <span>WhatsApp Inquiry</span>
                    </a>
                    <Link
                      href="/book"
                      className="btn-premium btn-rosegold text-xs py-2 px-4 flex items-center justify-center gap-1"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Enroll Now</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {courses.length === 0 && (
              <p className="text-gray-500 italic py-6 col-span-full text-center">No academy courses registered yet.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
