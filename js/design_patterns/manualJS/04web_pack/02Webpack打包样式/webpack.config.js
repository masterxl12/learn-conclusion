const {resolve} = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    // loader的配置
    module: {
        // 不同文件必须配置不同loader处理
        rules: [
            // 详细loader配置
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {

                test: /\.less/,
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        // 详细plugins的配置
    ],
    mode: 'development'
    // mode:production
};
