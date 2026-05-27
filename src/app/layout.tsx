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
  title: "序栈 | 秩序之始与技术之栈",
  description: "序栈 (Digital Space) 是一个专注于网络安全、系统底层与现代全栈架构推演的数字自留地。去除网络浮躁，留存白纸黑字的思考与代码沉淀。",
  keywords: ["序栈", "知识库", "网络安全", "系统底层", "全栈架构", "渗透测试", "React", "Next.js", "极客"],
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
