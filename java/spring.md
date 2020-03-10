### 一、spring概述

### 二、IOC(反转控制)

==**作用：降低程序之间的耦合(依赖关系)**==

#### 2.1 程序的依赖

**耦合：程序间的依赖关系**

- 类之间的依赖
- 方法间的依赖

**解耦：**

​	**降低程序间的依赖关系**

​	**实际开发中，应该做到编译期不依赖，运行期才依赖**

**==解耦的思路==**

- **使用==反射==来创建对象，而避免使用关键字**
- **通过==读取配置文件==来获取要创建的对象全限定类名**

#### 2.2 pom.xml文件

```java
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.huayun</groupId>
    <artifactId>day01_spring_01jdbc</artifactId>
    <version>1.0-SNAPSHOT</version>
    <!--选择打包方式-->
    <packaging>jar</packaging>

    <dependencies>
        <!--添加数据库连接接依赖-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.0.8</version>
        </dependency>
    </dependencies>


</project>
```

#### 2.3 传统不解耦项目模拟

##### 2.3.1 业务层

 1. 业务层接口类

    ```java
    package jdbc.service;
    
    /**
     * 业务层接口
     */
    public interface AccountService {
        void saveAccount();
    }
    
    ```

    

 2. 业务层接口实现类

    ```java
    package jdbc.service.impl;
    
    import jdbc.dao.AccountDao;
    import jdbc.dao.impl.AccountDaoImpl;
    import jdbc.service.AccountService;
    
    /**
     * 业务层接口实现类
     */
    public class AccountServiceImpl implements AccountService {
        /**
         * 业务层调用持久层
         */
        private AccountDao accountDao =  new AccountDaoImpl();
        public void saveAccount() {
            accountDao.saveAccount();
    
        }
    }
    ```

    

##### 2.3.2 持久层

1. ```java
   package jdbc.dao;
   
   /**
    * 持久层接口
    */
   public interface AccountDao {
       void saveAccount();
   }
   ```

2. 持久层接口类

   ```java
   package jdbc.dao.impl;
   
   import jdbc.dao.AccountDao;
   
   /**
    * 持久层接口实现类
    */
   public class AccountDaoImpl implements AccountDao {
       public void saveAccount() {
           System.out.println("保存用户成功!");
       }
   }
   
   ```

##### 2.3.3 表现层

持久层接口实现类

```java
package jdbc.ui;

import jdbc.service.impl.AccountServiceImpl;

/**
 * 模拟一个表现层，用于调用业务层
 */
public class Client {
    public static void main(String[] args) {
        AccountServiceImpl accountService = new AccountServiceImpl();
        accountService.saveAccount();
    }
}
```

输出结果

```java
保存用户成功!
```

#### 2.4 使用工厂模式进行解耦

一个创建Bean对象的工厂

Bean: 在计算机英语中，有可重用组件的含义。

JavaBean： 用java语言编写的可重用组件

- javabean  >  实体类
- 也即是创建我们的service和dao对象

第一个： 需要一个**==配置文件==**来配置我的service和dao

​				==**配置的内容： 唯一标识 = 全限定类名(key = value)**==

**第二个：通过读取配置文件中配置的内容，==反射创建对象==**

配置文件的形式：`xml` 和 `properities`

### 三、IOC-使用spring构建项目

#### 3.1 spring中工厂的类结构图

![image-20200307210717847](/Users/masterxl/Library/Application Support/typora-user-images/image-20200307210717847.png)

```java
     * 获取spring的Ioc核心容器，并根据id获取对象
     *
     * ApplicationContext的三个常用实现类：
     *      ClassPathXmlApplicationContext：它可以加载类路径下的配置文件，要求配置文件必须在类路径下。不在的话，加载不了。(更常用)
     *      FileSystemXmlApplicationContext：它可以加载磁盘任意路径下的配置文件(必须有访问权限）
     *
     *      AnnotationConfigApplicationContext：用于读取注解创建容器。
核心容器的两个接口引发出的问题：
     *  ApplicationContext:     单例对象适用              采用此接口
     *      它在构建核心容器时，创建对象采取的策略是采用立即加载的方式。也就是说，只要一读取完配置文件马上就创建配置文件中配置的对象。
     *
     *  BeanFactory:            多例对象使用
     *      它在构建核心容器时，创建对象采取的策略是采用延迟加载的方式。也就是说，什么时候根据id获取对象了，什么时候才真正的创建对象。
```

#### 3.2 IOC中bean标签和管理对象细节

##### 3.2.1 创建对象的三种方式

```java
<!--创建Bean的三种方式 -->
    <!-- 第一种方式：使用默认构造函数创建。
            在spring的配置文件中使用bean标签，配以id和class属性之后，且没有其他属性和标签时。
            采用的就是默认构造函数创建bean对象，此时如果类中没有默认构造函数，则对象无法创建。

    <bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl"></bean>
    -->
    <!--第二种方式： 使用普通工厂中的方法创建对象（使用某个类中的方法创建对象，并存入spring容器）-->
    <!--<bean id="instanceFactory" class="com.huayun.factory.InstanceFactory"></bean>-->
    <!--<bean id="accountService" factory-bean="instanceFactory" factory-method="getAccountService"></bean>-->

    <!--第三种方式：使用工厂中的静态方法创建对象（使用某个类中的静态方法创建对象，并存入spring容器)-->
    <!--<bean id="accountService" class="com.huayun.factory.StaticFactory" factory-method="getAccountService"></bean>-->
```

##### 3.2.2 bean的作用范围调整

```java
<!-- bean的作用范围调整
    bean标签的scope属性：
        作用：用于指定bean的作用范围
        取值： 常用的就是单例的和多例的
            singleton：单例的（默认值）
            prototype：多例的
            request：作用于web应用的请求范围
            session：作用于web应用的会话范围
            global-session：作用于集群环境的会话范围（全局会话范围），当不是集群环境时，它就是session
    -->
    <!--<bean id="accountService" class="com.huayun.service.impl.AccountServiceImpl" scope="prototype"></bean>-->
    <!--<bean id="accountService" class="com.huayun.service.impl.AccountServiceImpl" scope="prototype"></bean>-->
```

##### 3.2.3 bean对象的生命周期

```java
    <!-- bean对象的生命周期
        单例对象
            出生：当容器创建时对象出生
            活着：只要容器还在，对象一直活着
            死亡：容器销毁，对象消亡
            总结：单例对象的生命周期和容器相同
        多例对象
            出生：当我们使用对象时spring框架为我们创建
            活着：对象只要是在使用过程中就一直活着。
            死亡：当对象长时间不用，且没有别的对象引用时，由Java的垃圾回收器回收
    -->
    <bean id="accountService"
          class="com.huayun.service.impl.AccountServiceImpl"
          scope="singleton"
          init-method="init"
          destroy-method="destory">
    </bean>
```

#### 3.3 spring中的依赖注入(dependency injection)

依赖注入：Dependency Injection。它是spring框架核心ioc的具体实现。 我们的程序在编写时，通过控制反转，把对象的创建交给了spring，但是代码中不可能出现没有依赖的情况。ioc解耦只是降低他们的依赖关系，但不会消除。例如：我们的业务层仍会调用持久层的方法。 那这种业务层和持久层的依赖关系，在使用spring之后，就让spring来维护了。 简单的说，就是坐等框架把持久层对象传入业务层，而不用我们自己去获取。

    <!-- spring中的依赖注入
    依赖注入：
        Dependency Injection
    IOC的作用：
        降低程序间的耦合（依赖关系）
    依赖关系的管理：
        以后都交给spring来维护
    在当前类需要用到其他类的对象，由spring为我们提供，我们只需要在配置文件中说明
    依赖关系的维护：
        就称之为依赖注入。
     依赖注入：
        能注入的数据：有三类
            基本类型和String
            其他bean类型（在配置文件中或者注解配置过的bean）
            复杂类型/集合类型
         注入的方式：有三种
            第一种：使用构造函数提供
            第二种：使用set方法提供
            第三种：使用注解提供
    -->
##### 3.3.1 构造函数注入

就是使用类中的构造函数，给成员变量赋值。注意，赋值的操作不是我们自己做的，而是通过配置的方式，让spring框架来为我们注入.

    <!--构造函数注入：默认是无参的构造函数，可以重写
    使用的标签:constructor-arg
    标签出现的位置：bean标签的内部
    标签中的属性
        type：用于指定要注入的数据的数据类型，该数据类型也是构造函数中某个或某些参数的类型
        index：用于指定要注入的数据给构造函数中指定索引位置的参数赋值。索引的位置是从0开始
        name：用于指定给构造函数中指定名称的参数赋值                                        常用的
        =============以上三个用于指定给构造函数中哪个参数赋值===============================
        value：用于提供基本类型和String类型的数据
        ref：用于指定其他的bean类型数据。它指的就是在spring的Ioc核心容器中出现过的bean对象
    
    优势：
        在获取bean对象时，注入数据是必须的操作，否则对象无法创建成功。
    弊端：
        改变了bean对象的实例化方式，使我们在创建对象时，如果用不到这些数据，也必须提供。
    -->
**业务层实现类com.huayun.service.impl.AccountServiceImpl**

```java
package com.huayun.service.impl;

import com.huayun.service.AccountService;

import java.util.Date;

/**
 * 业务层接口实现类
 */
public class AccountServiceImpl implements AccountService {
    /**
     * 业务层调用持久层
     */
    private String name;
    public Integer age;
    public Date birthday;

    public AccountServiceImpl(String name, Integer age, Date birthday) {
        this.name = name;
        this.age = age;
        this.birthday = birthday;
    }

    public AccountServiceImpl() {
        System.out.println("创建对象开始。。。");
    }

    public void saveAccount() {
        System.out.println("service中的saveAccount方法执行。。。" + ",name: " + name + ",age:" + age + ",date:" + birthday);
    }

    public void init() {
        System.out.println("出生");
    }

    public void destory() {
        System.out.println("死亡");
    }

}
```

**bean.xml对应配置**

```java
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       https://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="accountService1" class="com.huayun.service.impl.AccountServiceImpl">
        <constructor-arg name="name" value="塔斯特"></constructor-arg>
        <constructor-arg name="age" value="18"></constructor-arg>
        <constructor-arg name="birthday" ref="now"></constructor-arg>
    </bean>

    <!--配置一个日期对象-->
    <bean id="now" class="java.util.Date"></bean>
</beans>
```

##### 3.3.2 set方法注入

```text
<!-- set方法注入                更常用的方式
涉及的标签：property
出现的位置：bean标签的内部
标签的属性
    name：用于指定注入时所调用的set方法名称
    value：用于提供基本类型和String类型的数据
    ref：用于指定其他的bean类型数据。它指的就是在spring的Ioc核心容器中出现过的bean对象
优势：
    创建对象时没有明确的限制，可以直接使用默认构造函数
弊端：
    如果有某个成员必须有值，则获取对象是有可能set方法没有执行。
-->
```
**业务层实现类com.huayun.service.impl.AccountServiceImpl2**

```java
package com.huayun.service.impl;

import com.huayun.service.AccountService;

import java.util.Date;

/**
 * 业务层接口实现类
 */
public class AccountServiceImpl2 implements AccountService {
    /**
     * 业务层调用持久层
     */
    private String name;
    public Integer age;
    public Date birthday;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public AccountServiceImpl2() {
        System.out.println("创建对象开始。。。");
    }

    public void saveAccount() {
        System.out.println("service中的saveAccount方法执行。。。" + ",name: " + name + ",age:" + age + ",date:" + birthday);
    }

} 
```

**bean.xml对应配置**

```java
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       https://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--配置一个日期对象-->
    <bean id="now" class="java.util.Date"></bean>
    <bean id="accountService2" class="com.huayun.service.impl.AccountServiceImpl2">
        <property name="name" value="道恩强森"></property>
        <property name="age" value="18"></property>
        <property name="birthday" ref="now"></property>
    </bean>

</beans>
```

##### 3.3.3 注入集合属性(Array\List\Set\Map\Properities)

    <!-- 复杂类型的注入/集合类型的注入
    用于给List结构集合注入的标签：
        list array set
    用于个Map结构集合注入的标签:
        map  props
    结构相同，标签可以互换
    -->
**业务层实现类com.huayun.service.impl.AccountServiceImpl3**

```java
package com.huayun.service.impl;

import com.huayun.service.AccountService;

import java.util.*;

/**
 * 业务层接口实现类
 */
public class AccountServiceImpl3 implements AccountService {
    /**
     * 业务层调用持久层
     */
    private String[] myStr;
    private List<String> myList;
    private Set<String> mySet;
    private Map<String,String> myMap;
    private Properties myProps;

    public void setMyStr(String[] myStr) {
        this.myStr = myStr;
    }

    public void setMyList(List<String> myList) {
        this.myList = myList;
    }

    public void setMySet(Set<String> mySet) {
        this.mySet = mySet;
    }

    public void setMyMap(Map<String, String> myMap) {
        this.myMap = myMap;
    }

    public void setMyProps(Properties myProps) {
        this.myProps = myProps;
    }

    public AccountServiceImpl3() {
        System.out.println("创建对象开始。。。");
    }

    public void saveAccount() {
        System.out.println("service中的saveAccount方法执行。。。");
        System.out.println(Arrays.toString(myStr));
        System.out.println(myList);
        System.out.println(mySet);
        System.out.println(myMap);
        System.out.println(myProps);
    }

}
```

**bean.xml对应配置**

```java
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       https://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="accountService3" class="com.huayun.service.impl.AccountServiceImpl3">
        <property name="myStr">
            <array>
                <value>AAA</value>
                <value>BBB</value>
                <value>CCC</value>
            </array>
        </property>
        <property name="myList">
            <list>
                <value>AAAA</value>
                <value>BBBB</value>
                <value>CCCC</value>
            </list>
        </property>
        <property name="mySet">
            <set>
                <value>AAAA</value>
                <value>BBBB</value>
                <value>CCCC</value>
            </set>
        </property>
        <property name="myMap">
            <map>
                <entry key="name" value="kobe"></entry>
                <entry key="name" value="curry"></entry>
                <entry key="name" value="james"></entry>
                <entry key="name" value="wade"></entry>
                <entry key="name" value="jordan"></entry>
            </map>
        </property>
    </bean>
</beans>
```

### 四、基于注解的IOC配置

#### 4.1 注解结合bean.xml配置

```java
 * 曾经XML的配置：
 *  <bean id="accountService" class="com.itheima.service.impl.AccountServiceImpl"
 *        scope=""  init-method="" destroy-method="">
 *      <property name=""  value="" | ref=""></property>
 *  </bean>
```

##### 4.1.1 用于创建对象：

@Component： 用于把当前类对象存入spring容器中

@Service:   用于业务层

@Controller： 用于变现层

@Respository：用于持久层

```java
 * 用于创建对象的
 *      他们的作用就和在XML配置文件中编写一个<bean>标签实现的功能是一样的
 *      Component:
 *          作用：用于把当前类对象存入spring容器中
 *          属性：
 *              value：用于指定bean的id。当我们不写时，它的默认值是当前类名，且首字母改小写。
 *      Controller：一般用在表现层
 *      Service：一般用在业务层
 *      Repository：一般用在持久层
 *      以上三个注解他们的作用和属性与Component是一模一样。
 *      他们三个是spring框架为我们提供明确的三层使用的注解，使我们的三层对象更加清晰
```

##### 4.1.2 用于注入数据的

@Autowired : 只要容器中有唯一的一个bean对象类型和要注入的便利类型匹配，就可注入成功

@Qualifier：在按照类中注入的基础之上在按照名称注入，一般结合@Autowired使用

@Resource：直接按照bean的id注入，可以独立使用(其中，name用于指定bean的id)

@Value：用于注入基本类型和String类型的数据

```java
 * 用于注入数据的
 *      他们的作用就和在xml配置文件中的bean标签中写一个<property>标签的作用是一样的
 *      Autowired:
 *          作用：自动按照类型注入。只要容器中有唯一的一个bean对象类型和要注入的变量类型匹配，就可以注入成功
 *                如果ioc容器中没有任何bean的类型和要注入的变量类型匹配，则报错。
 *                如果Ioc容器中有多个类型匹配时：
 *          出现位置：
 *              可以是变量上，也可以是方法上
 *          细节：
 *              在使用注解注入时，set方法就不是必须的了。
 *      Qualifier:
 *          作用：在按照类中注入的基础之上再按照名称注入。它在给类成员注入时不能单独使用。但是在给方法参数注入时可以
 *          属性：
 *              value：用于指定注入bean的id。
 *      Resource
 *          作用：直接按照bean的id注入。它可以独立使用
 *          属性：
 *              name：用于指定bean的id。
 *      以上三个注入都只能注入其他bean类型的数据，而基本类型和String类型无法使用上述注解实现。
 *      另外，集合类型的注入只能通过XML来实现。
 *
 *      Value
 *          作用：用于注入基本类型和String类型的数据
 *          属性：
 *              value：用于指定数据的值。它可以使用spring中SpEL(也就是spring的el表达式）
 *                      SpEL的写法：${表达式}
```

##### 4.1.3 用于作用范围和生命周期

@Scope：用于指定bean的作用范围

```java
 * 用于改变作用范围的
 *      他们的作用就和在bean标签中使用scope属性实现的功能是一样的
 *      Scope
 *          作用：用于指定bean的作用范围
 *          属性：
 *              value：指定范围的取值。常用取值：singleton prototype
 *
 * 和生命周期相关 了解
 *      他们的作用就和在bean标签中使用init-method和destroy-methode的作用是一样的
 *      PreDestroy
 *          作用：用于指定销毁方法
 *      PostConstruct
 *          作用：用于指定初始化方法
```

#### 4.2 使用spring的IOC实现用户crud

