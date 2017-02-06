const path = require('path');

module.exports = {
  entry: [
    './cc_spriter.js'
  ],
  output: {
    path: path.join(__dirname, 'bower_components/temp/'),
    filename: 'cc_spriter_component.js'
  },
  externals: {},
  resolve: {},
  module: {
    loaders: [
      {
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: []
};