## 插件 !heading

boi的核心功能比较轻量，具体的功能由boi插件完成。

### 使用插件 !heading

使用插件API为`boi.use`，修改`boi-conf.js`配置文件如下：

```
boi.use('boi-plugin-loader-vue');
```

boi本身不支持特定框架的编译，vue编译以及dev server配置由[boi-plugin-loader-vue](http://git.djcorp.cn/djfe/boi-plugin-loader-vue)插件提供。

具体示例请参考[demo](http://git.djcorp.cn/djfe/boi-example/tree/master/app/suyun)。

### 安装插件 !heading

boi插件可以自行安装：

```
npm install boi-plugin-loader-vue --save-dev
```

由于某些不可言表的原因，npm可能会安装失败，请尝试以下解决方法：

1.	挂VPN；
2.	将npm仓库地址修改为taobao镜像：

	```
	npm config set registry https://registry.npm.taobao.org/
	```

3.	使用[cnpm](https://github.com/cnpm/cnpm)安装。

如果用户不自行安装，boi会**自动**安装所使用的插件。

> 推荐使用npm自行安装，cnpm安装目前存在一些不可预估的问题，后续会修复。
