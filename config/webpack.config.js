const path = require("path");
const fs = require("fs");

const { merge } = require("webpack-merge");
// @ts-ignore
const CopyPlugin = require("copy-webpack-plugin");
// @ts-ignore
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// @ts-ignore
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { entryDir, distDir } = require("./paths");
const { generateDevWebpageRules, generateStyleRules, generateScriptRules } = require("./generate-rules");

const isDev = process.env.NODE_ENV === "development";
const entryFiles = fs.readdirSync(entryDir);
const entryFileNameToPath = entryFiles.reduce((accum, currentFile) => {
  const fileName = currentFile.split(".")[0];
  // @ts-ignore
  accum[fileName] = path.join(entryDir, currentFile);
  return accum;
}, {});

const commonConfig = {
  entry: entryFileNameToPath,
  output: {
    path: distDir,
  },
  devtool: "source-map",
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "..", "src"),
    },
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
};

const devConfig = {
  output: {
    filename: "[name].bundle.js",
  },
  devtool: "inline-source-map",
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    static: distDir,
    hot: true,
  },
  module: {
    rules: [
      ...generateScriptRules(false),
      ...generateStyleRules(false),
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    ...generateDevWebpageRules(),
  ],
};
const prodConfig = {
  output: {
    filename: "[name].[contenthash].bundle.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new CopyPlugin({
      patterns: [{ from: "src/webpages/**/*.html", to: "[name].html" }],
    }),
  ],
  module: {
    rules: [
      ...generateScriptRules(true),
      ...generateStyleRules(true),
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
};

const toMergeWithConfig = isDev ? devConfig : prodConfig;

// @ts-ignore
module.exports = merge(commonConfig, toMergeWithConfig);

