# fecli 
Front-End Command Line Interface

### Welcome
Welcome to improve related functions

- [project template](https://github.com/MShineRay?tab=projects)
- [cli](https://github.com/MShineRay/fecli)

### Use
~~~
  - fe create # create FE project by template
  - fe dir-tree # Generate project directory tree description(directoryTreeDesc.md)
  - fe parsewxhtml # Streamline WeChat Official Account Articles 精简微信公众号文章
  - fe lint
  - fe md 
    - readme
  - fe git
    - .gitignore
    - .gitkeep
  - fe file
  - fe dir
  - fe check # check FE projcet
~~~    

### Example
~~~
    fe create # create project
    
    fe 
      Commands:
        parsewxhtml    parse wx html
        info           print debugging information about your environment
        dir-tree       generate directory tree under current directory
~~~

~~~
   > fe create
   >
      ? Please input your project name testPro
      ? Please select your project template 
        template-pc-vue3(PC、vue3、elementui) 
        template-wap-vue3-vant(wap、vue3、vant) 
        template-node-serve-express 
      ❯ template-vue2-webpack-umd 
        template-jslib-rollup 
        template-jslib-gulp 
        template-web-gulp(gulp、jquery、require、mustache) 
      (Move up and down to reveal more choices)

~~~

### Knowledge Point
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
 - [tree-node-cli](https://www.npmjs.com/package/tree-node-cli)
   ~~~
    npm install -g tree-node-cli    
    tree -I "node_modules"  --dirs-first
   ~~~

### License
   [MIT](LICENSE)
