const fs = require("fs");
const path = require("path");

const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpackServeWaitpage = require("webpack-serve-waitpage");

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
).map(path.parse).reduce(
  (memo, item) => ({
    ...memo,

    [item.name]: `./src/${item.base}`,
  }),
  {}
);

module.exports = {
  target: "node",

  mode: mode,

  context: rootPath,

  entry: entries,

  output: {
    path: buildPath,
    filename: "[name].js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: sourcePath,
        use: [
          {
            loader: "echo-loader",
          },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: path.resolve(rootPath, "cache"),
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
                [ "babel-plugin-module-resolver", {
                  root: [ "./src" ],
                  alias: {
                    "@packages/a": path.resolve(rootPath, "../packages/a"),
                  },
                } ],
                "@babel/plugin-proposal-function-sent",
                "@babel/plugin-proposal-export-namespace-from",
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-syntax-import-meta",
                [ "@babel/plugin-proposal-class-properties", { loose: true } ],
                "@babel/plugin-proposal-json-strings",
                "@babel/plugin-transform-arrow-functions",
              ],
            },
          }
        ],
      },
    ],
  },

  serve: {
    content: buildPath,

    add: (app, middleware, options) => {
      app.use(webpackServeWaitpage(options));
    }
  },

  plugins: [
    new CleanWebpackPlugin([ "build" ], {
      root: rootPath,
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(assetsPath, "**", "*"),
        to: buildPath,
      },
    ]),
  ],

  resolve: {
    symlinks: false,
    alias: {
      "@packages/a": path.resolve(rootPath, "../packages/a"),
    },
  },
};
