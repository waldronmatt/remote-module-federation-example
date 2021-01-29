const path = require("path");
const webpack = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  mode: "production",
  target: "web",
  entry: {
    app: ["./src/bootstrap.js"],
  },
  output: {
    filename: "[name].[contenthash:8].js",
    // specify chunck path for code splitted files
    chunkFilename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "https://remote-module-federation-example.netlify.app/",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
  optimization: {
    minimize: true,
    minimizer: [
      // for webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
      "...",
      new CssMinimizerPlugin(),
    ],
    /*
      SplitChunks finds modules which are shared between chunks and splits them
      into separate chunks to reduce duplication or separate vendor modules from application modules.
    */
    splitChunks: {
      /*
        cacheGroups tells SplitChunksPlugin to create chunks based on some conditions
      */
      cacheGroups: {
        // vendor chunk
        vendor: {
          // name of the chunk - make sure name is unqiue to avoid namespace collisions w/ module federation
          name: "vendors-remote",
          // Optimization over Async and Sync Module (a default'ish' setting for chuncks)
          chunks: "all",
          // import file path containing node_modules
          test: /node_modules/,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "Remote",
      description: "Remote App of Module Federation",
      template: "src/template.ejs",
      excludeChunks: ["server"],
    }),
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
