const {resolve} = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 复用loader
const commonCssLoader = [
    // 还需要在package.json中定义browserslist
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        loader: 'postcss-loader',
        plugins: () => [
            require('postcss-preset-env')()
        ]
    }
];

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // css-loader 提取css文件为单独文件 兼容性
            {
                test: /\.css$/,
                use: [
                    ...commonCssLoader
                ]
            },
            {
                test: /\.less$/,
                use: [
                    ...commonCssLoader,
                    'less-loader',
                ]
            },
            /*
              正常来讲，一个文件只能被一个loader处理。
              当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                先执行eslint 在执行babel
            */
            // js-loader eslint
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                options: {
                    // 自动修复eslint的错误
                    fix: true
                }
            },
            // js-loader babel
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    // 预设 --> 指示babel做怎样的兼容性处理
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns: 'usage',
                                // 指定core-js版本
                                corejs: {
                                    version: 3
                                },
                                // 指定兼容性做到哪个版本浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            },
            // 处理image
            {
                test: /\.(jpg|png|gif)$/,

                loader: 'url-loader',
                options: {
                    // 小于 8kb，使用base64处理
                    limit: 8 * 1024,
                    outputPath: 'images',
                    // 关闭es6模块化
                    esModule: false,
                    name: '[hash:10].[ext]'
                }
            },
            // 处理html中img资源
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            // 处理其他资源 字体图标
            {
                test: /\.(js|css|less|html|jpg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'assets'
                }
            }
        ]

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // html文件压缩
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        // css 代码抽取
        new MiniCssExtractPlugin({
            // 对输出的css文件进行重命名 不配置默认为main.css
            filename: 'css/built.css'
        }),
        // 压缩css文件
        new OptimizeCssAssetsWebpackPlugin()
    ],
    // 生产环境，js文件会自动压缩
    mode: 'production'
};