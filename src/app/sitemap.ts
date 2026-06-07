import { MetadataRoute } from 'next'
import prisma from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bidhanshisalon.com'

  const staticPaths = [
    '',
    '/about',
    '/services',
    '/slimming',
    '/academy',
    '/gallery',
    '/pricing',
    '/offers',
    '/blog',
    '/team',
    '/contact',
    '/book'
  ]

  const staticUrls = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1.0 : 0.8,
  }))

  let blogUrls: MetadataRoute.Sitemap = []
  try {
    const posts = await prisma.blogPost.findMany({
      select: { slug: true, createdAt: true }
    })
    blogUrls = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }))
  } catch (error) {
    console.error('Failed to build dynamic sitemap for blogs:', error)
  }

  return [...staticUrls, ...blogUrls]
}
