const path = require("path");

module.exports = {
  entry: "./Scripts/index.js",
  // The Location of the build folder described above
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: "eval-source-map",
};
