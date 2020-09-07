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

var obj =
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
