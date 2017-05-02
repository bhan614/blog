# Blog
>vue2+koa2+mongodb+webpack

## 后端
- 后端使用koa2、koa-router构建restful api
- mongodb存储数据
- token使用jsonwebtoken

### async/await
- Koa 2 移除了内置的 Generator 支持，使用 async 函数替代。中间件函数的签名也改为支持 async 箭头函数。
>学习测试代码server/node-async-test.js

### 中间件
- koa对网络请求采用了中间件的形式处理,中间件可以介入请求和相应的处理,是一个轻量级的模块,每个中间负责完成某个特定的功能。中间件的通过next函数联系,执行next()后会将控制权交给下一个中间件,如果没有有中间件没有执行next后将会沿路折返,将控制权交换给前一个中间件。
- 使用koa-convert来兼容koa1和koa2
- 使用compose将中间件串起来
>学习测试代码server/koa-middleware-test.js

### 路由
- 教学地址：http://www.nodepeixun.com/a/nodekuangjia/20170114/126.html
>学习测试代码server/koa-router-test.js

### mongodb
- 数据库使用mongodb
- 启动命令mongod  --dbpath d:\mongodb\data
>学习测试代码server/mongodb-test.js

### token
- 地址：https://github.com/auth0/node-jsonwebtoken
>学习测试代码server/jwt-test.js

## 前端
- 使用vue2、vuex、vue-router
- vue-cli脚手架构建，注意vue-cli构建后要在webpack更改path
- stylus写样式
- ui组件使用elementui
- 编辑器使用simplemde

### 引入stylus
- 用lang声明<style lang="stylus"></style>

### 引入elementui
- 使用方法见http://element.eleme.io/#/zh-CN/component/installation

### Vue-cli proxyTable
- 是一个地址映射表，你可以通过设置将复杂的url简化
- 可以虚拟一个服务端接收你的请求并代你发送该请求，这样就不会有跨域问题了

### Axios
- 使用axios来发送请求，返回值是promise
