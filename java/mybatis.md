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

![image-20200323230127833](/Users/masterxl/Library/Application Support/typora-user-images/image-20200323230127833.png)

##### 1.1.5 注意事项

- **mybatis的映射配置文件位置必须和dao接口的包结构相同**
- **映射配置文件的`mapper`标签`namespace`属性的取值必须是dao接口的全限定类名**
- **映射配置文件的操作配置(select),id属性的取值必须是dao接口的方法名**

**==遵从以上几点，在开发中就无须再写dao的实现类==**

#### 1.2 mybatis入门案例

###### 1.2.1 读取配置文件，使用代理创建dao的实现类

`step1`           读取配置文件

`step2`           创建SqlsessionFactory工厂

`step3`           使用工厂生成Sqlseesion对象

`step4`           使用Sqlsession创建Dao接口的代理对象

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

