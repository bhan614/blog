//项目依赖
import koa from 'koa';
import convert from 'koa-convert';
import onerror from 'koa-onerror';
import mongoose from 'mongoose';
import config from './configs';
import middleware from './middleware'
import api from "./api";
const app = new koa();

//mongodb
mongoose.connect(config.mongodb.url);
mongoose.connection.on('error', console.error);

//中间件
app.use(middleware());
onerror(app);

//路由
app.use(api());

// 创建服务器
 app.listen(config.app.port, () => {
      console.log('The server is running at http://localhost:' + config.app.port);
  });

 export default app;
