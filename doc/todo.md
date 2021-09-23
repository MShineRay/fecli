# TODO
 
### 完善命令
- 校验规范相关命令
    - 校验开发环境
        - node版本
        - vue-cli版本
        - webpack版本
    
### 完善模板
- 如何将单一功能模版动态注入到项目中？
    - readme.md
    - vue组件
    - jsUtils.js
    - eslint相关配置
    - package.json
    - .gitingore
    
- 实现模板远程维护
    - 模版配置文件可外部扩展(参考npm config)
        - fe set config key = '' 
        - fe get config
          ~~~
          npm ERR! Usage:
          npm ERR! npm config set <key> <value>
          npm ERR! npm config get [<key>]
          npm ERR! npm config delete <key>
          npm ERR! npm config list [--json]
          npm ERR! npm config edit
          npm ERR! npm set <key> <value>
          npm ERR! npm get [<key>]
          npm ERR!
          npm ERR! alias: c
          ~~~
      - 模版本地缓存
        - 模版缓存
            - 缓存时长：30d
        - 缓存清除
            - 命令清除缓存
                - fe clean cache
        


