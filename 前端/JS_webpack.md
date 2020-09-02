

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

#### 5.3 oneOf 

**当规则匹配时，只使用第一个匹配规则。**

使用oneOf规则的loader，如果匹配有匹配成功的文件，就不走后续的loader，提高构建速度
【注意】：==不能有两个配置处理同一种类型文件==

```js
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production'

// 复用loader
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    // css 兼容性处理
    {
        // 还需要在package.json中定义browserslist
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [require('postcss-preset-env')()]
        }
    }
]

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // js 处理 语法检查
            {
                // 在package.json中eslintConfig --> airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    // 自动修复eslint的错误
                    fix: true
                }
            },
            {
                // 以下loader只会匹配一个
                // 注意：不能有两个配置处理同一种类型文件
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        use: [...commonCssLoader, 'less-loader']
                    },
                    /*
                      正常来讲，一个文件只能被一个loader处理。
                      当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                        先执行eslint 在执行babel
                    */
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
                            // 预设：指示babel做怎么样的兼容性处理
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
                        test: /\.(jpe?g|png|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:10].[ext]',
                            // 关闭es6模块化
                            esModule: false,
                            outputPath: 'imgs'
                        }
                    },
                    // 处理html中img资源
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    // 处理其他资源
                    {
                        exclude: /\.(html|js|css|less|jpe?g|png|gif)$/,
                        loader: 'file-loader',
                        options: {
                            name: '[hash:10].[ext]',
                            outputPath: 'media'
                        }
                    }
                ]
            }
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
        }),
        // css 代码抽取
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        // css 代码压缩
        new OptimizeCssAssetsWebpackPlugin()
    ],
    // 生产环境下会自动压缩js代码
    mode: 'production'
}
```



#### 5.4 cache-缓存

##### 5.4.1 Babel 缓存

让第二次打包速度更快

```js
 // 开启babel缓存
 // 第二次构建时 ，会读取之前的缓存
 cacheDirectory: true
```

##### 5.4.2 资源缓存

- hash
- chunkhash
- contenthash

让代码上线运行缓存更好使用（上线代码性能优化）

```js
    文件资源缓存
      hash: 每次wepack构建时会生成一个唯一的hash值。
        问题: 因为js和css同时使用一个hash值。
          如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件）
      chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
        问题: js和css的hash值还是一样的
          因为css是在js中被引入的，所以同属于一个chunk
      contenthash: 根据文件的内容生成hash值。不同文件hash值一定不一样
      --> 
```



```js
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production'

// 复用loader
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    // css 兼容性处理
    {
        // 还需要在package.json中定义browserslist
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [require('postcss-preset-env')()]
        }
    }
]

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            // js 处理 语法检查
            {
                // 在package.json中eslintConfig --> airbnb
                test: /\.js$/,
                exclude: /node_modules/,
                // 优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    // 自动修复eslint的错误
                    fix: true
                }
            },
            {
                // 以下loader只会匹配一个
                // 注意：不能有两个配置处理同一种类型文件
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        use: [...commonCssLoader, 'less-loader']
                    },
                    /*
                      正常来讲，一个文件只能被一个loader处理。
                      当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                        先执行eslint 在执行babel
                    */
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
                            // 预设：指示babel做怎么样的兼容性处理
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
                            ],
                            // 开启babel缓存
                            // 第二次构建时 ，会读取之前的缓存
                            cacheDirectory: true
                        }
                    },
                    // 处理image
                    {
                        test: /\.(jpe?g|png|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:10].[ext]',
                            // 关闭es6模块化
                            esModule: false,
                            outputPath: 'imgs'
                        }
                    },
                    // 处理html中img资源
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    // 处理其他资源
                    {
                        exclude: /\.(html|js|css|less|jpe?g|png|gif)$/,
                        loader: 'file-loader',
                        options: {
                            name: '[hash:10].[ext]',
                            outputPath: 'media'
                        }
                    }
                ]
            }
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
        }),
        // css 代码抽取
        new MiniCssExtractPlugin({
            filename: 'css/built.[contenthash:10].css'
        }),
        // css 代码压缩
        new OptimizeCssAssetsWebpackPlugin()
    ],
    // 生产环境下会自动压缩js代码
    mode: 'production',
    devtool: 'source-map'
};
```



####  5.5 tree shaking

  `tree shaking`：去除无用代码
    前提：

1. 必须使用ES6模块化 

 2. 开启production环境

​    作用: 减少代码体积

```js
/*
  tree shaking：去除无用代码
    前提：1. 必须使用ES6模块化  2. 开启production环境
    作用: 减少代码体积
    在package.json中配置
      "sideEffects": false 所有代码都没有副作用（都可以进行tree shaking）
        问题：可能会把css / @babel/polyfill （副作用）文件干掉
      "sideEffects": ["*.css", "*.less"]
*/
```

#### 5.6 split chunks 代码分割

​    1. 可以将node_modules中代码单独打包一个chunk最终输出

​    2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk

index.js

```js
function sum (...args) {
    return args.reduce((p, c) => p + c, 0);
}
  
  // eslint-disable-next-line
  console.log(sum(1, 2, 3, 4, 5, 6))
  
  /*
    通过js代码，让某个文件被单独打包成一个chunk
    import动态导入语法：能将某个文件单独打包
  */
  import(/* webpackChunkName: 'test' */'./test') // 指定打包的文件名称
    .then(({ mul, add }) => {
    // 文件加载成功~
      // eslint-disable-next-line
      console.log(mul(2, 5));
  }).catch(() => {
    // eslint-disable-next-line
    console.log('文件加载失败~');
    });
```



webpack.config.js

```js
const {
    resolve
} = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // 单入口
    entry: './src/index.js',
    output: {
        filename: 'js/[name].[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify:{
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    /*
    1. 可以将node_modules中代码单独打包一个chunk最终输出
    2. 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk
    */
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    mode: 'development'
}
```

#### 5.7 懒加载/预加载

懒加载：当文件需要使用时才加载~(常用)

预加载prefetch：会在使用之前，提前准备好文件(多为js文件)

```js
// 正常加载可以认为是并行加载（同一时间加载多个文件）
// 预加载 prefetch：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
// 慎用  兼容性比较差
```

​	

index.js

```js
console.log('index.js 被加载~~~');

function sum(...args) {
    return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5, 6));

document.getElementById('btn').onclick = function () {
    import(/* webpackChunkName:'test',webpackPrefetch */'./test')
        .then(({mul, add}) => {
            // eslint-disable-next-line
            console.log(mul(2, 5))
        })
        .catch(reason => console.log(reason))
}
  

```

test.js

```js
console.log("test.js 被加载~~~");

export function mul(x, y) {
    return x * y;
}

export function add(x, y) {
    return x + y;
}
```

#### 5.8 PWA

渐进式网络开发应用程序(离线可访问)



使用插件:	`work-> workbox-webpack-plugin`

Service-worker 必须运行在服务器端

1.  安装插件

```nginx
npm i workbox-webpack-plugin -D
```

2. 使用插件

```js
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

new WorkboxWebpackPlugin.GenerateSW({
						/*
            1. 帮助serviceworker快速启动
            2. 删除旧的 serviceworker
            生成一个 serviceworker.js 配置文件~
            */
            clientsClaim: true,
            skipWaiting: true            
        })        
```

3. webpack.config.js

```js
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
/*
PWA: 渐进式网络开发应用程序(离线可访问)
workbox --> workbox-webpack-plugin
*/
// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production'
// 复用loader
const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
// css 兼容性处理
    {
// 还需要在package.json中定义browserslist
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: () => [require('postcss-preset-env')()]
        }
    }
]
module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
// js 处理 语法检查
            {
// 在package.json中eslintConfig --> airbnb
                test: /\.js$/,
                exclude: /node_modules/,
// 优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
// 自动修复eslint的错误
                    fix: true
                }
            },
            {
// 以下loader只会匹配一个
// 注意：不能有两个配置处理同一种类型文件
                oneOf: [
                    {
                        test: /\.css$/,
                        use: [...commonCssLoader]
                    },
                    {
                        test: /\.less$/,
                        use: [...commonCssLoader, 'less-loader']
                    },
                    /*
                    正常来讲，一个文件只能被一个loader处理。
                    当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
                    先执行eslint 在执行babel
                    */
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader',
                        options: {
// 预设：指示babel做怎么样的兼容性处理
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
                            ],
                            // 开启babel缓存
                            // 第二次构建时，会读取之前的缓存
                            cacheDirectory: true
                        }
                    },
                    // 处理image
                    {
                        test: /\.(jpe?g|png|gif)$/,
                        loader: 'url-loader',
                        options: {
                            limit: 8 * 1024,
                            name: '[hash:10].[ext]',
                            // 关闭es6模块化
                            esModule: false,
                            outputPath: 'imgs'
                        }
                    },
                    // 处理html中img资源
                    {
                        test: /\.html$/,
                        loader: 'html-loader'
                    },
                    // 处理其他资源
                    {
                        exclude: /\.(html|js|css|less|jpe?g|png|gif)$/,
                        loader: 'file-loader',
                        options: {
                            name: '[hash:10].[ext]',
                            outputPath: 'media'
                        }
                    }
                ]
            }
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
        }),
        // css 代码抽取
        new MiniCssExtractPlugin({
            filename: 'css/built.[contenthash:10].css'
        }),
        // css 代码压缩
        new OptimizeCssAssetsWebpackPlugin(),
        new WorkboxWebpackPlugin.GenerateSW({
            /*
            1. 帮助serviceworker快速启动
            2. 删除旧的 serviceworker
            生成一个 serviceworker.js 配置文件~
            */
            clientsClaim: true,
            skipWaiting: true
        })
    ],
// 生产环境下会自动压缩js代码
    mode: 'production',
    devtool: 'source-map'
}
```

4. index.js

```js
/*
1. eslint不认识 window、navigator全局变量
解决：需要修改package.json中eslintConfig配置
"env": {
"browser": true // 支持浏览器端全局变量
}
2. sw代码必须运行在服务器上
--> nodejs
-->
npm i serve -g
serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去
*/
// 注册serviceWorker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('serviceWorker注er册成功!');
      })
      .catch(() => {
        console.log('serviceWorker注册失败~');
      });
  });
}
// 注册serviceWorker
// 处理兼容性问题

```

#### 5.9 多进程打包

- 进程启动大概需要600ms, 进程通信需要开销

- 只有工作消耗时间比较长，才需要`多进程打包`(一般是js文件比较多的时候)
- 一般放在babel loader之后

安装loader

```nginx
npm i thread-loader -D
```



webpack.config.js

```js
module.exports = {
  module:{
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
            /*
              开启多进程打包。
              进程启动大概为600ms，进程通信也有开销。
              只有工作消耗时间比较长，才需要多进程打包
            */
            {
                loader: 'thread-loader',
                options: {
                    workers: 2 // 进程2个
                }
            },
            {
                loader: 'babel-loader',
                options: {
                    // 预设：指示babel做怎么样的兼容性处理
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
                    ],
                    // 开启babel缓存
                    // 第二次构建时，会读取之前的缓存
                    cacheDirectory: true
                }
            }
        ]
    }                   
    ]
  }
}
```



#### 5.10 externals

**防止**将某些 `import` 的包(package)**打包**到 bundle 中，而是在运行时(runtime)再去从外部获取这些*扩展依赖(external dependencies)*。

- 彻底不打包，指示哪些库需要通过CDN链接

例如，从CDN引入jQuery,而不是把它打包

```js
externals:{
  jquery:'jQuery'
}
```

这样就剥离了那些不需要改动的依赖模块.

完整webpack.config.js

```js
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.[contenthash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: []
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
    // 生产环境下会自动压缩js代码
    mode: 'production',
    externals: {
        // 决绝jQuery被打包进来
        jquery: 'jQuery'
    }
};
```



#### 5.11 dll

 为了极大减少构建时间，进行分离打包.

[参考链接](https://www.cnblogs.com/tugenhua0707/p/9520780.html )

安装包

```nginx
npm i add-asset-html-webpack-plugin -D
```

##### 5.11.1 **DLLPlugin**

 这个插件是在一个额外独立的`webpack`设置中创建一个只有`dll`的`bundle`，也就是说我们在项目根目录下除了有`webpack.config.js`，还会新建一个`webpack.dll.config.js`文件。

`webpack.dll.config.js`作用是把所有的第三方库依赖打包到一个==`bundle`的`dll`文件里面==，还会生成一个名为 `manifest.json`文件。 

==该`manifest.json`的作用是用来让` DllReferencePlugin` 映射到相关的依赖上去的==。 

`webpack.dll.config.js`

```js
/*
  使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
    当你运行 webpack 时，默认查找 webpack.config.js 配置文件
    需求：需要运行 webpack.dll.js 文件
      --> webpack --config webpack.dll.js
*/
const {
    resolve
} = require('path')
const webpack = require('webpack')
module.exports = {
    entry: {
        // 最终打包生成的[name] --> jquery
        // ['jquery'] --> 要打包的库是jquery
        jquery: ['jquery'],
        echarts: ['echarts']
    },
    output: {
        filename: '[name].dll.js',
        path: resolve(__dirname, 'dll'),
        library: '_dll_[name]_[hash]' // 打包的库里面向外暴露出去的内容叫什么名字
    },
    plugins: [
        // 打包生成一个 manifest.json --> 提供和jquery映射
        new webpack.DllPlugin({
            name: '_dll_[name]_[hash]', // 映射库的暴露的内容名称
            /* 生成manifest文件输出的位置和文件名称 */
            path: resolve(__dirname, 'dll/[name].manifest.json')
        })
    ],
    mode: 'production'
}
```

<font color=red>执行命令:</font>

 `webpack --config webpack.dll.config.js`

生成的文件:

​	 `vendor.dll.js` : 包含所有的第三方库文件 

​	`vendor-manifest.json ` : 包含所有库代码的一个索引 (==可以理解为第三方库的一个映射==)

##### 5.11.2 **DllReferencePlugin**

​	这个插件是在 webpack k==主配置文件中==设置, 把只有 `dll` 的 `bundle`引用到需要的预编译的依赖。

​	当在使用`webpack.config.js`文件打包`DllReferencePlugin`插件的时候，会使用该`DllReferencePlugin`插件读取`vendor-manifest.json`文件，==看看是否有该第三方库== 。

> 第一次使用 `webpack.dll.config.js` 文件会对第三方库打包，打包完成后就不会再打包它了，
>
> 然后每次运行 `webpack.config.js`文件的时候，都会打包项目中本身的文件代码，
>
> 当需要使用第三方依赖的时候，会使用 `DllReferencePlugin`插件去读取第三方依赖库。所以说它的打包速度会得到一个很大的提升。 

webpack.config.js

```js
const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
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
```

<font color=red>执行命令:</font>

 `webpack`

打包后的`index.html`文件

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Title</title></head>
<body>
    <h1>hello dll~</h1>
    <script src="jquery.dll.js"></script>
    <script src="echarts.dll.js"></script>
    <script src="js/built.js"></script>
</body>
</html>
```



### 6. 配置详解

#### 6.1 entry

​	入口起点有三种方式

```js
entry: 入口起点
    1. string --> './src/index.js'
      单入口
      打包形成一个chunk。 输出一个bundle文件。
      此时chunk的名称默认是 main
    2. array  --> ['./src/index.js', './src/add.js']
      多入口
      所有入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件。
        --> 只有在HMR功能中让html热更新生效~
    3. object
      多入口
      有几个入口文件就形成几个chunk，输出几个bundle文件
      此时chunk的名称是 key
      --> 特殊用法
        {
          // 所有入口文件最终只会形成一个chunk, 输出出去只有一个bundle文件。 DLL中优化使用
          index: ['./src/index.js', './src/count.js'],
          // 形成一个chunk，输出一个bundle文件。
          add: './src/add.js'
        }
```



webpack.config.js

```js
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
```



#### 6.2 output

`publicPath` : ==用于生产环境，部署时引入路径'/'==

`chunkFilename`:  非入口chunk的名称  （1.使用import导入的文件 2. 使用options将node_modules文件分割）

`library`: 整个库向外暴露的变量名,通常结合dll使用 将某个库单独打包,供外部调用

`libraryTarget` : 变量名添加到哪个平台



webpack.config.js

```js
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
```

#### 6.3 module

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
```

