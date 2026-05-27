import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { UIProvider } from "@/context/UIContext";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-inter",
});

const fontSerif = Lora({
  subsets: ["latin"],
  variable: "--font-serif-lora",
});

export const metadata: Metadata = {
  title: "序栈 | 个人知识库",
  description: "序栈知识库，记录网络安全、系统底层与现代架构的技术沉淀与实践。",
  keywords: ["序栈", "知识库", "网络安全", "系统底层", "全栈架构"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-accent selection:text-white">
        <UIProvider>
          {children}
        </UIProvider>
      </body>
    </html>
  );
}
