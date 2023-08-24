import './globals.css'
import { Roboto } from 'next/font/google'
import Head from "next/head";

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/components/header/Navbar';
const roboto = Roboto({
  subsets: ['latin'],
  weight: '500',
  display: 'swap',
  variable: '--font-teko',
});
import Footer from '@/components/footer/Footer';
import Script from 'next/script';



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7389774506228182" crossOrigin='anonymous'></Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-0NVWRGHXDR"></Script>
        <Script strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('js', new Date());

            gtag('config', 'G-0NVWRGHXDR');
        `}
        </Script>
        <Script type='text/javascript' strategy="lazyOnload">
          {`
           (function (c, l, a, r, i, t, y) {
            c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments) };
            t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
            y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
          })(window, document, "clarity", "script", "ie4pgxe371");
        `}
        </Script>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={roboto.className}>
        <Navbar />
        <div className="container mt-5" style={{marginBottom: '5rem'}}>
          {children}
        </div>
        <Footer />
        <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></Script>
      </body>
    </html>
  )
}
