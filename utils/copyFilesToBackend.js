const FileSystemHelper = require("utils-library-lost/FileSystemHelper/FileSystemHelper")
  .default;
const path = require("path");
const nodeFs = require("fs");

//console.log(FileSystemHelper);

const fs = new FileSystemHelper();

//console.log("Helo");

const backendPublicDir = "../../Natours_Backend/public";
const frontendDistDir = "../dist";

//console.log("Helo1");

const run = async () => {
  try {
    //console.log("Helo2");
    //remove old files
    await fs.deleteDir(
      path.resolve(__dirname, "..", "..", "Natours_Backend", "public")
    );

    //rename index to iiindex
    nodeFs.renameSync(
      path.resolve(__dirname, "..", "dist", "index.html"),
      path.resolve(__dirname, "..", "dist", "iiindex.html")
    );

    //copy dist dir to backend
    await fs.copyDir(
      path.resolve(__dirname, "..", "dist"),
      path.resolve(__dirname, "..", "..", "Natours_Backend", "public")
    );

    //copy images
    fs.copyDir(
      path.resolve(__dirname, "..", "src", "static", "img"),
      path.resolve(__dirname, "..", "..", "Natours_Backend", "public", "img"),
      true
    );
  } catch (err) {
    console.log("[ERROR]", err.message);
  }
};

run();
