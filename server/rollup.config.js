const fs = require("fs");
const path = require("path");

import nodeResolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

const rootPath = path.resolve(__dirname, ".");
const assetsPath = path.resolve(rootPath, "assets");
const sourcePath = path.resolve(rootPath, "src");
const buildPath = path.resolve(rootPath, "build");

const mode = process.env.NODE_ENV || "development";
const devMode = mode !== "production";

const entries = fs.readdirSync(
  path.resolve(sourcePath)
).filter(
  (item) => item.endsWith(".js")
).map(path.parse);

module.exports = entries.map(
  (entry) => ({
    input: path.resolve(sourcePath, entry.base),
    output: {
      file: path.resolve(buildPath, entry.base),
      format: "cjs",
    },
    plugins: [
      nodeResolve(),
      babel({
        babelrc: false,
        presets: [
          [ "@babel/preset-env", {
            modules: false,
            targets: {
              node: "current",
            },
          } ],
        ],
        plugins: [
          "@babel/plugin-proposal-function-sent",
          "@babel/plugin-proposal-export-namespace-from",
          "@babel/plugin-syntax-dynamic-import",
          "@babel/plugin-syntax-import-meta",
          [ "@babel/plugin-proposal-class-properties", { loose: true } ],
          "@babel/plugin-proposal-json-strings",
          "@babel/plugin-transform-arrow-functions",
        ],
      }),
    ],
  })
);
