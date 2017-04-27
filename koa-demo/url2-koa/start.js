// 第一个require()是Node正常加载babel-core/register的过程
// 随后用require()加载的所有代码均会被Babel自动转码后再加载。
var register = require('babel-core/register');

register({
    presets: ['stage-3']
});
// Babel会用自己的require()替换掉Node的require()
require('./app.js');
