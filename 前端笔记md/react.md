



![image-20201019205002043](/Users/masterxl/Library/Application Support/typora-user-images/image-20201019205002043.png)

### react 基础知识

16.13.1

特点：

- 声明式的设计
- 高效 采用虚拟DOM来实现DOM的渲染，来减少DOM的操作
- 灵活，跟其他库灵活搭配使用；
- JSX，俗称JS里面写HTML，JavaScript语法的扩展；
- 组件化，模块化，代码易复用；
- 单向数据流，==没有实现==数据的双向绑定。数据-》视图  事件-》数据



创建项目

​		通过react脚手架创建项目进行开发、部署

1. 安装脚手架`create react app`

   1. 安装cnpm淘宝镜像

      > sudo npm install -g cnpm --registry=[https://registry.npm.taobao.org](https://registry.npm.taobao.org/) --verbose

   2. 全局安装`react` 脚手架

      > sudo cnpm i -g create-react-app

2. 创建项目

   `create-react-app 01helloworld(自定义项目名称)`

3. 启动项目

   - cd 01helloworld
   - npm start



#### 2 react元素渲染

JSX语法

```react
let app = <h1>hello world!</h1>;
使用JSX的语法，可以创建JS元素对象；
JSX元素对象，或者组件对象都必须只有一个根元素节点
```



函数组件开发

```react
function Clock(props) {
    return (
        <div>
            <h1>{props.date.toLocaleTimeString()}</h1>
            <p>函数式组件开发</p>
        </div>
    )
}

function run() {
    let root = document.querySelector('#root');
    ReactDOM.render(<Clock date={new Date()}/>, root)
}

setInterval(run,1000);
```



#### 3 JSX语法

JSX表示函数对象

Babel 会把 JSX 转译成一个名为 `React.createElement()` 函数调用。

JSX的特点：

- JSX执行更快，编译为JavaScript代码时进行优化
- 类型安全，编译过程如果出错就不能编译，及时发现错误

注意点:

- 必须有根节点
- 如果是DOM元素标签，使用小写，如果是大写，说明是==函数/类组件==



```react
// JSX 语法
let a = Math.random(0, 1) - 0.5;

// ! 使用className
let classArr = ['bgc', 'bt'].join(" ");

// ! 使用style
let imageStyle = {
    backgroundColor: "rgba(255, 0, 0, .5)"
}

// ! 使用src
let src = 'https://www.baidu.com/img/PCfb_5bf082d29588c07f842ccde3f97243ea.png';

let element = (
    <div>
        {/** 使用类名 */}

        <h1 className={'abc ' + classArr} >今天天气: {a > 0 ? 'sunshine' : 'rain'}</h1>
        <h2>{Math.random(0, 1) - 0.5 > 0 ? <button>出去嗨皮~</button> : '居家玩耍'}</h2>
        <img src={src} style={imageStyle} />
        <img src={src} style={{ backgroundColor: 'green', border: '3px solid yellow' }} />
    </div>
)

ReactDOM.render(element, document.querySelector('#root'));
```



总结：

1. 由HTML元素构成

2. 中间如果插入变量使用{}

3. {}可以使用表达式

4. {}中间表达式可以使用JSX对象 

    `<h2>{Math.random(0, 1) - 0.5 > 0 ? <button>出去嗨皮~</button> : '居家玩耍'}</h2>`

5. 属性和HTML都是使用{} 插入

#### 4 JSX_style



- react中，class|style 不可以存在多个属性(==多个className|style存在 错误==)

  ==错误表示方法==

  ```react
  let class1 = 'bgc';
  let class2 = 'bt';
  
  // 错误表示方法
  let element = (
      <div>
          <h2 className={class2} className={"class1 " + class1}>react-class属性</h2>
      </div>
  )
  
  // 正确表示方法
  let element2 = (
      <div>
          <h2 className={"class1 " + class1 + ' ' + class2}>react-class属性</h2>
      </div>
  )
  
  ReactDOM.render(element, document.querySelector('#root'));
  ```

  

- style样式中，如果存在存在多个单词的属性组合，首字母大写，或者用==引号==引起，否则报错

  ```react
  let class1 = 'bgc';
  
  let exampleStyle = {
      width: '100px',
      height: '100px',
      backgroundColor: 'rgba(255,0,0,.5)',
    	
      backgroundImage: 'url(https://store-cdn.lizhi.io/pic/thumb/img/d8X4Bbsabe2cFck4LczbIaw7M6j9A1w2N6T8Iaw4L2z4I3wdMfjdA7w5N5TeIew3MDMxMTQwNDMxLnBuZwO0O0OO0O0O)'
  }
  
  let element = (
      <div>
          <h2 className={"class2 " + class1}>react-class属性</h2>
          <div style={exampleStyle}>react-style</div>
      </div>
  )
  ```

  

- 多个类共存的操作

  ```react
  let classStr = ['a', 'b'].join(' ')
  
  let element = (
      <div>
          <h2 className={'str ' + classStr}>react-class属性</h2>
      </div>
  )
  ```

  

- 注释 

  必须在括号内的表达式书写，否则报错`{/* 注释内容部分 */}`

  ```react
  let element = (
      <div>
          {/** 注释内容部分 */}
          <h2 className={'str ' + classStr}>react-class属性</h2>
          <div style={exampleStyle}>react-style</div>
      </div>
  )
  ```

  

#### 5 组件

##### 5.1 函数组件

一般用于静态没有交互事件内容的组件页面。

本质:  JavaScript 函数。

```react
// 函数组件
function Weather(props) {
    console.log('函数组件: ', props);
    return (
        <div>
            <h1>今天是否出门: {props.weather == '下雨' ? '宅家' : '出门'}</h1>
        </div>
    )
}

ReactDOM.render(<Weather weather='下雨' />, document.querySelector('#root'));
```



##### 5.2 类组件

称之为动态组件，用于交互或者数据修改的操作。一般函数组件能实现的，类组件都可以实现。



```react
// 类组件
class HelloWorld extends React.Component {
    render() {
        console.log(this)
        return (
            <div>
                <h1>类组件: {this.props.name}</h1>
                <Weather weather={this.props.weather} />
            </div>
        );
    }
}

// 函数组件
function Weather(props) {
    console.log('函数组件: ', props);
    return (
        <div>
            <h1>今天是否出门: {props.weather == '下雨' ? '宅家' : '出门'}</h1>
        </div>
    )
}

ReactDOM.render(<HelloWorld name='helloWorld!' weather='sunshine' />, document.querySelector('#root'));

// console.log(this)
// props: {name: "helloWorld!", weather: "sunshine"}
```















