const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'app', 'assets'),
  entry: ['./ts/index.ts', './scss/main.sass'],
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader?importLoaders=1'
        }),
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './css/[name].bundle.css',
      allChunks: true
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.sass', '.scss', '.css']
  },
  output: {
    filename: './js/[name].bundle.js',
    path: path.resolve(__dirname, 'app', 'static')
  }
};
