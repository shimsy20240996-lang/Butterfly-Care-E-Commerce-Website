import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ToastContainer } from '@/components/ui/Toast';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'BUTTERFLY CARE — for every mom | Baby & Mother Care Products',
  description:
    'Care for every little moment. Discover thoughtfully chosen baby and mother care essentials in Sri Lanka with islandwide delivery.',
  keywords: [
    'baby care Sri Lanka',
    'mother care',
    'organic baby clothes',
    'muslin swaddles',
    'postpartum care',
    'baby feeding bottles',
    'maternity essentials Colombo'
  ],
  authors: [{ name: 'Butterfly Care' }],
  openGraph: {
    title: 'BUTTERFLY CARE — for every mom',
    description: 'Thoughtfully chosen essentials for every mom and every little one.',
    url: 'https://butterflycare.lk',
    siteName: 'Butterfly Care',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Butterfly Care - Mother & Baby Essentials'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#F8F3EF] text-[#5A4945] antialiased selection:bg-[#DDB9AE] selection:text-[#5A4945]">
        {/* Sticky Header with Navigation & Live Search */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1">{children}</main>

        {/* Global Cart Slide-out Drawer */}
        <CartDrawer />

        {/* Floating WhatsApp Quick Action */}
        <FloatingWhatsApp />

        {/* Toast Notifications */}
        <ToastContainer />

        {/* Multi-column Footer */}
        <Footer />
      </body>
    </html>
  );
}
