import prisma from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ChevronRight } from 'lucide-react'
import { getSeoMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return await getSeoMetadata('/blog')
}

export const revalidate = 3600

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs font-bold tracking-widest text-rosegold uppercase">Skincare & Hair Care Guides</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-salonDark">Latest Blogs & News</h1>
          <div className="ornament-line"><div className="ornament-diamond" /></div>
          <p className="text-sm text-gray-500">Read professional advice, trend alerts, and wellness tips from our expert stylists.</p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="luxury-card bg-white overflow-hidden shadow-sm flex flex-col justify-between h-full">
              <div>
                <div className="relative h-48 w-full bg-blush">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-1 text-xs text-gold font-bold uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    <span>
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-salonDark mt-2 hover:text-rosegold transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3 leading-relaxed">{post.summary}</p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-rosegold hover:text-salonDark transition-colors"
                >
                  <span>Read Article</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}

          {posts.length === 0 && (
            <p className="text-gray-500 italic py-12 text-center col-span-full">No blog posts found. Check back soon!</p>
          )}
        </div>

      </div>
    </div>
  )
}
