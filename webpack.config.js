const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const THEME = 'sidecar';

const THEME_DIR = './themes/' + THEME + '/src/';
const extractStyles = new ExtractTextPlugin('css/style.css');

module.exports = {
  entry: {
    index: THEME_DIR + 'js/index.js',
    '../sw': THEME_DIR + 'sw.js',
    css: THEME_DIR + 'css/style.css',
  },
  output: {
    path: __dirname + '/themes/' + THEME + '/static',
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: extractStyles.extract({
          loader: [
            {
              loader: 'css-loader',
              options: {minimize: true},
            },
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        loader: 'file?name=css/fonts/[name].[ext]',
      },
    ],
  },
  plugins: [new UglifyJSPlugin(), extractStyles],
};
