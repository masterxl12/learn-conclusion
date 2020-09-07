const {
    resolve
} = require('path');
/**
 * HMR: hot module replacement / 模块热替换
 *      作用： 一个模块发生变化。只会重新打包这一个模块(而不是打包所有模块)
 *            极大提升构建速度
 *      样式文件：
 *              可以使用HMR功能，因为style-loader内部实现了
 *      js文件：
 *              默认不能使用HMR功能 --> 需要修改js代码，添加支持HMR功能的代码
 *              注意：HMR功能对js的处理，只能处理非入口js文件的其他文件。
 *      html文件:
 *              默认不能使用HMR功能，同时会导致问题：html文件不能热更新了~ （不用做HMR功能）
 *              解决：修改entry入口，将html文件引入
 *
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/js/index', './src/index.html'],
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
                    outputPath: 'images'  // 指定图片资源的输出目录
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
        port: 3000,
        // 开启HMR功能
        // 当修改了webpack配置，新配置要想生效，必须重启webpack服务
        hot: true
    },
    mode: 'development'
};