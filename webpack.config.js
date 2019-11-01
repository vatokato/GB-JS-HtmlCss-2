const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin  = require("mini-css-extract-plugin");
const argv = require('yargs').argv;
const isProduction = argv.mode === 'production';

module.exports = {
  entry: __dirname + '/src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          isProduction
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          {
          loader: 'css-loader',
            options: {
              sourceMap: true,
            }
          }, {
            loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|mp4)$/i,
        loader: 'file-loader',
        options: {
          name(file) {
            if (isProduction) {
              return './img/[contenthash].[ext]';
            }
            return '[path][name].[ext]';
          },
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './bundle.css',
    })
  ],
  devServer: {
    contentBase: '/',
    port: 7000,
  }
}