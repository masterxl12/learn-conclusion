const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        index: ['./src/index.js', './src/sum.js'],
        multi: './src/multi.js'
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'build')
    },
    module: {},
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
};