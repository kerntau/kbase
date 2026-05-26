import { posts } from "#content";
import { buildDocTree } from "@/utils/tree";
import WikiShell from "@/components/WikiShell";

// 这个布局只会在访问 /kb 或其子路由时生效
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 服务端静态构建目录树
  const docTree = buildDocTree(posts);

  return <WikiShell tree={docTree}>{children}</WikiShell>;
}
