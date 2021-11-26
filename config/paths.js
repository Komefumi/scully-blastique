const path = require("path");

const srcDir = path.join(__dirname, "..", "src");
const assetsDir = path.join(srcDir, "assets");
const scriptsDir = path.join(srcDir, "scripts");

module.exports = {
  srcDir,
  scriptsDir,
  assetsDir,
  utilsDir: path.join(scriptsDir, "utils"),
  entryDir: path.join(scriptsDir, "entry"),
  componentsDir: path.join(scriptsDir, "components"),
  uiComponentsDir: path.join(scriptsDir, "ui"),
  pagesDir: path.join(scriptsDir, "pages"),
  layoutsDir: path.join(scriptsDir, "layouts"),
  typesDir: path.join(scriptsDir, "types"),
  appsDir: path.join(scriptsDir, "apps"),
  distDir: path.join(__dirname, "..", "dist"),
  webpageDir: path.join(__dirname, "..", "src", "webpages"),
}
