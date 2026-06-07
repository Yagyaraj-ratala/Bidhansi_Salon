'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { loginAdmin } from '@/app/actions'
import { Lock, ArrowLeft, KeyRound } from 'lucide-react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    startTransition(async () => {
      const res = await loginAdmin(password)
      if (res.success) {
        router.push('/admin/dashboard')
        router.refresh()
      } else {
        setError(res.error || 'Invalid credentials')
      }
    })
  }

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 bg-blush/30">
      {/* Top Navigation */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-semibold text-rosegold hover:text-salonDark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Login Box */}
      <div className="w-full max-w-md mx-auto bg-white border border-rosegold/10 p-8 rounded-3xl luxury-shadow flex flex-col items-center">
        {/* Brand */}
        <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gold/40 shadow-sm mb-4">
          <Image
            src="/images/logo.jpg"
            alt="Bidhanshi Salon Logo"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="font-serif font-black text-2xl text-salonDark uppercase tracking-wider">BIDHANSHI SALON</h1>
        <p className="text-xs text-gold font-bold tracking-widest uppercase mt-0.5">Admin Management Portal</p>

        {error && (
          <div className="w-full mt-6 bg-red-50 text-red-600 text-xs font-bold p-3.5 rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-salonDark uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-rosegold" />
              <span>Enter Admin Password</span>
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-rosegold/15 focus:outline-none focus:border-rosegold bg-white text-salonDark"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn-premium btn-rosegold w-full py-3.5 text-sm flex items-center justify-center gap-2 mt-2"
          >
            <Lock className="w-4 h-4" />
            <span>{isPending ? 'Authenticating...' : 'Login to Dashboard'}</span>
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} Bidhanshi Unisex Salon. Authorized access only.</p>
      </div>
    </div>
  )
}
