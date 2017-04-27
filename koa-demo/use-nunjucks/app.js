const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    var autoscape = opts.autoscape && true,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader('views', {
                noCache: noCache,
                watch: watch
            }), {
                autoscape: autoscape,
                throwOnUndefined: throwOnUndefined
            });

    if(opts.filters) {
        for(let f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }

    return env;
}

var env = createEnv('views', {
    watch: true,
    filters: {
        hex: function () {
            return '0x' + n.toString(16);
        }
    }
});

var s = env.render('hello.html', {
    name: '<nunjucks>',
    fruits: ['Apple', 'Pear', 'Banana'],
    count: 12000
});

console.log(s);

console.log(env.render('extend.html', {
    header: 'Hello',
    body: 'bla bla...'
}))
