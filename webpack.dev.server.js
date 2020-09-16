const path = require("path");
const webpack = require("webpack");
//const merge = require('webpack-merge');
//const clientProdConfig = require('./webpack.prod.client');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpackNodeExternals = require("webpack-node-externals");

const config = {
  target: "node",

  mode: "development",

  entry: "./src/server.ts",

  output: {
    filename: "server.build.js",
    path: path.resolve(__dirname, "dist-server"),
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".scss", ".css", ".svg", ".png"],
  },

  externals: [webpackNodeExternals()],

  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.join(__dirname, "src")],
        loader: "babel-loader",
      },
    ],
  },

  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
    process: false,
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

  /* watch: true,
  watchOptions: {
    aggregateTimeout: 500,
    ignored: /node_modules/,
  }, */
};

/* const cfg = merge(clientProdConfig, config);

cfg.plugins[1] = new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify("development"),
    "process.env.PASS": JSON.stringify("paasss1234")
  }); */

//console.log("CONFIG", cfg);

module.exports = config;
