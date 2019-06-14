const path = require('path');
//const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './css'
            },
          },
          'css-loader',
        ],
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        use: ['css-loader', 'sass-loader'],
        //loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    //new ExtractTextPlugin({
    //  filename: './css/[name].bundle.css',
    //  allChunks: true
    //}),
    new MiniCssExtractPlugin({
      filename: './css/[name].bundle.css',
      chunkFilename: './css/[id].css',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.sass', '.scss', '.css']
  },
  output: {
    filename: './js/[name].bundle.js',
    path: path.resolve(__dirname, 'app', 'static')
  }
};
