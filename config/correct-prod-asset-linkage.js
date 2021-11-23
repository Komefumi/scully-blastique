const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");
const beautify = require("beautify");

const { distDir } = require("./paths");
const fileTypes = require("./file-types");
const regexMap = require("./regex");

try {
  const allFiles = fs.readdirSync(distDir);
  const typeToFileListMap = {
    [fileTypes.JS]: [],
    [fileTypes.CSS]: [],
    [fileTypes.HTML]: [],
  };

  allFiles.forEach((fileName) => {
    const extensions = Object.keys(fileTypes);
    for (let i = 0; i < extensions.length; i++) {
      const currentExt = extensions[i];
      const regex = regexMap[currentExt];
      const currentList = typeToFileListMap[currentExt];

      if (regex.test(fileName)) {
        currentList.push(fileName);
        return;
      }
    }
  });

  typeToFileListMap[fileTypes.HTML].forEach((fileName) => {
    const appName = fileName.split(".")[0];
    const webpagePath = path.join(distDir, fileName);
    const contents = fs.readFileSync(webpagePath, "utf-8");
    const $ = cheerio.load(contents);
    let workingHtml = $.html();

    const typeToOuputFile = {
      [fileTypes.JS]: null,
      [fileTypes.CSS]: null,
    };

    Object.keys(typeToOuputFile).forEach((assetType) => {
      typeToOuputFile[assetType] = typeToFileListMap[assetType].find((fileName) => {
        if (fileName.startsWith(`${appName}.`)) return true;
        return false;
      });
    });

    const jsBundleFileName = typeToOuputFile[fileTypes.JS];

    if (jsBundleFileName) {
      const $ = cheerio.load(workingHtml);
      $("script").remove();
      $("body").append(`<script src="${jsBundleFileName}"></script>`);
      workingHtml = $.html();
    }

    const cssFileName = typeToOuputFile[fileTypes.CSS];

    if (cssFileName) {
      const $ = cheerio.load(workingHtml);
      $("head").append(`<link rel="stylesheet" href="${cssFileName}" />`);
      workingHtml = $.html();
    }
    fs.writeFileSync(webpagePath, beautify(workingHtml, { format: "html" }));
  });
  console.log("Bundle path correction in web pages has been successfully completed");
  process.exit(0);
} catch (error) {
  console.log(error);
  console.error("Failed to complete bundle path correction in web pages");
  process.exit(1);
}
