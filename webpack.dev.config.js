const path = require("path");
const chokidar = require("chokidar");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  target: "web",
  mode: "development",
  entry: {
    app: ["./src/bootstrap.js"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9000/",
  },
  /* 
    hot reloading broken in dev-server, use chokidar instead: 
    https://github.com/webpack/webpack-dev-server/issues/2906
  */
  devServer: {
    before(app, server) {
      chokidar.watch(["./src/**/**"]).on("all", function () {
        server.sockWrite(server.sockets, "content-changed");
      });
    },
    contentBase: path.resolve(__dirname, "./dist"),
    index: "index.html",
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.tpl/,
        type: "asset/source",
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "Remote",
      description: "Remote App of Module Federation",
      template: "src/template.ejs",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ModuleFederationPlugin({
      name: "FormApp",
      filename: "remoteEntry.js",
      exposes: {
        "./initContactForm": "./src/form/init-contact-form",
      },
      /*
        - adds all your dependencies as shared modules
        - version is inferred from package.json in the dependencies
        - requiredVersion is used from your package.json
        - dependencies will automatically use the highest available package in the federated app, 
          based on version requirement in package.json
        - multiple different versions might coexist in the federated app
        - Note that this will not affect nested paths like "lodash/pluck"
        - Note that this will disable some optimization on these packages which might lead to bundle size problems
      */
      shared: require("./package.json").dependencies,
    }),
  ],
};
