import type { Metadata, Viewport } from "next";
import { Geist as FontSans, Geist_Mono as FontMono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/site/theme-provider";
import { SoundEffects } from "@/components/site/sound";
import { siteConfig } from "@/lib/site";

/**
 * Geist for sans + heading, Geist Mono for code. No other faces.
 */
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400"],
});

const title = `${siteConfig.name} — ${siteConfig.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: title, template: `%s — ${siteConfig.name}` },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.owner.name, url: siteConfig.owner.url }],
  creator: `${siteConfig.author.name} — owned by ${siteConfig.owner.name}`,
  publisher: siteConfig.credit.org,
  applicationName: siteConfig.name,
  category: "technology",
  alternates: { canonical: "/" },
  verification: {
    google: "KLyXH6C8KGrTWqUvu5bZyytZ7AXz8L9HUQr2bWSB-yY",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    creator: siteConfig.author.name,
  },
  robots: {
    index: true,
    follow: true,
    noarchive: true,
    googleBot: {
      index: true,
      follow: true,
      noarchive: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

/** Structured data for rich results (WebSite + SoftwareApplication). */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      author: {
        "@type": "Person",
        name: siteConfig.owner.name,
        url: siteConfig.owner.url,
        jobTitle: "Owner of Graytell Labs",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteConfig.url}/components?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      name: "Graytell Labs",
      url: siteConfig.credit.orgUrl,
      logo: `${siteConfig.url}/icon.svg`,
      description: "Graytell Labs is owned by Anubhav Sapkota.",
      founder: {
        "@type": "Person",
        name: siteConfig.owner.name,
        url: siteConfig.owner.url,
      },
      sameAs: [siteConfig.links.github, siteConfig.url],
    },
    {
      "@type": "SoftwareApplication",
      name: siteConfig.name,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      description: siteConfig.description,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      softwareVersion: siteConfig.version,
      dateModified: siteConfig.lastUpdated,
      license: "https://github.com/GrayTell/Gray-ui/blob/main/LICENSE",
      codeRepository: siteConfig.links.github,
      keywords: siteConfig.keywords.join(", "),
      author: {
        "@type": "Organization",
        name: siteConfig.author.name,
        url: siteConfig.author.url,
        founder: {
          "@type": "Person",
          name: siteConfig.owner.name,
          url: siteConfig.owner.url,
        },
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} [--header-height:calc(var(--spacing)*14)] lg:[--header-height:calc(var(--spacing)*16)]`}
    >
      <body className="antialiased overscroll-none [--footer-height:calc(var(--spacing)*14)] xl:[--footer-height:calc(var(--spacing)*24)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SoundEffects>
            {children}
            <Toaster />
          </SoundEffects>
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
