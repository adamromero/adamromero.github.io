const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
   mode: "production",
   devtool: "source-map",
   output: {
      filename: "bundle.[contenthash].js",
      path: path.resolve(__dirname, "dist"),
      clean: true,
   },

   plugins: [
      new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
      new CleanWebpackPlugin(),
   ],
   module: {
      rules: [
         {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
         },
      ],
   },
});
