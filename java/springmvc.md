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

### 五、SSM整合

#### 5.1 导入坐标并建立依赖

##### 5.1.1 Pom.xml

```java
<?xml version="1.0" encoding="UTF-8"?>

<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.huayun</groupId>
  <artifactId>springmvc_day03_ssm</artifactId>
  <version>1.0-SNAPSHOT</version>
  <packaging>war</packaging>

  <name>springmvc_day03_ssm Maven Webapp</name>
  <!-- FIXME change it to the project's website -->
  <url>http://www.example.com</url>

  <properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
    <spring.version>5.0.2.RELEASE</spring.version>
    <slf4j.version>1.6.6</slf4j.version>
    <log4j.version>1.2.12</log4j.version>
    <mysql.version>5.1.6</mysql.version>
    <mybatis.version>3.4.5</mybatis.version>
  </properties>

  <dependencies>
    <!-- spring -->
    <dependency>
      <groupId>org.aspectj</groupId>
      <artifactId>aspectjweaver</artifactId>
      <version>1.6.8</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aop</artifactId>
      <version>${spring.version}</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>${spring.version}</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-web</artifactId>
      <version>${spring.version}</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>${spring.version}</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-test</artifactId>
      <version>${spring.version}</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-tx</artifactId>
      <version>${spring.version}</version>
    </dependency>

    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>${spring.version}</version>
    </dependency>

    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <scope>compile</scope>
    </dependency>

    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>${mysql.version}</version>
    </dependency>

    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>servlet-api</artifactId>
      <version>2.5</version>
      <scope>provided</scope>
    </dependency>

    <dependency>
      <groupId>javax.servlet.jsp</groupId>
      <artifactId>jsp-api</artifactId>
      <version>2.0</version>
      <scope>provided</scope>
    </dependency>

    <dependency>
      <groupId>jstl</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
    </dependency>

    <!-- log start -->
    <dependency>
      <groupId>log4j</groupId>
      <artifactId>log4j</artifactId>
      <version>${log4j.version}</version>
    </dependency>

    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-api</artifactId>
      <version>${slf4j.version}</version>
    </dependency>

    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-log4j12</artifactId>
      <version>${slf4j.version}</version>
    </dependency>

    <!-- log end -->
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>${mybatis.version}</version>
    </dependency>

    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis-spring</artifactId>
      <version>1.3.0</version>
    </dependency>

    <dependency>
      <groupId>c3p0</groupId>
      <artifactId>c3p0</artifactId>
      <version>0.9.1.2</version>
      <type>jar</type>
      <scope>compile</scope>
    </dependency>
  </dependencies>

  <build>
    <finalName>springmvc_day03_ssm</finalName>
    <pluginManagement><!-- lock down plugins versions to avoid using Maven defaults (may be moved to parent pom) -->
      <plugins>
        <plugin>
          <artifactId>maven-clean-plugin</artifactId>
          <version>3.1.0</version>
        </plugin>
        <!-- see http://maven.apache.org/ref/current/maven-core/default-bindings.html#Plugin_bindings_for_war_packaging -->
        <plugin>
          <artifactId>maven-resources-plugin</artifactId>
          <version>3.0.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-compiler-plugin</artifactId>
          <version>3.8.0</version>
        </plugin>
        <plugin>
          <artifactId>maven-surefire-plugin</artifactId>
          <version>2.22.1</version>
        </plugin>
        <plugin>
          <artifactId>maven-war-plugin</artifactId>
          <version>3.2.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-install-plugin</artifactId>
          <version>2.5.2</version>
        </plugin>
        <plugin>
          <artifactId>maven-deploy-plugin</artifactId>
          <version>2.8.2</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
</project>

```

##### 5.1.2 编写实体类

`com.huayun.domain.Account`

```java
package com.huayun.domain;

import java.io.Serializable;

public class Account implements Serializable {
    private Integer id;
    private String name;
    private double money;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney(double money) {
        this.money = money;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", money=" + money +
                '}';
    }
}
```

##### 5.1.3 编写业务层

`com.huayun.service.AccountService`

```java
package com.huayun.service;

import com.huayun.domain.Account;

import java.util.List;

public interface AccountService {
    /**
     * 查询所有账户信息
     * @return
     */
    public List<Account> findAll();

    /**
     * 保存账户
     * @param account
     */
    public void saveAccount(Account account);
}

```

`业务层接口实现类``com.huayun.service.impl.AccountServiceImpl`

```java
package com.huayun.service.impl;

import com.huayun.dao.AccountDao;
import com.huayun.domain.Account;
import com.huayun.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("accountService")
public class AccountServiceImpl implements AccountService {

    // 业务层调持久层
    @Autowired
    private AccountDao accountDao;

    @Override
    public List<Account> findAll() {
        System.out.println("业务层： 查询所有用户信息...");
        List<Account> lists = accountDao.findAll();
        return lists;
    }

    @Override
    public void saveAccount(Account account) {
        System.out.println("业务层： 保存账户信息...");
        accountDao.saveAccount(account);
    }
}

```

##### 5.1.4 编写Dao层

`com.huayun.dao.AccountDao`

```java
package com.huayun.dao;

import com.huayun.domain.Account;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * dao接口
 */
@Repository
public interface AccountDao {
    /**
     * 查询所有账户信息
     *
     * @return
     */
    @Select("select * from account")
    public List<Account> findAll();

    /**
     * 保存账户
     *
     * @param account
     */
    @Insert("insert into account (name,money) values(#{name},#{money})")
    public void saveAccount(Account account);
}

```

##### 5.1.5 编写controller

`com.huayun.controller.AccountController`

```java
package com.huayun.controller;


import com.huayun.domain.Account;
import com.huayun.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

//import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/api")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    public String findAll(Model model) {
        System.out.println("表现层： 查询所有用户信息...");
        List<Account> accounts = accountService.findAll();
        model.addAttribute("accounts", accounts);
        return "list";
    }

    @RequestMapping(value = "/save")
    public void save(Account account, HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("表现层： 保存账户...");
        accountService.saveAccount(account);
        System.out.println(request.getContextPath());
        response.sendRedirect(request.getContextPath() + "/api/findAll");
    }
}
```

#### 5.2 保证Spring框架在web中独立运行

思路：确保每一个环节都能独立运作后，再整合

==**整合原则：表现层调用业务层，业务层调用持久层**==

##### 5.2.1 编写spring配置文件并导入约束

`applicationContext.xml`

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
	http://www.springframework.org/schema/beans/spring-beans.xsd
	http://www.springframework.org/schema/context
	http://www.springframework.org/schema/context/spring-context.xsd
	http://www.springframework.org/schema/aop
	http://www.springframework.org/schema/aop/spring-aop.xsd
	http://www.springframework.org/schema/tx
	http://www.springframework.org/schema/tx/spring-tx.xsd">
    <!--1. 开启注解扫描，希望处理service和dao，controller不需要Spring框架去处理-->
    <context:component-scan base-package="com.huayun">
        <!--配置哪些注解不扫描-->
        <context:exclude-filter type="annotation"
                                expression="org.springframework.stereotype.Controller"/>
    </context:component-scan>

    <!--2. spring整合mybatis-->
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="com.mysql.jdbc.Driver"/>
        <property name="jdbcUrl" value="jdbc:mysql:///user"/>
        <property name="user" value="root"/>
        <property name="password" value="123456"/>
    </bean>

    <!--2.1 配置SqlSessionFactory工厂-->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!--2.2 配置AccountDao接口所在包-->
    <bean id="mapperScanner" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.huayun.dao"/>
    </bean>

    <!--3.  配置Spring框架声明式事务管理-->
    <!--3.1 配置事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!--3.2 配置事务通知-->
    <tx:advice id="txAdvice" transaction-manager="transactionManager">
        <tx:attributes>
            <tx:method name="find*" read-only="true"/>
            <tx:method name="*" isolation="DEFAULT"/>
        </tx:attributes>
    </tx:advice>

    <!--3.3 配置AOP增强-->
    <aop:config>
        <aop:advisor advice-ref="txAdvice" pointcut="execution(* com.huayun.service.impl.*ServiceImpl.*(..))"/>
    </aop:config>

</beans>
```

##### 5.2.2 使用注解配置业务层和持久层

`业务层实现类` AccountServiceImpl

```java
package com.huayun.service.impl;

import com.huayun.dao.AccountDao;
import com.huayun.domain.Account;
import com.huayun.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("accountService")
public class AccountServiceImpl implements AccountService {

    @Override
    public List<Account> findAll() {
        System.out.println("业务层： 查询所有用户信息...");
        return null;
    }

    @Override
    public void saveAccount(Account account) {
        System.out.println("业务层： 保存账户信息...");
    }
}

```

`持久层` dao

```java
package com.huayun.dao;

import com.huayun.domain.Account;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * dao接口
 */
@Repository
public interface AccountDao {
    /**
     * 查询所有账户信息
     *
     * @return
     */
    @Select("select * from account")
    public List<Account> findAll();

    /**
     * 保存账户
     *
     * @param account
     */
    @Insert("insert into account (name,money) values(#{name},#{money})")
    public void saveAccount(Account account);
}

```

##### 5.2.3 测试spring能否独立运行

`com.huayun.test.TestSpring`

```java
package com.huayun.test;

import com.huayun.domain.Account;
import com.huayun.service.AccountService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestSpring {
    @Test
    public void run1(){
        // 1 加载配置文件
         ApplicationContext ac = new ClassPathXmlApplicationContext("classpath:applicationContext.xml");
        // 2 获取对象
        AccountService as = (AccountService) ac.getBean("accountService");
        // 3 调用方法
        as.findAll();
    }
}

```

#### 5.3 保证SpringMVC在web工程中独立运行

##### 5.3.1 在`web.xml`中配置核心控制器（DispatcherServlet）

```java
<!DOCTYPE web-app PUBLIC
        "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
        "http://java.sun.com/dtd/web-app_2_3.dtd" >

<web-app>
  <display-name>Archetype Created Web Application</display-name>

  <!--配置Spring的监听器，默认只加载WEB-INF目录下的applicationContext.xml配置文件-->
  <listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
  </listener>
  <!--设置配置文件的路径-->
  <context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:applicationContext.xml</param-value>
  </context-param>

  <!--配置前端控制器-->
  <servlet>
    <servlet-name>dispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!--加载springmvc.xml配置文件-->
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath:springmvc.xml</param-value>
    </init-param>
    <!--启动服务器，创建该servlet-->
    <load-on-startup>1</load-on-startup>
  </servlet>
  <servlet-mapping>
    <servlet-name>dispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>

  <!--解决中文乱码的过滤器-->
  <filter>
    <filter-name>characterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>characterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>

</web-app>
```

##### 5.3.2 编写SpringMVC的配置文件

`springmvc.xml`

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:mvc="http://www.springframework.org/schema/mvc" xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/mvc
        http://www.springframework.org/schema/mvc/spring-mvc.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">

    <!--1. 开启注解扫描，只扫描Controller注解-->
    <context:component-scan base-package="com.huayun">
        <context:include-filter type="annotation" expression="org.springframework.stereotype.Controller" />
    </context:component-scan>

    <!--2. 配置的视图解析器对象-->
    <bean id="internalResourceViewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/pages/"/>
        <property name="suffix" value=".jsp"/>
    </bean>

    <!--3. 过滤静态资源-->
    <mvc:resources location="/css/" mapping="/css/**" />
    <mvc:resources location="/images/" mapping="/images/**" />
    <mvc:resources location="/js/" mapping="/js/**" />

    <!--4. 开启SpringMVC注解的支持-->
    <mvc:annotation-driven/>

</beans>
```

##### 5.3.3 编写Controller和jsp页面

`index.jsp`

```java
<%--
  Created by IntelliJ IDEA.
  User: masterxl
  Date: 2020-03-22
  Time: 16:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<a href="/api/findAll">查询所有</a>
<hr>

<form action="/api/save" method="post">
    姓名：<input type="text" name="name" /><br/>
    金额：<input type="text" name="money" /><br/>
    <input type="submit" value="保存"/><br/>
</form>
</body>
</html>

```

#### 5.4  整合Spring和SpringMVC

##### 5.4.1 配置监听器实现启动服务创建容器

`WEB-INF/web.xml`

```java
  <!--配置Spring的监听器，默认只加载WEB-INF目录下的applicationContext.xml配置文件-->
  <listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
  </listener>
  <!--设置配置文件的路径-->
  <context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:applicationContext.xml</param-value>
  </context-param>
```

**==也即完成表现层调用持久层==**

#### 5.5 MyBatis框架独立运行

##### 5.5.1 编写SqlMapConfig配置文件

也可以不用单独配置这一文件，后面可以在spring配置文件中配置

```java
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--1. 配置环境-->
    <environments default="mysql">
        <environment id="mysql">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/User"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
    <!--2. 引入映射配置文件-->
    <mappers>
        <!--<mapper resource="com.huayun.dao.AccountDao" />-->
        <package name="com.huayun.dao"/>
    </mappers>
</configuration>
```

##### 5.5.2 测试运行结果

```java
public class TestJdbc {
    // 测试查询所有
    @Test
    public void testJdbc() throws IOException {
        // 1. 加载配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");

        // 2. 创建SqlSessionFactory对象
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(in);

        // 3. 创建SqlSession对象
        SqlSession session = factory.openSession();

        // 4. 获取到代理对象
        AccountDao accountDao = session.getMapper(AccountDao.class);

        // 5. 查询所有信息
        List<Account> list = accountDao.findAll();
        for (Account account : list) {
            System.out.println(account);
        }
        session.close();

        in.close();
    }
}
```

#### 5.6 Spring和MyBatis整合

##### 5.6.1Spring接管MyBatis的Session工厂

`applicationContext.xml`

```java
<!--2. spring整合mybatis-->
    <!--启动数据库连接池-->
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="com.mysql.jdbc.Driver"/>
        <property name="jdbcUrl" value="jdbc:mysql:///user"/>
        <property name="user" value="root"/>
        <property name="password" value="123456"/>
    </bean>

    <!--2.1 配置SqlSessionFactory工厂-->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
    </bean>
```

##### 5.6.2 配置自动扫描所有Mapper接口和文件

`applicationContext.xml`

```java
    <!--2.2 配置AccountDao接口所在包-->
    <bean id="mapperScanner" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <property name="basePackage" value="com.huayun.dao"/>
    </bean>
```

##### 5.6.3 配置spring的事务

`applicationContext.xml`

```java
    <!--3.  配置Spring框架声明式事务管理-->
    <!--3.1 配置事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!--3.2 配置事务通知-->
    <tx:advice id="txAdvice" transaction-manager="transactionManager">
        <tx:attributes>
            <tx:method name="find*" read-only="true"/>
            <tx:method name="*" isolation="DEFAULT"/>
        </tx:attributes>
    </tx:advice>

    <!--3.3 配置AOP增强-->
    <aop:config>
		<!-- 配置切入点表达式-->   
        <aop:advisor advice-ref="txAdvice" pointcut="execution(* com.huayun.service.impl.*ServiceImpl.*(..))"/>
    </aop:config>
```

**==也就实现了业务层调用持久层==**

#### 5.7 测试整合结果

##### 5.7.1 编写测试jsp

`WEB-INF/pages/list.jsp`

```java
<%--
  Created by IntelliJ IDEA.
  User: masterxl
  Date: 2020-03-22
  Time: 16:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<h3>查询所有的帐户</h3>

<c:forEach items="${accounts}" var="account">
    ${account.name}<br>
</c:forEach>
</body>
</html>

```

##### 5.7.2 修改控制器中的方法

`com/huayun/controller/AccountController.java`

```java
package com.huayun.controller;


import com.huayun.domain.Account;
import com.huayun.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

//import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("/api")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    public String findAll(Model model) {
        System.out.println("表现层： 查询所有用户信息...");
        List<Account> accounts = accountService.findAll();
        model.addAttribute("accounts", accounts);
        return "list";
    }

    @RequestMapping(value = "/save")
    public void save(Account account, HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("表现层： 保存账户...");
        accountService.saveAccount(account);
        System.out.println(request.getContextPath());
        response.sendRedirect(request.getContextPath() + "/api/findAll");
    }
}
```

##### 5.7.3 测试运行结果



