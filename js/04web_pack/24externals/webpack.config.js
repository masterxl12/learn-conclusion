const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 使用dll技术，对某些库单独打包，对代码单独打包

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: []
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // 压缩html代码
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        })
    ],
    // 生产环境下会自动压缩js代码
    mode: 'production',
    externals: {
        // 决绝jQuery被打包进来
        jquery: 'jQuery'
    }
};