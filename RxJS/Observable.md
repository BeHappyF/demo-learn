## Observable

直接子类(Direct Subclass):
    ConnectableObservable, GroupedObservable, Subject

间接子类:
    AnonymousSubject, AsyncSubject, BehaviorSubject, ReplaySubject


### Static Method Summary

...

### Method Summary

...

### Static Public Methods

* * *
#### bindCallback



    public static bindCallback(func: function, selector: function, scheduler: Scheduler): function(...params: *): Observable

> public，static是对函数类型的声明。函数名(func<参数1>:function<类型>...): function<返回值类型>(...params: *)<...表示参数的数量不定，*表示类型不定>: Observable<具体的类型，function的子类>

> 给一个类型为type f(x, callback)的函数f,返回一个函数g,当函数调用时(g()),会输出一个Observable

##### 参数(一般无，有则是特意对参数做具体分析)


##### 返回(同上)


##### 例子

<!-- 将jQuery的getJSON方法转化为一个Observable API -->
```js
var getJSONAsObservable = Rx.Observable.bindCallback(jQuery.getJSON);
var result = getJSONAsObservable('/my/url');
<!-- subscribe传入了两个回调函数，分别对正常和错误返回处理 -->
result.subscribe(x => console.log(x), e => console.error(e));
```

* * *

#### bindNodeCallback

    public static bindNodeCallback(func: function, selector: function, scheduler: Scheduler): function(...params: *): Observable

> 和bindCallback类似，但要求callback的需要是callback(error, result)这样子。

##### 参数(一般无，有则是特意对参数做具体分析)


##### 返回(同上)


##### 例子

<!-- 从文件系统中读取文件，并获取Observable类型的数据 -->
```js
import * as fs from 'fs';
<!-- fs.readFile的参数：<file>,<options>,<callback>,其中callback的参数如下：err, data -->
var readFileAsObservable = Rx.Observable.bindNodeCallback(fs.readFile);
var result = readFileAsObservable('./roadNames.txt', 'utf8');

result.subscribe(x => console.log(x), e => console.error(e));
```

* * *

#### combineLatest

    public static combineLatest(observable1: Observable, observable2: Observable, porject: function, scheduler: Scheduler): Observable

> 组合多个Observable创建出一个新Observable,其值根据每个输入的Observable的最新值计算。

> 选择从多个Observable最后发射（emit）出来的值，并输出计算之后的值（等于将值回调处理一次）

![](./image/combineLatest.png)

##### 参数(一般无，有则是特意对参数做具体分析)


##### 返回(同上)


##### 例子

<!-- 动态计算...还不了解 -->
```js
var weight = Rx.Observable.of(70, 72, 76, 79, 75);
var height = Rx.Observable.of(1.76, 1.77, 1.78);
var bmi = Rx.Observable.combineLastest(weight, height, (w, h) => w / (h * h));
bmi.subscribe(x => console.log('BMI is' + x));
```

* * *

#### concat

    public static concat(input1: Observable, input2: Observable, scheduler: Scheduler): Observable

> 返回的对象为Observable

> 组合多个Observable，每个Observable连续发射（emit）其值，Observable一个接着一个。

![](./image/concat.png)

##### 参数(一般无，有则是特意对参数做具体分析)


##### 返回(同上)


##### 例子

<!-- 连接计数器0-3，和sequence -->
```js
var timer = Rx.Observable.interval(1000).take(4);
var sequence = Rx.Observable.range(1, 10);
var result = Rx.Observable.concat(timer, sequence);
result.subscribe(x => console.log(x));
```

* * *


