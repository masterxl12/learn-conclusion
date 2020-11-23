const args = process.argv.slice(2);

const path = require('path');
const fs = require('fs');
const getEntries = (dir) => {
    let absPath = path.resolve(dir);  // 绝对路径
    let files = fs.readdirSync(absPath); //  只能读取到儿子这一层
    let entries = {};

    files.forEach(item => { // [ 'button', 'button-group', 'icon', 'index.js' ]
        let p = path.join(absPath, item);
        if (fs.statSync(p).isDirectory()) {
            p = path.join(p, 'index.js');
            entries[item] = p;
        }
    });
    return entries;
};

// console.log(getEntries('./src/packages'));
if (process.env.NODE_ENV === 'production' && args.includes('--all')) {
    module.exports = {
        outputDir: 'dist', // 输出的目录是dist目录
        configureWebpack: {
            entry: {
                ...getEntries('./src/packages')
            },
            output: {
                filename: 'lib/[name]/index.js',
                libraryTarget: 'umd',
                libraryExport: 'default',
                library: ['ui', '[name]']
            },
            externals: {
                // 排除vue
                vue: {
                    root: 'Vue',
                    commonjs: 'vue',
                    commonjs2: 'vue',
                    amd: 'vue'
                }
            },
        },
        css: {
            sourceMap: true,
            extract: {
                filename: 'css/[name]/style.css'
            }
        },
        // 用户配合babel-import-plugin 可以实现按需引入
        // 配置webpack插件
        chainWebpack: config => {
            // 删除默认的配置
            config.optimization.delete('splitChunks')
            config.plugins.delete('copy')
            config.plugins.delete('preload')
            config.plugins.delete('prefetch')
            config.plugins.delete('html')
            config.plugins.delete('hmr')
            config.entryPoints.delete('app')
        }
    }
}
