import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { getSeoMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return await getSeoMetadata('/contact')
}

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs font-bold tracking-widest text-rosegold uppercase">Get in Touch</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-salonDark">Contact Us</h1>
          <div className="ornament-line"><div className="ornament-diamond" /></div>
          <p className="text-sm text-gray-500">Contact our salon desk or visit us for details on our services.</p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto mb-16">
          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 p-6 sm:p-8 rounded-3xl bg-white border border-rosegold/10 luxury-shadow">
            <div className="space-y-6">
              <h2 className="font-serif font-bold text-2xl text-salonDark">Salon Information</h2>
              <div className="h-[1px] bg-rosegold/10 w-full" />
              
              <ul className="space-y-6 text-sm text-gray-700">
                <li className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-blush border border-rosegold/10 text-rosegold">
                    <MapPin className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-salonDark">Address</h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed font-semibold">
                      Setubk chowk,<br />
                      Nepalgunj 21900
                    </p>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-blush border border-rosegold/10 text-rosegold">
                    <Phone className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-salonDark">Call Support</h4>
                    <a href="tel:+977-9858022442" className="text-xs text-gray-500 mt-0.5 font-bold hover:text-rosegold block">
                      +977-9858022442
                    </a>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-blush border border-rosegold/10 text-rosegold">
                    <Mail className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-salonDark">Email Inquiries</h4>
                    <a href="mailto:info@bidhanshisalon.com" className="text-xs text-gray-500 mt-0.5 font-bold hover:text-rosegold block">
                      info@bidhanshisalon.com
                    </a>
                  </div>
                </li>

                <li className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-blush border border-rosegold/10 text-rosegold">
                    <Clock className="w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-salonDark">Salon Hours</h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-normal font-semibold">
                      Sunday to Saturday<br />
                      9:00 AM - 7:30 PM
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Social handles */}
            <div className="border-t border-rosegold/10 pt-6 flex items-center justify-between">
              <span className="text-xs font-bold text-salonDark tracking-wider uppercase">Follow Us:</span>
              <div className="flex gap-2">
                <a
                  href="https://facebook.com/bidhanshisalon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-blush border border-rosegold/5 text-salonDark hover:bg-rosegold hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/bidhanshisalon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-blush border border-rosegold/5 text-salonDark hover:bg-rosegold hover:text-white transition-colors"
                >
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Form / Map Column */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-rosegold/15 luxury-shadow min-h-[400px] relative">
            <iframe
              src="https://maps.google.com/maps?q=Setubk%20chowk,%20Nepalgunj%2021900&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bidhanshi Unisex Salon Location Map"
            />
          </div>
        </div>

      </div>
    </div>
  )
}
