const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
console.log("========", resolve(__dirname, 'dll/jquery.js'));
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    // loader的配置
    module: {
        rules: []
    },
    // plugins的配置
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 告诉webpack哪些库不参与打包，同时使用时的名称也得变~
        // 告诉webpack使用了哪些第三方库代码
        new webpack.DllReferencePlugin({
            // jquery 映射到json文件上去
            context: resolve(__dirname, '..'), // 这行需要加上 不加报错
            manifest: resolve(__dirname, 'dll/jquery.manifest.json')
        }),
        new webpack.DllReferencePlugin({
            // echarts 映射到json文件上去
            context: resolve(__dirname, '..'), // 这行需要加上 不加报错
            manifest: resolve(__dirname, 'dll/echarts.manifest.json')
        }),
        // 将某个文件打包输出去，并在html中自动引入该资源
        new AddAssetHtmlPlugin(
            [
                {filepath: require.resolve("./dll/jquery.dll.js")},
                {filepath: require.resolve("./dll/echarts.dll.js")},
            ]
        )
    ],
    // 模式
    mode: 'production', // 生产模式
}