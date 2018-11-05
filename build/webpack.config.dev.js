const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
    mode: 'development',
    entry:{
        app: [
            // 'eventsource-polyfill',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=100000&reload=true',
            'webpack/hot/only-dev-server'
        ]
    },
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.(less|css)$/,
            use: ["style-loader", "css-loader",
            {
                loader: 'less-loader',
                query: {
                    javascriptEnabled: true
                }
            }]
        }]
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new BrowserSyncPlugin({
            host: '127.0.0.1',
            port: 9090,
            proxy: 'http://127.0.0.1:3336/',
            logConnections: false,
            notify: false
        }, {
            reload: false
        })
    ]
})