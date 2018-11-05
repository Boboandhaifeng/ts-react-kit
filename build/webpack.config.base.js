const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
    //入口文件的路径
    entry: {
        app: [path.resolve(__dirname, '../src/index.tsx')]
        // ,
        // vendor: [
        //     // 'lodash',
        //     'react',
        //     'react-dom'
        //     // 'antd'
        //     // 'react-redux',
        //     // 'react-router',
        //     // 'react-router-redux',
        //     // 'redux',
        //     // 'redux-thunk'
        // ]
    },
    output: {
        //打包的输出路径
        path: path.resolve(__dirname, "../dist"),
        publicPath: '/',
        filename: "[name].js",
        chunkFilename: '[name].[chunkhash:8].js'
    },
    // 添加需要解析的文件格式
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.less'],
        modules: [
            path.join(__dirname, '../src'),
            'node_modules'
        ],
        alias: {
            "components": path.resolve(__dirname, "../src/components"),
            "utils": path.resolve(__dirname, "../src/utils"),
            "pages": path.resolve(__dirname, "../src/pages")
        }
    },
    module: {
        rules: [{
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, '../src')
                ],
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties']
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {}
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                options: {
                  getCustomTransformers: () => ({
                    before: [ tsImportPluginFactory({
                        libraryName: 'antd',
                        libraryDirectory: 'lib',
                        style: true
                    }) ]
                  }),
                  exclude: /node_modules/
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Demo',
            template: './index.html',
        })
    ],
    optimization: {
        // splitChunks: {
        //     cacheGroups: {
        //         commons: {
        //             name: "commons",
        //             chunks: "initial",
        //             minChunks: 2
        //         }
        //     }
        // }
        runtimeChunk: 'single',
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                libs: {
                    name: "chunk-libs",
                    test: /[\\/]node_modules[\\/]/,
                    priority: 10,
                    chunks: "initial" // 只打包初始时依赖的第三方
                },
                antd: {
                    name: "chunk-antd", // 单独将 antd 拆包
                    priority: 1, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                    test: /[\\/]node_modules[\\/]antd[\\/]/
                },
                commons: {
                    name: "chunk-commons",
                    test: path.resolve('src/components'), // 可自定义拓展你的规则
                    minChunks: 2, // 最小共用次数
                    priority: 5,
                    reuseExistingChunk: true
                }
            }
        }
    }
}