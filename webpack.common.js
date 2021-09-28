const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
   entry: "./src/app.js",
   plugins: [
      new HtmlWebpackPlugin({
         template: "./src/index.html",
         cache: false,
      }),
   ],
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: require.resolve("babel-loader"),
         },
         {
            test: /\.html$/,
            use: ["html-loader"],
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: "asset/resource",
         },
         {
            test: /\.png|svg|jpg|gif$/,
            type: "asset/resource",
            generator: {
               filename: "graphics/[hash][ext]",
            },
         },
      ],
   },
};
