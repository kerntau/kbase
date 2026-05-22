const fs = require("fs");
const path = require("path");

function buildIndex() {
  const veliteDir = path.join(__dirname, "../.velite");
  const publicDir = path.join(__dirname, "../public");
  
  const postsPath = path.join(veliteDir, "posts.json");
  if (!fs.existsSync(postsPath)) {
    console.warn("Velite posts.json not found. Run velite build first.");
    return;
  }

  const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"));
  
  const searchIndex = posts.map((post) => {
    // 使用正则滤除 HTML 标签，减少索引体积
    const cleanContent = post.content
      ? post.content
          .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, "") // 滤除大段代码
          .replace(/<[^>]*>/g, " ") // 滤除 HTML 标签
          .replace(/\s+/g, " ") // 合并空白符
          .trim()
      : "";

    return {
      title: post.title,
      slug: post.slug,
      permalink: post.permalink,
      category: post.category || "",
      description: post.description || "",
      content: cleanContent,
    };
  });

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(publicDir, "search-index.json"),
    JSON.stringify(searchIndex),
    "utf-8"
  );
  console.log(`Successfully built search index for ${searchIndex.length} posts.`);
}

buildIndex();
