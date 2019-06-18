const dotenv = require('dotenv');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

dotenv.config();

const { NODE_ENV } = process.env;

module.exports = {
  mode: NODE_ENV,
  devtool: 'source-maps',
  watch: false,
  context: path.resolve(__dirname, 'react'),
  entry: {
    app: './app.jsx',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimize: NODE_ENV === 'production',
    minimizer: [
      new TerserPlugin({
        test: [/\.js(\?.*)?$/i, /\.jsx(\?.*)?$/i, /\.mjs(\?.*)?$/i],
        cache: true,
        parallel: true,
      }),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public/dist'),
  },
  plugins: [
    new CompressionPlugin({
      test: [/\.js(\?.*)?$/i, /\.jsx(\?.*)?$/i, /\.mjs(\?.*)?$/i],
      deleteOriginalAssets: true,
    }),
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      // PRODUCTION: JSON.stringify(true),
      // BROWSER_SUPPORTS_HTML5: true,
      // 'typeof window': JSON.stringify('object'),
      // 'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  resolve: {
    extensions: ['.mjs', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: [/node_modules/, /public/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        // exclude: [/node_modules/, /public/],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
    ],
  },
};
