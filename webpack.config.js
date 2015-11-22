const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        './cc_spriter.js'
    ],
    //devtool : 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'cc_spriter.js'
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
    plugins: [
    ]
};