import chai from "chai";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);
const expect = chai.expect;

function execShellCommand(cmd: string) {
  const exec = require("child_process").exec;
  return new Promise((resolve, reject) => {
      exec(cmd, (error: any, stdout: any, stderr: any) => {
      if (error) {
        reject(error);
      }

      resolve(stdout ? stdout : stderr);
    });
  });
}

xdescribe("CrEx (CLI) - create", () => {
  describe("$ ce create <path_to_content>", () => {
    it("should create package", () => {
      return expect(
        execShellCommand("node dist/bin/ce-create.js /content/we-retail/us/en/user/cart"),
      ).to.eventually.contain("test");
    });
  });

  xdescribe("ce create <path_to_content> -n <name>", () => {
    it("should create package with <name>", () => {
      return expect(
        execShellCommand("node dist/bin/ce-create.js /content/we-retail/us/en/user/cart -n cart"),
      ).to.eventually.contain("Package created named cart");
    });
  });
});
