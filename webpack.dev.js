const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const path = require("path");

module.exports = merge(common, {
   mode: "development",
   devtool: "inline-source-map",
   devServer: {
      static: "./dist",
   },
   output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
   },
   module: {
      rules: [
         {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader", "sass-loader"],
         },
      ],
   },
});
