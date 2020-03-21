### 一、三层架构和MVC

三层架构

1. 表现层：WEB层，用来和客户端进行数据交互的。表现层一般会采用MVC的设计模型

2. 业务层：处理具体业务逻辑的
3. 持久层：操作数据库

MVC模型
1. MVC全名是Model View Controller 模型视图控制器，每个部分各司其职。
2. Model：数据模型，JavaBean的类，用来进行数据封装。
3. View：指JSP、HTML用来展示数据给用户
4. Controller：用来接收用户的请求，整个流程的控制器。用来进行数据校验等。

### 二、SpringMVC实现文件上传

借助第三方组件`Commons-fileupload`,`commons-io`

#### 2.1 pom.xml文件导入坐标

```java
        <dependency>
            <groupId>commons-fileupload</groupId>
            <artifactId>commons-fileupload</artifactId>
            <version>1.3.1</version>
        </dependency>
        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>2.4</version>
        </dependency>
```

#### 2.2 编写jsp页面

**注意事项：**

- 使用post的提交方式，且设置`enctype="multipart/form-data"`

- <input type="file" name==="upload"==>中的name属性需要和成员方法upload(HttpServletRequest request, MultipartFile ==upload==)一致

```java
<form action="user/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="upload">
    <input type="submit" value="提交">
</form>
```

#### 2.3 编写控制器UserController

```java
package com.huayun.controller;


import com.huayun.domain.User;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping("/user")
public class UserController {
    /**
     * springMVC文件上传
     *
     * @param request
     * @param upload
     * @throws IOException
     */
    @RequestMapping("/upload")
    public void upload(HttpServletRequest request, MultipartFile upload) throws IOException {
        System.out.println("springmvc 文件上传!");
        // 使用fileupload组件完成文件上传
        // 上传的位置
        String path = request.getSession().getServletContext().getRealPath("/uploads/");
        File file = new File(path);
      	// 判断，该路径是否存在
        if (!file.exists()) {
            file.mkdirs();
        }
     		// 说明上传文件项
        // 获取上传文件的名称
        String filename = upload.getOriginalFilename();
      	// 把文件的名称设置唯一值，uuid
        String uuid = UUID.randomUUID().toString().replace("-", "");
        String saveName = uuid + "_" + filename;
        System.out.println(saveName);
      	// 完成文件上传
        upload.transferTo(new File(path, saveName));
    }
}
```

### 三、SpringMVC的异常处理

Spring MVC处理异常有3种方式： 

（1）使用Spring MVC提供的简单异常处理器SimpleMappingExceptionResolver； 

（2）实现Spring的异常处理接口HandlerExceptionResolver 自定义自己的异常处理器； 

（3）使用@ExceptionHandler注解实现异常处理；

#### 3.1 异常处理的思路

​		**系统中异常包括两类：预期异常和运行时异常RuntimeException，前者通过捕获异常从而获取异常信息，后者主要通过规范代码开发、测试通过手段减少运行时异常的发生。** 

​		**系统的dao、service、controller出现都通过==throws Exception向上抛出==，<font color=red>最后由springmvc前端控制器交由异常处理器进行异常处理。</font>**

#### 3.2  异常处理的实现步骤

##### 	3.2.1 自定义异常类

`com.huayun.exception.SysException`

```java
package com.huayun.exception;

/**
 * 自定义异常信息类
 */
public class SysException extends Exception {
    private String msg;

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public SysException(String msg) {
        this.msg = msg;
    }
}

```

##### 	3.2.2 自定义统一异常处理类

`com.huayun.exception.SysExceptionResolver`

```java
package com.huayun.exception;

import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 异常处理器对象
 */
public class SysExceptionResolver implements HandlerExceptionResolver {
    @Override
    public ModelAndView resolveException(HttpServletRequest httpServletRequest,
                                         HttpServletResponse httpServletResponse,
                                         Object o, Exception ex) {
        // 获取异常信息对象
        SysException e = null;
        if (ex instanceof SysException) {
            e = (SysException) ex;
        } else {
            e = new SysException("系统正在维护。。。");
        }
        ModelAndView mv = new ModelAndView();
        mv.addObject("errMsg", e.getMsg());
      	// 指定跳转的视图
        mv.setViewName("error");
        return mv;
    }
}

```

​	步骤分解：

```java
public ModelAndView resolveException(HttpServletRequest httpServletRequest,
                                     HttpServletResponse httpServletResponse,
                                     Object o, Exception ex){}
```

- 自定义异常处理器MyException,并实现HandlerExceptionResolver的接口方法，关注==Exception ex==参数
- 当发生异常时,指定跳转的视图jsp

##### 	3.2.3 Controller模拟异常发生

`com.huayun.controller.UserController`

```java
package com.huayun.controller;

import com.huayun.exception.SysException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api")
public class UserController {

    @RequestMapping("/testException")
    public String testException() throws SysException {
        System.out.println("exception...");

        try {
            // 模拟异常
            int a = 10 / 0;
        } catch (Exception e) {
            e.printStackTrace();
            throw new SysException("查询所有用户信息错误");
        }
        return "success";
    }
}

```

##### 	3.2.4 注册异常处理器

​	步骤：在Springmvc.xml配置异常解析类

`springmvc.xml`

```java
    <!--配置异常解析类-->
    <bean id="sysExceptionResolver" class="com.huayun.exception.SysExceptionResolver">
    </bean>
```

##### 	3.2.5 编写跳转视图页面

`WEB-INF/pages/error.jsp`

```jsp
<%--
  Created by IntelliJ IDEA.
  User: masterxl
  Date: 2020-03-20
  Time: 23:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    ${errMsg}
</body>
</html>

```



​	