const fs = require("fs");
const marked = require("marked");
const { insertStr, writeFile, minify } = require("./util.js");

fs.mkdirSync("docs/article", (err) => {
  if (err) console.log(err);
});

const articleList = require("../src/articles.json");

// create article's html
const baseHtml = fs.readFileSync("./src/base.html", "utf8");
const target_tag = "article";

const pattern1 = new RegExp(
  "<" + target_tag + "(?: .+?)?>.*?</" + target_tag + ">",
  "g"
);
const targetPosition = baseHtml.search(pattern1);

articleList.map(({ created, title, id }) => {
  const articleMD = fs.readFileSync("./src/markdown/" + title + ".md", "utf-8");
  const articleHTML = marked(articleMD);
  const res = insertStr(
    baseHtml,
    targetPosition + `<${target_tag}>`.length,
    articleHTML
  );
  writeFile("./docs/article/" + id + ".html", minify.html(res));
  writeFile("./src/article/" + id + ".html", minify.html(res));
});

// copy css and js and index.html to docs
