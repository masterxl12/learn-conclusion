### 一、认证与授权

#### 1.1 认证：

- 保证用户身份的合法性

#### 1.2 授权：

- 授权是更细粒度的对隐私数据进行划分，授权是在认证身份通过后的操作，控制不同的用户访问不同的资源
- 授权是用户认证通过，根据用户的权限来控制用户访问资源的过程，拥有资源的访问权限则正常访问，没有权限则拒绝访问

#### 1.3 oAuth

##### 1.3.1 oAuth概述

oAuth 协议为用户资源的授权提供了一个安全的、开放而又简易的标准。与以往的授权方式不同之处是 oAuth 的授权不会使第三方触及到用户的帐号信息（如用户名与密码），即第三方无需使用用户的用户名与密码就可以申请获得该用户资源的授权，因此 oAuth 是安全的。

------

##### 1.3.2 oAuth的思路

OAuth在"客户端"与"服务提供商"之间，设置了一个授权层（authorization layer）。"客户端"不能直接登录"服务提供商"，只能登录授权层，以此将用户与客户端区分开来。"客户端"登录授权层所用的令牌（token），与用户的密码不同。用户可以在登录的时候，指定授权层令牌的权限范围和有效期。

<font color=red>"客户端"登录授权层以后，"服务提供商"根据令牌的权限范围和有效期，向"客户端"开放用户储存的资料。</font>

------

#### 1.4 Spring Security 概述

Spring Security 是一个安全框架，前身是 Acegi Security，能够为 Spring 企业应用系统提供声明式的安全访问控制。Spring Security 基于 Servlet 过滤器、IOC 和 AOP，为 Web 请求和方法调用提供身份确认和授权处理，避免了代码耦合，减少了大量重复代码工作。

#### 1.5 交互模型

##### 1.5.1 名词定义

（1） **Third-party application**：第三方应用程序，通常是指"客户端"（client)。

（2）**HTTP service**：HTTP服务提供商，通常是指"服务提供商"。

（3）**Resource Owner**：资源所有者，通常是指"用户"（user）。

（4）**User Agent**：用户代理，通常是指浏览器。

（5）**Authorization server**：认证服务器，即服务提供商专门用来处理认证的服务器。

（6）**Resource server**：资源服务器，即服务提供商存放用户生成的资源的服务器。它与认证服务器，可以是同一台服务器，也可以是不同的服务器。

服务提供方(**HTTP service**: HTTP服务提供商)

- 认证服务器(**Resource server**)
- 资源服务器(**Authorization server**)

##### 1.5.2 交互具体案例剖析

如用户想通过QQ第三方登录“有道云笔记”，可以看到如使用 QQ 登录的授权页面上有 "有道云笔记将获得以下权限" 的字样以及权限信息的资源(昵称、头像等)

用户(资源所有者)  

客户端(有道云笔记)  

服务提供商(QQ)

- ​	资源服务器(用户信息服务头像、昵称、性别，网盘服务，相册服务)  

- ​	认证/授权服务器

##### 1.5.3 交互模型

**如使用QQ服务提供授权登录有道云笔记客户端的过程**

![image-20200319113250164](/Users/masterxl/Library/Application Support/typora-user-images/image-20200319113250164.png)

##### 1.5.4 过程步骤分析

1、用户点击有道云笔记上的QQ授权登录按钮，跳转到QQ授权页面。QQ授权登录按钮的链接形如下方的 URL：

```js
https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=100255473&response_type=code&redirect_uri=https%3A%2F%2Fnote.youdao.com%2Flogin%2Facc%2Fcallback&state=QK0HeL0LJpVpyhHqZ0MPu0ZZZZZLhMPF0
```

URL 中要包含以下参数：

* client_id：在QQ开放平台申请的应用 ID
* redirect_uri：授权成功后要跳转到的地址

![image-20200319121036311](/Users/masterxl/Library/Application Support/typora-user-images/image-20200319121036311.png)

这个页面会告诉用户第三方应用要获取用户的哪些数据，以及拥有什么权限，比如在上图中==有道云笔记==会要求获得个人信息的权限，用户点击“允许”则表示有道云笔记获得这些数据，进行下一步

通过以上的方式，在有道云笔记和QQ中间建立了一个==独立的权限层==，这个权限由用户赋予，可以被用户随时取消，==不同第三方应用之间相互独立，互不干扰==，这样就彻底解决了明文存放账号密码的问题。

2、 页面自动跳转到初始参数中`redirect_uri` 定义的那个URL，并自动在 URL 末尾添加一个 `code` 参数，实际跳转的地址形如:

```js
https://note.youdao.com/web/#/file/recent/note/SVREA739B7950D8496196F34DAC05582737/
```

  3、第三步，有道云笔记通过上一步获取的 code 参数换取 Token。有道云笔记请求如下的接口获取 Token：

```js
POST https://api.qq.com/oauth2/access_token
```

要包含以下参数：

client_id：在QQ开放平台申请的应用 ID

client_secret：在QQ开放平台申请时提供的APP Secret

grant_type：需要填写authorization_code

code：上一步获得的 code

4、通过第三步的请求，接口返回 Token 和相关数据：

```json
{
 "access_token": "ACCESS_TOKEN",//Token 的值
 "expires_in": 1234,//过期时间
 "uid":"12341234"//当前授权用户的UID。
}
```

 5、在第四步中获取了access_token ，使用它，就可以去获取用户的资源了，要获取用户昵称和头像，请求如下接口：

```js
GET https://api.qq.com/2/users/show.json
```

携带参数：

access_token：上一步获取的access_token

uid：用户的账号 id，上一步的接口有返回

 6、最后一步，QQ返回用户信息，有道云笔记进行处理，整个流程结束。

### 二 、客户端的授权模式

#### 2.1 概述

客户端必须得到用户的授权（authorization grant），才能获得令牌（access token）。oAuth 2.0 定义了四种授权方式。

- implicit：简化模式，不推荐使用
- authorization code：授权码模式
- resource owner password credentials：密码模式
- client credentials：客户端模式

#### 2.2 简化模式

​		简化模式适用于纯静态页面应用。所谓纯静态页面应用，也就是应用没有在服务器上执行代码的权限（通常是把代码托管在别人的服务器上），只有前端 JS 代码的控制权。

​		这种场景下，应用是没有持久化存储的能力的。因此，按照 oAuth2.0 的规定，这种应用是拿不到 Refresh Token 的。整个授权流程如下：

<img src="/Users/masterxl/Library/Application Support/typora-user-images/image-20200319134740670.png" alt="image-20200319134740670" style="zoom:50%;" />

（A）客户端将用户导向认证服务器。

（B）用户决定是否给于客户端授权。

（C）假设用户给予授权，认证服务器将用户导向客户端指定的"重定向URI"，并在URI的Hash部分包含了访问令牌。

（D）浏览器向资源服务器发出请求，其中不包括上一步收到的Hash值。

（E）资源服务器返回一个网页，其中包含的代码可以获取Hash值中的令牌。

（F）浏览器执行上一步获得的脚本，提取出令牌。

（G）浏览器将令牌发给客户端。

```java
A步骤中，客户端发出的HTTP请求，包含以下参数：

response_type：表示授权类型，此处的值固定为"token"，必选项。
client_id：表示客户端的ID，必选项。
redirect_uri：表示重定向的URI，可选项。
scope：表示权限范围，可选项。
state：表示客户端的当前状态，可以指定任意值，认证服务器会原封不动地返回这个值。
```

#### 2.3 授权码模式

授权码模式（authorization code）是功能最完整、流程最严密的授权模式。它的特点就是通过客户端的后台服务器，与"服务提供商"的认证服务器进行互动。

<img src="/Users/masterxl/Library/Application Support/typora-user-images/image-20200319134805329.png" alt="image-20200319134805329" style="zoom: 45%;" />

（A）用户访问客户端，后者将前者导向认证服务器。

（B）用户选择是否给予客户端授权。

（C）假设用户给予授权，认证服务器将用户导向客户端事先指定的"重定向URI"（redirection URI），同时附上一个授权码。

（D）客户端收到授权码，附上早先的"重定向URI"，向认证服务器申请令牌。这一步是在客户端的后台的服务器上完成的，对用户不可见。

（E）认证服务器核对了授权码和重定向URI，确认无误后，向客户端发送访问令牌（access token）和更新令牌（refresh token）。

```java
A步骤中，客户端申请认证的URI，包含以下参数：

response_type：表示授权类型，必选项，此处的值固定为"code"
client_id：表示客户端的ID，必选项
redirect_uri：表示重定向URI，可选项
scope：表示申请的权限范围，可选项
state：表示客户端的当前状态，可以指定任意值，认证服务器会原封不动地返回这个值。
```

#### ==2.4 密码模式==

密码模式中，用户向客户端提供自己的用户名和密码。客户端使用这些信息，向 "服务商提供商" 索要授权。在这种模式中，用户必须把自己的密码给客户端，但是客户端不得储存密码。这通常用在用户对客户端高度信任的情况下，比如客户端是操作系统的一部分。

一个典型的例子是同一个企业内部的不同产品要使用本企业的 oAuth2.0 体系。在有些情况下，产品希望能够定制化授权页面。由于是同个企业，不需要向用户展示“xxx将获取以下权限”等字样并询问用户的授权意向，而只需进行用户的身份认证即可。这个时候，由具体的产品团队开发定制化的授权界面，接收用户输入账号密码，并直接传递给鉴权服务器进行授权即可。

<img src="/Users/masterxl/Library/Application Support/typora-user-images/image-20200319134827635.png" alt="image-20200319134827635" style="zoom:50%;" />

（A）用户向客户端提供用户名和密码。

（B）客户端将用户名和密码发给认证服务器，向后者请求令牌。

（C）认证服务器确认无误后，向客户端提供访问令牌。

```java
B步骤中，客户端发出的HTTP请求，包含以下参数：

grant_type：表示授权类型，此处的值固定为"password"，必选项。
username：表示用户名，必选项。
password：表示用户的密码，必选项。
scope：表示权限范围，可选项。
```

#### 2.5 客户端模式

如果信任关系再进一步，或者调用者是一个后端的模块，没有用户界面的时候，可以使用客户端模式。鉴权服务器直接对客户端进行身份验证，验证通过后，返回 token。

<img src="/Users/masterxl/Library/Application Support/typora-user-images/image-20200319134847436.png" alt="image-20200319134847436" style="zoom:50%;" />

（A）客户端向认证服务器进行身份认证，并要求一个访问令牌。

（B）认证服务器确认无误后，向客户端提供访问令牌。