将原有的es6代码处理后覆盖原有文件的操作：

```bash
babel src -d src
```

不配置.babelrc（为了满足omad内的设置。）
```bash
babel src -d src --presets latest --plugins transform-remove-strict-mode
```

编译一个文件下除了指定子文件夹的所有文件：
```bash
babel src -d src --ignore src/test
```
