import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/Providers'
import ProductModal from '@/components/ProductModal'
import CartDrawer from '@/components/CartDrawer'
import Chatbot from '@/components/Chatbot'

const beVietnamPro = Be_Vietnam_Pro({
  variable: '--font-outfit',
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PulseRing AI — Nhẫn thông minh theo dõi sức khỏe',
  description:
    'Theo dõi nhịp tim, giấc ngủ và vận động 24/7. AI cá nhân hoá gợi ý mỗi ngày, giúp bạn sống khỏe hơn từng khoảnh khắc.',
  keywords: ['nhẫn thông minh', 'smart ring', 'theo dõi sức khỏe', 'AI sức khỏe', 'PulseRing'],
  openGraph: {
    title: 'PulseRing AI — Nhẫn thông minh theo dõi sức khỏe',
    description: 'Sức khỏe của bạn, gọn trong một chiếc nhẫn.',
    type: 'website',
    locale: 'vi_VN',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={beVietnamPro.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          <main style={{ flex: 1, paddingTop: '4rem' }}>{children}</main>
          <Footer />
          <ProductModal />
          <CartDrawer />
          <Chatbot />
        </ThemeProvider>
      </body>
    </html>
  )
}
