const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(tokens|interp)$/i,
        use: 'raw-loader'
      },
    ],
  },
  node: {
    fs: 'empty'
  },
  output: {
    library: 'SolidityParser',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'solidity-parser.js',
    globalObject: 'this'
  },
  optimization: {
    minimize: false
  },
  devtool: 'source-map'
};
