import Link from 'next/link'
import Image from 'next/image'
import prisma from '@/lib/db'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import { Calendar, Phone, MessageCircle, Scissors, Sparkles, Award, MapPin, Mail, ChevronRight } from 'lucide-react'
import { getSeoMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return await getSeoMetadata('/')
}

export const revalidate = 3600 // Revalidate home page every hour

export default async function HomePage() {
  // Fetch dynamic content from Prisma
  const services = await prisma.service.findMany({ where: { isPopular: true }, take: 4 })
  const beforeAfters = await prisma.beforeAfter.findMany()
  const testimonials = await prisma.testimonial.findMany({ take: 3 })
  const blogs = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' }, take: 3 })
  const settings = await prisma.settings.findMany()

  const heroBgImage = settings.find(s => s.key === 'heroBgImage')?.value || '/images/hero_bg_counter.jpg'
  const popularServicesSubheading = settings.find(s => s.key === 'popularServicesSubheading')?.value || 'Our Signature Treatments'
  const popularServicesHeading = settings.find(s => s.key === 'popularServicesHeading')?.value || 'Popular Services'
  const popularServicesDescription = settings.find(s => s.key === 'popularServicesDescription')?.value || 'Discover client favorites that deliver instant radiant transformations.'

  return (
    <div className="overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-tr from-blush via-white to-blush pt-28 pb-16">
        {/* Background Decorative Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-rosegold/5 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-rosegold/5 border border-rosegold/10 px-4 py-2 rounded-full self-center lg:self-start w-fit">
              <Sparkles className="w-4 h-4 text-rosegold" />
              <span className="text-xs font-bold tracking-widest text-rosegold uppercase">Luxury Beauty Experience</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-salonDark leading-[1.1] tracking-tight">
              Where Beauty Meets <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rosegold via-gold to-rosegold">
                Style & Confidence
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Welcome to **Bidhanshi Unisex Salon**, Nepalgunj&apos;s premier aesthetic destination. Pamper yourself with high-end hair styling, royal bridal makeovers, scientific weight loss treatments, and elite beauty training.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2">
              <Link href="/book" className="btn-premium btn-rosegold flex items-center gap-2 text-base px-8 py-3.5 shadow-xl hover:scale-[1.02]">
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </Link>
              <a
                href="https://wa.me/9779858022442"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100/80 flex items-center gap-2 text-base px-6 py-3.5"
              >
                <MessageCircle className="w-5 h-5 fill-emerald-600/10" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href="tel:+977-9858022442"
                className="btn-premium border border-rosegold/30 text-salonDark hover:bg-blush/20 flex items-center gap-2 text-base px-6 py-3.5"
              >
                <Phone className="w-5 h-5 text-rosegold" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Hero Right Media (Logo Overlay + Salon Photo) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full p-2 bg-gradient-to-tr from-gold via-rosegold to-gold shadow-2xl">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                <Image
                  src={heroBgImage}
                  alt="Bidhanshi Unisex Salon Interior"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Floating brand badge */}
                <div className="absolute inset-0 bg-salonDark/20 flex items-center justify-center">
                  <div className="relative w-40 h-40 rounded-full bg-white/95 backdrop-blur-sm p-4 border border-gold/40 flex items-center justify-center flex-col shadow-2xl animate-pulse">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border border-rosegold/10">
                      <Image src="/images/logo.jpg" alt="Logo" fill className="object-cover" />
                    </div>
                    <span className="font-serif font-extrabold text-salonDark text-sm tracking-widest mt-2">BIDHANSHI</span>
                    <span className="text-[7px] text-gold font-bold tracking-[0.25em]">UNISEX SALON</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="py-20 bg-white border-y border-rosegold/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-64 rounded-2xl overflow-hidden border border-gold/15 shadow-md">
                <Image
                  src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=400&auto=format&fit=crop"
                  alt="Stylist working"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-80 rounded-2xl overflow-hidden border border-gold/15 shadow-md -mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=400&auto=format&fit=crop"
                  alt="Bridal setup"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col gap-5">
              <span className="text-sm font-bold tracking-widest text-rosegold uppercase">About Bidhanshi</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-salonDark leading-tight">
                Crafting Beauty, Elevating Confidence in Nepalgunj
              </h2>
              <div className="ornament-line -my-2"><div className="ornament-diamond" /></div>
              <p className="text-gray-600 leading-relaxed">
                Founded with a vision to redefine personal care standards in Nepalgunj, **Bidhanshi Unisex Salon** blends scientific aesthetics, luxury brand products, and professional artistry under one roof.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you need a modern haircut, skin-resurfacing facial, permanent hair straightening, professional weight loss contouring, or certificates to start your own beauty salon business - our experts are dedicated to exceeding your expectations.
              </p>
              
              <div className="grid grid-cols-3 gap-6 pt-4 text-center border-t border-rosegold/10 mt-2">
                <div>
                  <span className="block text-2xl font-serif font-bold text-rosegold">12+</span>
                  <span className="text-xs text-gray-500 font-semibold uppercase">Years Experience</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif font-bold text-rosegold">15,000+</span>
                  <span className="text-xs text-gray-500 font-semibold uppercase">Happy Clients</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif font-bold text-rosegold">20+</span>
                  <span className="text-xs text-gray-500 font-semibold uppercase">Expert Staff</span>
                </div>
              </div>

              <Link href="/about" className="inline-flex items-center gap-1.5 font-bold text-rosegold hover:text-salonDark transition-colors mt-4 self-start">
                <span>Read More About Us</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR SERVICES */}
      <section className="py-20 bg-blush/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-sm font-bold tracking-widest text-rosegold uppercase">{popularServicesSubheading}</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-salonDark">{popularServicesHeading}</h2>
            <div className="ornament-line"><div className="ornament-diamond" /></div>
            <p className="text-sm text-gray-500">{popularServicesDescription}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((item) => (
              <div key={item.id} className="luxury-card flex flex-col h-full bg-white overflow-hidden shadow-sm">
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-rosegold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {item.price}
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-salonDark">{item.name}</h3>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1 text-gold">{item.subCategory}</p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-rosegold/5 pt-3 mt-1 text-xs">
                    <span className="text-gray-500 font-medium">Duration: {item.duration}</span>
                    <Link href="/book" className="font-bold text-rosegold hover:underline">Book Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-premium btn-outline-gold px-8 py-3 text-sm font-bold">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SLIMMING & ACADEMY DOUBLE PROMO */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Slimming Highlight */}
          <div className="relative rounded-3xl overflow-hidden group luxury-shadow border border-gold/10 p-8 sm:p-12 flex flex-col justify-between gap-8 text-white min-h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
              alt="Slimming treatments"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-salonDark/85" />
            <div className="relative z-10 flex flex-col gap-3">
              <span className="text-xs font-bold tracking-widest text-gold uppercase">Bidhanshi Slimming Centre</span>
              <h3 className="text-3xl font-serif font-bold">Scientific Fat Loss & Body Sculpting</h3>
              <p className="text-sm text-gray-300 leading-relaxed max-w-md">
                Lose inches safely without surgeries. Our targeted ultrasound cavitation, radiofrequency contouring, and custom diet formulations help you shape your body.
              </p>
            </div>
            <div className="relative z-10">
              <Link href="/slimming" className="btn-premium bg-gold text-white hover:bg-gold/90 inline-flex items-center gap-1.5 text-sm">
                <span>Explore Slimming Packages</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Academy Highlight */}
          <div className="relative rounded-3xl overflow-hidden group luxury-shadow border border-gold/10 p-8 sm:p-12 flex flex-col justify-between gap-8 text-white min-h-[400px]">
            <Image
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop"
              alt="Beauty academy course"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-rosegold/85" />
            <div className="relative z-10 flex flex-col gap-3">
              <span className="text-xs font-bold tracking-widest text-white/80 uppercase">Beauty Academy</span>
              <h3 className="text-3xl font-serif font-bold">Elite Training & Certifications</h3>
              <p className="text-sm text-white/90 leading-relaxed max-w-md">
                Kickstart your career as a makeup artist, professional stylist, or salon manager. Learn under government-registered guidelines and acquire globally accepted certificates.
              </p>
            </div>
            <div className="relative z-10">
              <Link href="/academy" className="btn-premium bg-white text-rosegold hover:bg-white/90 inline-flex items-center gap-1.5 text-sm font-bold">
                <span>Browse Academy Courses</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BEFORE / AFTER RESULTS */}
      {beforeAfters.length > 0 && (
        <section className="py-20 bg-blush/40 border-y border-rosegold/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
              <span className="text-sm font-bold tracking-widest text-rosegold uppercase">Real Client Results</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-salonDark">Before / After Gallery</h2>
              <div className="ornament-line"><div className="ornament-diamond" /></div>
              <p className="text-sm text-gray-500">True, untouched transformations showing the capabilities of our treatments.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {beforeAfters.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-3xl border border-rosegold/10 luxury-shadow">
                  <BeforeAfterSlider
                    beforeImage={item.beforeImage}
                    afterImage={item.afterImage}
                    title={item.title}
                    description={item.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
              <span className="text-sm font-bold tracking-widest text-rosegold uppercase">Client Stories</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-salonDark">Client Testimonials</h2>
              <div className="ornament-line"><div className="ornament-diamond" /></div>
              <p className="text-sm text-gray-500">Read reviews from our lovely customers in Nepalgunj.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((test) => (
                <div key={test.id} className="luxury-card bg-blush/10 p-6 flex flex-col justify-between gap-6 border border-rosegold/5 relative">
                  <div className="text-5xl text-rosegold/15 font-serif absolute top-4 left-4 font-black">&ldquo;</div>
                  <div className="relative z-10">
                    {/* Stars */}
                    <div className="flex gap-1 text-gold">
                      {Array.from({ length: test.rating }).map((_, i) => (
                        <span key={i} className="text-base">★</span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-4 leading-relaxed italic">&ldquo;{test.content}&rdquo;</p>
                  </div>

                  <div className="flex items-center gap-3 border-t border-rosegold/10 pt-4 mt-2">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gold/30">
                      <Image
                        src={test.avatar}
                        alt={test.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-salonDark">{test.name}</h4>
                      <p className="text-xs text-gray-500 font-medium">{test.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. LATEST BLOGS */}
      {blogs.length > 0 && (
        <section className="py-20 bg-blush/40 border-t border-rosegold/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
              <span className="text-sm font-bold tracking-widest text-rosegold uppercase">Beauty Insights</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-salonDark">Latest Blogs & Guides</h2>
              <div className="ornament-line"><div className="ornament-diamond" /></div>
              <p className="text-sm text-gray-500">Skincare, hair care tips, and slimming science written by our in-house therapists.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((post) => (
                <div key={post.id} className="luxury-card bg-white overflow-hidden shadow-sm flex flex-col justify-between h-full">
                  <div>
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-xs font-bold text-gold uppercase tracking-wider">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <h3 className="font-serif font-bold text-lg text-salonDark mt-2 hover:text-rosegold transition-colors">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-3 leading-relaxed">{post.summary}</p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2">
                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-sm font-bold text-rosegold hover:text-salonDark transition-colors">
                      <span>Read Article</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CONTACT & MAP SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Contact Details */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-blush/30 border border-rosegold/10">
              <div>
                <span className="text-xs font-bold tracking-widest text-rosegold uppercase">Reach Us Anytime</span>
                <h3 className="text-3xl font-serif font-bold text-salonDark mt-2">Get In Touch</h3>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  Have questions about our bridal makeups, weight loss programs, or academy courses? Contact us or drop by the salon.
                </p>

                <div className="space-y-5 mt-8">
                  <div className="flex gap-4 items-start">
                    <div className="p-3 rounded-xl bg-white border border-rosegold/10 text-rosegold shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-salonDark">Our Location</h4>
                      <p className="text-xs text-gray-500 mt-0.5 font-medium">Setubk chowk, Nepalgunj 21900</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-3 rounded-xl bg-white border border-rosegold/10 text-rosegold shadow-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-salonDark">Phone Support</h4>
                      <a href="tel:+977-9858022442" className="text-xs text-gray-500 mt-0.5 font-bold hover:text-rosegold block">+977-9858022442</a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="p-3 rounded-xl bg-white border border-rosegold/10 text-rosegold shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-salonDark">Email Inquiries</h4>
                      <a href="mailto:info@bidhanshisalon.com" className="text-xs text-gray-500 mt-0.5 font-bold hover:text-rosegold block">info@bidhanshisalon.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-rosegold/10 pt-6 mt-4">
                <Link href="/book" className="btn-premium btn-rosegold w-full text-center py-3 flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Book Online Now</span>
                </Link>
              </div>
            </div>

            {/* Google Map */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-rosegold/15 luxury-shadow min-h-[350px] relative">
              <iframe
                src="https://maps.google.com/maps?q=Setubk%20chowk,%20Nepalgunj%2021900&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '350px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bidhanshi Unisex Salon Google Map Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
