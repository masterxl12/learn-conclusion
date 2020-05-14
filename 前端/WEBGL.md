#### 1. 实现要点：

- Canvas: 定义网页上的绘图区域

- 着色器：绘制图形的基石

  要使用 WebGL 进行绘图，就必须使用着色器，WebGL 需要两种着色器来实现图形的各种渲染效果：

  - 顶点着色器：用来描述顶点特性（如位置、颜色等）等程序。
  - 片元着色器：进行逐片元处理过程如光照的程序。可以将片元理解为像素（图像的单元）。

- WEBGL 程序包括==运行在浏览器中的JavaScript==和==运行在WebGL 系统的着色器程序==这两个部分。

#### 2. WEBGL坐标系： 右手坐标系

- 注意：WebGL 坐标系与 canvas 绘图区的坐标系不同，需要将前者映射到后者。

- 具体转换步骤：

  （1）将坐标从浏览器客户区转换到 <canvas> 坐标系下，通过 `e.target.getBoundingClientRect()` 可以获取 <canvas> 在客户区中的坐标；
   （2）将 <canvas> 坐标系下的坐标转换到 WebGL 坐标系统中。

```javascript
var x = e.clientX;
var y = e.clientY;
var rect = e.target.getBoundingClientRect();
x = ((x - rect.left) - canvas.width / 2) / (canvas.width / 2);
y = (canvas.height  / 2 - (y - rect.top)) / (canvas.height / 2);
```

#### 3. 着色器变量类型

`attribute` 变量：属性，传输与顶点相关的数据；
`uniform` 变量：全局变量，传输与所有顶点都相同（或与顶点无关）的数据；
`varying` 变量：可变量，从顶点着色器向片元着色器传输数据。

> 只有顶点着色器才能使用 attribute 变量，使用片元着色器时，就需要使用 uniform 变量和 varying 变量。

#### 4. 缓冲区

​		WebGL提供了一种很方便的机制，就是**缓冲区对象**，它可以一次性向着色器传入多个顶点的数据。缓冲区对象是WebGL系统中的一块内存区域，我们可以一次性地向缓冲区对象中填充大量的顶点数据，然后将这些数据保存在其中，供顶点着色器使用。

#### 5. WEBGL渲染过程

<img src="/Users/masterxl/Library/Application Support/typora-user-images/image-20200514103856929.png" alt="image-20200514103856929" style="zoom:40%;" />



![image-20200514104142559](/Users/masterxl/Library/Application Support/typora-user-images/image-20200514104142559.png)

![image-20200514104327992](/Users/masterxl/Library/Application Support/typora-user-images/image-20200514104327992.png)

#### 6. 纹理

​		纹理是一个数据序列，可以在着色程序运行中随意读取其中的数据。 大多数情况存放的是图像数据，但是纹理仅仅是数据序列， 你也可以随意存放除了颜色数据以外的其它数据。

#### 7. 材质

材质与图形表示方法是相关的，用点表示使用PointsMaterial，用线表示使用LineXXXMaterial，用面表示使用MeshXXXMaterial，用精灵表示使用SpriteMaterial等等。

这样划分是因为不同的表示方式所要求的材质有很大不同。比如用线来表示，由于线没有光照模型，所以，LineXXXMaterial也没有关照类的属性。只有面表示的模型才有光照模型。光照模型有lambert模型和phong模型，对这两种光线模型，我们只需要知道，Lambert模型一般用来表示只有漫反射的物体，如塑料，而phong模型用来表示有镜面反射的物体，如镜子。

- MeshBasicMaterial、MeshNormalMaterial、MeshLambertMaterial、MeshPhongMaterial、MeshStandardMaterial、MeshDepthMaterial

- LineBasicMaterial、LineDashedMaterial

- PontsMaterial

- SpritMaterial

#### 8. 光照

（1）基本光源类型：

**平行光（directional light）** ：平行光的光线是相互平行的，具有方向。平行光可以看作是无限远处的光源发出的光，类似于自然中的太阳光。因为太阳距离地球很远，所以阳光到达地球时可以认为是平行的。平行光可以用一个方向和一个颜色来定义；

**点光源光（point light）**：点光源光是从一个点向周围的所有方向发出的光，类似于人造灯泡的光。我们需要指定点光源的位置和颜色。光线的方向将根据点光源的位置和被照射之处的位置计算出来，因为点光源的光线的方向在场景内的不同位置是不同的。

**环境光（ambient light）**：又叫间接光，是指那些经光源（点光源或平行光源）发出后，被墙壁多次反射，然后找到物体表面上的光，用于模拟真实世界中的非直射光。环境光从各个角度照射物体，其强度都是一致的。它不用指定位置和方向，只需要指定颜色即可。

（2）反射类型：

**漫反射**：漫反射针对平行光或点光源而言，其反射光在各个方向是均匀的。如果物体表面像镜子一样光滑，那么光线就会以特定的角度反射出去；但是现实中的大部分材质，比如纸张、岩石、塑料等，其表面都是粗糙的，在这种情况下反射光就会以不固定的角度反射出去。漫反射就是针对后一种情况而建立的理想反射模型。

**环境反射**：环境反射针对环境光而言的，其方向可以认为就是入射光的反方向。由于环境光照射物体的方式就是个方向均匀、强度相等的，所以反射光也是个方向均匀的。