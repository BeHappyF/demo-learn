** 项目文件名记得不要和npm上的第三方报名冲突，同样的，package.json内name对应的值也是。 **


.babelrc内的配置，为一段json，告诉Babel使用es2015进行预处理

yarn 更新版本之后记得 `yarn cache clean`，否则有意料之外的错误（我报的是请求第三方包超时）。


使用webpack-dev-server热更新
第一个参数是让webpack把HMR逻辑直接写入页面上而不是放到iframe里
而第二个标记则开启了HMR（hot module replacement ）
```
webpack-dev-server --inline --hot
```
