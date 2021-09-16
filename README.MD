# fecli 
Front-End Command Line Interface
   
## 用途
~~~html
    1、fe template (项目模板选择工具)方便开发人员根据业务选择对应的前端基础代码（脚手架）
~~~
  - fe dir-tree # 生成目录结构书  (项目模板选择工具)方便开发人员根据业务选择对应的前端基础代码（脚手架）
  - fe parsewxhtml # 精简微信公众号文章
  - fe lint
  - fe md 
    - readme
  - fe git
    - .gitignore
    - .gitkeep
  - fe file
  - fe dir
  - fe check（项目检测工具）
    
## install
    
~~~
    npm i -g @a0znpm/fecli 
    
    fe create # create project
    
    fe 
      Commands:
        parsewxhtml    parse wx html
        info           print debugging information about your environment
        dir-tree       generate directory tree under current directory
~~~
 - run && debug cli
~~~
    1、npm发布后全局执行
      * npm adduser #a0znpm
      * npm publish --access public
    2、在cli内部调试
      * cd fecli
      * npm run fe 
~~~


## Knowledge Point

 - [使用 Node.js 开发简单的脚手架工具](https://mp.weixin.qq.com/s/o4D4DI59GzdeI8KTp0RGuA)
 - [npm发布注意事项](https://blog.csdn.net/gamesdev/article/details/49018629)
 - npm 发布时，需要更改package.json中的版本
 - cli中的模板download的路径，详细阅读对应API
 - [@vue/cli](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli)
 - [从0开始发布一个无依赖、高质量的 npm 包](https://mp.weixin.qq.com/s/0oDXwz-SBoh3mEymlNxh7w)
 - [前端进阶（13） - 搭建自己的前端脚手架](https://segmentfault.com/a/1190000016481132)
 - [发布npm包时遇到的一些坑](https://www.jianshu.com/p/40f732d91a8c)
    - npm publish --access public
 - [npm docs](https://docs.npmjs.com/cli/v7/using-npm/developers)
