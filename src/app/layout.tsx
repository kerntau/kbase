import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { UIProvider } from "@/context/UIContext";
import { posts } from "#content";
import { buildDocTree } from "@/utils/tree";
import WikiShell from "@/components/WikiShell";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-inter",
});

const fontSerif = Lora({
  subsets: ["latin"],
  variable: "--font-serif-lora",
});

export const metadata: Metadata = {
  title: "Knowledge Base",
  description: "A pure static digital knowledge base built with Next.js and React 19.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 服务端静态构建目录树
  const docTree = buildDocTree(posts);

  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <UIProvider>
          <WikiShell tree={docTree}>{children}</WikiShell>
        </UIProvider>
      </body>
    </html>
  );
}
