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

### 四、拦截器

#### 4.1 概述

​		Spring MVC 的处理器拦截器类似于Servlet开发中的过滤器Filter，用于对处理器进行预处理和后处理。 用户可以自己定义一些拦截器来实现特定的功能。 谈到拦截器，还要向大家提一个词——拦截器链（Interceptor Chain）。<font color=red>拦截器链就是将拦截器按一定的顺序联结成一条链。在访问被拦截的方法或字段时，拦截器链中的拦截器就会按其之前定义的顺序被调用。</font> 

拦截器与过滤器区别： 

- 过滤器是servlet规范中的一部分，任何java web工程都可以使用。

-  拦截器是SpringMVC框架自己的，只有使用了SpringMVC框架的工程才能用。 

- 过滤器在url-pattern中配置了/*之后，可以对所有要访问的资源拦截。

-  拦截器它是只会==拦截访问的控制器方法==，如果访问的是jsp，html,css,image或者js是不会进行拦截的。

 ==它也是AOP思想的具体应用==。 我们要想自定义拦截器， 要求必须实现：HandlerInterceptor接口。

#### 4.2 自定义拦截器的步骤

##### 4.2.1 编写拦截器类，实现HandlerInterceptor接口

`com.huayun.interceptor.MyInterceptor`

```java
package com.huayun.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MyInterceptor implements HandlerInterceptor {
    /**
     * 预处理，controller方法执行前
     * return true 放行，执行下一个拦截器，如果没有，执行controller中的方法
     * return false 不放行
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, 
                             HttpServletResponse response, Object handler) throws Exception {
        System.out.println("preHandle: MyInterceptor执行。。。");
        return true;
    }

    /**
     * 后处理方法，controller方法执行后，success.jsp执行前
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     */
    @Override
    public void postHandle(HttpServletRequest request, 
                           HttpServletResponse response, 
                           Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("postHandle: MyInterceptor执行后。。。");
        // postHandle指定页面跳转
        // request.getRequestDispatcher("/WEB-INF/pages/error.jsp").forward(request,response);
    }

    /**
     * success.jsp页面执行后，该方法会执行
     * @param request
     * @param response
     * @param handler
     * @param ex
     * @throws Exception
     */
    @Override
    public void afterCompletion(HttpServletRequest request, 
                                HttpServletResponse response, 
                                Object handler, Exception ex) throws Exception {
        System.out.println("afterCompletion： success.jsp页面执行之后。。。");
    }
}

```

`com.huayun.controller.UserController`

```java
package com.huayun.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api")
public class UserController {
    @RequestMapping("/testInterceptor")
    public String testInterceptor() {
        System.out.println("Controller: testInterceptor...");
        return "success";
    }
}
```

`WEB-INF/pages/success.jsp`

```jsp
<%--
  Created by IntelliJ IDEA.
  User: masterxl
  Date: 2020-03-21
  Time: 12:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>success</title>
</head>
<body>
    <h3>success,   welcome!!!</h3>
<% System.out.println("success.jsp执行了。。。"); %>
</body>
</html>

```

##### 4.2.2 配置拦截器springmvc.xml

`springmvc.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/mvc
        http://www.springframework.org/schema/mvc/spring-mvc.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">

    <!-- 开启注解扫描 -->
    <context:component-scan base-package="com.huayun"/>

    <!-- 视图解析器对象 -->
    <bean id="internalResourceViewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/pages/"/>
        <property name="suffix" value=".jsp"/>
    </bean>

    <!--前端控制器，哪些静态资源不拦截-->
    <mvc:resources location="/css/" mapping="/css/**"/>
    <mvc:resources location="/images/" mapping="/images/**"/>
    <mvc:resources location="/js/" mapping="/js/**"/>

    <!--配置拦截器-->
    <mvc:interceptors>
        <mvc:interceptor>
            <!--要拦截的具体的方法-->
            <mvc:mapping path="/api/*"></mvc:mapping>
            <!--不要拦截的方法
                <mvc:exclude-mapping path=""/>-->
            <!--配置拦截器对象-->
            <bean class="com.huayun.interceptor.MyInterceptor"></bean>
        </mvc:interceptor>
    </mvc:interceptors>
    <!--配置第二个拦截器-->
    <!--不要拦截的方法
    <mvc:exclude-mapping path=""/>
    -->
    <!--配置拦截器对象-->

    <!-- 开启SpringMVC框架注解的支持 -->
    <mvc:annotation-driven/>

</beans>
```

[Output]

```java
preHandle: MyInterceptor执行。。。
Controller: testInterceptor...
postHandle: MyInterceptor执行后。。。
success.jsp执行了。。。
afterCompletion： success.jsp页面执行之后。。。
```

#### 4.3 拦截器的作用路径

```xml
作用路径可以通过在配置文件中配置。
<!-- 配置拦截器的作用范围 --> 
<mvc:interceptors> 
		<mvc:interceptor> <mvc:mapping path="/**" /><!-- 用于指定对拦截的url --> 
		<mvc:exclude-mapping path=""/>              <!-- 用于指定排除的url--> 
    <bean class="com.huayun.interceptor.MyInterceptor"></bean>
		</mvc:interceptor> 
</mvc:interceptors>
```

​	