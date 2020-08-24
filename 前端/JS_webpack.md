

Webpack是一种前端资源构建工具，一个静态模块打包器。在Webpack看来，前端的所有资源文件(js/json/css/img/less/...)都会作为模块处理。它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源(bundle).

> 根据入口文件的依赖关系，将不同前端资源引进，引进之后形成chunk(代码块)，根据chunk按照不同模块进行处理,处理过程即为打包，打包之后输出的文件称为bundle。

### 1 webpack的五个核心概念

- Entry
  
- 入口(Entry)指示Webpack以哪个文件为入口起点开始打包，分析构建内部依赖图。
  
- Output
  
- 输出(Output)指示Webpack打包后的资源bundles输出到哪里去，以及如何命名。
  
- Loader(类似翻译官)
  - webpack自身只理解js文件
  - Loader让webpack能够去处理那些非JavaScript文件，在大包之前识别那些css/img/less文件

- Plugins
  - 插件(Plugins)可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等。
  - 想要使用一个插件，你只需要 `require()` 它，然后把它添加到 `plugins` 数组中。

- Mode

  模式(Mode)指示Webpack使用相应模式的配置

| 选项        | 描述                                       | 特点                       |
| ----------- | ------------------------------------------ | -------------------------- |
| development | 会将process.env.Node_ENV 值设为developemnt | 能让代码本地调试运行的环境 |
| production  | 会将process.env.Node_ENV 值设为production  | 能让代码优化上线运行的环境 |

### 2 webpack初体验

```js
/*
  index.js: webpack入口起点文件
  1. 运行指令：
    开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
      webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js
      整体打包环境，是开发环境
    生产环境：webpack ./src/index.js -o ./build/built.js --mode=production
      webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js
      整体打包环境，是生产环境
   2. 结论：
    1. webpack能处理js/json资源，不能处理css/img等其他资源
    2. 生产环境和开发环境将ES6模块化编译成浏览器能识别的模块化~
    3. 生产环境比开发环境多一个压缩js代码。
*/
```

```js
开发环境：
webpack ./src/index.js -o ./build/built.js --mode=development
```

```js
生产环境：
webpack ./src/index.js -o ./build/built.js --mode=production
```

```js
1. webpack能处理js/json资源，不能处理css/img等其他资源
2. 生产环境和开发环境将ES6模块化编译成浏览器能识别的模块化~
3. 生产环境比开发环境多一个压缩js代码。
```

### 3 webpack打包

#### 3.1 打包css/less样式文件

```nginx
npm i style-loder css-loader less-loader -D
```

webpack.config.js

```js
/*
  webpack.config.js  webpack的配置文件
    作用: 指示 webpack 干哪些活（当你运行 webpack 指令时，会加载里面的配置）
    所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs。
*/

// resolve用来拼接绝对路径的方法
const { resolve } = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    // 输出文件名
    filename: 'built.js',
    // 输出路径
    // __dirname nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build')
  },
  // loader的配置
  module: {
    rules: [
      // 详细loader配置
      // 不同文件必须配置不同loader处理
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序：从右到左，从下到上 依次执行
          // 创建style标签，将js中的样式资源插入进行，添加到head中生效
          'style-loader',
          // 将css文件变成commonjs模块加载js中，里面内容是样式字符串
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          // 将less文件编译成css文件
          // 需要下载 less-loader和less
          'css-loader',
          'less-loader'
        ]
      },
    ]
  },
  // plugins的配置
  plugins: [
    // 详细plugins的配置
  ],
  // 模式
  mode: 'development', // 开发模式
  // mode: 'production' // 生产模式
}
```



#### 3.2 打包html文件

```js
// html-webpack-plugin
// 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
// 需求：需要有结构的HTML文件
new HtmlWebpackPlugin({
  // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
  template: './src/index.html'
})
```
```nginx
npm i html-webpack-plugin -D
```

webpack.config.js

```js
/*
  loader: 1. 下载   2. 使用（配置loader）
  plugins: 1. 下载  2. 引入  3. 使用
*/

// resolve用来拼接绝对路径的方法
const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  // loader的配置
  module: {
    rules: [
    ]
  },
  // plugins的配置
  plugins: [
    // 详细plugins的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html'
    })
  ],
  // 模式
  mode: 'development', // 开发模式
  // mode: 'production' // 生产模式
}
```

#### 3.3 打包图片

```
url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
```

```nginx
npm i file-loader url-loader html-loader -D
```

webpack.config.js

```js
const { resolve } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  // loader的配置
  module: {
    rules: [
      {
        test: /\.less$/,
        // use 使用 多个loader 处理要使用use
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        // 问题：默认处理不了html中img图片
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        // 使用一个loader
        // 下载 url-loader file-loader
        loader: 'url-loader',
        options: {
          // 图片大小小于8kb，就会被base64处理
          // 优点: 减少请求数量（减轻服务器压力）
          // 缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
          // 解析时会出问题：[object Module]
          // 解决：关闭url-loader的es6模块化，使用commonjs解析
          esModule: false,
          // 给图片进行重命名
          // [hash:10]取图片的hash的前10位
          // [ext]取文件原来扩展名
          name: '[hash:10].[ext]'
        }
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader'
      }
    ]
  },
  // plugins的配置
  plugins: [
    // 详细plugins的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html'
    })
  ],
  // 模式
  mode: 'development', // 开发模式
  // mode: 'production' // 生产模式
}
```



#### 3.4 打包其他资源

字体图标

引入阿里巴巴字体图标库[链接](https://www.iconfont.cn/collections/index?spm=a313x.7781069.1998910419.4)

```js
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
          // 打包其他资源(除了html/js/css资源以外的资源)
            {
                // 排除css/js/html资源
                exclude: /\.(js|html|css)$/,
                loader: 'file-loader',
                options: {
                  	// 打包后名字取前十位，使用原始扩展名
                    name:'[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    mode: 'development'
}
```



#### 3.5  dev-server

开发服务器 devServer: 用来自动化(==自动编译，自动打开浏览器，自动刷新浏览器==)



安装本地服务器

```nginx
npm i webpack-dev-server -D
// 运行命令
npx webpack-dev-server
```

webpack.config.js

```js
const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                exclude: /\.(js|html|css)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    mode: 'development',
    // 启动devServer指令为：webpack-dev-server
    // npm i webpack-dev-server
    // npx webpack-dev-server  本地安装
    devServer: {
        // 监听构建后的路径
        contentBase: resolve(__dirname, 'build'),
        // 启动gzip压缩
        compress: true,
        port: 3000,
        // 自动打开默认浏览器
        open:true
    }
}
```

#### 3.6 开发环境配置

webpack.config.js

```js
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
```

#### 3.7 提取css文件到单独文件

使用到的插件 `mini-css-extract-plugin`

```nginx
npm i mini-css-extract-plugin -D
```

webpack.config.js

```js
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 设置nodejs环境变量  默认是 production
// process.env.NODE_ENV = 'development'

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: [
          // 创建style标签，将样式放入
          // 'style-loader',
          // 这个loader取代style-loader。作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          // 将css文件整合到js文件中
          'css-loader',
          /*
            css兼容性处理：postcss --> postcss-loader postcss-preset-env
            帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
            "browserslist": {
              // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
              "development": [
                "last 1 chrome version", // 兼容最近的一个版本
                "last 1 firefox version",
                "last 1 safari version"
              ],
              // 生产环境：默认是看生产环境
              "production": [
                ">0.2%",
                "not dead",
                "not op_mini all"
              ]
            }
          */
          // 使用loader的默认配置
          // 'postcss-loader',
          // 修改loader的配置
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss的插件
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名 不配置默认为main.css
      filename: 'css/built.css'
    })
  ],
  mode: 'development'
}
```

#### 3.8 css做兼容性处理

```
// 设置nodejs环境变量  默认是 production
// process.env.NODE_ENV = 'development'
```

使用到的插件

```nginx
npm i postcss-loader postcss-preset-env -D
```

作用

>     postcss-loader 
>     		css兼容性处理：postcss --> postcss-loader 
>     postcss-preset-env
>         帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式



**browserslist配置能够分享目标浏览器和nodejs版本在不同的前端工具。**

<font color=red>主要是为了表示当前项目的浏览器兼容情况。</font>
==官方默认配置:==

```json
"browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8",
    "safari >= 7"
  ]

```

webpack.config.js

```js
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 设置nodejs环境变量  默认是 production
// process.env.NODE_ENV = 'development'

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: [
          // 创建style标签，将样式放入
          // 'style-loader',
          // 这个loader取代style-loader。作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          // 将css文件整合到js文件中
          'css-loader',
          /*
            css兼容性处理：postcss --> postcss-loader postcss-preset-env
            帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
            "browserslist": {
              // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
              "development": [
                "last 1 chrome version", // 兼容最近的一个版本
                "last 1 firefox version",
                "last 1 safari version"
              ],
              // 生产环境：默认是看生产环境
              "production": [
                ">0.2%",
                "not dead",
                "not op_mini all"
              ]
            }
          */
          // 使用loader的默认配置
          // 'postcss-loader',
          // 修改loader的配置
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss的插件
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名 不配置默认为main.css
      filename: 'css/built.css'
    })
  ],
  mode: 'development'
}
```

打包前

```css
.box1 {
    width: 100px;
    height: 100px;
    background-color: pink;
    display: flex;
    backface-visibility: hidden;
}
```

使用post-loader打包后

```css
.box1 {
    width: 100px;
    height: 100px;
    background-color: pink;
    display: flex;
    -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
}
.box2{
    width: 200px;
    height: 200px;
    background-color: deeppink;
}

```

#### 3.9 压缩css

使用插件`optimize-css-assets-webpack-plugin`

```nginx
npm i optimize-css-assets-webpack-plugin -D
```

核心代码



```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

    plugins: [
        new OptimizeCssAssetsWebpackPlugin()
    ],

```

Webpack.config.js

```js
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 设置nodejs环境变量  默认是 production
// process.env.NODE_ENV = 'development'

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // 处理css
            {
                test: /\.css$/,
                use: [
                    // 创建style标签，将样式放入
                    // 'style-loader',
                    // 这个loader取代style-loader。作用：提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    // 将css文件整合到js文件中
                    'css-loader',
                    /*
                      css兼容性处理：postcss --> postcss-loader postcss-preset-env
                      帮postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
                      "browserslist": {
                        // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
                        "development": [
                          "last 1 chrome version", // 兼容最近的一个版本
                          "last 1 firefox version",
                          "last 1 safari version"
                        ],
                        // 生产环境：默认是看生产环境
                        "production": [
                          ">0.2%",
                          "not dead",
                          "not op_mini all"
                        ]
                      }
                    */
                    // 使用loader的默认配置
                    // 'postcss-loader',
                    // 修改loader的配置
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                // postcss的插件
                                require('postcss-preset-env')()
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // 对输出的css文件进行重命名 不配置默认为main.css
            filename: 'css/built.css'
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'development'
}
```

#### 3.10 es-lint语法检查

安装插件

```nginx
npm i eslint-loader eslint eslint-config-airbnb-base eslint-plugin-import
```

`es-lint-loader` `es-lint`

`airbnb`  --> `eslint-config-airbnb-base` `eslint-plugin-import` `eslint`

```js
语法检查： eslint-loader  eslint
          设置检查规则：
            package.json中eslintConfig中设置~
              "eslintConfig": {
                "extends": "airbnb-base"
              }
需要下载  airbnb --> eslint-config-airbnb-base  eslint-plugin-import eslint        
```

【注意】注意：只检查自己写的源代码，第三方的库是不用检查的

Webpack.config.js

```js
const {resolve} = require('path');
const HtmlWebpackConfig = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    // 自动修复eslint的错误
                    fix: true
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackConfig({
            template: './src/index.html'
        })
    ],
    mode: 'development'
};
```

#### 3.11 js-babel-core 兼容性

`babel`     将es6+ 语法转换为es5 浏览器可识别

`core-js` 按需加载

```nginx
npm i babel-loader @babel/core @babel/preset-env @babel/polyfill core-js -D
/*
js兼容性处理：babel-loader @babel/core
1. 基本js兼容性处理 --> @babel/preset-env
    问题：只能转换基本语法，如promise高级语法不能转换
2. 全部js兼容性处理 --> @babel/polyfill
    问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了~
3. 需要做兼容性处理的就做：
    按需加载  --> core-js           
*/      
```



webpack.config.js

```js
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
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
};
```

#### 3.12 压缩js、html文件

js        生成环境下自动压缩  `mode:'production'`

html  需要在`HtmlWebpackPlugin`插件添加配置

Webpack-config.js

```js
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // 处理css
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            // 压缩html代码
            minify: {
                // 移除空格
                collapseWhitespace: true,
              	// 移除注释 
                removeComments: true
            }
        })
    ],
    mode: 'production'
}
```

### 4 生产环境配置

```js
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
```



### 5 webpack 优化配置

#### 5.1 HMR 热模块更新

一个模块发生变化。只会重新打包这一个模块(而不是打包所有模块)，能极大提升构建速度

```js
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
```

Webpack.config.js

```js
const {
    resolve
} = require('path');


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
```

index.js (入口文件)

```js
// 引入
import print from './print'
import '../css/iconfont.css'
import '../css/index.less'

console.log('index.js文件被加载了~');

print()

function add(x, y) {
  return x + y
}

console.log(add(1, 2))
console.log(add(2, 3))

if (module.hot) {
  // 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
  module.hot.accept('./print.js', function() {
    // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
    // 会执行后面的回调函数
    print();
  });
}
```



#### 5.2 source-map

  source-map: 一种提供==源代码到构建后代码映射技术== （如果构建后代码出错了，通过映射可以追踪源代码错误）
    [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map

```js
/*

    source-map：外部
      错误代码准确信息 和 源代码的错误位置
    inline-source-map：内联
      只生成一个内联source-map
      错误代码准确信息 和 源代码的错误位置
    hidden-source-map：外部
      错误代码错误原因，但是没有错误位置
      不能追踪源代码错误，只能提示到构建后代码的错误位置
    eval-source-map：内联
      每一个文件都生成对应的source-map，都在eval
      错误代码准确信息 和 源代码的错误位置
    nosources-source-map：外部
      错误代码准确信息, 但是没有任何源代码信息
    cheap-source-map：外部
      错误代码准确信息 和 源代码的错误位置
      只能精确到行
    cheap-module-source-map：外部
      错误代码准确信息 和 源代码的错误位置
      module会将loader的source map加入
    内联 和 外部的区别：
      1. 外部生成了文件，内联没有 2. 内联构建速度更快
```

##### 5.2.1 开发环境使用选择

```js
开发环境：速度快，调试更友好
      速度快(eval>inline>cheap>...)
        eval-cheap-source-map
        eval-source-map
      调试更友好
        source-map
        cheap-module-source-map
        cheap-source-map
      --> eval-source-map  / eval-cheap-module-source-map
```

##### 5.2.2 生产环境使用选择

```js
生产环境：源代码要不要隐藏? 调试要不要更友好
      内联会让代码体积变大，所以在生产环境不用内联
      nosources-source-map 全部隐藏
      hidden-source-map 只隐藏源代码，会提示构建后代码错误信息
      --> source-map / cheap-module-source-map
```

