### 1.1 本地与远程仓库建立连接

[参考链接1](https://blog.csdn.net/qq_33442844/article/details/78491777 )

[参考链接2](https://www.cnblogs.com/tinyphp/p/5025311.html )

#### 1.1.1 终端输入

```js
ssh-keygen -t rsa -C "masterxl12" (注：username为你git上的用户名/注册的邮箱也可)
```

如果成功执行返回

```js
如果执行成功。返回

Generating public/private rsa key pair.

Enter file in which to save the key (c/Users/username/.ssh/id_rsa):
```

然后，在这里就是设置存储地址

如果不设置地址(直接回车键)，则默认是在当前文件目录下新建

#### 1.1.2  一路回车

如果正常运行的话，会出现

```js
Enter passphrase (empty for no passphrase):
```

再次回车 ，会出现如下内容

```js
Your identification has been saved in /Users/username/.ssh/id_rsa.

Your public key has been saved in /Users/username/.ssh/id_rsa.pub.

The key fingerprint is:

58:42:8b:58:ad:4b:b5:b9:6d:79:bf:8c:f9:e2:2b:ed username

The key's randomart image is:
```

然后到指定目录下查看会有密钥和公钥两个文件

```js
 c/Users/Administrator/.ssh
```

![1595989814941](C:\Users\ADMINI~1\AppData\Local\Temp\1595989814941.png)

#### 1.1.3 配置邮箱和密码

默认不设置邮箱和密码，只能clone仓库到本地，不能同步提交和更新代码

Git是分布式版本控制系统，所以，每个机器都必须自报家门：your名字和Email地址。 

```nginx 
git config --global user.email 'leixiao565566@163.com'
git config --global user.name  'master'  // 其他用户名也可
```

配置邮箱和密码后即可提交和更新代码



### 1.2  git开发日志

##### 1.2.1 上传忽略指定文件

```nginx
// 创建.gitignore文件
touch .gitignore
// 编辑.gitignore文件
vim .gitignore
// 指定忽略上传的文件
node_modules

```

##### 1.2.2  提交代码时发生错误

错误原因： `warning: LF will be replaced by CRLF in .gitignore.`

![1597324638660](C:\Users\ADMINI~1\AppData\Local\Temp\1597324638660.png)

错误原因

> git在windows下，默认是CRLF作为换行符，git add 提交时，检查文本中有LF 换行符（linux系统里面的），则会告警。所以让git忽略该检查即可 

解决方案

```nginx
git config --global core.autocrlf false
```

