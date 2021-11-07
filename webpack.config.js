const { di } = require("@wessberg/di-compiler");
const HTMLWeebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          getCustomTransformers: (program) => di({ program }),
          configFile: "./tsconfig.json",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HTMLWeebPackPlugin({
      template: "./index.html",
      filename: "./index.html",
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
