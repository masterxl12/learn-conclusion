const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    // 指定单入口文件
    entry: './src/index.js',
    output: {
        // 文件名称（指定名称+目录）
        filename: 'js/index.js',
        // 输出文件目录 （将来所有资源输出的公共目录）
        path: resolve(__dirname, 'build'),
        // 用于生产环境，部署时引入路径'/'
        publicPath: '/',
        // 非入口chunk的名称  （1.使用import导入的文件 2. node_modules文件）
        chunkFilename: 'js/[name]_chunk.js',
        // 整个库向外暴露的变量名,通常结合dll使用 将某个库单独打包,供外部调用
        library: '[name]',
        // libraryTarget: 'window', // 变量名添加到哪个平台，browser
        libraryTarget: 'global',    // 变量名添加到哪个平台，node

    },
    module: {},
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
};