//项目依赖
const koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const route = require('koa-router');
//const routes = require('./routes/routes.js');
const mongoose = require('mongoose');
const app = new koa();

const config = require('./configs');

//mongodb
mongoose.connect(config.mongodb.url);
mongoose.connection.on('error', console.error);

//中间件
app.use(convert.compose(
  logger(),
  bodyParser()
))

//路由

//获取文章
//app.use(route.get('/posts/', routes.posts));
//新增文章
//app.use(route.post('/post/', routes.newpost));
//获取指定id文章
//app.use(route.get('/post/:id', routes.post));
//更新指定id的文章
//app.use(route.post('/post/:id', routes.updatepost));
//删除指定id文章
//app.use(route.post('/post/:id/del', routes.removepost));

app.use(async (ctx, next) => {
   const start = new Date();
   await next();
   const ms = new Date() - start;
   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
 });

 app.use(ctx => {
   ctx.body = 'Hello Koa';
 });
// 创建服务器
 app.listen(config.app.port, () => {
      console.log('The server is running at http://localhost:' + config.app.port);
  });

  module.exports = app;
