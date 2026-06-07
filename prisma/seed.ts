import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Clear existing data
  await prisma.service.deleteMany()
  await prisma.slimmingPackage.deleteMany()
  await prisma.academyCourse.deleteMany()
  await prisma.galleryImage.deleteMany()
  await prisma.beforeAfter.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.teamMember.deleteMany()
  await prisma.offer.deleteMany()
  await prisma.seoData.deleteMany()
  await prisma.settings.deleteMany()

  // 1. Seed SEO Data for all pages
  const seoPages = [
    { pagePath: '/', title: 'Bidhanshi Unisex Salon | Best Salon in Nepalgunj', description: 'Experience premium hair styling, professional makeup, advanced slimming treatments, and beauty courses at Bidhanshi Unisex Salon - the top-rated beauty parlour in Nepalgunj.', keywords: 'Bidhanshi Unisex Salon, Best salon in Nepalgunj, Unisex salon in Nepalgunj, Beauty parlour in Nepalgunj, Beauty parlour near me' },
    { pagePath: '/about', title: 'About Us | Bidhanshi Unisex Salon Nepalgunj', description: 'Learn about Bidhanshi Unisex Salon, our luxury facilities, mission, values, and our expert team of hair and beauty professionals in Nepalgunj.', keywords: 'About Bidhanshi, Best beauty team Nepalgunj, Salon near me' },
    { pagePath: '/services', title: 'Salon & Beauty Services | Bidhanshi Unisex Salon', description: 'Explore our range of premium hair services (keratin, hair spa, rebonding, hair color) and beauty treatments (facials, bridal makeup, nail care) in Nepalgunj.', keywords: 'Bridal makeup in Nepalgunj, Hair spa in Nepalgunj, Hair color Nepalgunj, Keratin treatment' },
    { pagePath: '/slimming', title: 'Slimming Centre & Weight Loss | Bidhanshi Unisex Salon', description: 'Achieve your body goals with advanced fat reduction, weight loss treatments, skin tightening, and body contouring at the best slimming centre in Nepalgunj.', keywords: 'Slimming centre in Nepalgunj, Weight loss treatment Nepalgunj, Fat reduction, Body shaping' },
    { pagePath: '/academy', title: 'Beauty Academy & Beautician Training | Bidhanshi Nepalgunj', description: 'Start your career in the beauty industry. Bidhanshi Academy offers beautician training, makeup courses, hair styling, and salon management certificate courses.', keywords: 'Beauty academy in Nepalgunj, Beauty training in Nepal, Beautician training, Makeup course' },
    { pagePath: '/gallery', title: 'Gallery & Portfolio | Bidhanshi Unisex Salon', description: 'See our work: Stunning bridal makeups, elegant haircuts, before-after transformations, and our modern luxury salon interior in Nepalgunj.', keywords: 'Bridal makeup photos, Hair transformation gallery, Salon portfolio Nepalgunj' },
    { pagePath: '/pricing', title: 'Services Price List | Bidhanshi Unisex Salon', description: 'View transparent, premium pricing for hair styling, facials, bridal packages, slimming treatments, and academy course fees in Nepalgunj.', keywords: 'Bidhanshi salon pricing, Nepalgunj beauty parlour price list' },
    { pagePath: '/offers', title: 'Offers & Special Packages | Bidhanshi Unisex Salon', description: 'Check out our latest seasonal packages, bridal beauty bundles, and promotional discounts at Bidhanshi Unisex Salon Nepalgunj.', keywords: 'Salon offers Nepalgunj, Bridal makeup packages' },
    { pagePath: '/blog', title: 'Beauty & Hair Care Blog | Bidhanshi Unisex Salon', description: 'Read helpful tips and guides from our expert stylists about hair maintenance, skincare routines, bridal preparation, and health tips.', keywords: 'Skincare tips Nepal, Hair care blog, Beauty tips' },
    { pagePath: '/team', title: 'Meet Our Experts | Bidhanshi Unisex Salon Team', description: 'Meet the talented hair stylists, aesthetic therapists, makeup artists, and training instructors at Bidhanshi Unisex Salon Nepalgunj.', keywords: 'Stylists in Nepalgunj, Professional makeup artists Nepalgunj' },
    { pagePath: '/contact', title: 'Contact Us & Booking | Bidhanshi Unisex Salon Nepalgunj', description: 'Book an appointment, contact our customer desk, find our location on Google Map, or message us on WhatsApp directly.', keywords: 'Contact Bidhanshi, Salon location Nepalgunj, Book appointment salon' },
    { pagePath: '/book', title: 'Book an Appointment | Bidhanshi Unisex Salon', description: 'Schedule your hair styling, bridal makeup, or slimming session online. Choose your services, select a time slot, and get instant booking confirmations.', keywords: 'Book online salon Nepalgunj, Online parlour booking' }
  ]

  for (const page of seoPages) {
    await prisma.seoData.create({ data: page })
  }

  // 2. Seed Services
  const services = [
    // Salon Services
    { name: 'Luxury Haircut & Styling', slug: 'luxury-haircut', description: 'Signature haircut, shampoo, conditioning, and a luxury blowout customized to your face shape.', price: 'Rs. 1,200', duration: '45 mins', category: 'salon', subCategory: 'Haircut', isPopular: true, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop' },
    { name: 'Intense Nourishing Hair Spa', slug: 'hair-spa', description: 'Deep conditioning spa treatment using premium serums to restore moisture, shine, and hair health.', price: 'Rs. 2,500', duration: '60 mins', category: 'salon', subCategory: 'Hair spa', isPopular: true, image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop' },
    { name: 'Balayage & Hair Color', slug: 'hair-color', description: 'Premium global coloring or hand-painted balayage accents using ammonia-free luxury colors.', price: 'Rs. 6,500', duration: '120 mins', category: 'salon', subCategory: 'Hair color', isPopular: false, image: 'https://images.unsplash.com/photo-1605497746444-05db4db5976b?q=80&w=600&auto=format&fit=crop' },
    { name: 'Premium Keratin Treatment', slug: 'keratin', description: 'Frizz-free, silky, and smooth hair restoration treatment that lasts up to 4-5 months.', price: 'Rs. 8,000', duration: '150 mins', category: 'salon', subCategory: 'Keratin', isPopular: true, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop' },
    { name: 'Ultra Smoothening', slug: 'smoothening', description: 'Chemical treatment to straighten curly or wavy hair, adding absolute shine and a soft structure.', price: 'Rs. 7,500', duration: '180 mins', category: 'salon', subCategory: 'Smoothening', isPopular: false, image: 'https://images.unsplash.com/photo-1595859702765-3c8507553963?q=80&w=600&auto=format&fit=crop' },
    { name: 'Permanent Rebonding', slug: 'rebonding', description: 'Advanced rebonding process to achieve perfectly straight, sleek, and manageable hair.', price: 'Rs. 9,000', duration: '200 mins', category: 'salon', subCategory: 'Rebonding', isPopular: false, image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=600&auto=format&fit=crop' },
    { name: 'Olaplex Bond Repair Treatment', slug: 'hair-treatment', description: 'Scientific bond-building treatment to repair extremely damaged, bleached, or dry hair.', price: 'Rs. 4,500', duration: '60 mins', category: 'salon', subCategory: 'Hair treatment', isPopular: false, image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop' },

    // Beauty Services
    { name: 'HydraFacial Glow Treatment', slug: 'hydrafacial', description: 'Advanced multi-step skin resurfacing treatment that cleanses, exfoliates, and hydrates.', price: 'Rs. 5,500', duration: '75 mins', category: 'beauty', subCategory: 'Facial', isPopular: true, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop' },
    { name: 'Gold Radiant Cleanup', slug: 'cleanup', description: 'Instantly brightens skin, removes tan, and extracts blackheads using pure gold dust scrub and pack.', price: 'Rs. 1,800', duration: '40 mins', category: 'beauty', subCategory: 'Cleanup', isPopular: false, image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=600&auto=format&fit=crop' },
    { name: 'Organic Full Body Waxing', slug: 'waxing', description: 'Gentle waxing using premium organic honey-wax to minimize pain and prevent skin rashes.', price: 'Rs. 2,200', duration: '60 mins', category: 'beauty', subCategory: 'Waxing', isPopular: false, image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop' },
    { name: 'Royal HD Bridal Makeup', slug: 'bridal-makeup', description: 'HD makeup by top makeup artists, including hair setting, saree draping, lash extensions, and flowers.', price: 'Rs. 18,000', duration: '180 mins', category: 'beauty', subCategory: 'Bridal makeup', isPopular: true, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop' },
    { name: 'Glamorous Party Makeup', slug: 'party-makeup', description: 'Elegant and glamorous look for parties, festivals, and weddings, featuring waterproof premium cosmetics.', price: 'Rs. 6,000', duration: '90 mins', category: 'beauty', subCategory: 'Party makeup', isPopular: false, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop' },
    { name: 'Gel Extensions & Nail Art', slug: 'nail-care', description: 'Durable gel extensions with custom metallic accents, ombre design, or hand-painted art.', price: 'Rs. 3,000', duration: '75 mins', category: 'beauty', subCategory: 'Nail care', isPopular: true, image: 'https://images.unsplash.com/photo-1604654894610-df4906b147c0?q=80&w=600&auto=format&fit=crop' }
  ]

  for (const s of services) {
    await prisma.service.create({ data: s })
  }

  // 3. Seed Slimming Packages
  const slimmingPackages = [
    { name: 'Ultimate Weight Loss Package', description: 'Comprehensive program combining cavitation fat burning, customized dietary plans, and thermo therapy.', price: 'Rs. 25,000', duration: '12 Sessions', details: 'Full body cavitation, Lymphatic drainage massage, Body wraps, Personalized diet chart, Fat analysis reports', image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop' },
    { name: 'Non-Invasive Fat Reduction', description: 'Targeted fat reduction for stomach, thighs, or arms using safe ultrasound cavitation and lipo-laser tech.', price: 'Rs. 18,500', duration: '8 Sessions', details: 'Ultrasound cavitation, Lipo-laser pads, Vacuum suction body shaping, Weight monitoring, Inch-loss assurance', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop' },
    { name: 'Skin Tightening & Contour', description: 'RF (Radio Frequency) sessions to lift sagging skin, build collagen, and contour face and body curves.', price: 'Rs. 15,000', duration: '6 Sessions', details: 'Radio Frequency facial lifting, Double-chin reduction, Abdominal skin firming, Anti-aging booster serums', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop' }
  ]

  for (const p of slimmingPackages) {
    await prisma.slimmingPackage.create({ data: p })
  }

  // 4. Seed Academy Courses
  const academyCourses = [
    { name: 'Professional Beautician Diploma', description: 'Master everything from basic threading and waxing to advanced facials, client consulting, and salon skin safety.', duration: '3 Months', price: 'Rs. 35,000', syllabus: 'Skin structure & health, Advanced facials & cleanup, Body waxing & polishing, Manicure & Pedicure, Client consulting', certificate: 'Yes', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop' },
    { name: 'Elite Bridal Makeup Artistry', description: 'Learn HD bridal makeup, airbrush makeup, traditional Nepali/Indian bridal styling, saree draping, and professional photography hacks.', duration: '45 Days', price: 'Rs. 25,000', syllabus: 'HD & Airbrush techniques, Traditional bridal looks, Saree & Lehenga draping, Eye makeup & lashes, Hair styling & settings', certificate: 'Yes', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop' },
    { name: 'Advanced Hair Styling & Chemistry', description: 'Covers haircut shapes, hair coloring physics, permanent straightening chemistry, keratin therapies, and trendy blowouts.', duration: '2 Months', price: 'Rs. 30,000', syllabus: 'Geometry of haircuts, Color formulation & bleach, Rebonding & Smoothening, Keratin & protein fills, Creative updos', certificate: 'Yes', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop' },
    { name: 'Salon Operations & Management', description: 'Unlock the business secret of high-earning salons. Learn staff management, digital marketing, supply chain, and billing.', duration: '1 Month', price: 'Rs. 15,000', syllabus: 'Staffing & KPIs, Inventory management, Salon software & Billing, Customer retention, Digital branding & Ads', certificate: 'Yes', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop' }
  ]

  for (const c of academyCourses) {
    await prisma.academyCourse.create({ data: c })
  }

  // 5. Seed Testimonials
  const testimonials = [
    { name: 'Sujata Shrestha', role: 'Bride', content: 'Bidhanshi did my makeup for my wedding, and I was in absolute awe! The HD makeup was flawless, stayed intact all day, and I got countless compliments. Highly recommend them for bridal makeup!', rating: 5, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop' },
    { name: 'Rahul Chaudhary', role: 'Regular Client', content: 'Finding a good unisex salon in Nepalgunj was tough until I visited Bidhanshi. Their hair spa and professional haircuts are top-tier. Extremely clean environment and professional staff.', rating: 5, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop' },
    { name: 'Preeti Sharma', role: 'Slimming Student & Client', content: 'I completed 8 sessions of fat reduction here and lost almost 4 inches off my waist! The treatments are comfortable, non-invasive, and the guidance is scientifically backed. Best slimming centre in town!', rating: 5, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop' }
  ]

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t })
  }

  // 6. Seed Team Members
  const team = [
    { name: 'Binita Adhikari', designation: 'Founder & Head Aesthetician', specialty: 'Bridal Makeup & Skin Treatments', bio: 'With over 12 years of cosmetic experience, Binita founded Bidhanshi to bring international beauty standards to Nepalgunj.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop' },
    { name: 'Rohan Shrestha', designation: 'Master Hair Stylist', specialty: 'Balayage, Keratin, and Creative Haircuts', bio: 'Trained in Mumbai and Dubai, Rohan specializes in high-fashion coloring techniques and advanced hair restoration therapies.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop' },
    { name: 'Dr. Karuna Thapa', designation: 'Slimming Consultant & Nutritionist', specialty: 'Fat Reduction & Body Sculpting', bio: 'Dr. Karuna customizes diet and ultrasound cavitation therapies to deliver safe, permanent, and healthy weight loss results.', image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=300&auto=format&fit=crop' }
  ]

  for (const m of team) {
    await prisma.teamMember.create({ data: m })
  }

  // 7. Seed Offers
  const offers = [
    { name: 'Royal Bridal Makeover Package', description: 'Complete bridal beauty bundle featuring HD bridal makeup, pre-bridal gold facial, hair spa, premium waxing, and nail art extension.', discountPrice: 'Rs. 22,000', originalPrice: 'Rs. 28,000', validUntil: 'Valid until June 30, 2026', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop' },
    { name: 'Monsoon Hair Revitalizing Combo', description: 'Say goodbye to frizz! Get a Premium Keratin Treatment + Nourishing L\'Oreal Hair Spa at an unbeatable discount.', discountPrice: 'Rs. 8,500', originalPrice: 'Rs. 10,500', validUntil: 'Limited time offer', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop' }
  ]

  for (const o of offers) {
    await prisma.offer.create({ data: o })
  }

  // 8. Seed Blog Posts
  const blogs = [
    {
      title: '5 Crucial Hair Care Tips for Nepal\'s Rainy Season',
      slug: 'hair-care-tips-rainy-season',
      summary: 'Damp weather brings extreme frizz and hair fall. Discover how to keep your hair healthy, hydrated, and strong with tips from our expert stylists.',
      content: `Rainy seasons can be incredibly challenging for hair. High humidity breaks hydrogen bonds in hair strands, creating dry, frizzy, and unmanageable textures.

### 1. Keep Your Scalp Dry
Rainwater carries atmospheric pollutants and acid elements. If you get wet, always wash your hair with a mild shampoo immediately.

### 2. Double-Condition Your Ends
Use deep conditioners or nourishing serums to seal cuticles. A weekly hair spa works wonders in coating hair strands against external moisture.

### 3. Avoid Tight Hairstyles
Wet scalps are vulnerable to bacterial infections. Avoid tying your hair tightly when damp to prevent structural breakage and hair fall.

### 4. Upgrade to a Keratin Shield
If you experience intense frizz, professional Keratin treatments build a protective protein barrier that blocks out humidity for up to five months.

### 5. Eat Protein-Rich Diets
Hair is made of keratin protein. Adding eggs, soy, and almonds to your diet strengthens hair follicles from within.`,
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop',
      seoTitle: 'Rainy Season Hair Care Tips | Bidhanshi Salon Nepalgunj',
      seoDescription: 'Fight monsoon hair fall and frizz. Read top hair care tips and chemical-free remedies recommended by professional stylists at Bidhanshi Unisex Salon.',
      seoKeywords: 'hair care tips, frizz reduction, hair spa in nepalgunj, monsoon hair care'
    },
    {
      title: 'The Science of Non-Invasive Weight Loss: How Cavitation Works',
      slug: 'science-non-invasive-weight-loss',
      summary: 'Curious about fat reduction without surgery? Read how ultrasound cavitation breaks down fat cells safely and naturally.',
      content: `Losing stubborn belly fat or arm inches can feel nearly impossible through diet alone. Thankfully, modern aesthetic science offers **Ultrasound Cavitation**—a completely non-surgical, pain-free fat reduction method.

### What is Ultrasound Cavitation?
Cavitation uses low-frequency sound waves to create microscopic bubbles around fat tissue membranes. The high pressure causes fat cells to collapse and liquefy.

### How Does the Body Remove the Fat?
Once liquefied, the fat is processed by the liver and eliminated naturally through the lymphatic drainage system. It does not enter the bloodstream as cholesterol.

### Benefits of Non-Invasive Fat Reduction:
- **No Downtime:** Return to work immediately after your 45-minute session.
- **Pain-Free:** Feels like a warm, soothing massage.
- **Targeted Slimming:** Focus precisely on thighs, belly, double-chins, or arms.

### Maximizing Results:
For optimal results, drink at least 2 liters of water before and after each session. This accelerates the lymphatic flushing process.`,
      image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop',
      seoTitle: 'How Ultrasound Cavitation Works | Bidhanshi Slimming Centre',
      seoDescription: 'Understand the fat cell breakdown process. Learn about the benefits, safety, and results of non-invasive body sculpting treatments in Nepalgunj.',
      seoKeywords: 'slimming centre in nepalgunj, body shaping, weight loss treatment, cavitation science'
    }
  ]

  for (const b of blogs) {
    await prisma.blogPost.create({ data: b })
  }

  // 9. Seed Gallery
  const gallery = [
    { url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=600&auto=format&fit=crop', caption: 'Precision Hair Cut & Style', category: 'hair' },
    { url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=600&auto=format&fit=crop', caption: 'HD Royal Bridal Makeover', category: 'bridal' },
    { url: 'https://images.unsplash.com/photo-1604654894610-df4906b147c0?q=80&w=600&auto=format&fit=crop', caption: 'Nail Extension & Custom Art', category: 'bridal' },
    { url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop', caption: 'Slimming & Contouring Sessions', category: 'slimming' },
    { url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop', caption: 'Practical Academy Classes', category: 'academy' },
    { url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=600&auto=format&fit=crop', caption: 'Relaxing Scalp Therapy Session', category: 'hair' }
  ]

  for (const g of gallery) {
    await prisma.galleryImage.create({ data: g })
  }

  // 10. Before / After
  const beforeAfters = [
    { title: 'Hair Smoothening Transformation', beforeImage: 'https://images.unsplash.com/photo-1595859702765-3c8507553963?q=80&w=300&auto=format&fit=crop', afterImage: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=300&auto=format&fit=crop', description: 'Reversing intense frizz and damage into smooth, shiny, and straight locks using premium rebonding therapy.' },
    { title: 'Abdominal Inch Loss', beforeImage: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=300&auto=format&fit=crop', afterImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=300&auto=format&fit=crop', description: 'Outstanding 3-inch waist reduction achieved after 6 sessions of non-invasive ultrasound cavitation and custom diet plan.' }
  ]

  for (const ba of beforeAfters) {
    await prisma.beforeAfter.create({ data: ba })
  }

  // 11. Initial Settings
  const settings = [
    { key: 'logoUrl', value: '/images/logo.jpg' },
    { key: 'contactPhone', value: '+977-9858022442' },
    { key: 'contactWhatsapp', value: '9779858022442' },
    { key: 'contactEmail', value: 'info@bidhanshisalon.com' },
    { key: 'locationAddress', value: 'Setubk chowk, Nepalgunj 21900' },
    { key: 'facebookUrl', value: 'https://facebook.com/bidhanshisalon' },
    { key: 'instagramUrl', value: 'https://instagram.com/bidhanshisalon' },
    { key: 'tiktokUrl', value: 'https://tiktok.com/@bidhanshisalon' },
    { key: 'mapIframe', value: 'https://maps.google.com/maps?q=Setubk%20chowk,%20Nepalgunj%2021900&t=&z=15&ie=UTF8&iwloc=&output=embed' }
  ]

  for (const s of settings) {
    await prisma.settings.create({ data: s })
  }

  console.log('Seeding completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
