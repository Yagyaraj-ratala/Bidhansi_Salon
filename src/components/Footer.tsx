import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-salonDark text-white pt-16 pb-8 border-t border-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold/40">
                <Image
                  src="/images/logo.jpg"
                  alt="Bidhanshi Unisex Salon Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold font-serif tracking-widest text-white">
                  BIDHANSHI
                </span>
                <span className="text-[10px] font-sans tracking-[0.25em] text-gold font-semibold -mt-1">
                  UNISEX SALON
                </span>
              </div>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed mt-2">
              Step into luxury, comfort, and style. Bidhanshi Unisex Salon is Nepalgunj&apos;s premier destination for high-end styling, premium bridal makeups, advanced slimming solutions, and beauty training academy courses.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://facebook.com/bidhanshisalon"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 text-gray-300 hover:bg-gold hover:text-white transition-colors"
                title="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/bidhanshisalon"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 text-gray-300 hover:bg-gold hover:text-white transition-colors"
                title="Instagram"
              >
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com/@bidhanshisalon"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 text-gray-300 hover:bg-gold hover:text-white transition-colors"
                title="TikTok"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.74-3.94-1.74-.22-.21-.42-.45-.61-.7v5.13c.05 1.89-.5 3.82-1.72 5.27-1.49 1.83-3.92 2.82-6.28 2.53-2.6-.2-4.99-1.92-5.93-4.38-.99-2.52-.46-5.61 1.39-7.59 1.62-1.79 4.25-2.52 6.57-1.77.02.77.01 1.53.01 2.3-.65-.24-1.37-.31-2.04-.15-.99.23-1.87.97-2.23 1.94-.48 1.21-.19 2.69.72 3.59.88.9 2.27 1.11 3.39.49.77-.41 1.25-1.2 1.27-2.08.02-3.13.01-6.26.01-9.39.02-.04.01-.08.01-.13z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold font-serif font-semibold text-lg tracking-wider mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[1px] after:bg-gold">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold transition-colors">About Bidhanshi</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-gold transition-colors">Salon & Beauty Services</Link>
              </li>
              <li>
                <Link href="/slimming" className="hover:text-gold transition-colors">Slimming Centre</Link>
              </li>
              <li>
                <Link href="/academy" className="hover:text-gold transition-colors">Beauty Academy</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold transition-colors">Salon Gallery</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-gold transition-colors">Pricing & Packages</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-gold font-serif font-semibold text-lg tracking-wider mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[1px] after:bg-gold">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span>Setubk chowk,<br />Nepalgunj 21900</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <a href="tel:+977-9858022442" className="hover:text-gold transition-colors">+977-9858022442</a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <a href="mailto:info@bidhanshisalon.com" className="hover:text-gold transition-colors">info@bidhanshisalon.com</a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-gold font-serif font-semibold text-lg tracking-wider mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[1px] after:bg-gold">
              Salon Hours
            </h3>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
              <div className="flex gap-3 items-start">
                <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white text-sm">Sunday to Saturday</p>
                  <p className="text-xs text-gray-300 mt-0.5">9:00 AM - 7:30 PM</p>
                </div>
              </div>
              <div className="text-[11px] text-gray-400 leading-normal border-t border-white/5 pt-2">
                We suggest booking appointments in advance, particularly for weekends and bridal makeups.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>&copy; {new Date().getFullYear()} Bidhanshi Unisex Salon. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/admin/login" className="hover:text-gold transition-colors font-medium">
              Admin Portal
            </Link>
            <span>•</span>
            <span>Made for Beauty & Style in Nepalgunj</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
