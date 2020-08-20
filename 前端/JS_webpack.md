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
npx web-pack-dev-server
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



