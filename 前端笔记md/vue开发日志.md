#### 一、Vue开发

### 1.`vm.nextTick()`

**nextTick的由来：**

　　由于VUE的数据驱动视图更新，是异步的，即修改数据的当下，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。

当使用nextTick()方法后，会等页面的DOM节点渲染完成后才执行其中的代码。使用$nextTick就是确保我们操作的是更新后的DOM。

**nextTick的触发时机：**

　　在同一事件循环中的数据变化后，DOM完成更新，立即执行nextTick(callback)内的回调。

**应用场景：**

　　需要在视图更新之后，基于新的视图进行操作。

- **参数**：

  - `{Function} [callback]`

- **用法**：

  ==将回调延迟到下次 DOM 更新循环之后执行==。在==修改数据之后立即使用它，然后等待 DOM 更新==。它跟全局方法 `Vue.nextTick` 一样，不同的是回调的 `this` 自动绑定到调用它的实例上。

应用场景：<font color=red>需要在视图更新之后，基于新的视图进行操作。</font>

[参考1](https://www.cnblogs.com/hity-tt/p/6729118.html)

[参考2](https://segmentfault.com/a/1190000012861862)



在 created 和 mounted 阶段，如果需要==操作渲染后的试图，也要使用 nextTick 方法==。

【注】通过 Vue.nextTick 可获取到改变后的 DOM。

![image-20200601213812640](/Users/masterxl/Library/Application Support/typora-user-images/image-20200601213812640.png)

![image-20200602202721112](/Users/masterxl/Library/Application Support/typora-user-images/image-20200602202721112.png)

执行宏任务，然后执行该宏任务产生的微任务。若微任务在执行过程中产生了新的微任务，则继续执行微任务，微任务执行完毕后，再回到宏任务中进行下一轮循环。

### 2 async与await

#### 2.1 基本用法

`async`函数返回一个 Promise 对象，可以使用`then`方法添加回调函数。<font color=red>当函数执行的时候，一旦遇到`await`就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。</font>

#### 2.2 使用要点:

##### 2.2.1 async关键字

async 会将其后的函数（函数表达式或 Lambda）的**==返回值封装成一个 Promise 对象==**，而==await 会等待这个 Promise 完成==，并将其==**resolve 的结果返回出来**==。

- **`async`函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而`await`命令就是内部`then`命令的语法糖。**

- **async 函数返回一个 Promise 对象**
  - `async` 函数内部 return 返回的值。会成为 `then` 方法回调函数的参数。
- **async 函数返回的 Promise 对象，==必须等到内部所有的 await 命令的 Promise 对象执行完==，才会发生状态改变**
- **正常情况下，await 命令后面跟着的是 Promise ，如果不是的话，也会被转换成一个 立即 resolve 的 Promise**
- async函数在没有 `await` 的情况下执行 async 函数，它会立即执行，返回一个 Promise 对象，并且，绝不会阻塞后面的语句。这和普通返回 Promise 对象的函数并无二致。

##### 2.2.2 await关键字

​		`await` 在等 async 函数，但要清楚，它==等的实际是一个返回值==。注意到 await 不仅仅用于等 Promise 对象，它可以等任意表达式的结果，所以，await 后面实际是可以接普通函数调用或者直接量。

- `await` 是个运算符，用于组成表达式，await 表达式的运算结果取决于它等的东西。

- <u>如果它等到的不是一个 Promise 对象，那 await 表达式的运算结果就是它等到的东西。</u>

- 如果它等到的是一个 Promise 对象，await 就忙起来了，它会阻塞后面的代码，==等着 Promise 对象 resolve==，==然后得到 resolve 的值，作为 await 表达式的运算结果==。

#### 2.3 async 函数的错误处理

当 `async` 函数中只要一个 `await` 出现 reject 状态，则后面的 `await` 都不会被执行。

```javascript
// 正确的写法
let a;
async function correct() {
    try {
        await Promise.reject('error')
    } catch (error) {
        console.log(error);
    }
    a = await 1;
    return a;
}

correct().then(v => console.log(a)); // 1
```

如果有多个 `await` 则可以将其都放在 `try/catch` 中。

#### 2.4 async/await 的优势在于处理 then 链

​		单一的 Promise 链并不能发现 async/await 的优势，如果需要处理由多个 Promise 组成的 then 链的时候，优势就能体现出来了（Promise 通过 then 链来解决多层回调的问题，现在又用 async/await 来进一步优化）

### 3. 同步/异步回调

写在前面

同步可以保证顺序一致，容易导致阻塞，异步可以解决阻塞问题，但是会改变顺序性。具体根据需求编写代码。

[参考1](https://juejin.im/post/5aa7c3a4f265da23945f28e0)

​		**回调一般出现在异步编程中，用于得到异步处理的结果。回调函数可以作为参数传递到其他函数(父函数)中，并在父函数完成后调用，其中回调函数在调用时会使用到父函数局部作用域中的变量或数据处理的结果**。

// 回调函数作为主函数的参数，并在主函数的作用域调用，且使用主函数作用域中的变量

```javascript
// 1. func    			  ->  主函数
// 2. callback 				->  回调函数
// 3. _arr     				->  主函数中的变量
// 4. callback(_arr)  ->   回调函数调用主函数中的变量
function func(param, callback) {  // 主函数
    let arrStr = "[12,23,34]";    // 格式: 使用双引号
    let arr = JSON.parse(arrStr);  
    let _arr = arr.concat(param)
    callback(_arr);   						// 回调函数，使用主函数中的参数
}

func(45, function (data) {
    let sum = data.reduce((source, current) => source + current, 0);
    console.log(sum); // 114
})

```

回调函数的变形

/*************************************************************************************************************************************************************************************************************************************************************************/在javascript中函数是一个对象，准确的来说函数是用function()构造函数创建的一个function对象，因此我们可以==将函数存储在变量中==，当然也就可以==将存储在变量中的函数==作为==一个参数传递给另一个函数==，这就是回调函数。

/*************************************************************************************************************************************************************************************************************************************************************************/

```javascript
// 回调函数
let callback = function (data) {
    let sum = data.reduce((source, current) => source + current, 0);
    console.log(sum);
}

// 主函数
let main = function (param, cb) {
    let arrStr = "[12,23,34]";
    let arr = JSON.parse(arrStr);
    let _arr = arr.concat(param)
    cb(_arr);
}

// 主函数调用回调函数
main(100, callback)  // 169
```

### 4. JSON.parse与JSON.stringfy

#### 4.1 JSON.parse()

用法：

- 用来==解析JSON字符串==，构造由==字符串描述的JavaScript值或对象==。
- 提供可选的 **reviver** 函数用以在返回之前对所得到的对象执行变换(操作)。

【注】如果需要转换为对象，JSON数据的key与value必须使用双引号""包裹，否则在转换过程中会导致错误。

```javascript
    var s1 = "{'name':'kobe'}";  // 出错，格式不合法
    var s2 = '{"name":"{age:23,major:nba}"}'; // 格式正确
    console.log(JSON.parse(s1));
    console.log(JSON.parse(s2).name)
```

返回值：Json对象

如果指定了 `reviver` 函数，则解析出的 JavaScript 值（解析值）会经过一次转换后才将被最终返回（返回值）。

​		解析值本身以及它所包含的所有属性，会按照一定的顺序（从最里层的属性开始，一级级往外，最终到达顶层，也就是解析值本身）分别的去调用 `reviver` 函数。

```javascript
const params = '[10,20,30]';
let paramsObj = JSON.parse(params);

// [10,20,30]
```

​		使用revier函数

```javascript
JSON.parse('{"p": 5}', function (k, v) {
    if(k === '') return v;     // 如果到了最顶层，则直接返回属性值，
    return v * 2;              // 否则将属性值变为原来的 2 倍。
}); 
// {p: 10}

JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}', function (k, v) {
    console.log(k); // 输出当前的属性名，从而得知遍历顺序是从内向外的，
                    // 最后一个属性名会是个空字符串。
    return v;       // 返回原始属性值，相当于没有传递 reviver 参数。
});
```

#### 4.2 JSON.stringfy()

用法：

- 将一个 JavaScript 值（对象或者数组）==转换为一个 JSON 字符串==

- 如果指定了 replacer 是一个函数，则可以选择性地替换值，
- 或者如果指定了 replacer 是一个数组，则==可选择性地仅包含数组指定的属性==。

返回值：**一个表示给定值的JSON字符串。**

【案例】

```javascript
// 1. 不指定replacer参数
const obj = {name:'kobe',age:12,major:'ball'};
JSON.stringify(obj)
"{"name":"kobe","age":12,"major":"ball"}"

// 2. 指定replacer参数为函数
function replacer(key,value){
  if(typeof value === 'number'){
    return value + 10;
  }
  return value;
}
JSON.stringify(obj,replacer);
// "{"name":"kobe","age":22,"major":"ball"}"

// 3. 指定replacer参数为数组
JSON.stringify(obj,['name','age'])  // 返回指定属性的值
"{"name":"kobe","age":12}"
```

### 5.axios设置请求头(token)

[参考地址](https://blog.csdn.net/qq_41846861/article/details/88853217)

```javascript
import axios from 'axios'

// http request拦截器 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = window.localStorage.getItem("accessToken")
    if (token) {
        config.headers.accessToken = token;    //将token放到请求头发送给服务器
        return config;
        //这里经常搭配token使用，将token值配置到tokenkey中，将tokenkey放在请求头中
        // config.headers['accessToken'] = Token;
    }
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
```





```javascript
import axios from 'axios'
import Cookies from 'js-cookie'

axios.interceptors.request.use(config => {
    let Base64 = require('js-base64').Base64;
    let token = Base64.decode(Cookies.get("SESSIONID"));
    if (token) {
        config.headers.common["access-token"] = token
    }
    return config
}, error => {
    return Promise.reject(error)
})

/* 封装get请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
async function apiGet(url, data) {
    let res = await axios.get(url, {params: data});
    return new Promise((resolve, reject) => {
        if (res.status === 200) {
            resolve(res.data)
        } else {
            reject(res.data)
        }
    }).catch(error => console.log(err))
}

/* 封装post请求
 * @param url
 * @param data
 * @returns {Promise<any>}
 */

function apiPost(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => resolve(res.data), err => reject(err))
    })
}
```

### 6.WebSocket通信协议(Vue引入)

onerror 		连接失败执行的回调

onopen 		连接成功执行的回调

onmessage   建立连接，接收信息

Onclose         关闭连接

```javascript
let ws = new WebSocket("ws://xxx.com");
// 1.连接失败执行的回调函数
ws.onerror = function(){
  // 业务代码
  setTimeout(()=>{
    this.$message({
      type:'error',
      message:'error,连接失败',
      duration:2500
    })
  },1000)
}.bind(this)
// 2.连接成功执行的回调函数
ws.open = function(){
  this.viewLog = true;
  ws.send("webSocket connected!");
}.bind(this)
// 3.建立连接，接收信息
ws.onmessage = function(evt){
  let outDiv = document.getElementById('outDiv');
  let innDiv = document.getElementById('innDiv');
  if(typeof evt.data === 'string'){
    innDiv.innerHTML += "<br/>" + evt.data.replace(/</g,'');
  }
  setTimeout(()=>{
    // 实现日志滑动到底部
    outDiv.scrollTop = outDiv.scrollHeight;
  },1000)
}
// 4.连接失败执行的回调
ws.onclose = function(){
  ws.close();
  console.log("Connection closed!")
}
```

```css
.outDiv{
  width:100%;
  padding:10px;
  background-color:rgba(0,0,0,.8);
  color:#0aa908;
  line-height:1.5;
  overflow-y:scroll;
  overflow:auto
}
```

### 7.echarts数据改变-视图改变

```javascript
import echarts from 'echarts';
// 页面视图初步加载
this.$nextTick(()=>{
  this.chartLine = echarts.init(this.$refs.aDiv);
  api.get(url).then(res=>{
    this.optionData = res.data;
    this.chartLine.setOption(this.optionData);
  })
})

// 数据改变后的视图刷新
this.chartLine.clear();
this.chartLine = echarts.init(this.$refs.aDiv);
// 改变后的数据
this.optionData.series.data = changedData;
this.chartLine.setOption(this.optionData);

```

### 8.正则表达式

#### 8.1 匹配192.168.1.1:ABC-CDF:8080的格式

目的：获取到格式`192.168.1.1:8080`

```javascript
let regExp = /[a-zA-Z].*?\:/g;
let matchUrl = "192.168.1.1:ABC-CDF:8080";
let urlParam = matchUrl.replace(regExp,"");
console.log(urlParam)
```

### 9.时间选择器控件

#### 9.1 日期时间格式函数

```javascript
function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

function formatDate(date, fmt) { 
  // date new Date()
  // fmt  "yyyy-MM-dd hh:mm"
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}
```

#### 9.2 起始、截止时间设置

```html
// 起始时间
<el-time-picker
    v-model="startTime"
		value-format="yyyy-MM-dd HH:mm:ss"
		:picker-options="startTimeRule"  
		@change="startTimeChange"
		placeholder="选择起始时间">
</el-time-picker>

// 截止时间
<el-time-picker
    v-model="endTime"
		value-format="yyyy-MM-dd HH:mm:ss"
		:picker-options="endTimeRule"  
		@change="triggerTimeChange"
		placeholder="选择起始时间">
</el-time-picker>
```

起始时间(00:00:00—当前时间)

```javascript
computed:{
  startTimeRule:function(){
  let timeNow = formatDate(new Date(),"yyyy-MM-dd hh:mm:ss"); 	 // 2020-06-18 20:20:20
  let currentTime = timeNow.split(" ")[1]; // 20:20:20
  return {
    selectableRange:`00:00:00-${currentTime}`
  	}
	}
}
```

终止时间(起始时间—当前时间可选)

```javascript
startTimeChange(val){
  let timeNow = formatDate(new Date(),"yyyy-MM-dd hh:mm:ss");
  let start = val.split(" ")[1];
  let currentTime = timeNow.split(" ")[1];
  this.endTimeRule = {
    selectableRange:`${start}-${currentTime}`
  }
}
```

### 10.scoped样式作用域

#### 10.1 scoped的作用功能

==实现组件的私有化，不对全局造成样式污染，表示当前style属性只属于当前模块==

#### 10.2 实现原理

通过观察DOM结构可以发现：vue通过在DOM结构以及css样式上加上唯一的标记，保证唯一，达到样式私有化，不污染全局的作用，如图，样式属性上也会多一个该字符，以保证唯一

<img src="/Users/masterxl/Library/Application Support/typora-user-images/image-20200630171919911.png" alt="image-20200630171919911" style="zoom:50%;" />

 可以看出加上`scoped`后的组件里的标签都会多一个`data-v-469af010`的属性，并且在css样式部分可以看出

<img src="/Users/masterxl/Library/Application Support/typora-user-images/image-20200630171956859.png" alt="image-20200630171956859" style="zoom:50%;" />

 由此可知，添加`scoped`属性的组件，为了达到不污染全局，做了如下处理：

- 给HTML的DOM节点加一个不重复属性`data-v-469af010`标志唯一性
- 在添加`scoped`属性的组件的每个样式选择器后添加一个等同与“不重复属性”相同的字段，实现类似于“作用域”的作用，不影响全局
- 如果组件内部还有组件，只会给最外层的组件里的标签加上唯一属性字段，不影响组件内部引用的组件（ 注意  ）

#### 10.3 慎用原因：

1. 父组件无`scoped`属性，子组件带有`scoped`，父组件是无法操作子组件的样式的（原因在原理中可知），虽然我们可以在全局中通过该类标签的标签选择器设置样式，但会影响到其他组件
2. 父组件有`scoped`属性，子组件无，父组件也无法设置子组件样式，因为父组件的所有标签都会带有`data-v-469af010`唯一标志，但子组件不会带有这个唯一标志属性，与1同理，虽然我们可以在全局中通过该类标签的标签选择器设置样式，但会影响到其他组件。**==如在vue项目中使用element-ui组件库,当前vue组件为父组件，引入的element-ui(如el-tree、el-table等)为子组件，在父组件中修改子组件样式不起效果。==**
3. 父子组建都有，同理也无法设置样式，更改起来增加代码量

### 11 文件上传

​	清楚默认样式(未选择任何文件)

```vue
<template>
	<el-button 
            type='primary' 
            size='mini' 
            @click='triggerHandler' 
            icon='el-icon-upload'>
    </el-button>
<input 
       		type='file'
          	id='uploadFile'
       		@change='uploadFile($event)'
       		class='uploadFile'
       		style='opacity:0'
       />
</template>


<script>
    export default {
        methods:{
            triggerHandler(){
                let dom = document.getElementById('uploadFile');
                dom.click();// DOM默认事件
            },
            uploadFile(event){
                let dom = document.getElementById('uploadFile');
                this.$nextTick(()=>{
                    const { files } = event.target;
                    if(files.length){
                        let fileName = files[0].name;
                        let num = fileName.lastIndexOf(".");
                        // 获取文件类型 这里用的是properties文件类型
                        let str = fileName.substring(num+1,fileName.length);
                        if(str === 'properties'){
                            const formData = new FormData();
                            formData.append('file',files[0]);
                            formData.append('fileName',fileName.substring(0,num));
                            // 使用封装好的post请求 表单提交
                            api.post(formData).then(res=>{
                                if(res.status === 'ok'){
                                    // ...
                                }
                            })
                        } else {
                            // ...
                        }
                        dom.value = ''; // 清楚内容
                    }
                })
            }
        }
    }
</script>
```

### 12. 使用postMessage跨域通信

父组件

```vue
<template>
	<div>
        <iframe
                src="XXX.html"
                scrolling='yes'
                id='serverId'
                class='iframeShow'
                ref='iframe'
                >
            
    	</iframe>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                toChild:'parentMsg',
                fromChild:''
            }  
        },
        mounted:{
           let iframe = this.$refs.iframe;
            let self = this;
            iframe.onload = function(){
            	// 父组件向子组件传值 
            	iframe.contentWindow.postMessage(self.toChild,'*');//父组件发送 'parentMsg'
            	// 父组件接收子组件的传值
                window.addEventListener('message',(e) => { // 父组件接收： tile-server
                    slef.fromChild = e.data;
                })
        	}
        }
    }
</script>
```

子组件

```html
<body>
    <div>
        <select class='form-control' onchange='selectChange()'>
            <option value='tile-server' selected>tile-server</option>
            <option value='msc-server'></option>msc-server</option>
            <option value='config-server'>config-server</option>
        </select>
    </div>
</body>
<script>
    function selectChange(){
        var options = $('.form-control option:selected'); // 子组件发送:  tile-server
        var value = options.text();
        // 子组件向父组传值
        window.parent.postMessage(value,'*');
    }
    (function(){
        window.addEventListener('message',(e)=>{
            console.log(e.data) // 子组件接收: 'parentMsg'
        })
    })()
</script>
```



## 二、elementUI开发

### 1. el-tree

#### 1.1 节点条件过滤

`filter-node-method` 

`对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏`

Function(value, data, node)

```vue
<el-input
          placeholder="输入用户名查询"
          prefix-icon="el-icon-search"
          v-model="searchByUserName"
          >
</el-input>
<el-tree
          ref="organizationTree"
          :default-expanded-keys="['RootNode']" // "[0]"
          node-key="id"
          :filter-node-method="filterNode"
          >
</el-tree>

<script>
	export default{
    data(){
      return {
        searchByUserName:''
      }
    },
    watch:{
      searchByUserName(val){
        this.$refs.organizationTree.filter(val);
      }
    },
    filterNode(value,data){
      if(!value) return true;
      // name 根据节点中的data指定(Node.data.name)，也有可能是Node.data.label
      return data.name.indexOf(value) !== -1; 
    }
  }
</script>
```

#### 1.2 局部节点刷新

[参考链接1](https://blog.csdn.net/gm0125/article/details/103288701/?utm_medium=distribute.pc_relevant.none-task-blog-baidujs-2)

[参考链接2](https://www.cnblogs.com/LittleMore/p/9052788.html)

**思路**：**找到想要刷新的树节点，重新模拟执行一次展开请求子节点的功能(expand)。**

修改/新建/删除节点操作后，只需要刷新当前节点，无需刷新整棵树和再次请求后台数据

```vue
<el-tree
          ref="organizationTree"
          :default-expanded-keys="['RootNode']" // "[0]"
          node-key="id"
          :filter-node-method="filterNode"
          >
</el-tree>

<script>
	export default{
    methods:{
      // 局部节点刷新方法
      refreshNode(currentNode){
        if(currentNode && currentNode.node){
           // 获取当前节点对象，作为准备刷新的节点
          let refreshNode = currentNode.node;
          refreshNode.loaded = false;
          //  主动调用节点展开方法，重新查询该节点下的所有子节点
          refreshNode.expand();
        }
      }
      nodeOperate(){	
    		// 同级节点操作
    		let peerOrgNode = this.$refs.organizationTree.currentNode;
    		// 调用局部节点刷新方法
    		this.refreshNode(peerOrgNode);
  
  			// 下级节点操作
    		let subOrgNode = this.$refs.organizationTree.currentNode;
    		// 调用局部节点刷新方法
    		this.refreshNode(subOrgNode);
  		}
    }
  }
</script>
```

#### 1.3 el-tree节点高亮设置

[参考链接](https://www.jianshu.com/p/b92e2a022cd8)

问题描述: 默认节点点击后背景不易区分，且失去焦点后，背景高亮消失

问题分析：

​		使用==scoped样式作用域==带来的影响

##### 1.3.1 清楚scoped样式作用域，避免组件内部修改样式无效

当前组件为父组件(使用scoped)，引用的组件库为element-ui的子组件，父组件中使用scoped后修改子组件样式不起效果。

```css
<style lang="less">
  .uniformConfig{
    // 树形节点点击背景颜色高亮
    .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content{
      background-color:rgba(21,159,230,.7);
      color:#000
    }
  }
</style>
```

##### 1.3.2 如果设置了nodeKey, 需要为树形节点指定key

```vue
<el-tree :data="serverData" node-key="id" :props="defaultProps">
</el-tree>

<script>
  data(){
    return {
      defaultProps:{
        children:'children',
        label:'name'
      }
    }
  },
  created(){
    axios.get(url).then(res=>{
      res.data.map((item,index)=>{
        this.serverData.push({
          name:item.name,
          id:index+1,
          children:null
        })
      })
    })
  }
</script>
```



