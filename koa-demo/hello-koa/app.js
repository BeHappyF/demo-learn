// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
// 创建一个Koa对象表示web app本身:
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next();   // 调用下一个async函数（middleware）
});

app.use(async (ctx, next) => {
    const start = new Date().getTime();     // 当前时间
    await next();   // 调用下一个async函数（middleware）
    const ms = new Date().getTime() - start;    // 耗费时间(几ms || 不花时间)
    console.log(`Time: ${ms}ms`);
});

// 对于任何请求，app将调用该异步函数处理请求：
// 参数ctx是由koa传入的封装了request和response的变量, next是koa传入的将要处理的下一个异步函数。
// 由async标记的函数称为异步函数，每个async函数称为middleware
app.use(async (ctx, next) => {
    // 在异步函数中，可以用await调用另一个异步函数，这两个关键字将在ES7中引入。
	await next();
    // 设置response的Content-Type:
	ctx.response.type = 'text/html';
    // 设置response的内容:
	ctx.response.body = '<h1>Hello, Koa2!</h1>';
});



// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
