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

const {
  srcDir, distDir, utilsDir,
  entryDir, scriptsDir, assetsDir,
  componentsDir, uiComponentsDir, pagesDir,
  layoutsDir, typesDir, appsDir,
} = require("./paths");
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
      "@assets": assetsDir,
      "@js": scriptsDir,
      "@utils": utilsDir,
      "@entry": entryDir,
      "@components": componentsDir,
      "@ui": uiComponentsDir,
      "@pages": pagesDir,
      "@layouts": layoutsDir,
      "@my-types": typesDir,
      "@apps": appsDir,
      "@styling": path.resolve(srcDir, "styling"),
    },
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/webpages/**/*.html", to: "[name].html" }],
    })
  ],
};

const devScriptRules = generateScriptRules(false);

console.log(JSON.stringify(devScriptRules, null, 2));

const devConfig = {
  output: {
    filename: "[name].bundle.js",
  },
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
    static: distDir,
    hot: true,
  },
  module: {
    rules: [
      ...devScriptRules,
      ...generateStyleRules(false),
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
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

