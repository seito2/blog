const { copyAndMinify } = require("./util.js");
const fs = require("fs");
const path = require("path");

fs.mkdirSync("docs", (err) => {
  if (err) console.log(err);
});
fs.mkdirSync("docs/assets", (err) => {
  if (err) console.log(err);
});

const copyFileList = [
  "index.html",
  "index.js",
  "index.css",
  "reset.css",
  "article.css",
];
copyFileList.map((path) => copyAndMinify(path));

// assets

const copyAssets = (dirpath) => {
  fs.readdir(dirpath, { withFileTypes: true }, (err, dirents) => {
    if (err) {
      console.error(err);
      return;
    }

    for (const dirent of dirents) {
      const fp = path.join(dirpath, dirent.name);
      if (dirent.isDirectory()) {
        fs.mkdir(fp.replace("src/assets", "docs/assets"), (err) => {
          if (err) console.log(err);
        });
        copyAssets(fp);
      } else {
        fs.copyFile(fp, fp.replace("src/assets", "docs/assets"), (err) => {
          if (err) console.log(err.stack);
        });
      }
    }
  });
};

copyAssets("src/assets");
