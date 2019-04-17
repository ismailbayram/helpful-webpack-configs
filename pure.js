const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const mainPath = path.join(__dirname, './');

module.exports = {
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({}), new UglifyJsPlugin()],
  },
  resolve: {
    alias: {
      assets: mainPath,
      js: path.join(mainPath, 'js'),
      less: path.join(mainPath, 'less'),
      img: path.join(mainPath, 'img'),
      fonts: path.join(mainPath, 'fonts')
    }
  },
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {}
          },
          'less-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          MiniCssExtractPlugin.loader]
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.jpe?g$|\.gif$|\.svg$|\.png$/i,
        loader: 'file-loader'
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
      chunkFilename: 'style.css'
    })
  ]
};

