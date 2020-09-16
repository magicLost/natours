const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: path.join(__dirname, "src", "index.tsx"),

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss", ".css", ".svg", ".png"],
  },

  externals: {
    fs: "fs",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [
          path.join(__dirname, "src"),
          path.join(__dirname, "node_modules", "react-components-lib-lost"),
        ],
        loader: "babel-loader",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: "file-loader?name=static/font/[name]-[hash:7].[ext]",
      },
    ],
  },

  plugins: [
    new webpack.WatchIgnorePlugin([
      "global.d.ts",
      "scss/.d.ts$/",
      "css/.d.ts$/",
      "svg/.d.ts$/",
    ]),
    new CleanWebpackPlugin(),
  ],
};
