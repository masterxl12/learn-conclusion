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





