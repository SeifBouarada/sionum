import './globals.css'
import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import Head from "next/head";
// import Script from 'next/script';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../components/header/Navbar';
const roboto = Roboto({
  subsets: ['latin'],
  weight: '500',
  display: 'swap',
  variable: '--font-teko',
});
import Footer from '../../components/footer/Footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Sionum.org - Your Source for Trending News and Blogs',
  description: 'Discover the latest trends and news on Sionum.org. Stay informed about the most relevant and innovative topics in fashion, technology, culture, and more.',
  keywords: 'Trending news, blog, fashion, technology, culture, trends, innovation, news articles',
  authors: {
    name: 'SIONUM Inc.',
    url: 'https://sionum.org',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={roboto.className}>
        <Navbar />
        <div className="container mt-5 mb-5">
          {children}
        </div>
        <Footer />
        <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></Script>
      </body>
    </html>
  )
}
