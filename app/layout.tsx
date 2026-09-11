import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://youtubeaisummarizer.krishaiworks.com"),

  title: {
    default: "YouTube AI Summarizer | Turn Videos Into Smart Notes",
    template: "%s | YouTube AI Summarizer",
  },

  description:
    "Turn YouTube videos into clean, structured AI notes in seconds. Extract key ideas, important details and takeaways with KrishAIWorks.",

  keywords: [
    "YouTube AI summarizer",
    "YouTube summarizer",
    "AI YouTube summarizer",
    "YouTube video summarizer",
    "YouTube notes generator",
    "AI notes generator",
    "summarize YouTube videos",
    "YouTube transcript summarizer",
    "AI study notes",
    "KrishAIWorks",
  ],

  authors: [
    {
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
    },
  ],

  creator: "KrishAIWorks",
  publisher: "KrishAIWorks",

  applicationName: "YouTube AI Summarizer",

  category: "technology",

  alternates: {
    canonical: "https://youtubeaisummarizer.krishaiworks.com",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://youtubeaisummarizer.krishaiworks.com",
    siteName: "YouTube AI Summarizer | KrishAIWorks",
    title: "YouTube AI Summarizer | Turn Videos Into Smart Notes",
    description:
      "Turn long YouTube videos into clean, structured AI notes with key ideas, important details and useful takeaways.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "KrishAIWorks YouTube AI Summarizer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "YouTube AI Summarizer | KrishAIWorks",
    description:
      "Turn YouTube videos into clean AI notes, key ideas and useful takeaways in seconds.",
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://krishaiworks.com/#organization",
      name: "KrishAIWorks",
      url: "https://krishaiworks.com",
      logo: {
        "@type": "ImageObject",
        url: "https://krishaiworks.com/logo.png",
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://krishaiworks.com/#website",
      url: "https://krishaiworks.com",
      name: "KrishAIWorks",
      description:
        "AI-powered tools, productivity utilities, automation, chatbots, websites and custom digital solutions.",
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
      inLanguage: "en",
    },
    {
      "@type": "WebApplication",
      "@id":
        "https://youtubeaisummarizer.krishaiworks.com/#webapplication",
      name: "YouTube AI Summarizer",
      url: "https://youtubeaisummarizer.krishaiworks.com",
      description:
        "Turn YouTube videos into clean, structured AI notes in seconds. Extract key ideas, important details and takeaways with KrishAIWorks.",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires a modern web browser.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      publisher: {
        "@id": "https://krishaiworks.com/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id":
        "https://youtubeaisummarizer.krishaiworks.com/#webpage",
      url: "https://youtubeaisummarizer.krishaiworks.com",
      name: "YouTube AI Summarizer | Turn Videos Into Smart Notes",
      description:
        "Turn YouTube videos into clean, structured AI notes in seconds. Extract key ideas, important details and takeaways with KrishAIWorks.",
      isPartOf: {
        "@id": "https://krishaiworks.com/#website",
      },
      about: {
        "@id":
          "https://youtubeaisummarizer.krishaiworks.com/#webapplication",
      },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <script
          id="youtube-ai-summarizer-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BS6TSMM1ZR"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-BS6TSMM1ZR');
          `}
        </Script>
      </body>
    </html>
  );
}