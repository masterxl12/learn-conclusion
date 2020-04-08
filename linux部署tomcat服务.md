### 一、Linux常用命令

`ps -ef|grep tomcat`    查看所有tomcat进程信息

`ps`    作用：显示进程信息；

`| `符号，是个管道符号，表示ps 和 grep 命令同时执行；

`grep` 命令是查找（Global Regular Expression Print），使用正则表达式搜索文本，然后把匹配的行显示出来；



`rz`       上传本地文件命令：

### 二、 Linux部署tomcat-web服务流程

(1) 	执行`ps -ef|grep tomcat`    

​		后会显示tomcat所有的进程信息，并显示tomcat服务的路径地址

​		路径地址：/home/dky/apache-tomcat-8.5.51

(2)	关闭进程：`kill -9`  ==进程状态号== 

(3)	根据路径地址，进入webapps目录

​        3.1   `cd  /home/dky/apache-tomcat-8.5.51`

​		3.2  ` ls 列出当前目录下的所有文件`

​		3.3   `cd webapps`

(4)	在webapps下新建目录

`mkdir  projectName`

`cd 	   projectName`

(5)	在project目录下上传本地打包的项目包

`rz`       上传本地文件命令：

==可通过**cat** 命令查看上传的文件是否有误==

(6)	启动tomcat服务：

在bin目录下执行启动命令

​	`cd ../bin`

​	`./startup.sh`

(7) 	查看服务启动的端口号port

`cd  ../logs`

`tail -f catalina.out` 查看访问日志，进一步查看服务启动的端口号

(8)	根据端口号以及项目路径名在浏览器端访问

10.136.35.207:port/projecName/index.html

### 三、Linux使用命令

`unzip -n xxx.zip 指定文件目录`    ==解压缩文件到指定的文件下==，

【注】如果不指定文件目录，则会把当前文件名作为压缩文件名



