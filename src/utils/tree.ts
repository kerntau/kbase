export interface TreeNode {
  name: string;
  path: string; // 文件夹路径或文章 permalink
  isFolder: boolean;
  children?: TreeNode[];
  title?: string;
}

export function buildDocTree(posts: { slug: string; title: string; permalink: string }[]): TreeNode[] {
  const root: TreeNode[] = [];

  const categoryMap: Record<string, string> = {
    frontend: "前端技术",
    backend: "后端架构",
    devops: "运维交付",
    database: "数据存储",
    security: "安全防护",
  };

  posts.forEach((post) => {
    const parts = post.slug.split("/");
    let currentLevel = root;
    let currentPath = "";

    parts.forEach((part, index) => {
      const isLast = index === parts.length - 1;
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      if (isLast) {
        // 叶子节点（文章）
        currentLevel.push({
          name: part,
          path: post.permalink,
          isFolder: false,
          title: post.title,
        });
      } else {
        // 目录节点（文件夹）
        let folder = currentLevel.find((item) => item.isFolder && item.name === part);
        if (!folder) {
          const key = part.toLowerCase();
          folder = {
            name: part,
            path: currentPath,
            isFolder: true,
            children: [],
            title: categoryMap[key] || (part.charAt(0).toUpperCase() + part.slice(1)),
          };
          currentLevel.push(folder);
        }
        currentLevel = folder.children!;
      }
    });
  });

  // 对树进行排序（文件夹在前，文章在后；按标题字母排序）
  const sortTree = (nodes: TreeNode[]) => {
    nodes.sort((a, b) => {
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;
      return (a.title || a.name).localeCompare(b.title || b.name);
    });
    nodes.forEach((node) => {
      if (node.children) {
        sortTree(node.children);
      }
    });
  };

  sortTree(root);
  return root;
}
