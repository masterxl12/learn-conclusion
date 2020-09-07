const {resolve} = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
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
            },
            // eslint-loader
            {
                test: /\.js$/,
                use: 'eslint-loader',
                enforce: 'pre',
                // enforce:'post',
                // 排除node_modules下的js文件
                exclude: /node_modules/,
                // 只检测src下的js文件
                include: resolve(__dirname, 'src'),
                options: {}
            },
            {
                // 以下配置，针对一种文件类型只会匹配一个loader，一旦匹配成功，后面的loader不做处理
                oneOf: []
            }
        ]
    }
}

