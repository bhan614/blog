//项目依赖
const logger = require('koa-logger');
const route = require('koa-route');
const koa = require('koa');
const app = module.exports = koa();
const routes = require('./routes/routes.js');

//中间件
app.use(logger());

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


app.listen(3000);
console.log('listening on port 3000');
