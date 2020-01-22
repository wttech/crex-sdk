import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import fs from "fs";
import path from "path";

chai.use(chaiAsPromised);
const expect = chai.expect;
import CrEx from "../src/lib/crex";

describe("CrEx", () => {
  const crex = new CrEx({
    password: "admin",
    port: "4502",
    url: "localhost",
    user: "admin",
  });

  describe("#buildPackage", () => {
    it("should build package", () => {
      return expect(crex.buildPackage({
        packageId: "4731bd1f-876b-4879-b27a-fb58d6d2248f",
      })).to.eventually.be.a("object");
    });
  });

  describe("#uploadPackage", () => {
    it("should upload package", () => {
      return expect(crex.uploadPackage({
        file: fs.createReadStream(path.resolve(__dirname, "test-package.zip")),
      })).to.eventually.be.a("object");
    });
  });

  describe("#installPackage", () => {
    it("should install package", () => {
      return expect(crex.installPackage({
        packageId: "4731bd1f-876b-4879-b27a-fb58d6d2248f",
      })).to.eventually.be.a("object");
    });
  });

  describe("#createPackage and #deletePackage", () => {
    it("should create package and delete it", () => {
      const request = new Promise((resolve, reject) => {
        crex.createPackage({
          rootPath: "/content/we-retail/us/en/user/cart",
        })
        .then((res: any) => {
          // TODO
          // There is a problem with new CE api, we cannot delete the package immediately after creation.
          // When we try even though we have `packageId`, `delete` request will fail.
          setTimeout(() => {
            crex.deletePackage({
              packageId: res.packageId,
            })
            .then((res: any) => resolve(res))
            .catch((err: any) => reject(err));
          }, 1000);
        })
        .catch((err: any) => reject(err));
      });

      return expect(request).to.eventually.be.a("string");
    });
  });
});
