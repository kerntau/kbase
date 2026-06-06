import type { Metadata } from "next";
import MarketingHomeContent from "@/components/marketing/MarketingHomeContent";

export const metadata: Metadata = {
  title: "序栈 | 计算机系统与安全知识库",
  description: "序栈知识库，记录网络安全、系统底层与现代架构的技术沉淀与实践。",
  keywords: ["序栈", "知识库", "系统安全", "全栈开发", "计算机底层"],
  openGraph: {
    title: "序栈 - 全栈技术知识库",
    description: "全栈技术知识库，涵盖前端、后端、数据库、运维与安全",
    url: "https://cot.wiki",
    siteName: "序栈",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "序栈 - 全栈技术知识库",
    description: "全栈技术知识库，涵盖前端、后端、数据库、运维与安全",
    images: ["/og-image.jpg"],
  },
};

export default function MarketingHomePage() {
  return <MarketingHomeContent />;
}
