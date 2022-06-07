const path = require("path");

module.exports = {
  entry: "./src/index.js",
  // The Location of the build folder described above
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: "eval-source-map",
};
