const fs = require("fs");
const marked = require("marked");
const { insertStr, writeFile, minify } = require("./util.js");
const UglifyJS = require("uglify-js");

const articleList = require("../src/articles.json");

// create article's html
const baseHtml = fs.readFileSync("./src/base.html", "utf8");
const target_tag = "main";

const pattern1 = new RegExp(
  "<" + target_tag + "(?: .+?)?>.*?</" + target_tag + ">",
  "g"
);
const targetPosition = baseHtml.search(pattern1);

articleList.map(({ created, title, id }) => {
  const articleMD = fs.readFileSync("./src/article/" + title + ".md", "utf-8");
  const articleHTML = marked(articleMD);
  const res = insertStr(
    baseHtml,
    targetPosition + "<main>".length,
    articleHTML
  );
  writeFile("./docs/article/" + id + ".html", minify.html(res));
});

// copy css and js and index.html to docs
