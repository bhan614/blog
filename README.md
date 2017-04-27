vue2+koa2+mongodb+webpack

后端server使用koa2+mongodb构建

async/await 函数
Koa 2 移除了内置的 Generator 支持，使用 async 函数替代。中间件函数的签名也改为支持 async 箭头函数。
学习测试代码server/node-async-test.js

中间件
koa对网络请求采用了中间件的形式处理,中间件可以介入请求和相应的处理,是一个轻量级的模块,每个中间负责完成某个特定的功能。中间件的通过next函数联系,执行next()后会将控制权交给下一个中间件,如果没有有中间件没有执行next后将会沿路折返,将控制权交换给前一个中间件。
使用koa-convert来兼容koa1和koa2
使用compose将中间件串起来
学习测试代码server/koa-middleware-test.js

路由
http://www.nodepeixun.com/a/nodekuangjia/20170114/126.html
学习测试代码server/koa-router-test.js

mongodb
数据库使用mongodb
启动命令mongod  --dbpath d:\mongodb\data
学习测试代码server/mongodb-test.js

token
使用jsonwebtoken
学习测试代码server/jwt-test.js

blog-admin使用vue-cli构建
注意vue-cli构建后要在webpack更改path

引入stylus
用lang声明<style lang="stylus"></style>

引入elementui
使用方法见http://element.eleme.io/#/zh-CN/component/installation
