规范(v1.0.0)
------------

boi框架约定了一套默认开发规范（可配置），包括目录规范、文件命名规范和部分编码规范。

> 目前v1.0.0规范比较宽松，后续版本会制定详细约束。

### 目录规范

-	开发源码目录： `src`

	1.	JS源码目录： `src/js`;
	2.	style源码目录： `src/style`;
	3.	html模板源码目录： `src/views`;
	4.	媒体资源原始文件目录： `src/assets`。

-	第三方库文件目录：`libs`

	> boi不支持非npm管理的第三方库文件打包。此类库文件应该是多项目共用的，建议使用固定CDN地址引用。

-	本地编译输出目录： `dest`

### 命名规范

目前(v1.0.0)规范中只约定了入口文件的命名规范，子文件暂时不做约束。

所有文件遵循以下规范：

-	不论是否在相同子目录内，同类型文件**一定不能重名**，否则会编译出错；
-	源码中引用其他文件使用相对目录。

#### JS文件命名规范

-	存放目录：`src/js`;
-	入口文件以`main`为命名前缀。比如`main.app.js`；
-	子文件**一定不要**以`main`为命名前缀。

#### style文件命名规范

-	存放目录：`src/style`;
-	入口文件以`main`为命名前缀。比如`main.app.scss`；
-	子文件**一定不要**以`main`为命名前缀。

#### html模板文件命名规范

-	存放目录：`src/views`;
-	以`index`为命名前缀。比如`main.app.html`；

### 编码规范

#### 资源引用规范

-	由于webpack不支持style文件作为编译入口，所以style文件必须借助JS文件引入。比如`main.app.js`中引入`main.app.scss`语法如下：

	```
	import '../style/main.app.scss';
	```

-	html模板引用JS、style文件时，只需写文件名即可，**不能写任何与路径相关的字符**，否则会编译出错。如下：

	```
	<script src="main.suyun.comment.js"></script>
	```

	编译后的结果如下：

	```
	<script src="/js/main.suyun.comment.fb74692f.js"></script>
	```

-	html模板引用第三方库文件使用绝对路径。如下：

	```
	<script src="/libs/vue.min.js" charset="utf-8"></script>
	```

	> boi不对第三方库文件进行编译，上述的引用建议只在本地开发中使用，真实上线文件请使用公司通用的第三方库文件url。

#### 模块化开发规范

目前v1.0.0版本支持CommonJS和AMD规范，两者在*load on demand*模块的打包中有细微差别。

-	CommonJS

	CommonJS使用`require.ensure`实现load on demand，如下：

	```
	import a from './part/part.a.js';
	import b from './part/part.b.js';
	window.onload = function() {
	    console.log('main chunk a is loaded');
	    a();
	    b();
	    document.body.onclick = function() {
	        // 第三个参数是chunk name，决定编译打包的文件名称
	        require.ensure([], (require) => {
	            let c = require('./part/part.c');
	            c.fn();
	        }, 'asyncC');
	    }
	};
	```

	`require.ensure`的**第三个参数必须指定**，这个参数影响打包输出的文件名称。上述文件打包后输出结果如下：

	![](assets/1.png)

	红框处即`require.ensure`的第三个参数值，如果不指定此参数，编译后的结果为：

	![](assets/2.png)

-	AMD

	以实现AMD规范的require.js为例，其实现load on demand的语法如下：

	```
	import '../styles/main.a.scss';
	// ADM sample
	require(['./part/part.a.js', './part/part.b.js'], function(a, b) {
	    console.log('main chunk a is loaded');
	    a();
	    b();
	    document.body.onclick = function() {
	        require(['./part/part.c.js'], function(c) {
	            c();
	        });
	    }
	});
	```

	AMD规范无法配置load on demand模块的文件文件名，输出的编译文件如下：

	![](assets/4.png)

	> webpack虽然提供配置输出chunk文件名的API，但是AMD规范目前无法实现，也可能是本人未研究透彻，希望各位指正。

