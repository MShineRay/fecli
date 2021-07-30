# Q&A

## Q&A
- Q1: 如何实现生成一个文件（.md），文件内容是项目目录树状结构及对应的目录或文件说明，
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
- Q2:  目录层级

     根目录|--
    一级目录  |--
    二级目录    |   |--
    
- Q3: 生成的目录树，顺序与真实的顺序不一致

- Q4: 根目录名称无法获得   
