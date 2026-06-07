import prisma from './db'

export async function getSeoMetadata(pagePath: string) {
  try {
    const seo = await prisma.seoData.findUnique({
      where: { pagePath }
    })
    if (seo) {
      return {
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        openGraph: {
          title: seo.title,
          description: seo.description,
          url: `https://bidhanshisalon.com${pagePath}`,
          siteName: 'Bidhanshi Unisex Salon',
          images: [{ url: '/images/logo.jpg' }],
          type: 'website'
        }
      }
    }
  } catch (error) {
    console.error('Failed to query SEO metadata:', error)
  }

  // Default Fallbacks
  return {
    title: 'Bidhanshi Unisex Salon | Best Salon in Nepalgunj',
    description: 'Experience premium hair styling, professional makeup, advanced slimming treatments, and beauty courses at Bidhanshi Unisex Salon - the top-rated beauty parlour in Nepalgunj.',
    keywords: 'Bidhanshi Unisex Salon, Best salon in Nepalgunj, Unisex salon in Nepalgunj, Beauty parlour in Nepalgunj',
    openGraph: {
      title: 'Bidhanshi Unisex Salon | Best Salon in Nepalgunj',
      description: 'Experience premium hair styling, professional makeup, advanced slimming treatments, and beauty courses at Bidhanshi Unisex Salon in Nepalgunj.',
      url: `https://bidhanshisalon.com${pagePath}`,
      siteName: 'Bidhanshi Unisex Salon',
      images: [{ url: '/images/logo.jpg' }],
      type: 'website'
    }
  }
}
