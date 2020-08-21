const {
    resolve
} = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        // loader config
        rules: [
            // less loader
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            // css loader
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // img-loader
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            },
            // html-loader
            {
                test: /\.html$/,
                loader: 'file-loader'
            },
            // 打包其他资源 如字体图标
            {
                exclude: /\.(js|html|css)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    // 插件配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    // 本地开发服务器
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        compress: true,
        open: true,
        port: 3000
    },
    mode: 'development'
}