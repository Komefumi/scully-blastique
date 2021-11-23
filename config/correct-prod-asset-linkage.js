const { distPath } = require("./paths");

try {
  const allFiles = fs.readdirSync(distPath);
  const bundleFiles = allFiles.filter((file) => file.endsWith(".js"));

  bundleFiles.forEach((fileName) => {
    const appName = fileName.split(".")[0];
    const webpagePath = path.join(distPath, `${appName}.html`);
    if (fs.existsSync(webpagePath)) {
      const contents = fs.readFileSync(webpagePath);
      contents.replace(/<script>.*<\/script>/, `<script src=${file}></script>`);
    }
  });
  console.log("Bundle path correction in web pages has been successfully completed");
  process.exit(0);
} catch (error) {
  console.log(error);
  console.error("Failed to complete bundle path correction in web pages");
  process.exit(1);
}
