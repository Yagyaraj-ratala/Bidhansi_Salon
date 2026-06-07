'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import prisma from '@/lib/db'

// Admin Password validation helper
async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')?.value
  return session === 'authenticated'
}

// ----------------------------------------------------
// LOCAL FILE UPLOADER HELPER
// ----------------------------------------------------
async function handleFileUpload(file: any, fallbackUrl: string): Promise<string> {
  if (!file || typeof file === 'string' || !file.name || file.size === 0) {
    return fallbackUrl || '/images/placeholder.jpg'
  }

  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Sanitize filename
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.]/g, '_')
    const filename = `${Date.now()}_${sanitizedName}`
    
    // Directory paths
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    mkdirSync(uploadDir, { recursive: true })
    
    const filepath = join(uploadDir, filename)
    writeFileSync(filepath, buffer)

    return `/uploads/${filename}`
  } catch (error) {
    console.error('File upload failed:', error)
    return fallbackUrl || '/images/placeholder.jpg'
  }
}

// Admin Auth actions
export async function loginAdmin(password: string): Promise<{ success: boolean; error?: string }> {
  const correctPassword = process.env.ADMIN_PASSWORD || 'admin'
  if (password === correctPassword) {
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    })
    return { success: true }
  }
  return { success: false, error: 'Incorrect password' }
}

export async function logoutAdmin(): Promise<{ success: boolean }> {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
  return { success: true }
}

export async function checkAdminAuth(): Promise<boolean> {
  return await checkAuth()
}

// ----------------------------------------------------
// APPOINTMENTS
// ----------------------------------------------------
export async function createAppointment(data: {
  name: string
  phone: string
  serviceCategory: string
  service: string
  date: string
  time: string
  message?: string
}) {
  try {
    const appointment = await prisma.appointment.create({
      data: {
        name: data.name,
        phone: data.phone,
        serviceCategory: data.serviceCategory,
        service: data.service,
        date: data.date,
        time: data.time,
        message: data.message || '',
        status: 'Pending'
      }
    })
    revalidatePath('/admin/dashboard')
    return { success: true, appointment }
  } catch (error: any) {
    console.error('Failed to create appointment:', error)
    return { success: false, error: error.message }
  }
}

export async function updateAppointmentStatus(id: string, status: string) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    await prisma.appointment.update({
      where: { id },
      data: { status }
    })
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function deleteAppointment(id: string) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    await prisma.appointment.delete({
      where: { id }
    })
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

// ----------------------------------------------------
// SERVICES
// ----------------------------------------------------
export async function saveService(formData: FormData) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    const id = formData.get('id') as string || null
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = formData.get('price') as string
    const duration = formData.get('duration') as string
    const category = formData.get('category') as string
    const subCategory = formData.get('subCategory') as string
    const isPopular = formData.get('isPopular') === 'true'

    const imageFile = formData.get('imageFile')
    const existingImage = formData.get('existingImage') as string
    const imagePath = await handleFileUpload(imageFile, existingImage)

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    
    const serviceData = {
      name,
      slug,
      description,
      price,
      duration,
      category,
      subCategory,
      image: imagePath,
      isPopular
    }

    if (id) {
      await prisma.service.update({
        where: { id },
        data: serviceData
      })
    } else {
      await prisma.service.create({
        data: serviceData
      })
    }

    revalidatePath('/services')
    revalidatePath('/pricing')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function deleteService(id: string) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    await prisma.service.delete({ where: { id } })
    revalidatePath('/services')
    revalidatePath('/pricing')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

// ----------------------------------------------------
// SLIMMING PACKAGES
// ----------------------------------------------------
export async function saveSlimmingPackage(formData: FormData) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    const id = formData.get('id') as string || null
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const price = formData.get('price') as string
    const duration = formData.get('duration') as string
    const details = formData.get('details') as string

    const imageFile = formData.get('imageFile')
    const existingImage = formData.get('existingImage') as string
    const imagePath = await handleFileUpload(imageFile, existingImage)

    const pkgData = {
      name,
      description,
      price,
      duration,
      details,
      image: imagePath
    }

    if (id) {
      await prisma.slimmingPackage.update({
        where: { id },
        data: pkgData
      })
    } else {
      await prisma.slimmingPackage.create({
        data: pkgData
      })
    }

    revalidatePath('/slimming')
    revalidatePath('/pricing')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function deleteSlimmingPackage(id: string) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    await prisma.slimmingPackage.delete({ where: { id } })
    revalidatePath('/slimming')
    revalidatePath('/pricing')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

// ----------------------------------------------------
// ACADEMY COURSES
// ----------------------------------------------------
export async function saveAcademyCourse(formData: FormData) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    const id = formData.get('id') as string || null
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const duration = formData.get('duration') as string
    const price = formData.get('price') as string
    const syllabus = formData.get('syllabus') as string
    const certificate = formData.get('certificate') as string

    const imageFile = formData.get('imageFile')
    const existingImage = formData.get('existingImage') as string
    const imagePath = await handleFileUpload(imageFile, existingImage)

    const courseData = {
      name,
      description,
      duration,
      price,
      syllabus,
      certificate,
      image: imagePath
    }

    if (id) {
      await prisma.academyCourse.update({
        where: { id },
        data: courseData
      })
    } else {
      await prisma.academyCourse.create({
        data: courseData
      })
    }

    revalidatePath('/academy')
    revalidatePath('/pricing')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function deleteAcademyCourse(id: string) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    await prisma.academyCourse.delete({ where: { id } })
    revalidatePath('/academy')
    revalidatePath('/pricing')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

// ----------------------------------------------------
// GALLERY IMAGES
// ----------------------------------------------------
export async function saveGalleryImage(formData: FormData) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    const id = formData.get('id') as string || null
    const caption = formData.get('caption') as string
    const category = formData.get('category') as string

    const imageFile = formData.get('imageFile')
    const existingImage = formData.get('existingImage') as string
    const imagePath = await handleFileUpload(imageFile, existingImage)

    const galleryData = {
      url: imagePath,
      caption,
      category
    }

    if (id) {
      await prisma.galleryImage.update({
        where: { id },
        data: galleryData
      })
    } else {
      await prisma.galleryImage.create({
        data: galleryData
      })
    }

    revalidatePath('/gallery')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function deleteGalleryImage(id: string) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    await prisma.galleryImage.delete({ where: { id } })
    revalidatePath('/gallery')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

// ----------------------------------------------------
// BEFORE / AFTER RESULTS
// ----------------------------------------------------
export async function saveBeforeAfter(formData: FormData) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    const id = formData.get('id') as string || null
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    const beforeImageFile = formData.get('beforeImageFile')
    const existingBeforeImage = formData.get('existingBeforeImage') as string
    const beforeImagePath = await handleFileUpload(beforeImageFile, existingBeforeImage)

    const afterImageFile = formData.get('afterImageFile')
    const existingAfterImage = formData.get('existingAfterImage') as string
    const afterImagePath = await handleFileUpload(afterImageFile, existingAfterImage)

    const baData = {
      title,
      beforeImage: beforeImagePath,
      afterImage: afterImagePath,
      description
    }

    if (id) {
      await prisma.beforeAfter.update({
        where: { id },
        data: baData
      })
    } else {
      await prisma.beforeAfter.create({
        data: baData
      })
    }

    revalidatePath('/')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function deleteBeforeAfter(id: string) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    await prisma.beforeAfter.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

// ----------------------------------------------------
// BLOG POSTS
// ----------------------------------------------------
export async function saveBlogPost(formData: FormData) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    const id = formData.get('id') as string || null
    const title = formData.get('title') as string
    const summary = formData.get('summary') as string
    const content = formData.get('content') as string
    const seoTitle = formData.get('seoTitle') as string
    const seoDescription = formData.get('seoDescription') as string
    const seoKeywords = formData.get('seoKeywords') as string

    const imageFile = formData.get('imageFile')
    const existingImage = formData.get('existingImage') as string
    const imagePath = await handleFileUpload(imageFile, existingImage)

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    
    const blogData = {
      title,
      slug,
      summary,
      content,
      image: imagePath,
      seoTitle: seoTitle || null,
      seoDescription: seoDescription || null,
      seoKeywords: seoKeywords || null
    }

    if (id) {
      await prisma.blogPost.update({
        where: { id },
        data: blogData
      })
    } else {
      await prisma.blogPost.create({
        data: blogData
      })
    }

    revalidatePath('/blog')
    revalidatePath(`/blog/${slug}`)
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function deleteBlogPost(id: string) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    const post = await prisma.blogPost.findUnique({ where: { id } })
    await prisma.blogPost.delete({ where: { id } })
    revalidatePath('/blog')
    if (post) revalidatePath(`/blog/${post.slug}`)
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

// ----------------------------------------------------
// TESTIMONIALS
// ----------------------------------------------------
export async function saveTestimonial(formData: FormData) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    const id = formData.get('id') as string || null
    const name = formData.get('name') as string
    const role = formData.get('role') as string
    const content = formData.get('content') as string
    const rating = parseInt(formData.get('rating') as string) || 5

    const avatarFile = formData.get('avatarFile')
    const existingAvatar = formData.get('existingAvatar') as string
    const avatarPath = await handleFileUpload(avatarFile, existingAvatar)

    const testimonialData = {
      name,
      role,
      content,
      rating,
      avatar: avatarPath
    }

    if (id) {
      await prisma.testimonial.update({
        where: { id },
        data: testimonialData
      })
    } else {
      await prisma.testimonial.create({
        data: testimonialData
      })
    }

    revalidatePath('/')
    revalidatePath('/testimonials')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function deleteTestimonial(id: string) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    await prisma.testimonial.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/testimonials')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

// ----------------------------------------------------
// TEAM MEMBERS
// ----------------------------------------------------
export async function saveTeamMember(formData: FormData) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    const id = formData.get('id') as string || null
    const name = formData.get('name') as string
    const designation = formData.get('designation') as string
    const specialty = formData.get('specialty') as string
    const bio = formData.get('bio') as string

    const imageFile = formData.get('imageFile')
    const existingImage = formData.get('existingImage') as string
    const imagePath = await handleFileUpload(imageFile, existingImage)

    const memberData = {
      name,
      designation,
      specialty,
      bio,
      image: imagePath
    }

    if (id) {
      await prisma.teamMember.update({
        where: { id },
        data: memberData
      })
    } else {
      await prisma.teamMember.create({
        data: memberData
      })
    }

    revalidatePath('/')
    revalidatePath('/team')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function deleteTeamMember(id: string) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    await prisma.teamMember.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/team')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

// ----------------------------------------------------
// OFFERS / PACKAGES
// ----------------------------------------------------
export async function saveOffer(formData: FormData) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    const id = formData.get('id') as string || null
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const discountPrice = formData.get('discountPrice') as string
    const originalPrice = formData.get('originalPrice') as string
    const validUntil = formData.get('validUntil') as string

    const imageFile = formData.get('imageFile')
    const existingImage = formData.get('existingImage') as string
    const imagePath = await handleFileUpload(imageFile, existingImage)

    const offerData = {
      name,
      description,
      discountPrice,
      originalPrice,
      validUntil,
      image: imagePath
    }

    if (id) {
      await prisma.offer.update({
        where: { id },
        data: offerData
      })
    } else {
      await prisma.offer.create({
        data: offerData
      })
    }

    revalidatePath('/offers')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function deleteOffer(id: string) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    await prisma.offer.delete({ where: { id } })
    revalidatePath('/offers')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

// ----------------------------------------------------
// SEO META DATA
// ----------------------------------------------------
export async function saveSeoData(id: string, data: {
  pagePath: string
  title: string
  description: string
  keywords: string
}) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    await prisma.seoData.update({
      where: { id },
      data
    })
    revalidatePath('/')
    revalidatePath('/about')
    revalidatePath('/services')
    revalidatePath('/slimming')
    revalidatePath('/academy')
    revalidatePath('/gallery')
    revalidatePath('/pricing')
    revalidatePath('/offers')
    revalidatePath('/blog')
    revalidatePath('/team')
    revalidatePath('/contact')
    revalidatePath('/book')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

// ----------------------------------------------------
// GENERAL SETTINGS & LOGO
// ----------------------------------------------------
export async function saveSetting(key: string, value: string) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    await prisma.settings.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    })
    revalidatePath('/')
    revalidatePath('/contact')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function saveGeneralSettings(formData: FormData) {
  if (!(await checkAuth())) throw new Error('Unauthorized')
  try {
    const fields = Array.from(formData.entries())
    
    // 1. Process files first, specifically heroBgImageFile
    const heroBgImageFile = formData.get('heroBgImageFile')
    const existingHeroBgImage = formData.get('existingHeroBgImage') as string || ''
    
    if (heroBgImageFile && (heroBgImageFile as any).size > 0) {
      const uploadedUrl = await handleFileUpload(heroBgImageFile, existingHeroBgImage)
      await prisma.settings.upsert({
        where: { key: 'heroBgImage' },
        update: { value: uploadedUrl },
        create: { key: 'heroBgImage', value: uploadedUrl }
      })
    }
    
    // 2. Process other fields
    for (const [key, value] of fields) {
      // Skip the file and existing image keys
      if (key === 'heroBgImageFile' || key === 'existingHeroBgImage') {
        continue
      }
      
      if (typeof value === 'string') {
        await prisma.settings.upsert({
          where: { key },
          update: { value },
          create: { key, value }
        })
      }
    }
    
    revalidatePath('/')
    revalidatePath('/contact')
    revalidatePath('/admin/dashboard')
    return { success: true }
  } catch (error) {
    console.error('Failed to save general settings:', error)
    return { success: false }
  }
}
