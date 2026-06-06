import { posts } from "#content";
import { buildDocTree } from "@/lib/tree";
import WikiShell from "@/components/layout/WikiShell";

// 这个布局只会在访问 /kb 或其子路由时生效
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 服务端静态构建目录树
  const docTree = buildDocTree(posts);

  return (
    <>
      {/* 搜索索引仅在知识库路由下预加载，避免 marketing 页面触发浏览器警告 */}
      <link rel="preload" href="/search-index.json" as="fetch" crossOrigin="anonymous" />
      <WikiShell tree={docTree}>{children}</WikiShell>
    </>
  );
}
