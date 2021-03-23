# fecli 
Front-End Command Line Interface
   
## 用途
~~~html
    1、fe template (项目模板选择工具)方便开发人员根据业务选择对应的前端基础代码（脚手架）
    2、fe check（项目检测工具）
~~~
    
## 使用说明
    
~~~html
    npm i -g fecli #全局安装
    
    fe create #创建项目
~~~

### run && debug cli
~~~
    1、npm发布后全局执行
      * npm adduser
      * npm publish
      * npm install fecli -g
      * fe init <name>

    2、在cli内部调试
      * cd fecli
      * node index.js init <name>
~~~

## rules
   - 命名规范：template-客户端类型（pc、mobile、小程序）-主框架（vue、react）-ui-other


## Knowledge Point

 * [使用 Node.js 开发简单的脚手架工具](https://mp.weixin.qq.com/s/o4D4DI59GzdeI8KTp0RGuA)
 * [npm发布注意事项](https://blog.csdn.net/gamesdev/article/details/49018629)
 * npm 发布时，需要更改package.json中的版本
 * cli中的模板download的路径，详细阅读对应API
 * [使用 Node.js 开发简单的脚手架工具](https://mp.weixin.qq.com/s/o4D4DI59GzdeI8KTp0RGuA)
 * [@vue/cli](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli)
 * [从0开始发布一个无依赖、高质量的 npm 包](https://mp.weixin.qq.com/s/0oDXwz-SBoh3mEymlNxh7w)
 * [前端进阶（13） - 搭建自己的前端脚手架](https://segmentfault.com/a/1190000016481132)
 
## fecli check rules（TODO）
* 解决方案
    * 基于eslint扩展
    * 基于directory-tree扩展
* 规则详情    
    * 校验目录结构
        * 是否缺失
        * 是否新增
        * 是否目录层级过深
    * 校验文件
        * 是否缺失
        * 校验文件内容
            * 是否被篡改
            * 是否缺失
            * 涉及的文件
                readme.md
                package.json
    * 校验命名规范
        * 文件夹命名
        * 文件命名
        * vue组件命名
    
    * node生成目录结构数组
        * 忽略文件夹
        * 忽略文件
        * 递归遍历
        * 生成数组
    
    
## Log

### v0.0.3
* add--命令--dir-tree（生成目录结构树）
    * 支持.js、.css、.vue、.html文件注释解析
    * 注释约定 文件第一行
       * /**@desc 注释内容\*/
       * HTML注释\<!-- @desc 注释内容-->

### v0.0.2
* add--模板
### v0.0.1
* init
 
## TODO

   * 完善命令
        * 校验规范相关命令
        * 校验开发环境
            * node版本
            * vue-cli版本
            * webpack版本
   * 完善模板
        * 如何动态注入到项目中？

## Q&A
Q1: 如何实现生成一个文件（.md），文件内容是项目目录树状结构及对应的目录或文件说明，
    能忽略统计目录(wwwroot、.idea、dist、node_modules、test)、文件(*.png)
    参考：
``` 
|-- xxx.xxx.xx
    |-- .browserslistrc
    |-- .eslintrc.js
    |-- .gitignore
    |-- .prettierrc
    |-- README.md
    |-- babel.config.js
    |-- package-lock.json
    |-- package.json
    |-- postcss.config.js
    |-- vue.config.js
    |-- vue.config.proxy.js
    |-- vue.log.js
    |-- vue.mock.js
    |-- webpack.dll.conf.js
    |-- mock
    |-- public
    |   |-- css
    |   |   |-- common.css
    |   |   |-- iconfont.css
    |   |-- fesdk
    |   |   |-- v1.js
    |   |-- img
    |   |-- vendor
    |       |-- vendor-manifest.json
    |-- src
    |   |-- App.vue
    |   |-- main.js
    |   |-- router.js
    |   |-- assets
    |   |   |-- img
    |   |-- components
    |   |   |-- common
    |   |-- filters
    |   |   |-- index.js
    |   |-- mixin
    |   |   |-- index.js
    |   |-- store
    |   |   |-- index.js
    |   |   |-- module
    |   |-- util
    |   |-- views
    |   |   |-- index-bak.vue
    |   |   |-- index.vue
    |   |   |-- test.vue
    |-- wwwroot
 ```   
Q2:  目录层级

     根目录|--
    一级目录  |--
    二级目录    |   |--
    
Q3: 生成的目录树，顺序与真实的顺序不一致

Q4: 根目录名称无法获得   
