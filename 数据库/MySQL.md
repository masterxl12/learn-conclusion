

### 一、工具环境安装

```
1.MySQL安装
```

```
2.可视化工具安装(Navcait)
```

### 二、SQL概述

#### 2.1 SQL概述

(Structured Query Language)结构化查询语言的缩写，是访问和处理关系数据库的计算机标准语言。SQL语句既可以查询数据库中的数据，也可以添加、更新和删除数据库中的数据，还可以对数据库进行管理和维护操作。

#### 2.2 SQL操作数据库能力

##### 2.2.1 **DDL：**

Data Definition Language

DDL允许用户定义数据，也就是创建表、删除表、修改表结构这些操作。通常，DDL由数据库管理员执行。

##### 2.2.2**DML：**

Data Manipulation Language

DML为用户提供添加、删除、更新数据的能力，这些是应用程序对数据库的日常操作。

##### **2.2.3 DQL：**

Data Query Language—DQL允许用户查询数据，这也是通常最频繁的数据库日常操作。

#### 2.3 数据类型

对于一个关系表，除了定义每一列的名称外，还需要定义每一列的数据类型。关系数据库支持的标准数据类型包括数值、字符串、时间等：

| 名称         | 类型           | 说明                                                         |
| :----------- | :------------- | :----------------------------------------------------------- |
| INT          | 整型           | 4字节整数类型，范围约+/-21亿                                 |
| BIGINT       | 长整型         | 8字节整数类型，范围约+/-922亿亿                              |
| REAL         | 浮点型         | 4字节浮点数，范围约+/-1038                                   |
| DOUBLE       | 浮点型         | 8字节浮点数，范围约+/-10308                                  |
| DECIMAL(M,N) | 高精度小数     | 由用户指定精度的小数，例如，DECIMAL(20,10)表示一共20位，其中小数10位，通常用于财务计算 |
| CHAR(N)      | 定长字符串     | 存储指定长度的字符串，例如，CHAR(100)总是存储100个字符的字符串 |
| VARCHAR(N)   | 变长字符串     | 存储可变长度的字符串，例如，VARCHAR(100)可以存储0~100个字符的字符串 |
| BOOLEAN      | 布尔类型       | 存储True或者False                                            |
| DATE         | 日期类型       | 存储日期，例如，2018-06-22                                   |
| TIME         | 时间类型       | 存储时间，例如，12:20:59                                     |
| DATETIME     | 日期和时间类型 | 存储日期+时间，例如，2018-06-22 12:20:59                     |

选择数据类型的时候，要根据业务规则选择合适的类型。通常来说，`BIGINT`能满足==整数存储==的需求，`VARCHAR(N)`能满足==字符串存储==的需求，这两种类型是使用最广泛的。

#### 2.4 语法特点

**SQL语言关键字不区分大小写！！！**

但是，针对不同的数据库，对于表名和列名，有的数据库区分大小写，有的数据库不区分大小写。同一个数据库，有的在Linux上区分大小写，有的在Windows上不区分大小写。

#### 2.5 主流关系数据库

目前，主流的关系数据库主要分为以下几类：

1. 商用数据库，例如：[Oracle](https://www.oracle.com/)，[SQL Server](https://www.microsoft.com/sql-server/)，[DB2](https://www.ibm.com/db2/)等；
2. 开源数据库，例如：[MySQL](https://www.mysql.com/)，[PostgreSQL](https://www.postgresql.org/)等；
3. 桌面数据库，以微软[Access](https://products.office.com/access)为代表，适合桌面应用程序使用；
4. 嵌入式数据库，以[Sqlite](https://sqlite.org/)为代表，适合手机应用和桌面程序。

### 三、关系模型

#### 3.1 主键

##### 3.1.1 定义及特点：

- 定义：能够通过某个字段唯一区分出不同的记录，这个字段即称为==主键==

- 特点：记录一旦插入到表中，主键最好不要再修改，因为主键是用来唯一定位记录的，修改主键，会造成一系列的影响。

- 基本原则：不使用任何业务相关的字段作为主键。

##### 3.1.2 主键`id`字段的类型

1. ==自增整数类型==：数据库会在插入数据时自动为每一条记录分配一个自增整数，这样我们就完全不用担心主键重复，也不用自己预先生成主键；
2. ==全局唯一GUID类型==：使用一种全局唯一的字符串作为主键，类似`8f55d96b-8acc-4636-8cb8-76bf8abc2f57`。GUID算法通过网卡MAC地址、时间戳和随机数保证任意计算机在任意时间生成的字符串都是不同的，大部分编程语言都内置了GUID算法，可以自己预算出主键。
3. 类型要求：`BIGINT NOT NULL AUTO_INCREMENT`类型

##### 3.1.3 联合主键

​		关系数据库实际上还允许通过多个字段唯一标识记录，即两个或更多的字段都设置为主键，这种主键被称为联合主键。

​		对于联合主键，允许一列有重复，只要不是所有主键列都重复即可：

| id_num | id_type | other columns... |
| :----- | :------ | :--------------- |
| 1      | A       | ...              |
| 2      | A       | ...              |
| 2      | B       | ...              |

​		如果我们把上述表的`id_num`和`id_type`这两列作为联合主键，那么上面的3条记录都是允许的，因为没有两列主键组合起来是相同的。

没有必要的情况下，我们尽量不使用联合主键，因为它给关系表带来了复杂度的上升。

##### 3.1.4 小结

1、主键是关系表中记录的唯一标识。

2、主键的选取非常重要：主键不要带有业务含义，而应该使用BIGINT自增或者GUID类型。主键也不应该允许`NULL`。

3、可以使用多个列作为联合主键，但联合主键并不常用。

#### 3.2 外键

作用：通过一个表的外键可以关联到另一个表

##### 3.2.1 一对多/多对一

当我们用主键唯一标识记录时，我们就可以在`students`表中确定任意一个学生的记录：

| id   | name | other columns... |
| :--- | :--- | :--------------- |
| 1    | 小明 | ...              |
| 2    | 小红 | ...              |

我们还可以在`classes`表中确定任意一个班级记录：

| id   | name | other columns... |
| :--- | :--- | :--------------- |
| 1    | 一班 | ...              |
| 2    | 二班 | ...              |

但是我们如何确定`students`表的一条记录，例如，`id=1`的小明，属于哪个班级呢？

由于一个班级可以有多个学生，在关系模型中，这两个表的关系可以称为“一对多”，即一个`classes`的记录可以对应多个`students`表的记录。

为了表达这种一对多的关系，我们需要在`students`表中加入一列`class_id`，让它的值与`classes`表的某条记录相对应：

| id   | class_id | name | other columns... |
| :--- | :------- | :--- | :--------------- |
| 1    | 1        | 小明 | ...              |
| 2    | 1        | 小红 | ...              |
| 5    | 2        | 小白 | ...              |

这样，我们就可以根据`class_id`这个列直接定位出一个`students`表的记录应该对应到`classes`的哪条记录。

例如：

- 小明的`class_id`是`1`，因此，对应的`classes`表的记录是`id=1`的一班；
- 小红的`class_id`是`1`，因此，对应的`classes`表的记录是`id=1`的一班；
- 小白的`class_id`是`2`，因此，对应的`classes`表的记录是`id=2`的二班。

在`students`表中，通过`class_id`的字段，可以把数据与另一张表关联起来，这种列称为`外键`。

外键并不是通过列名实现的，而是通过定义外键约束实现的：

```sql
ALTER TABLE students
ADD CONSTRAINT fk_class_id
FOREIGN KEY (class_id)
REFERENCES classes (id);
```

​		其中，==外键约束的名称`fk_class_id`可以任意==，`FOREIGN KEY (class_id)`指定了`class_id`作为外键，`REFERENCES classes (id)`指定了这个外键将关联到`classes`表的`id`列（即`classes`表的主键）。

​		通过定义外键约束，关系数据库可以保证无法插入无效的数据。即如果`classes`表不存在`id=99`的记录，`students`表就无法插入`class_id=99`的记录。

​		由于外键约束会降低数据库的性能，大部分互联网应用程序为了追求速度，并不设置外键约束，而是仅靠应用程序自身来保证逻辑的正确性。这种情况下，`class_id`仅仅是一个普通的列，只是它起到了外键的作用而已。

要删除一个外键约束，也是通过`ALTER TABLE`实现的：

```sql
ALTER TABLE students
DROP FOREIGN KEY fk_class_id;
```

注意：删除外键约束并没有删除外键这一列。删除列是通过`DROP COLUMN ...`实现的。

##### 3.2.2 多对多(使用中间表)

​		通过一个表的外键关联到另一个表，我们可以定义出一对多关系。有些时候，还需要定义“多对多”关系。例如，一个老师可以对应多个班级，一个班级也可以对应多个老师，因此，班级表和老师表存在多对多关系。

​		多对多关系实际上是通过两个一对多关系实现的，即通过一个中间表，关联两个一对多关系，就形成了多对多关系：

`teachers`表：

| id   | name   |
| :--- | :----- |
| 1    | 张老师 |
| 2    | 王老师 |
| 3    | 李老师 |
| 4    | 赵老师 |

`classes`表：

| id   | name |
| :--- | :--- |
| 1    | 一班 |
| 2    | 二班 |

中间表`teacher_class`关联两个一对多关系：

| id   | teacher_id | class_id |
| :--- | :--------- | :------- |
| 1    | 1          | 1        |
| 2    | 1          | 2        |
| 3    | 2          | 1        |
| 4    | 2          | 2        |
| 5    | 3          | 1        |
| 6    | 4          | 2        |

通过中间表`teacher_class`可知`teachers`到`classes`的关系：

- `id=1`的张老师对应`id=1,2`的一班和二班；
- `id=2`的王老师对应`id=1,2`的一班和二班；
- `id=3`的李老师对应`id=1`的一班；
- `id=4`的赵老师对应`id=2`的二班。

同理可知`classes`到`teachers`的关系：

- `id=1`的一班对应`id=1,2,3`的张老师、王老师和李老师；
- `id=2`的二班对应`id=1,2,4`的张老师、王老师和赵老师；

因此，通过中间表，我们就定义了一个“多对多”关系。

##### 3.2.3 一对一

​		一对一关系是指，一个表的记录对应到另一个表的唯一一个记录。

​		例如，`students`表的每个学生可以有自己的联系方式，如果把联系方式存入另一个表`contacts`，我们就可以得到一个“一对一”关系：

| id   | student_id | mobile      |
| :--- | :--------- | :---------- |
| 1    | 1          | 135xxxx6300 |
| 2    | 2          | 138xxxx2209 |
| 3    | 5          | 139xxxx8086 |

​		如果业务允许，完全可以把两个表合为一个表。但是，有些时候，如果某个学生没有手机号，那么，`contacts`表就不存在对应的记录。实际上，一对一关系准确地说，是`contacts`表一对一对应`students`表。

​		还有一些应用会把一个大表拆成两个一对一的表，目的是把经常读取和不经常读取的字段分开，以获得更高的性能。例如，把一个大的用户表分拆为用户基本信息表`user_info`和用户详细信息表`user_profiles`，大部分时候，只需要查询`user_info`表，并不需要查询`user_profiles`表，这样就提高了查询速度。

##### 3.2.4 小结

- 关系数据库通过外键可以实现一对多、多对多和一对一的关系。

- 外键既可以通过数据库来约束，也可以不设置约束，仅依靠应用程序的逻辑来保证。

#### 3.3 索引

##### 3.3.1 索引的概述

作用：提高查询的速度

在关系数据库中，如果有上万甚至上亿条记录，在查找记录的时候，想要获得非常快的速度，就需要使用索引。

​		索引是关系数据库中对某一列或多个列的值==进行预排序的数据结构==。<font color=red>通过使用索引，可以让数据库系统不必扫描整个表，而是直接定位到符合条件的记录，这样就大大加快了查询速度。</font>

例如，对于`students`表：

| id   | class_id | name | gender | score |
| :--- | :------- | :--- | :----- | :---- |
| 1    | 1        | 小明 | M      | 90    |
| 2    | 1        | 小红 | F      | 95    |
| 3    | 1        | 小军 | M      | 88    |

如果要经常根据`score`列进行查询，就可以对`score`列创建索引：

```sql
ALTER TABLE students
ADD INDEX idx_score (score);
```

使用`ADD INDEX idx_score (score)`就创建了一个名称为`idx_score`，使用列`score`的索引。索引名称是任意的，索引如果有多列，可以在括号里依次写上，例如：

```sql
ALTER TABLE students
ADD INDEX idx_name_score (name, score);
```

##### 3.3.2 索引的特点

- 索引的效率==取决于索引列的值是否散列，即该列的值如果越互不相同，那么索引效率越高==。反过来，如果记录的列存在大量相同的值，例如`gender`列，大约一半的记录值是`M`，另一半是`F`，因此，对该列创建索引就没有意义。

- 可以对一张表创建多个索引。索引的优点是提高了查询效率，缺点是在插入、更新和删除记录时，需要同时修改索引，因此，索引越多，插入、更新和删除记录的速度就越慢。

- 对于主键，关系数据库会自动对其创建主键索引。使用主键索引的效率是最高的，因为主键会保证绝对唯一。

##### 3.3.3 唯一索引

​		在设计关系数据表的时候，看上去唯一的列，例如身份证号、邮箱地址等，因为他们具有业务含义，因此不宜作为主键。

​		但是，这些列根据业务要求，又具有唯一性约束：即不能出现两条记录存储了同一个身份证号。这个时候，就可以给该列添加一个唯一索引。例如，我们假设`students`表的`name`不能重复：

```sql
ALTER TABLE students
ADD UNIQUE INDEX uni_name (name);
```

通过`UNIQUE`关键字我们就添加了一个唯一索引。

也可以只对某一列添加一个唯一约束而不创建唯一索引：

```sql
ALTER TABLE students
ADD CONSTRAINT uni_name UNIQUE (name);
```

这种情况下，`name`列没有索引，但仍然具有唯一性保证。

​		无论是否创建索引，对于用户和应用程序来说，使用关系数据库不会有任何区别。这里的意思是说，当我们在数据库中查询时，如果有相应的索引可用，数据库系统就会自动使用索引来提高查询效率，如果没有索引，查询也能正常执行，只是速度会变慢。因此，索引可以在使用数据库的过程中逐步优化。

##### 3.3.4 小结

- 通过对数据库表创建索引，可以提高查询速度。

- 通过创建唯一索引，可以保证某一列的值具有唯一性。

- 数据库索引对于用户和应用程序来说都是透明的。

### 四、查询数据

#### 4.1 基本查询

##### 4.1.1 基本语法

​	要查询数据库表的数据，我们使用如下的SQL语句：

```sql
SELECT * FROM <数据表名>
```

```sql
select * from students
```

​		使用`SELECT * FROM students`时，`SELECT`是关键字，表示将要执行一个查询，`*`表示“所有列”，`FROM`表示将要从哪个表查询，本例中是`students`表。

该SQL将查询出`students`表的所有数据。注意：查询结果也是一个二维表，它包含列名和每一行的数据。

##### 4.1.2 小结

使用SELECT查询的基本语句`SELECT * FROM <表名>`可以查询一个表的所有行和所有列的数据。

SELECT查询的结果是一个二维表。

#### 4.2 条件查询where

##### 4.2.1 基本语法

```sql
SELECT * FROM <表名> WHERE <条件表达式>
```

举例：

```sql
select * from students where score>= 80
```

​		其中，`WHERE`关键字后面的`score >= 80`就是条件。`score`是列名，该列存储了学生的成绩，因此，`score >= 80`就筛选出了指定条件的记录：

##### 4.2.2 多条件查询

- 条件表达式`<条件1> AND <条件2>`表达满足条件1并且满足条件2

```sql
SELECT * FROM <表名> WHERE <条件表达式1> AND <条件表达式2>
```

- 条件是`<条件1> OR <条件2>`，表示满足条件1或者满足条件2

很显然`OR`条件要比`AND`条件宽松，返回的符合条件的记录也更多。

- `NOT`条件`NOT class_id = 2`其实等价于`class_id <> 2`，因此，`NOT`查询不是很常用。

​         要组合三个或者更多的条件，就需要用小括号`()`, 表示如何进行条件运算如果不加括号，条件运算按照`NOT`、`AND`、`OR`的优先级进行，即`NOT`优先级最高，其次是`AND`，最后是`OR`。加上括号可以改变优先级。

##### 4.2.3 小结

通过`WHERE`条件查询，可以筛选出符合指定条件的记录，而不是整个表的所有记录。

#### 4.3 投影查询

##### 4.3.1 基本语法

```sql
select <列名1>，<列名2>,<列名3>... from <表名>
```

​		使用`SELECT * FROM <表名> WHERE <条件>`可以选出表中的若干条记录。我们注意到返回的二维表结构和原表是相同的，即结果集的所有列与原表的所有列都一一对应。

​		如果我们只==希望返回某些列的数据，而不是所有列的数据==，我们可以用`SELECT 列1, 列2, 列3 FROM ...`，让结果集仅包含指定列。这种操作称为投影查询。

例如，从`students`表中返回`id`、`score`和`name`这三列：

```sql
select id,score,name from students
```

##### 4.3.2 起别名

​		使用`SELECT 列1, 列2, 列3 FROM ...`时，还可以给每一列起个别名，这样，结果集的列名就可以与原表的列名不同。它的语法是`SELECT 列1 别名1, 列2 别名2, 列3 别名3 FROM ...`。

```sql
select <列名1>，<列名2> otherName,<列名3>... from <表名>
```

例如，以下`SELECT`语句将列名`score`重命名为`points`，而`id`和`name`列名保持不变：

```sql
select id,score points,name from students
```

##### 4.3.3 结合`WHERE`条件，实现复杂的查询：

```sql
select id,name,score from students where gender = "M"
```

##### 4.3.4 小结

- 使用`SELECT *`表示查询表的所有列，使用`SELECT 列1, 列2, 列3`则可以==仅返回指定列==，这种操作称为投影。

- `SELECT`语句可以对结果集的列进行重命名。

#### 4.4 排序order by

##### 4.4.1 基本语法(升序ASC)

**默认是按照主键id查询，开发中可以指定具体条件进行排序，默认排序是==升序==**

```sql
select <列名1>，<列名2> otherName,<列名3>... from <表名> order by <某一列名>
```

举例：对students表按照成绩由低到高排序

```sql
select id,name,score from students order by score
```

##### 4.4.2 降序(DESC)

```sql
select <列名1>，<列名2> otherName,<列名3>... from <表名> order by <某一列名> desc
```

如果`score`列有相同的数据，要进一步排序，可以继续添加列名。

例如，使用`ORDER BY score DESC, gender`表示先按`score`列倒序，如果有相同分数的，再按`gender`列排序：

```sql
select id,name,score from students order by score desc,gender
```

##### 4.4.3 结合where语句使用

如果有`WHERE`子句，==那么`ORDER BY`子句要放到`WHERE`子句后面==

```sql
select id,name,score 
from students 
where score > 75 and score < 99 
order by score desc
```

这样，结果集仅包含符合`WHERE`条件的记录，并按照`ORDER BY`的设定排序。

##### 小结

使用`ORDER BY`可以对结果集进行排序；

可以对多列进行升序、倒序排序。

#### 4.5 分页查询

##### 4.5.1 基本语法

```
LIMIT <M> OFFSET <N>
```

分页查询的关键在于，首先要确定每页需要显示的结果数量`pageSize`，然后根据当前页的索引`pageIndex`（从1开始），确定`LIMIT`和`OFFSET`应该设定的值：

- `pageIndex` 指的是第多少页

- `LIMIT`总是设定为`pageSize` 也即是M；

- `OFFSET`计算公式为`pageSize * (pageIndex - 1)` 也即是N。

  ==计算公式：==        `OFFSET` = `pageSize * (pageIndex - 1)` 

- 由M、N计算是多少页

  ==页数计算公式：==  `pageIndex` = ( `OFFSET` / `LIMIT`) + 1

举例每页有三条数据，查询第三页，计算N值：3*(3-1) = 6

```
limit 3 offset 6
```

使用`LIMIT  OFFSET `分页时，随着`N`越来越大，查询效率也会越来越低。

##### 4.5.2 小结

- 使用`LIMIT  OFFSET `可以对结果集进行分页，每次查询返回结果集的一部分；

- ==分页查询需要先确定每页的数量和当前页数，然后确定`LIMIT`和`OFFSET`的值。==

#### 4.6 聚合查询

##### 4.6.1 基本用法

###### 4.6.1.1 统计表行数

```sql
select count(*) from <表名>
```

`COUNT(*)`表示查询所有列的行数,

[注意]

- 聚合的计算结果虽然是一个数字，但==查询的结果仍然是一个二维表，只是这个二维表只有一行一列==，并且列名是`COUNT(*)`。

- 通常，使用聚合查询时，我们应该给列名设置一个别名，便于处理结果：

  ```sql
  select count(*) num from students
  ```

##### 4.6.2 结合where查询

​		聚合查询同样可以使用`WHERE`条件，因此我们可以方便地统计出==符合一定条件的数量==

【举例】统计成绩高于85分的数量，并设置列名为专业“professional”

```sql
SELECT COUNT(*) professional FROM students WHERE score > 85;
```

##### 4.6.3 聚合函数分类

除了`COUNT()`函数外，SQL还提供了如下聚合函数：

| 函数  | 说明                                       |
| :---- | :----------------------------------------- |
| SUM   | 计算某一列的合计值，该列必须为==数值类型== |
| COUNT | ==统计某一列符合条件的数量==               |
| AVG   | 计算某一列的平均值，该列必须为==数值类型== |
| MAX   | 计算某一列的最大值                         |
| MIN   | 计算某一列的最小值                         |

【举例】使用聚合查询计算男生平均成绩:

```sql
SELECT AVG(score) average FROM students WHERE gender = 'M';
```

​		要特别注意：如果聚合查询的`WHERE`条件没有匹配到任何行，`COUNT()`会返回0，而`SUM()`、`AVG()`、`MAX()`和`MIN()`会返回`NULL`：

4.6.4 聚合函数的使用场景

###### 4.6.4.1 聚合函数获取总页数

```sql
select ceiling(count(*) / 3) from students
```

###### 4.6.4.2 分组查询(group by)

```sql
按class_id分组:
SELECT COUNT(*) num FROM students GROUP BY class_id;
```

执行这个查询，`COUNT()`的结果不再是一个，而是3个，这是因为，`GROUP BY`子句指定了按`class_id`分组，因此，执行该`SELECT`语句时，会把`class_id`相同的列先分组，再分别计算，因此，得到了3行结果。

但是这3行结果分别是哪三个班级的，不好看出来，所以我们可以把`class_id`列也放入结果集中：

```sql
select class_id,count(*) num from students group by class_id
```

【案例一】请使用一条SELECT查询查出每个班级的平均分：

```sql
select 
		class_id,avg(score) average
from 
		students 
group by 
		class_id;
```

【案例二】请使用一条SELECT查询查出每个班级男生和女生的平均分：

```sql
select
		class_id,gender,avg(score) average
from
		students
group by
		class_id,gender;
```

##### 4.6.5 小结

- 使用SQL提供的聚合查询，我们可以==方便地计算总数、合计值、平均值、最大值和最小值==；

- 聚合查询也可以添加`WHERE`条件。

#### 4.7 多表查询(笛卡尔查询)

4.7.1 基本语法

​		查询多张表的语法是：`SELECT * FROM <表1> <表2>`。

```sql
SELECT * FROM students, classes;
```

​		这种一次查询两个表的数据，查询的结果也是一个二维表，它是`students`表和`classes`表的“乘积”，即`students`表的每一行与`classes`表的每一行都两两拼在一起返回。结果集的列数是`students`表和`classes`表的==**列数之和**==，行数是`students`表和`classes`表的==**行数之积**==。

```sql
select 
		alias1.id sid,
		alias1.name sname,
		alias1.a,
		alias1.b,
		alias1.c,
		alias2.id cid,
		alias2.name cname
from
		 <表1> <alias1>,<表2> <alias2>
where 
		alias1.xxx = xxx and alias2.yyy = yyy ;
```

​		注意到`FROM`子句给表设置别名的语法是`FROM <表名1> <别名1>, <表名2> <别名2>`。这样我们用别名`s`和`c`分别表示`students`表和`classes`表。

```sql
select 
		s.id sid,
		s.name,
		s.score,
		s.gender,
		c.id cid,
		c.name cname
from
		students s,classes c
where 
		s.gender = "M" and c.id = 1;
```

这个查询的结果集每行记录都满足条件`s.gender = 'M'`和`c.id = 1`。添加`WHERE`条件后结果集的数量大大减少

##### 4.7.2 小结

- 使用多表查询可以获取M x N行记录；

- 多表查询的结果集可能非常巨大，要小心使用。

#### 4.8 连接查询(join)

​		连接查询是另一种类型的多表查询。连接查询对多个表进行JOIN运算，简单地说，就是==先确定一个主表作为结果集==，然后，==把其他表的行有选择性地“连接”在主表结果集上==。

##### 4.8.1 基本用法

###### 4.8.1.1 INNER JOIN查询

==选出两张表都存在的记录：==

```sql
select 
		s.id,s.name,s.class_id,c.name class_name,s.gender,s.score
from
		students s
inner join classes c
on s.class_id = c.id
```

1. 先确定主表，仍然使用`FROM <表1>`的语法；
2. 再确定需要连接的表，使用`INNER JOIN <表2>`的语法；
3. 然后确定连接条件，使用`ON <条件...>`，这里的条件是`s.class_id = c.id`，表示`students`表的`class_id`列与`classes`表的`id`列相同的行需要连接；
4. 可选：加上`WHERE`子句、`ORDER BY`等子句。

查询结果

| id   | name | class_id | class_name | gender | score |
| :--- | :--- | :------- | :--------- | :----- | :---- |
| 1    | 小明 | 1        | 一班       | M      | 90    |
| 2    | 小红 | 1        | 一班       | F      | 95    |
| 3    | 小军 | 1        | 一班       | M      | 88    |
| 4    | 小米 | 1        | 一班       | F      | 73    |
| 5    | 小白 | 2        | 二班       | F      | 81    |
| 6    | 小兵 | 2        | 二班       | M      | 55    |
| 7    | 小林 | 2        | 二班       | M      | 85    |
| 8    | 小新 | 3        | 三班       | F      | 91    |
| 9    | 小王 | 3        | 三班       | M      | 89    |
| 10   | 小丽 | 3        | 三班       | F      | 88    |

###### 4.8.1.2 RIGHT OUTER JOIN查询

```sql
select
		s.id,s.name,s.class_id,c.name class_name,s.gender,s.score
from 
		students s
right outer join
		classes c
on s.class_id = c.id
```

==RIGHT OUTER JOIN返回右表都存在的行==。如果某一行仅在右表存在，那么结果集就会以`NULL`填充剩下的字段。

| id   | name | class_id | class_name | gender | score |
| :--- | :--- | :------- | :--------- | :----- | :---- |
| 1    | 小明 | 1        | 一班       | M      | 90    |
| 2    | 小红 | 1        | 一班       | F      | 95    |
| 3    | 小军 | 1        | 一班       | M      | 88    |
| 4    | 小米 | 1        | 一班       | F      | 73    |
| 5    | 小白 | 2        | 二班       | F      | 81    |
| 6    | 小兵 | 2        | 二班       | M      | 55    |
| 7    | 小林 | 2        | 二班       | M      | 85    |
| 8    | 小新 | 3        | 三班       | F      | 91    |
| 9    | 小王 | 3        | 三班       | M      | 89    |
| 10   | 小丽 | 3        | 三班       | F      | 88    |
| NULL | NULL | NULL     | 四班       | NULL   | NULL  |

###### 4.8.1.3 LEFT OUTER JOIN查询

==LEFT OUTER JOIN则返回左表都存在的行==。如果我们给students表增加一行，并添加class_id=5，由于classes表并不存在id=5的行，所以，LEFT OUTER JOIN的结果会增加一行，对应的`class_name`是`NULL`：

```sql
select
		s.id,s.name,s.class_id,c.name class_name,s.gender,s.score
from 
		students s
left outer join
		classes c
on s.class_id = c.id
```

| id   | name | class_id | class_name | gender | score |
| :--- | :--- | :------- | :--------- | :----- | :---- |
| 1    | 小明 | 1        | 一班       | M      | 90    |
| 2    | 小红 | 1        | 一班       | F      | 95    |
| 3    | 小军 | 1        | 一班       | M      | 88    |
| 4    | 小米 | 1        | 一班       | F      | 73    |
| 5    | 小白 | 2        | 二班       | F      | 81    |
| 6    | 小兵 | 2        | 二班       | M      | 55    |
| 7    | 小林 | 2        | 二班       | M      | 85    |
| 8    | 小新 | 3        | 三班       | F      | 91    |
| 9    | 小王 | 3        | 三班       | M      | 89    |
| 10   | 小丽 | 3        | 三班       | F      | 88    |
| 11   | 新生 | 5        | NULL       | M      | 88    |

###### 4.8.1.4 FULL OUTER JOIN查询

==FULL OUTER JOIN，它会把两张表的所有记录全部选择出来==，并且，自动把对方不存在的列填充为NULL：

```sql
select
		s.id,s.name,s.class_id,c.name class_name,s.gender,s.score
from 
		students s
full outer join
		classes c
on s.class_id = c.id
```

| id   | name | class_id | class_name | gender | score |
| :--- | :--- | :------- | :--------- | :----- | :---- |
| 1    | 小明 | 1        | 一班       | M      | 90    |
| 2    | 小红 | 1        | 一班       | F      | 95    |
| 3    | 小军 | 1        | 一班       | M      | 88    |
| 4    | 小米 | 1        | 一班       | F      | 73    |
| 5    | 小白 | 2        | 二班       | F      | 81    |
| 6    | 小兵 | 2        | 二班       | M      | 55    |
| 7    | 小林 | 2        | 二班       | M      | 85    |
| 8    | 小新 | 3        | 三班       | F      | 91    |
| 9    | 小王 | 3        | 三班       | M      | 89    |
| 10   | 小丽 | 3        | 三班       | F      | 88    |
| 11   | 新生 | 5        | NULL       | M      | 88    |
| NULL | NULL |          | 四班       | NULL   | NULL  |

##### 4.8.2 连接查询模型

<img src="/Users/masterxl/Library/Application Support/typora-user-images/image-20200321174852841.png" alt="image-20200321174852841" style="zoom:55%;" />

##### 4.8.3 小结

- JOIN查询需要==先确定主表==，然后把另一个表的数据“附加”到结果集上；

- INNER JOIN是最常用的一种==JOIN查询==，它的语法是`SELECT ... FROM <表1> INNER JOIN <表2> ON <条件...>`；

- JOIN查询仍然可以使用`WHERE`条件和`ORDER BY`排序。

### 五、修改数据

