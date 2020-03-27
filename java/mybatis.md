### 一、环境搭建

#### 1.1 环境搭建

##### 	1.1.1 创建maven工程并导入坐标

##### 	1.1.2 创建实体类和dao的接口

##### 	1.1.3 创建Mybatis的主配置文件

​	`SqlMapConfig.xml`

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/ssm"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="mapper/IUerDao.xml"/>
    </mappers>
</configuration>
```

##### 	1.1.4 创建映射配置文件

`maper/IUserDao.xml`

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.huayun.dao.IUserDao">
    <select id="findAll">
      select * from user;
    </select>
</mapper>
```

##### 1.1.5 注意事项

- **mybatis的映射配置文件位置必须和dao接口的包结构相同**
- **映射配置文件的`mapper`标签`namespace`属性的取值必须是dao接口的全限定类名**
- **映射配置文件的操作配置(select),id属性的取值必须是dao接口的方法名**

**==遵从以上几点，在开发中就无须再写dao的实现类==**

#### 1.2 mybatis入门案例

##### 1.2.1 读取配置文件，使用代理创建dao的实现类

`step1`           读取配置文件

`step2`           创建SqlSessionFactory工厂

`step3`           使用工厂生成SqlSeesion对象

`step4`           ==使用SqlSession创建Dao接口的代理对象==

`step5`           使用代理对象执行方法

`step6`           释放资源

```java
package com.huayun;

import com.huayun.dao.IUserDao;
import com.huayun.domain.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public class UserTest {
    public static void main(String[] args) throws IOException {
        //1. 读取配置文件
        InputStream in = Resources.getResourceAsStream("SqlMapConfig.xml");
        //2. 创建SqlsessionFactory工厂
        SqlSessionFactoryBuilder builder = new SqlSessionFactoryBuilder();
        SqlSessionFactory factory = builder.build(in);
        //3. 使用工厂生成Sqlseesion对象
        SqlSession session = factory.openSession();
        //4. 使用Sqlsession创建Dao接口的代理对象
        IUserDao iUserDao = session.getMapper(IUserDao.class);
        //5. 使用代理对象执行方法
        List<User> users = iUserDao.findAll();
        for (User user : users) {
            System.out.println(user);
        }
        //6. 释放资源
        session.close();
        in.close();
    }
}
```

##### 1.2.2 指定dao映射配置文件返回的实体类型

**配置的方式：指定实体类的全限定类名**

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.huayun.dao.IUserDao">
  <--********************start*******************************-->
    <select id="findAll" resultType="com.huayun.domain.User">
   <--*******************end*******************************-->
      select * from user;
    </select>
</mapper>
```

### 二、基于代理对象的CRUD操作

#### 2.1基于代理Dao的CRUD操作

##### 2.1.1 持久层(Dao)接口中定义抽象方法

```java
package com.huayun.dao;

import com.huayun.domain.User;

import java.util.List;

public interface IUserDao {
    // 查询所有
    List<User> findAll();

    // 保存用户
    void saveUser(User user);

    // 更新用户
    void updateUser(User user);

    // 删除用户
    void deleteUser(int id);

    // 查询one
    User findById(int id);

    // 模糊查询
    List<User> findByName(String uname);

    // 统计id数
    int findTotal();
}
```

##### 2.1.2 配置映射文件关联Dao层

- 通过namespace指定关联的Dao接口

- 通过id绑定Dao接口定义的抽象方法
- ==通过参数`resultType` 指定具体封装的实体类型==
- ==通过参数`parameterType`指定具体的参数类型==
- 通过select语句指定具体操作的逻辑

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.huayun.dao.IUserDao">
    <select id="findAll" resultType="com.huayun.domain.User">
        select * from user;
    </select>

    <insert id="saveUser" parameterType="com.huayun.domain.User">
        insert into user(username, birthday, sex, address) values (#{username},#{birthday},#{sex},#{address})
    </insert>

    <update id="updateUser" parameterType="com.huayun.domain.User">
        update user set username=#{username},birthday=#{birthday},sex=#{sex}, address=#{address} where id = #{id}
    </update>

    <delete id="deleteUser" parameterType="java.lang.Integer">
        delete from user where id  = #{uid};
    </delete>

    <select id="findById" parameterType="INT" resultType="com.huayun.domain.User">
        select * from user where  id = #{uid}
    </select>

    <select id="findByName" parameterType="java.lang.String" resultType="com.huayun.domain.User">
        select * from user where username like #{uname}
    </select>

    <select id="findTotal" resultType="int">
        select count(id) from user;
    </select>
</mapper>
```

【参数细节剖析】

```java
细节： 
  parameterType属性： 
  		定义参数的类型，如果要传入的是一个类的对象，所以类型就写类的全名称。
	sql语句中使用#{}字符： 
  		它代表占位符，相当于原来jdbc部分所学的?，都是用于执行语句时替换实际的数据。 具体的数据是由#{}里面的内容决定的。 
  #{}中内容的写法： 
  		由于我们保存方法的参数是 一个User对象，此处要写User对象中的属性名称。 它用的是ognl表达式。 
  ognl表达式： 
  		它是apache提供的一种表达式语言，全称是：
  		Object Graphic Navigation Language 对象图导航语言 			 
  		它是按照一定的语法格式来获取数据的。 
  		语法格式就是使用 #{对象.对象}的方式
  #{user.username}它会先去找user对象，然后在user对象中找到username属性，并调用getUsername()方法把值取出来。但是我们在parameterType属性上指定了实体类名称，所以可以省略user.而直接写username。
```

##### 2.1.3 加入测试方法

​	`TestUser.java`

```java
import com.huayun.dao.IUserDao;
import com.huayun.domain.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.InputStream;
import java.util.Date;
import java.util.List;

public class TestUser {

    private InputStream in;
    private SqlSession sqlSession;
    private IUserDao userDao;

    @Before  // 在测试方法执行前执行
    public void init() throws Exception {
        in = Resources.getResourceAsStream("SqlMapConfig.xml");
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(in);
        // 获取SqlSession对象
        sqlSession = factory.openSession();
        // 获取dao的代理对象
        userDao = sqlSession.getMapper(IUserDao.class);
    }

    @After // 在测试方法执行后执行
    public void destroy() throws Exception {
        // 提交事务
        sqlSession.commit();
        sqlSession.close();
        in.close();
    }

    /**
     * 测试查询所有
     */
    @Test
    public void findAll() {
        List<User> users = userDao.findAll();
        for (User user : users) {
            System.out.println(user);
        }
    }

    /**
     * 测试保存用户
     */
    @Test
    public void saveUser() {
        User u = new User();
        u.setUsername("xl");
        u.setAddress("萧山机场");
        u.setBirthday(new Date());
        u.setSex("M");
        userDao.saveUser(u);
    }

    /**
     * 测试更新用户
     */
    @Test
    public void TestUpdate() {
        User user = new User();
        user.setId(54);
        user.setAddress("滨江区");
        user.setSex("F");
        user.setBirthday(new Date());
        user.setUsername("xyt");
        userDao.updateUser(user);
    }

    /**
     * 测试删除用户
     */
    @Test
    public void testDelete() {
        userDao.deleteUser(53);
    }

    /**
     * 根据id查询
     */
    @Test
    public void testFindOne() {
        User user = userDao.findById(43);
        System.out.println(user);
    }

    /**
     * 模糊查询
     */

    @Test
    public void testFindByName() {
        List<User> users = userDao.findByName("%王");
        for (User user : users) {
            System.out.println(user);
        }
    }
  
  	/**
     * 统计数目
     */
    @Test
    public void testFindTotal(){
        int total = userDao.findTotal();
        System.out.println(total);
    }
}

```

#### 2.2 Mybatis参数深入



- resultType配置结果类型

  - resultType属性可以指定结果集的类型，它支持基本类型和实体类类型。
  - 需要注意的是，它和parameterType一样，如果注册过类型别名的，可以直接使用别名。==没有注册过的必须使用全限定类名==

  ```java
  <!-- 配置查询所有操作 --> 
    <select id="findAll" resultType="com.huayun.domain.User"> 
   			 select * from user 
    </select>
  ```

- 修改实体类(mysql不区分大小写)

**如果sql中定义的字段和JavaBean定义的实体类属性不一致，直接封装实体类会出错**

解决办法：

- 给sql的每列字段名(==依照实体类==)起别名
  - 但是如果我们的查询的字段很多，都使用别名的话写起来会很麻烦
- 在映射配置文件中使用`resultMap`参数
  - resultMap标签可以建立==查询的列名和实体类的属性名称不一致时建立对应关系==。从而实现封装。 
  - 在select标签中使用resultMap属性指定引用即可。
  - 同时resultMap可以实现将查询结果映射为复杂类型的pojo，比如在查询结果映射对象中包括pojo和list实现一对一查询和一对多查询。

##### 2.2.1 定义resultMap

**==配置查询结果的列名和实体类的属性名的对应关系==**

```java
    <!--
    type属性：指定实体类的全限定类名
    id属性：给定一个唯一标识，是给查询select标签引用用的。
    -->
    <resultMap id="com.huayun.domain.User" type="userMap">
        <id column="id" property="userId" />
        <result column="username" property="userName"/>
        <result column="sex" property="userSex"/>
        <result column="address" property="userAddress"/>
        <result column="birthday" property="userBirthday"/>
        <!--
        id标签：用于指定主键字段
        result标签：用于指定非主键字段
        column属性：用于指定数据库列名
        property属性：用于指定实体类属性名称
        -->
    </resultMap>
```

##### 2.2.2 映射配置

```java
    <select id="findAll" resultType="userMap">
        select * from user;
    </select>
```

##### 2.2.3 测试结果

```java
import com.huayun.dao.IUserDao;
import com.huayun.domain.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.InputStream;
import java.util.Date;
import java.util.List;

public class TestUser {

    private InputStream in;
    private SqlSession sqlSession;
    private IUserDao userDao;

    @Before  // 在测试方法执行前执行
    public void init() throws Exception {
        in = Resources.getResourceAsStream("SqlMapConfig.xml");
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(in);
        // 获取SqlSession对象
        sqlSession = factory.openSession();
        // 获取dao的代理对象
        userDao = sqlSession.getMapper(IUserDao.class);
    }

    @After // 在测试方法执行后执行
    public void destroy() throws Exception {
        // 提交事务
        sqlSession.commit();
        sqlSession.close();
        in.close();
    }

    /**
     * 测试查询所有
     */
    @Test
    public void findAll() {
        List<User> users = userDao.findAll();
        for (User user : users) {
            System.out.println(user);
        }
    }

    /**
     * 测试保存用户
     */
    @Test
    public void saveUser() {
        User u = new User();
        u.setUsername("xl");
        u.setAddress("萧山机场");
        u.setBirthday(new Date());
        u.setSex("M");
        userDao.saveUser(u);
    }

    /**
     * 测试更新用户
     */
    @Test
    public void TestUpdate() {
        User user = new User();
        user.setId(54);
        user.setAddress("滨江区");
        user.setSex("F");
        user.setBirthday(new Date());
        user.setUsername("xyt");
        userDao.updateUser(user);
    }

    /**
     * 测试删除用户
     */
    @Test
    public void testDelete() {
        userDao.deleteUser(53);
    }

    /**
     * 根据id查询
     */
    @Test
    public void testFindOne() {
        User user = userDao.findById(43);
        System.out.println(user);
    }

    /**
     * 模糊查询
     */

    @Test
    public void testFindByName() {
        List<User> users = userDao.findByName("%王");
        for (User user : users) {
            System.out.println(user);
        }
    }

    @Test
    public void testFindTotal(){
        int total = userDao.findTotal();
        System.out.println(total);
    }
}
```

#### 2.3 SqlMapConfig.xmlp配置文件

##### 2.3.1 SqlMapConfig.xml中配置的内容和顺序

```java
-properties（属性）
  --property 
-settings（全局配置参数） 
  --setting 
-typeAliases（类型别名） 
  --typeAliase 
  --package 
-typeHandlers（类型处理器） 
-objectFactory（对象工厂） 
-plugins（插件） 
-environments（环境集合属性对象） 
  --environment（环境子属性对象）
  	---transactionManager（事务管理） 
  	---dataSource（数据源） 
-mappers（映射器） 
  --mapper 
  --package
```

##### 2.3.2 properties（属性）

在使用properties标签配置时，我们可以采用两种方式指定属性配置。

- 第一种—直接在sql配置文件中使用

`SqlMapConfig.xml`

```java
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/ssm?characterEncoding=utf-8"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
```

- 第二种—在classpath下定义db.properties文件，然后在sql配置文件中引用

```java
properties文件
<!--
    可以在标签内部配置连接数据库的信息。也可以通过属性引用外部配置文件信息
    resource属性： 常用的
    用于指定配置文件的位置，是按照类路径的写法来写，并且必须存在于类路径下。
-->
```

`定义properties文件，提取配置公共变量`

`db.properties`

```java
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/ssm?characterEncoding=utf-8
jdbc.username=root
jdbc.password=123456
```

`映射配置文件` 

`SqlMapConfig.xml`

```java
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}" />
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>
```

##### 2.3.3  typeAliases（类型别名）

```java
在SqlMapConfig.xml中配置：
  <typeAliases> <!-- 单个别名定义 -->
  		<typeAlias alias="user" type="com.huayun.domain.User"/> 
  		<!-- 批量别名定义，扫描整个包下的类，别名为类名（首字母大写或小写都可以） --> 
  		<package name="com.huayun.domain"/> 
  		<package name="其它包"/>
  </typeAliases>
```

##### 2.3.4 mappers（映射器）

- `<mapper resource=" " />`

```java
使用相对于类路径的资源 如：<mapper resource="com/itheima/dao/IUserDao.xml" />
```

- `<mapper class=" " />`

<img src="/Users/masterxl/Library/Application Support/typora-user-images/image-20200326005809995.png" alt="image-20200326005809995" style="zoom:40%;" />

```java
使用mapper接口类路径 如：<mapper class="com.huayun.dao.UserDao"/> 
注意：此种方法要求mapper接口名称和mapper映射文件名称相同，且放在同一个目录中。
```

- `<package name=""/>`

```java
注册指定包下的所有mapper接口 
如：<package name="com.huayun.mybatis.mapper"/> 
注意：此种方法要求mapper接口名称和mapper映射文件名称相同，且放在同一个目录中。
```

#### 2.4 SqlMapConfig.xml和IUserDao.xml

`SqlMapConfig.xml`

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <!--
        可以在标签内部配置连接数据库的信息。也可以通过属性引用外部配置文件信息
        resource属性： 常用的
        用于指定配置文件的位置，是按照类路径的写法来写，并且必须存在于类路径下。
    -->
    <properties resource="db.properties"/>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/ssm?characterEncoding=utf-8"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <!--1. 基于xml配置dao的映射文件-->
        <mapper resource="com/huayun/dao/IUserDao.xml"/>
    </mappers>
</configuration>
```

`com/huayun/dao/IUserDao.xml`

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.huayun.dao.IUserDao">
    <select id="findAll" resultType="com.huayun.domain.User">
        select * from user;
    </select>

    <insert id="saveUser" parameterType="com.huayun.domain.User">
        insert into user(username, birthday, sex, address) values (#{username},#{birthday},#{sex},#{address})
    </insert>

    <update id="updateUser" parameterType="com.huayun.domain.User">
        update user set username=#{username},birthday=#{birthday},sex=#{sex}, address=#{address} where id = #{id}
    </update>

    <delete id="deleteUser" parameterType="java.lang.Integer">
        delete from user where id  = #{uid};
    </delete>

    <select id="findById" parameterType="INT" resultType="com.huayun.domain.User">
        select * from user where  id = #{uid}
    </select>

    <select id="findByName" parameterType="java.lang.String" resultType="com.huayun.domain.User">
        select * from user where username like #{uname}
    </select>

    <select id="findTotal" resultType="int">
        select count(id) from user;
    </select>
</mapper>
```

### 三、连接池及事务控制

#### 3.1 多表查询之一对多

一对多模拟：一个用户可以拥有多个账户

##### 3.1.1 主表实体类(User.java)

【注意】主表实体应该包含从表实体的集合引用

添加了返回`Account`的账户列表

`com/huayun/domain/User.java`

```java
package com.huayun.domain;


import java.util.Date;
import java.util.List;

public class User {

  private long id;
  private String username;
  private Date birthday;
  private String sex;
  private String address;
  
  // ==============主表实体应该包含从表实体的集合引用================
  private List<Account> accounts;
  // ==========================================================
  
  public List<Account> getAccounts() {
    return accounts;
  }

  public void setAccounts(List<Account> accounts) {
    this.accounts = accounts;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }


  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }


  public Date getBirthday() {
    return birthday;
  }

  public void setBirthday(Date birthday) {
    this.birthday = birthday;
  }


  public String getSex() {
    return sex;
  }

  public void setSex(String sex) {
    this.sex = sex;
  }


  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", birthday=" + birthday +
                ", sex='" + sex + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}

```

##### 3.1.2 主表Dao接口定义(IUserDao.java)

`com/huayun/dao/IUserDao.java`

```java
package com.huayun.dao;

import com.huayun.domain.User;

import java.util.List;

public interface IUserDao {
    // 查询所有
    List<User> findAll();

    // 一对多查询，包含所有账户信息
    List<User> findAllAccount();

}

```

##### 3.1.3 从表实体类(Account.java)

```java
package com.huayun.domain;


public class Account {

  private long id;
  private long uid;
  private double money;

  private User user;

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }


  public long getUid() {
    return uid;
  }

  public void setUid(long uid) {
    this.uid = uid;
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
            ", uid=" + uid +
            ", money=" + money +
            '}';
  }
}

```

##### 3.1.4 从表Dao接口定义(IAccountDao.java)

```java
package com.huayun.dao;

import com.huayun.domain.Account;
import com.huayun.domain.AccountUser;

import java.util.List;

public interface IAccountDao {
    List<Account> findAll();

    List<AccountUser> findAllList();
}
```

##### ==3.1.5 配置映射文件(IUserDao.xml)==

由于一个用户会对应多个账户，所以`Accounts`封装为`Account`的集合

```java
==================================================================================
	collection 部分定义了用户关联的账户信息。表示关联查询结果集 
	property="accList"： 关联查询的结果集存储在User对象的上哪个属性。 
  ofType="account"： 指定关联查询的结果集中的对象类型即List中的对象类型。此处可以使用别名，
也可以使用全限定名。
==================================================================================
```

在返回封装的实体类中，需要配置user对象中accounts集合的映射

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.huayun.dao.IUserDao">
    <!--定义user的resultMap-->
    <resultMap id="userAccountMap" type="user">
        <id property="id" column="id"/>
        <result property="username" column="username"/>
        <result property="sex" column="sex"/>
        <result property="birthday" column="birthday"/>
        <result property="address" column="address"/>
  ==================================================================
        <!--配置user对象中accounts集合的映射-->
        <collection property="accounts" ofType="account">
            <id property="id" column="aid"/>
            <result property="uid" column="uid"/>
            <result property="money" column="money"/>
        </collection>
  ==================================================================
    </resultMap>

    <select id="findAll" resultType="user">
        select * from user;
    </select>

    <!--查询用户所有账户信息-->
    <select id="findAllAccount" resultMap="userAccountMap">
      SELECT u.*,a.ID aid,a.UID uid,a.MONEY money FROM `user` u 
      LEFT JOIN account a on u.id = a.UID
    </select>


</mapper>
```

##### 3.1.6 编写测试类

```java
import com.huayun.dao.IUserDao;
import com.huayun.domain.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.InputStream;
import java.util.Date;
import java.util.List;

public class TestUser {

    private InputStream in;
    private SqlSession sqlSession;
    private IUserDao userDao;

    @Before  // 在测试方法执行前执行
    public void init() throws Exception {
        in = Resources.getResourceAsStream("SqlMapConfig.xml");
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(in);
        // 获取SqlSession对象
        sqlSession = factory.openSession();
        // 获取dao的代理对象
        userDao = sqlSession.getMapper(IUserDao.class);
    }

    @After // 在测试方法执行后执行
    public void destroy() throws Exception {
        // 提交事务
        sqlSession.commit();
        sqlSession.close();
        in.close();
    }

    /**
     * 测试查询所有
     */
    @Test
    public void findAll() {
        List<User> users = userDao.findAll();
        for (User user : users) {
            System.out.println(user);
        }
    }

   @Test
    public void findAllAccount(){
       List<User> allAccount = userDao.findAllAccount();
       for (User user : allAccount) {
           System.out.println("---------每一个用户账户信息-----------");
           System.out.println(user);
           System.out.println(user.getAccounts());
       }
   }
}

```

##### 3.1.7 返回结果

```java
---------每一个用户账户信息-----------
User{id=46, username='老王', birthday=Wed Mar 07 17:37:26 CST 2018, sex='男', address='北京'}
[Account{id=1, uid=46, money=1000.0}, Account{id=3, uid=46, money=2000.0}]
---------每一个用户账户信息-----------
User{id=45, username='传智播客', birthday=Sun Mar 04 12:04:06 CST 2018, sex='男', address='北京金燕龙'}
[Account{id=2, uid=45, money=1000.0}]
---------每一个用户账户信息-----------
User{id=41, username='老王', birthday=Tue Feb 27 17:47:08 CST 2018, sex='男', address='北京'}
[]
---------每一个用户账户信息-----------
User{id=42, username='小二王', birthday=Fri Mar 02 15:09:37 CST 2018, sex='女', address='北京金燕龙'}
[]
---------每一个用户账户信息-----------
User{id=43, username='小二王', birthday=Sun Mar 04 11:34:34 CST 2018, sex='女', address='北京金燕龙'}
[]
---------每一个用户账户信息-----------
User{id=48, username='小马宝莉', birthday=Thu Mar 08 11:44:00 CST 2018, sex='女', address='北京修正'}
[]
---------每一个用户账户信息-----------
User{id=50, username='wsn', birthday=Wed Mar 25 11:14:56 CST 2020, sex='M', address='西湖区'}
[]
---------每一个用户账户信息-----------
User{id=51, username='wsn', birthday=Wed Mar 25 11:15:09 CST 2020, sex='M', address='商城'}
[]
---------每一个用户账户信息-----------
User{id=52, username='wsn', birthday=Wed Mar 25 11:17:17 CST 2020, sex='M', address='西安'}
[]
---------每一个用户账户信息-----------
User{id=54, username='xyt', birthday=Wed Mar 25 12:00:49 CST 2020, sex='F', address='滨江区'}
[]
---------每一个用户账户信息-----------
User{id=55, username='xl', birthday=Wed Mar 25 11:39:23 CST 2020, sex='M', address='萧山机场'}
[]
```

#### 3.2  多表查询之一对一模拟

模拟事例：一个账户对应每个用户

##### 3.2.1 从表实体类

**==从表实体应该包含一个主表实体的引用==**

```java
package com.huayun.domain;


public class Account {

  private long id;
  private long uid;
  private double money;

  //===============从表实体包含主表实体的引用=====================
  private User user;
  //==========================================================
  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }


  public long getUid() {
    return uid;
  }

  public void setUid(long uid) {
    this.uid = uid;
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
            ", uid=" + uid +
            ", money=" + money +
            '}';
  }
}

```

##### ==3.2.2 配置映射文件(IAccountDao.xml)==

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.huayun.dao.IAccountDao">
    <!--定义封装account和user的resultMap-->
    <resultMap id="accountUserMap" type="account">
        <id property="id" column="aid"/>
        <result property="uid" column="uid"/>
        <result property="money" column="money"/>
  ==================是用于指定从表方的引用实体属性的==================
        <!--一对一的关系映射，配置封装user的内容-->
        <association property="user" column="uid" javaType="user">
            <result property="id" column="id"/>
            <result property="username" column="username"/>
            <result property="address" column="address"/>
            <result property="address" column="address"/>
            <result property="birthday" column="birthday"/>
        </association>
  ================================================================
    </resultMap>
    <select id="findAll" resultMap="accountUserMap">
        SELECT u.*, a.id as aid,a.UID,a.MONEY FROM account a, user u where u.id = a.UID
    </select>
</mapper>
```

关键代码====封装主表返回的对象

```java
        <!--一对一的关系映射，配置封装user的内容-->
        <association property="user" column="uid" javaType="user">
            <result property="id" column="id"/>
            <result property="username" column="username"/>
            <result property="address" column="address"/>
            <result property="address" column="address"/>
            <result property="birthday" column="birthday"/>
        </association>
```

##### 3.2.3 编写测试类

```java
import com.huayun.dao.IAccountDao;
import com.huayun.domain.Account;
import com.huayun.domain.AccountUser;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.InputStream;
import java.util.List;

public class TestAccount {

    private InputStream in;
    private SqlSession sqlSession;
    private IAccountDao accountDao;

    @Before  // 在测试方法执行前执行
    public void init() throws Exception {
        in = Resources.getResourceAsStream("SqlMapConfig.xml");
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(in);
        // 获取SqlSession对象
        sqlSession = factory.openSession();
        // 获取dao的代理对象
        accountDao = sqlSession.getMapper(IAccountDao.class);
    }

    @After // 在测试方法执行后执行
    public void destroy() throws Exception {
        // 提交事务
        sqlSession.commit();
        sqlSession.close();
        in.close();
    }

    /**
     * 从表实体应该包含一个主表实体的对象引用
     * 测试一对一的查询
     */
    @Test
    public void findAll() {
        List<Account> accounts = accountDao.findAll();
        for (Account account : accounts) {
            System.out.println("每个账户的信息");
            System.out.println(account);
            System.out.println(account.getUser());
        }
    }
}

```

##### 3.2.4 返回结果

[Output]

```java
每个账户的信息
Account{id=1, uid=46, money=1000.0}
User{id=46, username='老王', birthday=Wed Mar 07 17:37:26 CST 2018, sex='null', address='北京'}
每个账户的信息
Account{id=2, uid=45, money=1000.0}
User{id=45, username='传智播客', birthday=Sun Mar 04 12:04:06 CST 2018, sex='null', address='北京金燕龙'}
每个账户的信息
Account{id=3, uid=46, money=2000.0}
User{id=46, username='老王', birthday=Wed Mar 07 17:37:26 CST 2018, sex='null', address='北京'}
```

#### 3.3 多表查询之多对多

**==可分为两个一对多的对应关系，使用中间表完成==**

多对多案例模拟：一个用户拥有多个角色，一个角色对应多个用户

##### 3.3.1 一个用户对应多个角色sql语句

```sql
select 
	u.*, r.ID as rid,r.role_desc,r.role_name 
from 
	user u 
left join user_role ur 
on u.id = ur.uid 
left join role r 
on r.id = ur.rid
```

![image-20200326231727711](/Users/masterxl/Library/Application Support/typora-user-images/image-20200326231727711.png)

##### 3.3.2 User.java用户实体类

**用户实体类包含==角色实体类集合的引用==**

```java
  // 一对多关系：主表实体应该包含从表实体的集合引用
  private List<Role> roles;

  public List<Role> getRoles() {
    return roles;
  }

  public void setRoles(List<Role> roles) {
    this.roles = roles;
  }
```

```java
package com.huayun.domain;


import java.util.Date;
import java.util.List;

public class User {

  private long id;
  private String username;
  private Date birthday;
  private String sex;
  private String address;
  // 一对多关系：主表实体应该包含从表实体的集合引用
  private List<Role> roles;

  public List<Role> getRoles() {
    return roles;
  }

  public void setRoles(List<Role> roles) {
    this.roles = roles;
  }

  public List<Account> getAccounts() {
    return accounts;
  }

  public void setAccounts(List<Account> accounts) {
    this.accounts = accounts;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }


  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }


  public Date getBirthday() {
    return birthday;
  }

  public void setBirthday(Date birthday) {
    this.birthday = birthday;
  }


  public String getSex() {
    return sex;
  }

  public void setSex(String sex) {
    this.sex = sex;
  }


  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", birthday=" + birthday +
                ", sex='" + sex + '\'' +
                ", address='" + address + '\'' +
                '}';
    }
}

```

##### 3.3.3 IUserDao接口定义

```java
package com.huayun.dao;

import com.huayun.domain.User;

import java.util.List;

public interface IUserDao {
    // 查询所有
    List<User> findAll();

    //  一对多查询，包含所有角色信息
    List<User> findAllRoles();
}

```

##### 3.3.4 Role.java角色实体类

```java
package com.huayun.domain;

import java.util.List;

public class Role {
    private int id;
    private String roleName;
    private String roleDesc;
    private List<User> users ;

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleDesc() {
        return roleDesc;
    }

    public void setRoleDesc(String roleDesc) {
        this.roleDesc = roleDesc;
    }

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", roleName='" + roleName + '\'' +
                ", roleDesc='" + roleDesc + '\'' +
                '}';
    }
}
```

##### ==3.3.6  IUserDao.xml配置映射文件==

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.huayun.dao.IUserDao">

    <resultMap id="userRoleMap" type="user">
        <id property="id" column="id"/>
        <result property="username" column="username"/>
        <result property="sex" column="sex"/>
        <result property="birthday" column="birthday"/>
        <result property="address" column="address"/>
        <!--配置user对象中角色roles集合的映射-->
        <collection property="roles" ofType="role">
            <id property="id" column="rid"/>
            <result property="roleDesc" column="role_desc"/>
            <result property="roleName" column="role_name"/>
        </collection>
    </resultMap>

    <select id="findAll" resultType="user">
        select * from user;
    </select>

    <!--查询用户所有角色信息-->
    <select id="findAllRoles" resultMap="userRoleMap">
        select u.*, r.ID as rid,r.role_desc,r.role_name from user u
        left join user_role ur on u.id = ur.uid
        left join role r on r.id = ur.rid
    </select>

</mapper>
```

##### 3.3.7 一用户对多角色查询结果

```java
import com.huayun.dao.IUserDao;
import com.huayun.domain.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.InputStream;
import java.util.Date;
import java.util.List;

public class TestUser {

    private InputStream in;
    private SqlSession sqlSession;
    private IUserDao userDao;

    @Before  // 在测试方法执行前执行
    public void init() throws Exception {
        in = Resources.getResourceAsStream("SqlMapConfig.xml");
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(in);
        // 获取SqlSession对象
        sqlSession = factory.openSession();
        // 获取dao的代理对象
        userDao = sqlSession.getMapper(IUserDao.class);
    }

    @After // 在测试方法执行后执行
    public void destroy() throws Exception {
        // 提交事务
        sqlSession.commit();
        sqlSession.close();
        in.close();
    }

   // 查询用户所有的角色信息
   @Test
    public void findAllRoles(){
       List<User> allRoles = userDao.findAllRoles();
       for (User user : allRoles) {
           System.out.println("---------每一个用户角色信息-----------");
           System.out.println(user);
           System.out.println(user.getRoles());
       }

   }
}

```

【Output】

```java
---------每一个用户角色信息-----------
User{id=41, username='老王', birthday=Tue Feb 27 17:47:08 CST 2018, sex='男', address='北京'}
[Role{id=1, roleName='院长', roleDesc='管理整个学院'}, Role{id=2, roleName='总裁', roleDesc='管理整个公司'}]
---------每一个用户角色信息-----------
User{id=45, username='传智播客', birthday=Sun Mar 04 12:04:06 CST 2018, sex='男', address='北京金燕龙'}
[Role{id=1, roleName='院长', roleDesc='管理整个学院'}]
---------每一个用户角色信息-----------
User{id=42, username='小二王', birthday=Fri Mar 02 15:09:37 CST 2018, sex='女', address='北京金燕龙'}
[]
---------每一个用户角色信息-----------
User{id=43, username='小二王', birthday=Sun Mar 04 11:34:34 CST 2018, sex='女', address='北京金燕龙'}
[]
---------每一个用户角色信息-----------
User{id=46, username='老王', birthday=Wed Mar 07 17:37:26 CST 2018, sex='男', address='北京'}
[]
---------每一个用户角色信息-----------
User{id=48, username='小马宝莉', birthday=Thu Mar 08 11:44:00 CST 2018, sex='女', address='北京修正'}
[]
---------每一个用户角色信息-----------
User{id=50, username='wsn', birthday=Wed Mar 25 11:14:56 CST 2020, sex='M', address='西湖区'}
[]
---------每一个用户角色信息-----------
User{id=51, username='wsn', birthday=Wed Mar 25 11:15:09 CST 2020, sex='M', address='商城'}
[]
---------每一个用户角色信息-----------
User{id=52, username='wsn', birthday=Wed Mar 25 11:17:17 CST 2020, sex='M', address='西安'}
[]
---------每一个用户角色信息-----------
User{id=54, username='xyt', birthday=Wed Mar 25 12:00:49 CST 2020, sex='F', address='滨江区'}
[]
---------每一个用户角色信息-----------
User{id=55, username='xl', birthday=Wed Mar 25 11:39:23 CST 2020, sex='M', address='萧山机场'}
[]
```

##### 3.3.8 一角色对应多个用户sql语句

```sql
select 
	u.*, r.ID as rid,r.role_desc,r.role_name 
from role r left join user_role ur 
on r.id = ur.rid 
LEFT JOIN user u 
on u.id = ur.uid

```

![image-20200326231634184](/Users/masterxl/Library/Application Support/typora-user-images/image-20200326231634184.png)



##### 3.3.9 IRoleDao.java接口

```java
package com.huayun.dao;

import com.huayun.domain.Role;

import java.util.List;

public interface IRoleDao {
    // 查询角色下的用户信息
    List<Role> findAll();
}

```

##### ==3.3.10 IRoleDao.xml映射配置文件==

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.huayun.dao.IRoleDao">
    <!--定义role的resultMap-->
    <resultMap id="roleMap" type="role">
        <id property="id" column="rid"/>
        <result property="roleName" column="role_name"/>
        <result property="roleDesc" column="role_desc"/>
  	<!--====================================================-->
        <!--配置role对象中users集合的映射-->
        <collection property="users" ofType="user">
            <id property="id" column="id"/>
            <result property="username" column="username"/>
            <result property="sex" column="sex"/>
            <result property="address" column="address"/>
            <result property="birthday" column="birthday"/>
        </collection>
  	<!--====================================================-->
    </resultMap>

    <select id="findAll" resultMap="roleMap">
        select u.*, r.ID as rid,r.role_desc,r.role_name from role r
        left join user_role ur on r.id = ur.rid
        LEFT JOIN user u on u.id = ur.uid
    </select>

</mapper>
```

##### 3.3.11 角色对应多个用户测试类

```java
import com.huayun.dao.IRoleDao;
import com.huayun.dao.IUserDao;
import com.huayun.domain.Role;
import com.huayun.domain.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.InputStream;
import java.util.List;

public class TestRole {

    private InputStream in;
    private SqlSession sqlSession;
    private IRoleDao roleDao;

    @Before  // 在测试方法执行前执行
    public void init() throws Exception {
        in = Resources.getResourceAsStream("SqlMapConfig.xml");
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(in);
        // 获取SqlSession对象
        sqlSession = factory.openSession();
        // 获取dao的代理对象
        roleDao = sqlSession.getMapper(IRoleDao.class);
    }

    @After // 在测试方法执行后执行
    public void destroy() throws Exception {
        // 提交事务
        sqlSession.commit();
        sqlSession.close();
        in.close();
    }

    /**
     * 测试查询所有
     */
    @Test
    public void findAll() {
        List<Role> roles = roleDao.findAll();
        for (Role role : roles) {
            System.out.println("--------每个角色信息--------");
            System.out.println(role);
            System.out.println(role.getUsers());
        }
    }

}
```

##### 3.3.12 角色对应多用户的查询结果

【Output】

```java
--------每个角色信息--------
Role{id=1, roleName='院长', roleDesc='管理整个学院'}
[User{id=41, username='老王', birthday=Tue Feb 27 17:47:08 CST 2018, sex='男', address='北京'}, User{id=45, username='传智播客', birthday=Sun Mar 04 12:04:06 CST 2018, sex='男', address='北京金燕龙'}]
--------每个角色信息--------
Role{id=2, roleName='总裁', roleDesc='管理整个公司'}
[User{id=41, username='老王', birthday=Tue Feb 27 17:47:08 CST 2018, sex='男', address='北京'}]
--------每个角色信息--------
Role{id=3, roleName='校长', roleDesc='管理整个学校'}
[]
```

##### 3.3.13 SqlMapConfig.xml配置文件

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">

<configuration>
    <!-- 配置properties-->
    <properties resource="db.properties"/>

    <!--使用typeAliases配置别名，它只能配置domain中类的别名 -->
    <typeAliases>
        <package name="com.huayun.domain" />
    </typeAliases>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}" />
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <package name="com.huayun.dao" />
        <!--1. 基于xml配置dao的映射文件-->
        <!--<mapper resource="com/huayun/dao/IUserDao.xml"/>-->
        <!--2. 基于注解配置-->
    </mappers>
</configuration>
```







### 开发Problems

#### 1.1 mybatis连接数据库中文乱码问题

在数据库配置文件，==连接的数据库url==处添加如下代码`characterEncoding=utf-8`

`jdbc:mysql://localhost:3306/ssm?characterEncoding=utf-8"`

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/ssm?characterEncoding=utf-8"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <!--1. 基于xml配置dao的映射文件-->
        <mapper resource="com/huayun/dao/IUserDao.xml"/>
        <!--2. 基于注解配置-->
    </mappers>
</configuration>
```

达梦数据库

不能同时包含聚集key和大字段解决方案

建表时==主键字段==如果指定`“NOT CLUSTER PRIMARY KEY”`则可以随时添加大字段

<img src="/Users/masterxl/Library/Application Support/typora-user-images/image-20200327223516931.png" alt="image-20200327223516931" style="zoom:50%;" />

