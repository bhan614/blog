import compose from 'koa-compose';
import Router from 'koa-router';
import convert from 'koa-convert';
import importDir from 'import-dir';
import config from '../configs';
const routes = importDir('./routes');

export default function api() {
    const router = new Router({
    prefix: config.app.baseApi
  });
  Object.keys(routes).forEach(name => {
    return routes[name](router)
  });
  console.log(convert);
  return convert.compose(
    router.routes(), //启动路由
    router.allowedMethods(),  //响应 options 请求和请求出错的处理
  )
}
