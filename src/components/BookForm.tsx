'use client'

import { useState, useTransition } from 'react'
import { createAppointment } from '@/app/actions'
import { Calendar, Clock, User, Phone, MessageSquare, ChevronRight, ChevronLeft, CheckCircle2, MessageCircle } from 'lucide-react'

interface BookFormProps {
  services: { name: string; category: string }[]
  slimmingPackages: { name: string }[]
  academyCourses: { name: string }[]
}

export default function BookForm({ services, slimmingPackages, academyCourses }: BookFormProps) {
  const [step, setStep] = useState(1)
  const [category, setCategory] = useState('')
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const categories = [
    { id: 'salon', name: 'Salon Services' },
    { id: 'beauty', name: 'Beauty Services' },
    { id: 'slimming', name: 'Slimming Centre' },
    { id: 'academy', name: 'Beauty Academy' }
  ]

  // Filter services dynamically based on category
  const getServiceOptions = () => {
    if (category === 'salon') return services.filter(s => s.category === 'salon').map(s => s.name)
    if (category === 'beauty') return services.filter(s => s.category === 'beauty').map(s => s.name)
    if (category === 'slimming') return slimmingPackages.map(p => p.name)
    if (category === 'academy') return academyCourses.map(c => c.name)
    return []
  }

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM'
  ]

  const nextStep = () => {
    if (step === 1 && !category) {
      setError('Please select a service category.')
      return
    }
    if (step === 2 && !service) {
      setError('Please select a service.')
      return
    }
    if (step === 3 && (!date || !time)) {
      setError('Please select both date and time slot.')
      return
    }
    setError('')
    setStep(step + 1)
  }

  const prevStep = () => {
    setError('')
    setStep(step - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !phone) {
      setError('Please fill in your name and phone number.')
      return
    }

    const selectedCategoryName = categories.find(c => c.id === category)?.name || ''

    startTransition(async () => {
      const res = await createAppointment({
        name,
        phone,
        serviceCategory: selectedCategoryName,
        service,
        date,
        time,
        message
      })

      if (res.success) {
        setSubmitted(true)
      } else {
        setError(res.error || 'Failed to submit appointment. Please try again.')
      }
    })
  }

  // Generate WhatsApp prefilled link
  const getWhatsAppLink = () => {
    const selectedCategoryName = categories.find(c => c.id === category)?.name || ''
    const text = `Hello Bidhanshi Salon, I would like to book an appointment:
- *Name:* ${name}
- *Phone:* ${phone}
- *Category:* ${selectedCategoryName}
- *Service:* ${service}
- *Date:* ${date}
- *Time:* ${time}
${message ? `- *Message:* ${message}` : ''}`
    
    return `https://wa.me/9779858022442?text=${encodeURIComponent(text)}`
  }

  if (submitted) {
    return (
      <div className="text-center py-12 px-4 bg-white border border-rosegold/10 rounded-3xl luxury-shadow max-w-lg mx-auto">
        <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto stroke-1" />
        <h3 className="font-serif font-bold text-3xl text-salonDark mt-6">Appointment Requested!</h3>
        <p className="text-gray-600 mt-3 max-w-sm mx-auto leading-relaxed">
          Your appointment has been successfully registered in our salon system. Our front-desk coordinator will review and confirm your slot.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium bg-emerald-600 text-white flex items-center justify-center gap-2 hover:bg-emerald-700 hover:scale-[1.02] shadow-emerald-600/20"
          >
            <MessageCircle className="w-5 h-5 fill-white/10" />
            <span>Confirm via WhatsApp</span>
          </a>
          <button
            onClick={() => {
              setStep(1)
              setCategory('')
              setService('')
              setDate('')
              setTime('')
              setName('')
              setPhone('')
              setMessage('')
              setSubmitted(false)
            }}
            className="btn-premium border border-rosegold/30 text-salonDark hover:bg-blush/20"
          >
            Book Another Service
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border border-rosegold/10 rounded-3xl luxury-shadow max-w-2xl mx-auto overflow-hidden">
      {/* Steps indicator */}
      <div className="bg-blush/60 px-6 py-4 border-b border-rosegold/10 flex justify-between items-center text-xs font-semibold text-gray-500 tracking-wider">
        <div className="flex gap-4">
          <span className={step >= 1 ? 'text-rosegold font-bold' : ''}>1. Category</span>
          <span>&gt;</span>
          <span className={step >= 2 ? 'text-rosegold font-bold' : ''}>2. Service</span>
          <span>&gt;</span>
          <span className={step >= 3 ? 'text-rosegold font-bold' : ''}>3. Schedule</span>
          <span>&gt;</span>
          <span className={step >= 4 ? 'text-rosegold font-bold' : ''}>4. Details</span>
        </div>
        <span className="text-rosegold">Step {step} of 4</span>
      </div>

      <div className="p-6 sm:p-8">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm font-semibold p-4 rounded-xl border border-red-100 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* STEP 1: Select Category */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-2xl text-salonDark">Select Service Category</h3>
              <p className="text-sm text-gray-500 -mt-4">Choose the general area of interest for your appointment.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategory(cat.id)
                      setService('')
                      setError('')
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      category === cat.id
                        ? 'border-rosegold bg-rosegold/5 ring-1 ring-rosegold'
                        : 'border-rosegold/15 hover:border-rosegold/40 hover:bg-blush/10'
                    }`}
                  >
                    <span className={`block font-bold text-lg ${category === cat.id ? 'text-rosegold' : 'text-salonDark'}`}>
                      {cat.name}
                    </span>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {cat.id === 'salon' && 'Haircut, spa, coloring, and treatments'}
                      {cat.id === 'beauty' && 'Facials, makeup, threading, waxing, nail extensions'}
                      {cat.id === 'slimming' && 'Fat reduction, body shaping, skin tightening'}
                      {cat.id === 'academy' && 'Beautician training and professional certificates'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Select Service */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-2xl text-salonDark">Select Specific Service</h3>
              <p className="text-sm text-gray-500 -mt-4">What treatment or package would you like to schedule?</p>
              <div className="max-h-80 overflow-y-auto pr-2 space-y-2 border border-rosegold/10 p-3 rounded-2xl bg-blush/10">
                {getServiceOptions().map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setService(opt)
                      setError('')
                    }}
                    className={`w-full p-4 rounded-xl border text-left transition-all font-semibold ${
                      service === opt
                        ? 'border-rosegold bg-rosegold/5 text-rosegold ring-1 ring-rosegold'
                        : 'border-rosegold/10 bg-white hover:border-rosegold/30 hover:bg-blush/10 text-salonDark'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
                {getServiceOptions().length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-6">No options found. Please go back and select a category.</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Select Date and Time */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-2xl text-salonDark">Select Date & Time</h3>
              <p className="text-sm text-gray-500 -mt-4">Choose a convenient date and timing slot for your session.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-salonDark mb-2 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-rosegold" />
                    <span>Appointment Date</span>
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value)
                      setError('')
                    }}
                    className="w-full p-3.5 rounded-xl border border-rosegold/20 focus:outline-none focus:border-rosegold bg-white font-semibold text-salonDark"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-salonDark mb-2 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-rosegold" />
                    <span>Available Slots</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setTime(slot)
                          setError('')
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                          time === slot
                            ? 'border-rosegold bg-rosegold/10 text-rosegold ring-1 ring-rosegold'
                            : 'border-rosegold/10 bg-white hover:border-rosegold/30 hover:bg-blush/10 text-salonDark'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Personal Details */}
          {step === 4 && (
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-2xl text-salonDark">Provide Contact Details</h3>
              <p className="text-sm text-gray-500 -mt-4">Fill in your information to confirm the booking request.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-salonDark mb-1.5 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-rosegold" />
                    <span>Your Full Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sujata Shrestha"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-rosegold/20 focus:outline-none focus:border-rosegold bg-white text-salonDark font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-salonDark mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-rosegold" />
                    <span>Contact Number (WhatsApp Preferred)</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +977-98580XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-rosegold/20 focus:outline-none focus:border-rosegold bg-white text-salonDark font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-salonDark mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4 text-rosegold" />
                    <span>Special Instructions / Message (Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Skin allergies, specific hair color shade, etc."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-rosegold/20 focus:outline-none focus:border-rosegold bg-white text-salonDark font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form navigation buttons */}
          <div className="mt-8 pt-6 border-t border-rosegold/10 flex justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                disabled={isPending}
                className="btn-premium border border-rosegold/30 text-salonDark hover:bg-blush/20 text-sm py-2.5 px-6 flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-premium btn-rosegold text-sm py-2.5 px-6 flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isPending}
                className="btn-premium btn-rosegold text-sm py-2.5 px-8 flex items-center gap-2"
              >
                {isPending ? (
                  <span>Requesting Booking...</span>
                ) : (
                  <>
                    <span>Confirm Booking</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
