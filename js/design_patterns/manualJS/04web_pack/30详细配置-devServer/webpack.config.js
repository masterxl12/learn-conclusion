const {
    resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {

    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development',
    devServer: {
        // 运行代码的目录
        contentBase: resolve(__dirname, 'build'),
        // 监视 contentBase 目录下的所有文件，一旦变化就reload
        watchContentBase: true,
        watchOptions: {
            // 忽略监视的文件
            ignored: /node_modules/
        },
        // 启动gzip压缩
        compress: true,
        port: 5000,
        host: 'localhost',
        // 自动打开浏览器
        open: true,
        // 开启HMR功能
        hot: true,
        // 不显示启动服务器日志信息
        clientLogLevel: 'none',
        // 除了一些基本信息以外，其他内容都不要显示
        quiet: true,
        proxy: {
            // 一旦服务器接受到api/xxx的请求，就会把请求转发到另一台服务器(3000)
            '/api': {
                target: 'http://localhost:3000',
                // changeOrigin默认是false：请求头中host仍然是浏览器发送过来的host
                // 如果设置成true -> 发送请求头中host会设置成 http://localhost:3000
                changeOrigin: true,
                // 发送请求时，请求路径重写：将 /api/user  ---> user(去掉/api)
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}