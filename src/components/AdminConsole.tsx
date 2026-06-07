'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  logoutAdmin,
  updateAppointmentStatus,
  deleteAppointment,
  saveService,
  deleteService,
  saveSlimmingPackage,
  deleteSlimmingPackage,
  saveAcademyCourse,
  deleteAcademyCourse,
  saveGalleryImage,
  deleteGalleryImage,
  saveBeforeAfter,
  deleteBeforeAfter,
  saveBlogPost,
  deleteBlogPost,
  saveTestimonial,
  deleteTestimonial,
  saveTeamMember,
  deleteTeamMember,
  saveOffer,
  deleteOffer,
  saveSeoData,
  saveSetting,
  saveGeneralSettings
} from '@/app/actions'
import {
  Calendar, Scissors, Activity, GraduationCap, Image as ImageIcon,
  BookOpen, Heart, Users, Percent, Settings, Globe, LogOut, Trash2, Plus, Edit3, Check, X
} from 'lucide-react'

interface AdminConsoleProps {
  appointments: any[]
  services: any[]
  slimming: any[]
  academy: any[]
  gallery: any[]
  beforeAfter: any[]
  blogs: any[]
  testimonials: any[]
  team: any[]
  offers: any[]
  seo: any[]
  settings: any[]
}

export default function AdminConsole({
  appointments, services, slimming, academy, gallery,
  beforeAfter, blogs, testimonials, team, offers, seo, settings
}: AdminConsoleProps) {
  const [activeTab, setActiveTab] = useState('appointments')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  // Selected item for Editing
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formType, setFormType] = useState<string>('')

  // Generic status message
  const [message, setMessage] = useState('')

  const handleLogout = async () => {
    await logoutAdmin()
    router.push('/admin/login')
    router.refresh()
  }

  // Helper to get setting value
  const getSetting = (key: string) => {
    return settings.find(s => s.key === key)?.value || ''
  }

  // ----------------------------------------------------
  // FORM SUBMISSION HANDLERS (FormData direct passing)
  // ----------------------------------------------------
  const handleServiceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    if (editingItem?.id) {
      formData.append('id', editingItem.id)
    }
    startTransition(async () => {
      const res = await saveService(formData)
      if (res.success) {
        setMessage('Service saved successfully!')
        setEditingItem(null)
        setFormType('')
        router.refresh()
      } else {
        setMessage('Failed to save service.')
      }
    })
  }

  const handleSlimmingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    if (editingItem?.id) {
      formData.append('id', editingItem.id)
    }
    startTransition(async () => {
      const res = await saveSlimmingPackage(formData)
      if (res.success) {
        setMessage('Slimming package saved successfully!')
        setEditingItem(null)
        setFormType('')
        router.refresh()
      } else {
        setMessage('Failed to save package.')
      }
    })
  }

  const handleAcademySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    if (editingItem?.id) {
      formData.append('id', editingItem.id)
    }
    startTransition(async () => {
      const res = await saveAcademyCourse(formData)
      if (res.success) {
        setMessage('Academy course saved successfully!')
        setEditingItem(null)
        setFormType('')
        router.refresh()
      } else {
        setMessage('Failed to save course.')
      }
    })
  }

  const handleGallerySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    if (editingItem?.id) {
      formData.append('id', editingItem.id)
    }
    startTransition(async () => {
      const res = await saveGalleryImage(formData)
      if (res.success) {
        setMessage('Gallery image saved successfully!')
        setEditingItem(null)
        setFormType('')
        router.refresh()
      } else {
        setMessage('Failed to save gallery image.')
      }
    })
  }

  const handleBeforeAfterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    if (editingItem?.id) {
      formData.append('id', editingItem.id)
    }
    startTransition(async () => {
      const res = await saveBeforeAfter(formData)
      if (res.success) {
        setMessage('Before-After comparison saved!')
        setEditingItem(null)
        setFormType('')
        router.refresh()
      } else {
        setMessage('Failed to save comparison.')
      }
    })
  }

  const handleBlogSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    if (editingItem?.id) {
      formData.append('id', editingItem.id)
    }
    startTransition(async () => {
      const res = await saveBlogPost(formData)
      if (res.success) {
        setMessage('Blog post saved!')
        setEditingItem(null)
        setFormType('')
        router.refresh()
      } else {
        setMessage('Failed to save blog post.')
      }
    })
  }

  const handleTestimonialSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    if (editingItem?.id) {
      formData.append('id', editingItem.id)
    }
    startTransition(async () => {
      const res = await saveTestimonial(formData)
      if (res.success) {
        setMessage('Testimonial saved!')
        setEditingItem(null)
        setFormType('')
        router.refresh()
      } else {
        setMessage('Failed to save testimonial.')
      }
    })
  }

  const handleTeamSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    if (editingItem?.id) {
      formData.append('id', editingItem.id)
    }
    startTransition(async () => {
      const res = await saveTeamMember(formData)
      if (res.success) {
        setMessage('Team member saved!')
        setEditingItem(null)
        setFormType('')
        router.refresh()
      } else {
        setMessage('Failed to save team member.')
      }
    })
  }

  const handleOfferSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    if (editingItem?.id) {
      formData.append('id', editingItem.id)
    }
    startTransition(async () => {
      const res = await saveOffer(formData)
      if (res.success) {
        setMessage('Offer/Package saved!')
        setEditingItem(null)
        setFormType('')
        router.refresh()
      } else {
        setMessage('Failed to save offer.')
      }
    })
  }

  const handleSeoSubmit = (e: React.FormEvent<HTMLFormElement>, seoId: string) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      pagePath: formData.get('pagePath') as string,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      keywords: formData.get('keywords') as string
    }

    startTransition(async () => {
      const res = await saveSeoData(seoId, data)
      if (res.success) {
        setMessage('SEO Meta data updated successfully!')
        router.refresh()
      } else {
        setMessage('Failed to update SEO.')
      }
    })
  }

  const handleSettingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const res = await saveGeneralSettings(formData)
      if (res.success) {
        setMessage('General settings updated successfully!')
        router.refresh()
      } else {
        setMessage('Failed to update general settings.')
      }
    })
  }

  const tabs = [
    { id: 'appointments', name: 'Appointments', icon: Calendar },
    { id: 'services', name: 'Services', icon: Scissors },
    { id: 'slimming_academy', name: 'Slimming & Academy', icon: GraduationCap },
    { id: 'gallery_media', name: 'Gallery & Before-After', icon: ImageIcon },
    { id: 'blogs_offers', name: 'Blogs & Offers', icon: BookOpen },
    { id: 'testimonials_team', name: 'Testimonials & Team', icon: Users },
    { id: 'seo_settings', name: 'SEO & Settings', icon: Globe }
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-400 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gold/40">
              <Image src="/images/logo.jpg" alt="Logo" fill className="object-cover" />
            </div>
            <div>
              <span className="block font-bold text-white text-sm tracking-wider font-serif">BIDHANSHI</span>
              <span className="text-[9px] text-gold tracking-widest font-bold -mt-1 block">ADMIN CONSOLE</span>
            </div>
          </div>

          <nav className="p-4 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setEditingItem(null)
                  setFormType('')
                  setMessage('')
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-rosegold text-white shadow-md shadow-rosegold/10'
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all focus:outline-none"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout Account</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-full bg-slate-50 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 py-4 px-8 flex items-center justify-between shrink-0">
          <h2 className="text-xl font-bold font-serif text-slate-800 capitalize">
            {activeTab.replace('_', ' & ')}
          </h2>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200">
              Database: PostgreSQL
            </span>
          </div>
        </header>

        <div className="p-8 flex-grow">
          {message && (
            <div className="mb-6 bg-slate-800 text-white font-semibold text-sm p-4 rounded-xl shadow-lg flex items-center justify-between">
              <span>{message}</span>
              <button onClick={() => setMessage('')} className="text-xs underline">Dismiss</button>
            </div>
          )}

          {/* 1. APPOINTMENTS PANEL */}
          {activeTab === 'appointments' && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold text-slate-800">Recent Booking Requests</h3>
                <span className="text-xs bg-rosegold/10 text-rosegold font-bold px-3 py-1 rounded-full">
                  Total: {appointments.length}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                      <th className="p-4">Customer</th>
                      <th className="p-4">Service Required</th>
                      <th className="p-4">Requested Time</th>
                      <th className="p-4">Message</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {appointments.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-semibold text-slate-800">
                          {app.name}
                          <span className="block text-xs text-slate-400 mt-0.5">{app.phone}</span>
                        </td>
                        <td className="p-4">
                          <span className="block font-medium text-slate-700">{app.service}</span>
                          <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full mt-1 inline-block border border-slate-200">
                            {app.serviceCategory}
                          </span>
                        </td>
                        <td className="p-4 font-medium text-slate-700">
                          {app.date}
                          <span className="block text-xs text-slate-400 mt-0.5">{app.time}</span>
                        </td>
                        <td className="p-4 text-xs text-slate-500 max-w-xs truncate">{app.message || '—'}</td>
                        <td className="p-4">
                          <select
                            value={app.status}
                            onChange={(e) => {
                              startTransition(async () => {
                                await updateAppointmentStatus(app.id, e.target.value)
                                setMessage('Appointment status updated!')
                                router.refresh()
                              })
                            }}
                            className={`p-1.5 rounded-lg text-xs font-bold border ${
                              app.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              app.status === 'Cancelled' ? 'bg-red-50 text-red-700 border-red-200' :
                              'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this appointment?')) {
                                startTransition(async () => {
                                  await deleteAppointment(app.id)
                                  setMessage('Appointment deleted.')
                                  router.refresh()
                                })
                              }
                            }}
                            className="p-2 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {appointments.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-12 text-center text-slate-400 italic">No appointments booked yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 2. SERVICES PANEL */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              {formType === 'service' ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-800 text-lg">
                      {editingItem ? `Edit Service: ${editingItem.name}` : 'Add New Salon/Beauty Service'}
                    </h3>
                    <button onClick={() => { setFormType(''); setEditingItem(null); }} className="text-slate-400 hover:text-slate-600"><X /></button>
                  </div>

                  <form onSubmit={handleServiceSubmit} encType="multipart/form-data" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Service Name</label>
                        <input name="name" required defaultValue={editingItem?.name || ''} className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-800 text-sm focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Service Price</label>
                        <input name="price" required defaultValue={editingItem?.price || 'Rs. '} className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-800 text-sm focus:outline-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Category</label>
                        <select name="category" defaultValue={editingItem?.category || 'salon'} className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-800 text-sm focus:outline-none">
                          <option value="salon">Salon Services</option>
                          <option value="beauty">Beauty Services</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Subcategory (e.g. Haircut, Facial)</label>
                        <input name="subCategory" required defaultValue={editingItem?.subCategory || ''} className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-800 text-sm focus:outline-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Duration (e.g. 45 mins)</label>
                        <input name="duration" defaultValue={editingItem?.duration || '30 mins'} className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-800 text-sm focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Is Featured / Popular</label>
                        <select name="isPopular" defaultValue={editingItem?.isPopular ? 'true' : 'false'} className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-800 text-sm focus:outline-none">
                          <option value="false">No</option>
                          <option value="true">Yes</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Service Cover Photo</label>
                      {editingItem?.image && (
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-slate-200 mb-2 shadow-sm">
                          <Image src={editingItem.image} alt="Service Image Preview" fill className="object-cover" />
                        </div>
                      )}
                      <input type="file" name="imageFile" accept="image/*" className="w-full p-2 text-sm border rounded bg-white text-slate-800" />
                      <input type="hidden" name="existingImage" defaultValue={editingItem?.image || ''} />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Description</label>
                      <textarea name="description" rows={3} required defaultValue={editingItem?.description || ''} className="w-full p-2.5 rounded-lg border border-slate-200 text-slate-800 text-sm focus:outline-none" />
                    </div>

                    <button type="submit" disabled={isPending} className="btn-premium btn-rosegold text-sm py-2 px-6">
                      {isPending ? 'Saving...' : 'Save Service'}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800">Salon & Beauty Menu Items</h3>
                    <button onClick={() => setFormType('service')} className="btn-premium btn-rosegold text-xs py-2 px-4 flex items-center gap-1">
                      <Plus className="w-4 h-4" />
                      <span>Add Service</span>
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                          <th className="p-4">Service</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Duration</th>
                          <th className="p-4">Price</th>
                          <th className="p-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {services.map((s) => (
                          <tr key={s.id} className="hover:bg-slate-50/50">
                            <td className="p-4 flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shadow-sm shrink-0 bg-white">
                                <Image src={s.image} alt={s.name} fill className="object-cover" />
                              </div>
                              <div>
                                <span className="font-semibold text-slate-800 flex items-center gap-2">
                                  {s.name}
                                  {s.isPopular && (
                                    <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-0.5 shrink-0">
                                      ★ Popular
                                    </span>
                                  )}
                                </span>
                                <span className="text-[10px] text-slate-400 line-clamp-1">{s.description}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="text-xs uppercase font-bold text-gold">{s.category} ({s.subCategory})</span>
                            </td>
                            <td className="p-4 text-slate-600">{s.duration}</td>
                            <td className="p-4 font-bold text-rosegold">{s.price}</td>
                            <td className="p-4 text-center flex items-center justify-center gap-2">
                              <button
                                onClick={() => { setEditingItem(s); setFormType('service'); }}
                                className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete service: ${s.name}?`)) {
                                    startTransition(async () => {
                                      await deleteService(s.id)
                                      setMessage('Service deleted.')
                                      router.refresh()
                                    })
                                  }
                                }}
                                className="p-2 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. SLIMMING & ACADEMY PANEL */}
          {activeTab === 'slimming_academy' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
              
              {/* Slimming Section */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                  <h3 className="font-bold text-slate-800">Slimming Packages</h3>
                  <button
                    onClick={() => { setFormType('slimming'); setEditingItem(null); }}
                    className="p-2 bg-rosegold/10 text-rosegold hover:bg-rosegold/20 rounded-xl text-xs font-bold"
                  >
                    + Add Package
                  </button>
                </div>

                {formType === 'slimming' && (
                  <form onSubmit={handleSlimmingSubmit} encType="multipart/form-data" className="space-y-3 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase text-slate-600">Save Package Details</h4>
                    <input name="name" required placeholder="Package Name" defaultValue={editingItem?.name || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <input name="price" required placeholder="Price (e.g. Rs. 15,000)" defaultValue={editingItem?.price || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <input name="duration" required placeholder="Sessions (e.g. 12 Sessions)" defaultValue={editingItem?.duration || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <textarea name="description" required placeholder="Short summary" defaultValue={editingItem?.description || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <textarea name="details" required placeholder="Inclusions (comma separated)" defaultValue={editingItem?.details || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Package Cover Photo</label>
                      {editingItem?.image && (
                        <div className="relative w-16 h-16 rounded border mb-1">
                          <Image src={editingItem.image} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                      <input type="file" name="imageFile" accept="image/*" className="w-full p-2 text-sm border rounded bg-white" />
                      <input type="hidden" name="existingImage" defaultValue={editingItem?.image || ''} />
                    </div>
                    
                    <div className="flex gap-2 justify-end pt-2">
                      <button type="button" onClick={() => { setFormType(''); setEditingItem(null); }} className="text-xs text-slate-400 font-bold px-3 py-1">Cancel</button>
                      <button type="submit" disabled={isPending} className="text-xs bg-rosegold text-white font-bold px-4 py-1.5 rounded-lg shadow-sm">Save</button>
                    </div>
                  </form>
                )}

                <ul className="divide-y divide-slate-100">
                  {slimming.map((p) => (
                    <li key={p.id} className="py-3 flex justify-between items-center">
                      <div>
                        <span className="block font-semibold text-slate-800 text-sm">{p.name}</span>
                        <span className="text-[10px] text-slate-500">{p.duration} • {p.price}</span>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => { setEditingItem(p); setFormType('slimming'); }} className="p-1 text-slate-400 hover:text-blue-600"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete slimming package ${p.name}?`)) {
                              startTransition(async () => {
                                await deleteSlimmingPackage(p.id)
                                setMessage('Slimming package deleted.')
                                router.refresh()
                              })
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Academy Section */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                  <h3 className="font-bold text-slate-800">Academy Courses</h3>
                  <button
                    onClick={() => { setFormType('academy'); setEditingItem(null); }}
                    className="p-2 bg-rosegold/10 text-rosegold hover:bg-rosegold/20 rounded-xl text-xs font-bold"
                  >
                    + Add Course
                  </button>
                </div>

                {formType === 'academy' && (
                  <form onSubmit={handleAcademySubmit} encType="multipart/form-data" className="space-y-3 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase text-slate-600">Save Course Details</h4>
                    <input name="name" required placeholder="Course Name" defaultValue={editingItem?.name || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <input name="price" required placeholder="Fees (e.g. Rs. 25,000)" defaultValue={editingItem?.price || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <input name="duration" required placeholder="Duration (e.g. 3 Months)" defaultValue={editingItem?.duration || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <textarea name="description" required placeholder="Description" defaultValue={editingItem?.description || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <textarea name="syllabus" required placeholder="Syllabus modules (comma separated)" defaultValue={editingItem?.syllabus || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <input name="certificate" placeholder="Certificate? (Yes / No)" defaultValue={editingItem?.certificate || 'Yes'} className="w-full p-2 text-sm border rounded bg-white" />
                    
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Course Cover Photo</label>
                      {editingItem?.image && (
                        <div className="relative w-16 h-16 rounded border mb-1">
                          <Image src={editingItem.image} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                      <input type="file" name="imageFile" accept="image/*" className="w-full p-2 text-sm border rounded bg-white" />
                      <input type="hidden" name="existingImage" defaultValue={editingItem?.image || ''} />
                    </div>
                    
                    <div className="flex gap-2 justify-end pt-2">
                      <button type="button" onClick={() => { setFormType(''); setEditingItem(null); }} className="text-xs text-slate-400 font-bold px-3 py-1">Cancel</button>
                      <button type="submit" disabled={isPending} className="text-xs bg-rosegold text-white font-bold px-4 py-1.5 rounded-lg shadow-sm">Save</button>
                    </div>
                  </form>
                )}

                <ul className="divide-y divide-slate-100">
                  {academy.map((c) => (
                    <li key={c.id} className="py-3 flex justify-between items-center">
                      <div>
                        <span className="block font-semibold text-slate-800 text-sm">{c.name}</span>
                        <span className="text-[10px] text-slate-500">{c.duration} • {c.price}</span>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => { setEditingItem(c); setFormType('academy'); }} className="p-1 text-slate-400 hover:text-blue-600"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete course ${c.name}?`)) {
                              startTransition(async () => {
                                await deleteAcademyCourse(c.id)
                                setMessage('Course deleted.')
                                router.refresh()
                              })
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

          {/* 4. GALLERY & BEFORE AFTER PANEL */}
          {activeTab === 'gallery_media' && (
            <div className="grid grid-cols-1 xl:grid-cols-Double gap-8 items-start grid-cols-1 xl:grid-cols-2">
              
              {/* Gallery List */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                  <h3 className="font-bold text-slate-800">Gallery Portfolio Photos</h3>
                  <button
                    onClick={() => { setFormType('gallery'); setEditingItem(null); }}
                    className="p-2 bg-rosegold/10 text-rosegold hover:bg-rosegold/20 rounded-xl text-xs font-bold"
                  >
                    + Upload Photo
                  </button>
                </div>

                {formType === 'gallery' && (
                  <form onSubmit={handleGallerySubmit} encType="multipart/form-data" className="space-y-3 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase text-slate-600">Save Photo Details</h4>
                    
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Select Photo File</label>
                      {editingItem?.url && (
                        <div className="relative w-16 h-16 rounded border mb-1">
                          <Image src={editingItem.url} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                      <input type="file" required={!editingItem} name="imageFile" accept="image/*" className="w-full p-2 text-sm border rounded bg-white text-slate-800" />
                      <input type="hidden" name="existingImage" defaultValue={editingItem?.url || ''} />
                    </div>

                    <input name="caption" required placeholder="Caption description" defaultValue={editingItem?.caption || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    
                    <select name="category" defaultValue={editingItem?.category || 'hair'} className="w-full p-2 text-sm border rounded bg-white">
                      <option value="hair">Hair Styling</option>
                      <option value="bridal">Bridal Makeovers</option>
                      <option value="slimming">Slimming Treatments</option>
                      <option value="academy">Academy Classes</option>
                    </select>

                    <div className="flex gap-2 justify-end pt-2">
                      <button type="button" onClick={() => { setFormType(''); setEditingItem(null); }} className="text-xs text-slate-400 font-bold px-3 py-1">Cancel</button>
                      <button type="submit" disabled={isPending} className="text-xs bg-rosegold text-white font-bold px-4 py-1.5 rounded-lg shadow-sm">Save</button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
                  {gallery.map((img) => (
                    <div key={img.id} className="relative group border rounded-xl overflow-hidden aspect-square">
                      <Image src={img.url} alt={img.caption} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => {
                            if (confirm('Delete this photo?')) {
                              startTransition(async () => {
                                await deleteGalleryImage(img.id)
                                setMessage('Image removed.')
                                router.refresh()
                              })
                            }
                          }}
                          className="p-1.5 rounded bg-red-600 text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Before After comparisons */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                  <h3 className="font-bold text-slate-800">Before / After Slider Photos</h3>
                  <button
                    onClick={() => { setFormType('beforeafter'); setEditingItem(null); }}
                    className="p-2 bg-rosegold/10 text-rosegold hover:bg-rosegold/20 rounded-xl text-xs font-bold"
                  >
                    + Add Comparison
                  </button>
                </div>

                {formType === 'beforeafter' && (
                  <form onSubmit={handleBeforeAfterSubmit} encType="multipart/form-data" className="space-y-3 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase text-slate-600">Save Comparison Details</h4>
                    <input name="title" required placeholder="Transformation Title" defaultValue={editingItem?.title || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Before Photo File</label>
                      {editingItem?.beforeImage && (
                        <div className="relative w-16 h-16 rounded border mb-1">
                          <Image src={editingItem.beforeImage} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                      <input type="file" required={!editingItem} name="beforeImageFile" accept="image/*" className="w-full p-2 text-sm border rounded bg-white text-slate-800" />
                      <input type="hidden" name="existingBeforeImage" defaultValue={editingItem?.beforeImage || ''} />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">After Photo File</label>
                      {editingItem?.afterImage && (
                        <div className="relative w-16 h-16 rounded border mb-1">
                          <Image src={editingItem.afterImage} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                      <input type="file" required={!editingItem} name="afterImageFile" accept="image/*" className="w-full p-2 text-sm border rounded bg-white text-slate-800" />
                      <input type="hidden" name="existingAfterImage" defaultValue={editingItem?.afterImage || ''} />
                    </div>

                    <textarea name="description" placeholder="Brief explanation of treatment" defaultValue={editingItem?.description || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    
                    <div className="flex gap-2 justify-end pt-2">
                      <button type="button" onClick={() => { setFormType(''); setEditingItem(null); }} className="text-xs text-slate-400 font-bold px-3 py-1">Cancel</button>
                      <button type="submit" disabled={isPending} className="text-xs bg-rosegold text-white font-bold px-4 py-1.5 rounded-lg shadow-sm">Save</button>
                    </div>
                  </form>
                )}

                <ul className="divide-y divide-slate-100">
                  {beforeAfter.map((ba) => (
                    <li key={ba.id} className="py-3 flex justify-between items-center">
                      <div>
                        <span className="block font-semibold text-slate-800 text-sm">{ba.title}</span>
                        <span className="text-[10px] text-slate-500 max-w-sm line-clamp-1">{ba.description}</span>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Delete before-after ${ba.title}?`)) {
                            startTransition(async () => {
                              await deleteBeforeAfter(ba.id)
                              setMessage('Comparison deleted.')
                              router.refresh()
                            })
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

          {/* 5. BLOGS & OFFERS PANEL */}
          {activeTab === 'blogs_offers' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              
              {/* Blog Lists */}
              <div className="xl:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                  <h3 className="font-bold text-slate-800">Salon Blogs & Articles</h3>
                  <button
                    onClick={() => { setFormType('blog'); setEditingItem(null); }}
                    className="p-2 bg-rosegold/10 text-rosegold hover:bg-rosegold/20 rounded-xl text-xs font-bold"
                  >
                    + Write Post
                  </button>
                </div>

                {formType === 'blog' && (
                  <form onSubmit={handleBlogSubmit} encType="multipart/form-data" className="space-y-3 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase text-slate-600">Save Blog Post</h4>
                    <input name="title" required placeholder="Post Title" defaultValue={editingItem?.title || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Post Feature Image</label>
                      {editingItem?.image && (
                        <div className="relative w-16 h-16 rounded border mb-1">
                          <Image src={editingItem.image} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                      <input type="file" name="imageFile" accept="image/*" className="w-full p-2 text-sm border rounded bg-white text-slate-800" />
                      <input type="hidden" name="existingImage" defaultValue={editingItem?.image || ''} />
                    </div>

                    <textarea name="summary" required placeholder="Short summary summary (appears in listing)" defaultValue={editingItem?.summary || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <textarea name="content" required placeholder="Write markdown content here..." rows={8} defaultValue={editingItem?.content || ''} className="w-full p-2 text-sm border rounded bg-white font-mono" />
                    
                    <div className="border-t border-slate-200 pt-3 space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">Optional SEO Meta Overrides:</span>
                      <input name="seoTitle" placeholder="Meta Title override" defaultValue={editingItem?.seoTitle || ''} className="w-full p-2 text-xs border rounded bg-white" />
                      <input name="seoDescription" placeholder="Meta Description override" defaultValue={editingItem?.seoDescription || ''} className="w-full p-2 text-xs border rounded bg-white" />
                      <input name="seoKeywords" placeholder="Meta Keywords override" defaultValue={editingItem?.seoKeywords || ''} className="w-full p-2 text-xs border rounded bg-white" />
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button type="button" onClick={() => { setFormType(''); setEditingItem(null); }} className="text-xs text-slate-400 font-bold px-3 py-1">Cancel</button>
                      <button type="submit" disabled={isPending} className="text-xs bg-rosegold text-white font-bold px-4 py-1.5 rounded-lg shadow-sm">Save Post</button>
                    </div>
                  </form>
                )}

                <ul className="divide-y divide-slate-100">
                  {blogs.map((b) => (
                    <li key={b.id} className="py-3.5 flex justify-between items-start gap-4">
                      <div>
                        <span className="block font-semibold text-slate-800 text-sm">{b.title}</span>
                        <span className="text-[10px] text-slate-400">Slug: {b.slug}</span>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => { setEditingItem(b); setFormType('blog'); }} className="p-1 text-slate-400 hover:text-blue-600"><Edit3 className="w-4 h-4" /></button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete post: ${b.title}?`)) {
                              startTransition(async () => {
                                await deleteBlogPost(b.id)
                                setMessage('Blog post removed.')
                                router.refresh()
                              })
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Offers/Packages lists */}
              <div className="xl:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                  <h3 className="font-bold text-slate-800">Special Offers</h3>
                  <button
                    onClick={() => { setFormType('offer'); setEditingItem(null); }}
                    className="p-2 bg-rosegold/10 text-rosegold hover:bg-rosegold/20 rounded-xl text-xs font-bold"
                  >
                    + Add Offer
                  </button>
                </div>

                {formType === 'offer' && (
                  <form onSubmit={handleOfferSubmit} encType="multipart/form-data" className="space-y-3 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase text-slate-600">Save Special Offer</h4>
                    <input name="name" required placeholder="Offer Name" defaultValue={editingItem?.name || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <input name="discountPrice" required placeholder="Offer Price" defaultValue={editingItem?.discountPrice || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <input name="originalPrice" required placeholder="Original Price" defaultValue={editingItem?.originalPrice || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <input name="validUntil" required placeholder="Validity (e.g. Valid until June 30)" defaultValue={editingItem?.validUntil || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <textarea name="description" required placeholder="Offer details description" defaultValue={editingItem?.description || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Package Image File</label>
                      {editingItem?.image && (
                        <div className="relative w-16 h-16 rounded border mb-1">
                          <Image src={editingItem.image} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                      <input type="file" name="imageFile" accept="image/*" className="w-full p-2 text-sm border rounded bg-white" />
                      <input type="hidden" name="existingImage" defaultValue={editingItem?.image || ''} />
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button type="button" onClick={() => { setFormType(''); setEditingItem(null); }} className="text-xs text-slate-400 font-bold px-3 py-1">Cancel</button>
                      <button type="submit" disabled={isPending} className="text-xs bg-rosegold text-white font-bold px-4 py-1.5 rounded-lg shadow-sm">Save</button>
                    </div>
                  </form>
                )}

                <ul className="divide-y divide-slate-100">
                  {offers.map((o) => (
                    <li key={o.id} className="py-3 flex justify-between items-center">
                      <div>
                        <span className="block font-semibold text-slate-800 text-sm">{o.name}</span>
                        <span className="text-[10px] text-slate-500">{o.validUntil} • {o.discountPrice}</span>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => { setEditingItem(o); setFormType('offer'); }} className="p-1 text-slate-400 hover:text-blue-600"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete offer: ${o.name}?`)) {
                              startTransition(async () => {
                                await deleteOffer(o.id)
                                setMessage('Offer deleted.')
                                router.refresh()
                              })
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

          {/* 6. TESTIMONIALS & TEAM PANEL */}
          {activeTab === 'testimonials_team' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
              
              {/* Testimonials */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                  <h3 className="font-bold text-slate-800">Testimonials (Reviews)</h3>
                  <button
                    onClick={() => { setFormType('testimonial'); setEditingItem(null); }}
                    className="p-2 bg-rosegold/10 text-rosegold hover:bg-rosegold/20 rounded-xl text-xs font-bold"
                  >
                    + Add Review
                  </button>
                </div>

                {formType === 'testimonial' && (
                  <form onSubmit={handleTestimonialSubmit} encType="multipart/form-data" className="space-y-3 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase text-slate-600">Save Review Details</h4>
                    <input name="name" required placeholder="Customer Name" defaultValue={editingItem?.name || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <input name="role" required placeholder="Customer Role" defaultValue={editingItem?.role || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <textarea name="content" required placeholder="Review Content" defaultValue={editingItem?.content || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <select name="rating" defaultValue={editingItem?.rating || '5'} className="w-full p-2 text-sm border rounded bg-white">
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                    </select>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Customer Avatar File</label>
                      {editingItem?.avatar && (
                        <div className="relative w-10 h-10 rounded-full border mb-1">
                          <Image src={editingItem.avatar} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                      <input type="file" name="avatarFile" accept="image/*" className="w-full p-2 text-sm border rounded bg-white" />
                      <input type="hidden" name="existingAvatar" defaultValue={editingItem?.avatar || ''} />
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button type="button" onClick={() => { setFormType(''); setEditingItem(null); }} className="text-xs text-slate-400 font-bold px-3 py-1">Cancel</button>
                      <button type="submit" disabled={isPending} className="text-xs bg-rosegold text-white font-bold px-4 py-1.5 rounded-lg shadow-sm">Save</button>
                    </div>
                  </form>
                )}

                <ul className="divide-y divide-slate-100">
                  {testimonials.map((t) => (
                    <li key={t.id} className="py-3 flex justify-between items-start gap-4">
                      <div>
                        <span className="block font-semibold text-slate-800 text-sm">{t.name} ({t.role})</span>
                        <span className="text-[10px] text-slate-500 line-clamp-1 italic">&ldquo;{t.content}&rdquo;</span>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Delete testimonial from ${t.name}?`)) {
                            startTransition(async () => {
                              await deleteTestimonial(t.id)
                              setMessage('Testimonial deleted.')
                              router.refresh()
                            })
                          }
                        }}
                        className="p-1 text-slate-400 hover:text-red-600 mt-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Team Members */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
                  <h3 className="font-bold text-slate-800">Styling Expert Team</h3>
                  <button
                    onClick={() => { setFormType('team'); setEditingItem(null); }}
                    className="p-2 bg-rosegold/10 text-rosegold hover:bg-rosegold/20 rounded-xl text-xs font-bold"
                  >
                    + Add Member
                  </button>
                </div>

                {formType === 'team' && (
                  <form onSubmit={handleTeamSubmit} encType="multipart/form-data" className="space-y-3 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h4 className="text-xs font-bold uppercase text-slate-600">Save Team Member</h4>
                    <input name="name" required placeholder="Full Name" defaultValue={editingItem?.name || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <input name="designation" required placeholder="Designation" defaultValue={editingItem?.designation || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <input name="specialty" required placeholder="Specialty" defaultValue={editingItem?.specialty || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    <textarea name="bio" required placeholder="Biography context" defaultValue={editingItem?.bio || ''} className="w-full p-2 text-sm border rounded bg-white" />
                    
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Member Portrait File</label>
                      {editingItem?.image && (
                        <div className="relative w-16 h-16 rounded border mb-1">
                          <Image src={editingItem.image} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                      <input type="file" name="imageFile" accept="image/*" className="w-full p-2 text-sm border rounded bg-white" />
                      <input type="hidden" name="existingImage" defaultValue={editingItem?.image || ''} />
                    </div>

                    <div className="flex gap-2 justify-end pt-2">
                      <button type="button" onClick={() => { setFormType(''); setEditingItem(null); }} className="text-xs text-slate-400 font-bold px-3 py-1">Cancel</button>
                      <button type="submit" disabled={isPending} className="text-xs bg-rosegold text-white font-bold px-4 py-1.5 rounded-lg shadow-sm">Save</button>
                    </div>
                  </form>
                )}

                <ul className="divide-y divide-slate-100">
                  {team.map((m) => (
                    <li key={m.id} className="py-3 flex justify-between items-center">
                      <div>
                        <span className="block font-semibold text-slate-800 text-sm">{m.name}</span>
                        <span className="text-[10px] text-slate-500">{m.designation} • {m.specialty}</span>
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => { setEditingItem(m); setFormType('team'); }} className="p-1 text-slate-400 hover:text-blue-600"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete team member: ${m.name}?`)) {
                              startTransition(async () => {
                                await deleteTeamMember(m.id)
                                setMessage('Team member removed.')
                                router.refresh()
                              })
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

          {/* 7. SEO & GENERAL SETTINGS PANEL */}
          {activeTab === 'seo_settings' && (
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              
              {/* Dynamic Page SEO */}
              <div className="xl:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                <h3 className="font-bold text-slate-800 pb-3 border-b border-slate-100">Dynamic Page SEO Configuration</h3>
                
                <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-1">
                  {seo.map((page) => (
                    <form
                      key={page.id}
                      onSubmit={(e) => handleSeoSubmit(e, page.id)}
                      className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded uppercase tracking-wider">
                          Route: {page.pagePath}
                        </span>
                        <button type="submit" disabled={isPending} className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1 rounded flex items-center gap-1 shadow-sm">
                          <Check className="w-3.5 h-3.5" />
                          <span>Update SEO</span>
                        </button>
                      </div>

                      <input type="hidden" name="pagePath" defaultValue={page.pagePath} />

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Meta HTML Title</label>
                        <input name="title" defaultValue={page.title} className="w-full p-2 text-xs border rounded bg-white text-slate-800 focus:outline-none" />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Meta Description</label>
                        <textarea name="description" rows={2} defaultValue={page.description} className="w-full p-2 text-xs border rounded bg-white text-slate-800 focus:outline-none" />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Meta Keywords (comma separated)</label>
                        <input name="keywords" defaultValue={page.keywords} className="w-full p-2 text-xs border rounded bg-white text-slate-800 focus:outline-none" />
                      </div>
                    </form>
                  ))}
                </div>
              </div>

              {/* General Settings */}
              <div className="xl:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-slate-800 pb-3 border-b border-slate-100 mb-6">General Salon Contacts & Info</h3>
                
                <form onSubmit={handleSettingSubmit} encType="multipart/form-data" className="space-y-4">
                  {/* Hero Background Image */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 mb-4">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Hero Background Image
                    </label>
                    <p className="text-[10px] text-slate-500 -mt-1 leading-normal">
                      This image is displayed inside the main circular frame on the homepage hero section.
                    </p>
                    {getSetting('heroBgImage') && (
                      <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-white">
                        <Image
                          src={getSetting('heroBgImage')}
                          alt="Hero Background Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      name="heroBgImageFile"
                      accept="image/*"
                      className="w-full p-1.5 text-xs border rounded bg-white text-slate-800"
                    />
                    <input
                      type="hidden"
                      name="existingHeroBgImage"
                      defaultValue={getSetting('heroBgImage')}
                    />
                  </div>
                  {/* Popular Services Section Info */}
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 mb-4">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Popular Services Section Texts
                    </label>
                    <p className="text-[10px] text-slate-500 -mt-1 leading-normal">
                      Customize the heading, subheading, and description of the popular services section on the home page.
                    </p>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Section Subheading</label>
                      <input name="popularServicesSubheading" defaultValue={getSetting('popularServicesSubheading') || 'Our Signature Treatments'} className="w-full p-2 text-xs border rounded bg-white text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Section Heading</label>
                      <input name="popularServicesHeading" defaultValue={getSetting('popularServicesHeading') || 'Popular Services'} className="w-full p-2 text-xs border rounded bg-white text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Section Description</label>
                      <textarea name="popularServicesDescription" rows={2} defaultValue={getSetting('popularServicesDescription') || 'Discover client favorites that deliver instant radiant transformations.'} className="w-full p-2 text-xs border rounded bg-white text-slate-800" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Salon Contact Phone</label>
                    <input name="contactPhone" defaultValue={getSetting('contactPhone')} className="w-full p-2 text-sm border rounded bg-white" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">WhatsApp Booking ID</label>
                    <input name="contactWhatsapp" defaultValue={getSetting('contactWhatsapp')} className="w-full p-2 text-sm border rounded bg-white" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Customer Support Email</label>
                    <input name="contactEmail" defaultValue={getSetting('contactEmail')} className="w-full p-2 text-sm border rounded bg-white" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Physical Address</label>
                    <textarea name="locationAddress" rows={2} defaultValue={getSetting('locationAddress')} className="w-full p-2 text-sm border rounded bg-white" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Facebook Fan Page URL</label>
                    <input name="facebookUrl" defaultValue={getSetting('facebookUrl')} className="w-full p-2 text-sm border rounded bg-white" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Instagram URL</label>
                    <input name="instagramUrl" defaultValue={getSetting('instagramUrl')} className="w-full p-2 text-sm border rounded bg-white" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">TikTok Channel URL</label>
                    <input name="tiktokUrl" defaultValue={getSetting('tiktokUrl')} className="w-full p-2 text-sm border rounded bg-white" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">Google Maps Embed URL</label>
                    <textarea name="mapIframe" rows={3} defaultValue={getSetting('mapIframe')} className="w-full p-2 text-xs border rounded bg-white font-mono" />
                  </div>

                  <button type="submit" disabled={isPending} className="btn-premium btn-rosegold w-full text-sm py-2.5">
                    {isPending ? 'Saving Settings...' : 'Save General Config'}
                  </button>
                </form>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  )
}
