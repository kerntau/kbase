import type { Metadata } from "next";
import "./globals.css";
import { UIProvider, TOCProvider } from "@/context/UIContext";
import { TooltipProvider } from "@/components/ui/Tooltip";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";
import { generateWebsiteSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL("https://cot.wiki"),
  title: "序栈 | 个人知识库",
  description: "序栈知识库，记录网络安全、系统底层与现代架构的技术沉淀与实践。",
  keywords: ["序栈", "知识库", "网络安全", "系统底层", "全栈架构"],
  twitter: {
    card: "summary_large_image",
    title: "序栈 - 技术知识库",
    description: "全栈技术知识库，涵盖前端、后端、数据库、运维与安全",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
        <Script id="theme-script" strategy="beforeInteractive" dangerouslySetInnerHTML={{
          __html: `(function(){try{var t=localStorage.getItem('kb_theme');var d=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme:dark)').matches);if(d)document.documentElement.classList.add('dark')}catch(e){}})()`
        }} />
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebsiteSchema()) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-accent selection:text-white">
        <NuqsAdapter>
          <TOCProvider>
            <UIProvider>
              <TooltipProvider>
                {children}
              </TooltipProvider>
            </UIProvider>
          </TOCProvider>
        </NuqsAdapter>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
