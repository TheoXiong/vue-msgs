var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, './public/index.js'),
  output: {
    path: path.resolve(__dirname, './public'),
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: 'index.min.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ["es2015"]
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#source-map',
  externals: ['fs', 'url', 'process']
}

