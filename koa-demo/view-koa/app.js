// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating');

const app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';

// log request URL:
app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}...`);
    var start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

// 因为在生产环境下，静态文件是由部署在最前面的反向代理服务器（如Nginx）处理的
// Node程序不需要处理静态文件。而在开发环境下，我们希望koa能顺带处理静态文件
// static file support:
if (!isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// parse request body:
app.use(bodyParser());

// add nunjucks as view:
app.use(templating('view', {
    noCache: !isProduction,
    watch: !isProduction
}));

// add controller:
app.use(controller());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');
