const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssModuleLoaderRule = {
  loader: "css-loader",
  options: {
    importLoaders: 1,
    modules: true,
  },
};

module.exports = {
  generateScriptRules: (isProd) => {
    const presets = ["env", "react", "typescript"].map(
      (suffix) => `@babel/preset-${suffix}`
    );
    presets.push("react-refresh/babel");

    const generateRule = (test, presets, custom = {}) => {
      return {
        test,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [...presets, ...custom.babelPresetsLevel],
            ...custom.babelOptionsLevel,
          },
          ...custom.useLevel,
        },
        ...custom.baseLevel,
      };
    };
    return [
      generateRule(/\.js$/, presets.slice(0, 1)),
      generateRule(
        /\.jsx$/,
        [presets.slice(0, 2), !isProd && presets[3]].filter(Boolean)
      ),
      generateRule(/\.ts$/, [presets[0], presets[2]]),
      generateRule(
        /\.tsx$/,
        [presets.slice(0, 3), !isProd && presets[3]].filter(Boolean)
      ),
    ];
  },
  generateStyleRules: (isProd) => {
    const generateUse = (forCSSModules = false, moreLoaders = []) => [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      forCSSModules ? cssModuleLoaderRule : "css-loader",
      ...moreLoaders,
    ];
    const generateRule = (ext, moreLoaders = []) => {
      const regularStyleRegex = new RegExp(`\.${ext}$`, "i");
      const cssModuleRegex = new RegExp(`\.module\.${ext}$`, "i");
      return [
        {
          test: regularStyleRegex,
          use: generateUse(isProd, moreLoaders),
          exclude: cssModuleRegex,
        },
        {
          test: cssModuleRegex,
          use: generateUse(isProd, moreLoaders),
        },
      ];
    };
    return [generateRule("css"), generateRule("less", ["less-loader"])];
  },
};
