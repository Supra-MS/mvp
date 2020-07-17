let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/src/index.js',
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.(css)$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/src/index.html'
    })
  ]
}