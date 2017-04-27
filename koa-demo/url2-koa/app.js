const fs = require('fs');
// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 返回的是一个函数
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
// 创建一个Koa对象表示web app本身:
const app = new Koa();



// log request URL:
app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.use(bodyParser());
app.use(controller());
// add router middleware:
app.use(router.routes());


// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
