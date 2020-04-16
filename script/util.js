const fs = require("fs");
const path = require("path");
const minifier = require("html-minifier").minify;
const CleanCSS = require("clean-css");
const format_option = require("./format-config.json");

const insertStr = (str, idx, val) => {
  var res = str.slice(0, idx) + val + str.slice(idx);
  return res;
};

const writeFile = (path, data) => {
  fs.writeFile(path, data, (err) => {
    if (err) {
      throw err;
    }
  });
};

class Minify {
  constructor() {
    const ClosureCompiler = require("google-closure-compiler").jsCompiler;

    this.closureCompiler = new ClosureCompiler({
      compilation_level: "ADVANCED",
    });
  }

  html(data) {
    return minifier(data, format_option.html);
  }

  css(data) {
    return new CleanCSS(format_option.css).minify(data);
  }

  js(path, data) {
    let res;
    this.closureCompiler.run(
      [
        {
          path: path,
          src: data,
          sourceMap: null, // optional input source map
        },
      ],
      (exitCode, stdOut, stdErr) => {
        res = stdOut[0].src;
      }
    );
    return res;
  }
}

const copyAndMinify = (path) => {
  const format = path.split(".")[1];
  const file = fs.readFileSync("./src/" + path, "utf-8");
  let minifiedFile;
  const minify = new Minify();

  switch (format) {
    case "html":
      minifiedFile = minify.html(file);
      break;

    case "css":
      minifiedFile = minify.css(file).styles;
      break;

    case "js":
      minifiedFile = minify.js("./src/" + path, file);
      break;

    default:
      break;
  }

  writeFile("./docs/" + path, minifiedFile);
};

exports.insertStr = insertStr;
exports.writeFile = writeFile;
exports.minify = new Minify();
exports.copyAndMinify = copyAndMinify;
