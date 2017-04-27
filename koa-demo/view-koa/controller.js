const fs = require('fs');

function addMapping(router, mapping) {
    for(let url in mapping) {
        if(url.startsWith('GET')) {
            // GET开头
            let path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST')) {
            // POST开头
            let path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            // 无效url
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    // 先导入fs模块，然后用readdirSync列出文件
    // 这里可以用sync是因为启动时只运行一次，不存在性能问题:
    const files = fs.readdirSync(__dirname + '/' + dir);
    // 过滤出js文件
    const js_files = files.filter((f) => f.endsWith('.js'));
    for(let f of js_files) {
        console.log(`process controller: ${f}...`);
        // 导入js文件
        let mapping = require(__dirname + '/' + dir + '/' + f);
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
    let controller_dir = dir || 'controllers',
        router = require('koa-router')();

    addControllers(router, controller_dir);
    // 不知道为什么返回这个
    return router.routes();

}
