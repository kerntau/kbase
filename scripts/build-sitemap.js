const fs = require("fs");
const path = require("path");

const SITE_URL = "https://cot.wiki";

try {
  const postsPath = path.join(process.cwd(), ".velite", "posts.json");
  if (!fs.existsSync(postsPath)) {
    console.error("[sitemap] posts.json not found");
    process.exit(0);
  }

  const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"));

  const today = new Date().toISOString().split("T")[0];

  const staticPages = [
    { url: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
    { url: "/kb/", changefreq: "weekly", priority: "0.9", lastmod: today },
    { url: "/manifesto/", changefreq: "monthly", priority: "0.5", lastmod: today },
  ];

  const postPages = posts.map((post) => ({
    url: post.permalink + "/",
    changefreq: "monthly",
    priority: "0.8",
    lastmod: post.date ? post.date.split("T")[0] : undefined,
  }));

  const allPages = [...staticPages, ...postPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ""}
  </url>`
  )
  .join("\n")}
</urlset>`;

  const outPath = path.join(process.cwd(), "public", "sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf-8");
  console.log(`[sitemap] Generated sitemap.xml with ${allPages.length} URLs`);
} catch (err) {
  console.error("[sitemap] Failed:", err.message);
  process.exit(0);
}
