import { defineConfig, s } from "velite";

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash].[ext]",
    clean: true,
  },
  collections: {
    posts: {
      name: "Post",
      pattern: "**/*.{md,mdx}",
      schema: s
        .object({
          title: s.string().max(99),
          slug: s.path(),
          date: s.isodate().optional(),
          category: s.string().optional(),
          description: s.string().optional(),
          content: s.markdown(), // 编译为 HTML
          toc: s.toc(), // 自动生成大纲
        })
        .transform(data => ({ ...data, permalink: `/posts/${data.slug}` })),
    },
  },
});
