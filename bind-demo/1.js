/**
 * bind 相关要点：
 * 1）简单粗暴地来说，bind是用于绑定this指向的。（如果你还不了解JS中this的指向问题，以及执行环境上下文的奥秘，这篇文章暂时就不太适合阅读）。
 *
 * 2）bind使用语法：
 *     fun.bind(thisArg[, arg1[, arg2[, ...]]])
 *     bind方法会创建一个新函数。当这个新函数被调用时，bind的第一个参数将作为它运行时的this，之后的一序列参数将会在传递的实参前传入作为它的参数。本文不打算科普基础，如果您还不清楚，请参考MDN内容。
 *
 * 3)bind返回的绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的this值被忽略，同时调用时的参数被提供给模拟函数。
 */


// 1.初步的bind polyfill
/**
 * bind函数的Polyfill
 * @param  {Object} context 函数被绑定的this
 *
 * 调用方式：
 * xxxObject.someFunction.bind(this, args1, args2...)
 * xxxObject可能是某个对象，也可能是window之类的。
 */
Function.prototype.bind = function (context) {
    var self = this,                                        // this为原有的函数
        args = Array.prototype.slice.call(arguments);       // bind函数调用一起传入的参数列表（包括第一个参数:被指定的this）
    return function () {
        // args.slice(1)才是真正需要的参数列表，第一个参数为指定需要绑定的this
        return self.apply(context, args.slice(1));
    }
};


/**
 * 2.bind polyfill，颗粒化（curring）实现
 * 缺点：仍无法满足bind的第三个特性
 * @param  {Object} context 函数被绑定的this
 *
 * 调用方式：
 * xxxObject.someFunction.bind(this, args1, args2...)(Args1, Args2, Args3...)
 */
Function.prototype.bind = Function.prototype.bind || function (context) {
    var self = this,
        slice = Array.prototype.slice,
        args = slice.call(arguments).slice(1);  // 第一次调用时和绑定this一同传入的参数，即获取新函数时
    return function () {
        var innerArgs = slice.call(arguments),  // 第二次调用时传入的参数，即调用新函数时
            finalArgs = args.concat(innerArgs);
        return self.apply(context, finalArgs);
    }
};

/**
 * 3.实现了new 功能的bind polyfill
 * @param  {Object} context 函数被绑定的this
 *
 * var func = b.bind(a);
 * var newFunc = new func(args1, args2, args3...);
 * newFunc(Args1, Args2, Args3...);
 */
Function.prototype.bind = Function.prototype.bind || function (context) {
    if (typeof this !== "function") {
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var self = this,
        args = Array.prototype.slice.call(arguments, 1),
        F = function() {};
    F.prototype = this.prototype;
    var bound = function () {
        var innerArgs = Array.prototype.slice.call(arguments),
            finalArgs = args.concat(innerArgs);
        return self.apply(this instanceof F ? this : context || this, finalArgs);
    };
    // fNOP应该是一个prototype指向空的对象。
    bound.prototype = new fNOP();
    return bound;
}
