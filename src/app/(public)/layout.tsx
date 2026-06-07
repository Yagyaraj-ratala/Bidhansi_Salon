import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    'name': 'Bidhanshi Unisex Salon',
    'image': 'https://bidhanshisalon.com/images/logo.jpg',
    '@id': 'https://bidhanshisalon.com/#salon',
    'url': 'https://bidhanshisalon.com',
    'telephone': '+977-9858022442',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Setubk chowk',
      'addressLocality': 'Nepalgunj',
      'postalCode': '21900',
      'addressCountry': 'NP'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': '28.0598717',
      'longitude': '81.6163351'
    },
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      'opens': '09:00',
      'closes': '19:30'
    },
    'sameAs': [
      'https://facebook.com/bidhanshisalon',
      'https://instagram.com/bidhanshisalon',
      'https://tiktok.com/@bidhanshisalon'
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-grow pt-20 sm:pt-24">{children}</main>
      <Footer />
    </>
  )
}
