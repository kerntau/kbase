import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
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
          content: s.markdown({
            rehypePlugins: [
              rehypeSlug,
              [
                rehypePrettyCode,
                {
                  theme: "one-dark-pro",
                  keepBackground: true,
                },
              ],
              [rehypeAutolinkHeadings, { behavior: "wrap", properties: { className: ["heading-link"] } }],
            ],
          }),
          toc: s.toc(),
        })
        .transform(data => ({ ...data, permalink: `/kb/posts/${data.slug}` })),
    },
  },
});
