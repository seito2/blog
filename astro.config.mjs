import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://seito2.github.io/blog/",
  integrations: [mdx(), sitemap()],
  outDir: "dist",
  base: "/blog",
});
