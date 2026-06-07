'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, MessageCircle, Calendar } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Slimming', path: '/slimming' },
    { name: 'Academy', path: '/academy' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Offers', path: '/offers' },
    { name: 'Blog', path: '/blog' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' }
  ]

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-rosegold/10 py-3 shadow-md'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gold/40 shadow-md transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo.jpg"
                alt="Bidhanshi Unisex Salon Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold font-serif tracking-widest text-salonDark group-hover:text-rosegold transition-colors">
                BIDHANSHI
              </span>
              <span className="text-[10px] font-sans tracking-[0.25em] text-gold font-semibold -mt-1">
                UNISEX SALON
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`relative px-3 py-2 text-sm font-semibold tracking-wide transition-colors ${
                  isActive(item.path)
                    ? 'text-rosegold'
                    : 'text-salonDark hover:text-rosegold'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-rosegold rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/9779858022442"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors border border-emerald-100"
              title="WhatsApp Booking"
            >
              <MessageCircle className="w-5 h-5 fill-emerald-600/10" />
            </a>
            <a
              href="tel:+977-9858022442"
              className="p-2.5 rounded-full bg-rosegold/5 text-rosegold hover:bg-rosegold/10 transition-colors border border-rosegold/10"
              title="Call Now"
            >
              <Phone className="w-5 h-5" />
            </a>
            <Link
              href="/book"
              className="btn-premium btn-rosegold text-sm py-2 px-5 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile hamburger menu trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link
              href="/book"
              className="btn-premium btn-rosegold text-xs py-2 px-3 flex items-center gap-1.5 sm:hidden"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-salonDark hover:text-rosegold transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 w-80 max-w-xs bg-white shadow-2xl z-50 border-l border-rosegold/10 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-between p-6">
          <div>
            <div className="flex items-center justify-between border-b border-rosegold/5 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gold/40">
                  <Image
                    src="/images/logo.jpg"
                    alt="Bidhanshi Unisex Salon"
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-serif font-bold text-salonDark tracking-wider">
                  Bidhanshi
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-salonDark hover:text-rosegold transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`px-4 py-2.5 rounded-lg text-base font-semibold tracking-wide transition-all ${
                    isActive(item.path)
                      ? 'bg-rosegold/5 text-rosegold pl-6 border-l-4 border-rosegold'
                      : 'text-salonDark hover:bg-blush/50 hover:text-rosegold'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t border-rosegold/5 pt-6 flex flex-col gap-3">
            <Link
              href="/book"
              className="btn-premium btn-rosegold w-full text-center py-3 flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Appointment</span>
            </Link>

            <div className="flex gap-2">
              <a
                href="https://wa.me/9779858022442"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100 transition-colors font-semibold text-sm"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-600/10" />
                <span>WhatsApp</span>
              </a>
              <a
                href="tel:+977-9858022442"
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rosegold/5 text-rosegold border border-rosegold/10 hover:bg-rosegold/10 transition-colors font-semibold text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay backdrop for mobile drawer */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
        />
      )}
    </header>
  )
}
