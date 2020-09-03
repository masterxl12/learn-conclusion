const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // css-loader
            {
                test: /\.css$/,
                // 多个loader用use
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development',
    resolve: {
        alias: {
            // 配置模块路径解析别名，优点简写路径，缺点路径没有提示
            $css: resolve(__dirname, 'src/css'),
        },
        // 配置省略文件后缀名的规则
        extensions: ['.js', '.json', '.jsx'],
        // 指定webpack解析模块寻找的文件路径
        modules: [resolve(__dirname, '../node_modules'), 'node_modules']
    }
}