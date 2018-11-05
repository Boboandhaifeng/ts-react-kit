const webpack = require('webpack'),
    path = require("path"),
    merge = require('webpack-merge'),
    baseWebpackConfig = require('./webpack.config.base'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: [{
            test: /\.(less|css)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ["css-loader", {
                    loader: 'less-loader',
                    query: {
                        javascriptEnabled: true
                    }
                }]
            }) 
        }]
    },
    plugins: [
        new CleanWebpackPlugin('dist', {
            root: path.resolve(__dirname, '..'),
            verbose: false
        }),
        new CopyWebpackPlugin([ // 复制高度静态资源
            {
                context: path.join(__dirname, 'src/lib'),
                from: '**/*',
                ignore: ['*.md']
            }
        ]),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 30000
        }),
        new ExtractTextPlugin('[name].css', {
            allChunks: true // 若要按需加载 CSS 则请注释掉该行
        }),
        new BundleAnalyzerPlugin()
    ],
    //压缩js
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
              uglifyOptions: {
                mangle: {
                  safari10: true
                }
              },
              cache: true,
              parallel: true
            }),
        ]
    }
})
