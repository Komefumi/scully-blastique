const path = require("path");

const srcDir = path.join(__dirname, "..", "src");
const scriptsDir = path.join(srcDir, "scripts");

module.exports = {
  srcDir,
  scriptsDir,
  entryDir: path.join(scriptsDir, "entry"),
  componentsDir: path.join(scriptsDir, "components"),
  pagesDir: path.join(scriptsDir, "pages"),
  appsDir: path.join(scriptsDir, "apps"),
  distDir: path.join(__dirname, "..", "dist"),
  webpageDir: path.join(__dirname, "..", "src", "webpages"),
}
