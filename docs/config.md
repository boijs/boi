配置API
-------

boi配置文件位于项目根目录，文件名为`boi-conf.js`。

目前v1.0.0支持的可配置项有：

-	`basic`：`Object`，基础配置；
-	`js`：`Object`，JS文件的编译配置项；
-	`style`：`Object`，style文件的编译配置项；
-	`html`：`Object`，html模板文件的编译配置项；
-	`image`：`Object`，图片文件的编译配置项。

> 目前版本支持的配置项较少，以满足本公司需求为主，后续版本会扩充可配置模块。

### basic

-	`appName`：`String`，项目名称，默认值为`app`；
-	`localPath`: `Object`，本地目录配置；
	1.	`src`：`String`，源码文件目录；
	2.	`dest`：`String`，编译输出的本地目录；
	3.	`thirdparty`：本地第三方库文件目录。 -
-	`cdn`：【选填】`Object`，cdn相关配置；
	1.	`server`：`String`，cdn域名；
	2.	`path`：`String`，项目在cdn服务器的路径。 -

### js

-	`extType`：`String`，扩展名，默认值为js；
-	`srcType`：`Array`，源文件的转译配置，默认值为`['es2015']`；
-	`srcDir`：`String`，JS文件源码存放目录，相对于`basic.localPath.src`；
-	`destDir`：`String`，JS文件编译输出目录，相对于`basic.localPath.dest`；
-	`mainFilePrefix`：`String`，JS入口文件的命名前缀，默认值为`main`；
-	`uglify`：`Boolean`，编译输出文件是否uglify，默认`true`；
-	`useHash`：`Boolean`，编译输出文件是否打上hash指纹，默认`true`；
-	`mutiEntriesVendor`：`Boolean`，存在多入口文件时是否提取公共部分作为一个独立文件，默认值为`false`。此配置项在未指定`vendor`时才会起效，如果未指定`vendor`并且存在多个入口文件，可以将公用的webpack runtime提取出来，已减少主文件体积并利用浏览器缓存提升应用性能；
-	`files`:【选填】`Object`，指定编译文件。此项如不开启则boi自动匹配遵循命名规范的入口文件。

	1.	`main`：`Object`，指定入口文件，如下：

		```
		files: {
		    main: {
		        'a': 'main.a.js',
		        'main.b': 'main.b.js'
		    }
		}
		```

	2.	`vendor`：`Array`，通用模块列表，数组内的模块将被合成打包为`vendor.js`。

-	`webpackConfig`：`Object`，boi支持自定义webpack的module和plugins配置项，此项配置将完全覆盖boi内置的webpack配置，请谨慎使用。

	1.	`preloader`：`Object`；
	2.	`loader`：`Object`；
	3.	`postLoader`：`Object`；
	4.	`plugins`：`Array`。

### style

style配置项与JS大体相同，有以下区别：

-	没有`uglify`、`srcType`、`mutiEntriesVendor`和`files`配置项；
-	`extType`决定css预编译器的选型。

### html

html配置项与JS大体相同，有以下区别：

-	html没有`uglify`、`srcType`、`mutiEntriesVendor`和`useHash`配置项；
-	`files`: `Array`，index文件的列表，仍需遵循命名规范；
-	`mainFilePrefix`：默认值为`'index'`。

### image

-	`extType`：`Array`，图片文件扩展名列表；
-	`destDir`：`String`，编译输出目录，`basic.localPath.dest`；
-	`base64`：`Boolean`，是否对小尺寸图片进行base64编码，默认`false`；
-	`base64Limit`：`Number`，base64编码文件的体积上限，大于这个尺寸的文件不会被base64编码；
-	`cdn`：【选填】`String`，图片可配置独立的cdn域名，此项配置将覆盖basic同名配置项。比如style文件中引用图片：`
	body{
	    background-color:blue;
	    backgournd: url('../assets/images/icons.png');
	}
	`

	image配置项为：

	```
	boi.spec('image', {
	    extType: ['png', 'jpg'],
	    destDir: 'image',
	    cdn: 'img.daojia.com',
	});
	```

	编译输出的文件为：

	```
	body{
	    background-color:blue;
	    backgournd:url(http://img.daojia.com/icons.b709986b.png)
	}
	```

