const util = require("util");
const readFile = util.promisify(require("fs").readFile);
const exec = util.promisify(require("child_process").exec);

async function main() {
  try {
    const branchesInfoRaw = await readFile(".merge_destinations");
    const branchesList = branchesInfoRaw.toLocaleString().split("\n").filter((i) => i);
    let cmd = "";
    branchesList.forEach((branchName) => {
      cmd += `
        git checkout ${branchName}
        git merge main
      `;
    });
    console.log({ cmd });
    const { stdout, stderr } = await exec(cmd);
    console.log(stdout);
    console.log(stderr);
  } catch (error) {
    console.error(error);
  }
}

main();
