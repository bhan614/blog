import 'babel-polyfill';
import Koa from 'koa';

const app = new Koa();

app.use(async (ctx, next) => ctx.body = "Hello World");

app.listen(5050, () => console.log('Listening on port 5050'));

export default app;
