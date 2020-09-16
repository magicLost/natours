const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  stories: ["../src/**/*.stories.js"],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]],
      },
    });

    config.resolve.extensions.push(".ts", ".tsx");

    config.module.rules.push({
      test: /\.scss$/,
      exclude: /\.module.scss$/,
      loaders: [
        //MiniCssExtractPlugin.loader,
        "style-loader?sourceMap",
        "css-loader?sourceMap",
        "sass-loader?sourceMap",
      ],
    });

    config.module.rules.push({
      test: /\.module.scss$/,
      loaders: [
        //MiniCssExtractPlugin.loader,
        "style-loader?sourceMap",
        "css-loader?modules&sourceMap&localIdentName='[name]__[local]--[hash:base64:9]'",
        "sass-loader?sourceMap",
      ],
    });

    config.plugins.push(
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, "..", "src", "static"),
          to: "./",
        },
      ])
    );

    return config;
  },
  addons: [
    "@storybook/addon-knobs/register",
    "@storybook/addon-actions",
    "@storybook/addon-links",
  ],
};
