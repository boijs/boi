## Get Start !heading

### 安装 !heading

```
npm install boi-cli -g
```

### 创建boi项目 !heading

boi安装成功后，在工作目录内运行：

```
boi new boi-demo
```

或者在已存在目录下运行：

```
boi new .
```

命令行将依次有以下提示：

![](assets/new-1.png)

自定义项目名称，默认项目名称为app。

![](assets/new-2.png)

选择项目类型，上图中依次为常规项目、vue作为第三方库单独引入的项目和vue参与webpack打包的项目。

![](assets/new-3.png)

选择npm第三方依赖。

![](assets/new-4.png)

最终确认。

![](assets/new-5.png)

配置完毕后，boi会自动安装npm第三方依赖。全部执行成功后，生成的项目目录如下图：

![](assets/new-6.png)

### 编译项目文件 !heading

1.	在项目根目录下创建文件`boi-conf.js`;
2.	编辑`boi-conf.js`中的配置项，比如js文件的编译配置如下：

```
boi.spec('js', {
    extType: 'js',
    srcType: ['es2015'],
    srcDir: 'js',
    destDir: 'js'
});
```

在项目根目录下执行`boi build`。默认是dev环境的编译，会生成souremap文件以方便debug。

生产环境的编译执行：

```
boi build prod
```

prod环境编译输出的文件不会产生souremap。

### 使用插件 !heading

编辑`boi-conf.js`，使用API `boi.use`引入插件，比如：

```
boi.use('boi-plugin-loader-vue');
```

boi会判断用户是否已安装此插件，如果没有，则boi会自动安装此插件。

> 建议自行安装插件，boi使用npm安装插件，由于一些*原因*可能会安装失败

如果npm被墙，请尝试以下*任意*一种方案：

1.	挂VPN；
2.	修改npm仓库到淘宝镜像`npm config set registry https://registry.npm.taobao.org`;
3.	安装cnpm。

> 如果安装cnpm，请务必自行安装插件

### dev server !heading

项目根目录下执行：

```
boi serve
```

执行成功后访问`localhost:8888/*.html`或者`localhost:8888/views/*.html`(html文件根据具体命名改动)。boi支持动态编译，开发过程中不必多次重启dev server。
