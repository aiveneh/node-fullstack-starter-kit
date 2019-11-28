const dotenv = require('dotenv');
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

dotenv.config();

const { NODE_ENV } = process.env;
const isDev = NODE_ENV === 'development';
const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v');
const isAnalyse = process.argv.includes('--analyse');
const isServer = process.argv.includes('--server');
const isBrowser = !isServer;

console.log('isServer - ', isServer);

const clientContext = path.resolve(__dirname, 'react');
const serverContext = path.resolve(__dirname, 'server');

const clientOutputPath = path.resolve(__dirname, 'public/dist');
const serverOutputPath = path.resolve(__dirname, 'bin');

const clientAppEntry = './app.tsx';
const serverAppEntry = './server.ts';

module.exports = {
  mode: NODE_ENV,
  target: isServer ? 'node' : 'web',
  devtool: isDev ? 'source-maps' : undefined,
  watch: isDev,
  context: isServer ? serverContext : clientContext,
  entry: {
    app: isServer ? serverAppEntry : clientAppEntry,
  },
  optimization: {
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimize: NODE_ENV === 'production',
    minimizer: [
      new TerserPlugin({
        test: [/\.ts(\?.*)?$/i, /\.tsx(\?.*)?$/i, /\.mjs(\?.*)?$/i, /\.js(\?.*)?$/i],
        cache: true,
        parallel: true,
      }),
    ],
  },
  output: {
    path: isServer ? serverOutputPath : clientOutputPath,
  },
  plugins: isServer ? [] : [
    new CompressionPlugin({
      test: [/\.ts(\?.*)?$/i, /\.tsx(\?.*)?$/i, /\.mjs(\?.*)?$/i, /\.js(\?.*)?$/i],
      deleteOriginalAssets: true,
      include: /\/react/,
      exclude: /\/server/,
    }),
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      BROWSER_SUPPORTS_HTML5: true,
      'typeof window': JSON.stringify('object'),
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.PUBLIC_URL': JSON.stringify('http://localhost:3030'),
    }),
    // new BundleAnalyzerPlugin()
  ],
  resolve: {
    extensions: ['.mjs', '.tsx', '.ts', '.js'],
  },
  externals: isServer ? nodeExternals() : {},
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: [/node_modules/, /public/, '/view/', '/bin/'],
        use: [
          {
            loader: "ts-loader"
          }
        ]
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
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ],
  },
};
