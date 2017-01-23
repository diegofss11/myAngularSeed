var path = require('path');
var config = require('./configuration');
var dev = process.env.NODE_ENV !== 'production';

//WEBPACK - PRELOADERS
var preLoaders = {
  jshintPreLoader: {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'jshint-loader'
  }
};

//WEBPACK - LOADERS
var loaders = {
  htmlLoader: {
    test: /\.html$/,
    exclude: /node_modules/,
    loaders: ['html']
  },
  cssLoader: {
    test: /\.css$/,
    exclude: /node_modules/,
    loader: 'style-loader!css-loader'
  },
  scssLoader: {
    test: /\.scss$/,
    exclude: /node_modules/,
    loader: 'style-loader!css-loader!sass-loader'
  }
};

module.exports = {
  devtool: dev ? 'inline-sourcemap' : null,
  entry: [
    './configuration.js',
    './app/src/scripts/index.js'
  ],
  module: {
    loaders: [
      loaders.htmlLoader,
      loaders.cssLoader,
      loaders.scssLoader
    ],
    preLoaders: [
      preLoaders.jshintPreLoader
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist/scripts'),
    publicPath: '/dist/scripts/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },

  /////////////////////////////////////////////////////////////////////////////////////
  // WEBPACK-DEV-SERVER
  /////////////////////////////////////////////////////////////////////////////////////
  devServer: {
    open: true,
    contentBase: 'dist',
    port: config.port,
    clientLogLevel: 'warning'
  }
};
