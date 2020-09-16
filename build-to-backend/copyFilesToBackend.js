const FileSystemHelper = require("utils-library-lost/FileSystemHelper/FileSystemHelper")
  .default;
const path = require("path");
const nodeFs = require("fs");

//console.log(FileSystemHelper);

const fs = new FileSystemHelper();

//console.log("Helo");

const backendPublicDir = "../../../../Natours/Natours_Backend";
const frontendDistDir = "../dist";

//console.log("Helo1");

const run = async () => {
  try {
    //console.log("Helo2");
    //remove old files
    await fs.deleteDir(
      path.resolve(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "Natours",
        "Natours_Backend",
        "public"
      )
    );

    //rename index to iiindex
    nodeFs.renameSync(
      path.resolve(__dirname, "..", "build", "index.html"),
      path.resolve(__dirname, "..", "build", "iiindex.html")
    );

    //copy dist dir to backend
    await fs.copyDir(
      path.resolve(__dirname, "..", "build"),
      path.resolve(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "Natours",
        "Natours_Backend",
        "public"
      )
    );

    //copy images
    fs.copyDir(
      path.resolve(__dirname, "..", "src", "static", "images"),
      path.resolve(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "Natours",
        "Natours_Backend",
        "public",
        "images"
      ),
      true
    );
  } catch (err) {
    console.log("[ERROR] COPY FILES TO BACKEND", err);
  }
};

run();
