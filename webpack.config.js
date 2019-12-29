const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './src/js/index.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({filename: "index.html", template: './src/index.html'})
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    compress: true,
    port: 9000
  },
  mode: 'development'
};