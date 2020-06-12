Mac 安装软件



### 一、终端相关

#### 1.  安装iTerm2 

[安装参考链接一](https://www.jianshu.com/p/9c3439cc3bdb)

[安装参考链接二](https://www.jianshu.com/p/ba08713c2b19)

解决背景字体颜色没有生效问题：

打开Iterm2的Preferences之后，找到Text，由于上述答案中找“Draw bold text in bright colors”，但是当前版本中，并无该选项。

<img src="/Users/masterxl/Library/Application Support/typora-user-images/image-20200320120109091.png" alt="image-20200320120109091" style="zoom:40%;" />

因此找到Colors，将上图中的Brighten bold text勾选掉之后，Scheme即可生效

### 二、壁纸网站

[4k高清壁纸](https://wallhaven.cc/)

### 三、修改host文件

#### 3.1 终端更改

用程序里面打开终端(terminal),输入
 sudo vi /etc/hosts
 然后提示输入系统密码
 hosts文件就自动打开了
 接着输入 i
 进入编辑模式
 将添加的网站,ip拷贝进去
 编辑完成之后,按esc,输入 : wq   (冒号也要)

