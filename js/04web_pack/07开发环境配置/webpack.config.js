const {
    resolve
} = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index',
    output: {
        filename: 'js/built.js',   // 指定js文件的输出目录
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
            // css loader      css文件打包后和js文件融合一起
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
                    limit: 8 * 1024,
                    // 关闭es6模块化
                    esModule: false,
                    name: '[hash:10].[ext]',
                    outputPath:'images'  // 指定图片资源的输出目录
                }
            },
            // html-loader 处理html中的图片资源
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            // 打包其他资源 如字体图标
            {
                exclude: /\.(js|html|css|less|jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media' // 指定其他资源的输出目录
                }
            }
        ]
    },
    // 插件配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
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
};