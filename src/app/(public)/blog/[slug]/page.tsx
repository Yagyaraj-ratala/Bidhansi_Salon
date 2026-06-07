import prisma from '@/lib/db'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Calendar, ArrowLeft, Clock, User } from 'lucide-react'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug }
  })

  if (!post) {
    return {
      title: 'Post Not Found | Bidhanshi Unisex Salon'
    }
  }

  return {
    title: post.seoTitle || `${post.title} | Bidhanshi Unisex Salon`,
    description: post.seoDescription || post.summary,
    keywords: post.seoKeywords || 'Bidhanshi Unisex Salon, beauty tips Nepalgunj',
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.summary,
      images: [{ url: post.image }],
      type: 'article'
    }
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug }
  })

  if (!post) {
    notFound()
  }

  // Calculate reading time
  const wordCount = post.content.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / 200)

  return (
    <article className="py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-rosegold hover:text-salonDark transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blogs</span>
        </Link>

        {/* Article Header */}
        <header className="flex flex-col gap-4 mb-10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gold font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readingTime} min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              Bidhanshi Experts
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-salonDark leading-[1.15] tracking-tight">
            {post.title}
          </h1>

          <p className="text-lg text-gray-600 font-medium leading-relaxed border-l-4 border-rosegold/40 pl-4 mt-2">
            {post.summary}
          </p>
        </header>

        {/* Feature Image */}
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-gold/10 luxury-shadow mb-10 bg-blush">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-pink max-w-none text-salonDark leading-relaxed space-y-6 text-base sm:text-lg">
          {post.content.split('\n\n').map((paragraph, index) => {
            // Check if paragraph starts with heading markdown
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-2xl font-serif font-bold text-salonDark mt-8 mb-4 border-b border-rosegold/10 pb-2">
                  {paragraph.replace('### ', '')}
                </h3>
              )
            }
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="text-3xl font-serif font-bold text-salonDark mt-10 mb-5">
                  {paragraph.replace('## ', '')}
                </h2>
              )
            }
            // Check if it is a list
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={index} className="list-disc list-inside space-y-2.5 my-4 pl-4 text-gray-700">
                  {paragraph.split('\n').map((li, idx) => (
                    <li key={idx} className="marker:text-gold">{li.replace('- ', '')}</li>
                  ))}
                </ul>
              )
            }
            return (
              <p key={index} className="text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            )
          })}
        </div>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-rosegold/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-serif font-bold text-salonDark">Bidhanshi Unisex Salon</h4>
            <p className="text-xs text-gray-500 font-semibold mt-0.5">Setubk chowk, Nepalgunj 21900</p>
          </div>
          
          <Link
            href="/book"
            className="btn-premium btn-rosegold text-sm py-2.5 px-6 self-start sm:self-auto"
          >
            Schedule a Free Consultation
          </Link>
        </div>

      </div>
    </article>
  )
}
