import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Suspense } from "react";
import { Loading } from "@/components/loading";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Indain Sarkari Result",
  description:
    "A brief description of your app for search engines and social media.",
  keywords: "your, keywords, here",
  openGraph: {
    title: "Your App Name",
    description: "A short description for social media sharing.",
    url: "https://yourwebsite.com",
    site_name: "Your Site Name",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Description of the image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "Your App Name",
    description: "Brief description for Twitter sharing.",
    image: "https://yourwebsite.com/twitter-image.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />

        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.site_name} />
        <meta property="og:image" content={metadata.openGraph.images[0].url} />
        <meta
          property="og:image:width"
          content={metadata.openGraph.images[0].width}
        />
        <meta
          property="og:image:height"
          content={metadata.openGraph.images[0].height}
        />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta property="og:type" content={metadata.openGraph.type} />

        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:site" content={metadata.twitter.site} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:image" content={metadata.twitter.image} />

        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://yourwebsite.com/" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <Suspense fallback={<Loading />}>
              <main className="flex-1 p-4">{children}</main>
            </Suspense>
          </div>
        </div>
      </body>
    </html>
  );
}
