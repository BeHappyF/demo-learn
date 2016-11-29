class MVVM {
    constructor(options) {
        this.input = options.input
        this.output = options.output
        let data = this.data = options.data
        let key = null, slice = [].slice
        // [].slice.call().forEach不能这样子一步写完
        // key = attr.value的括号不加上就会报错
        // 这是&&运算符只会包含到key，后面的赋值语句的左边是&&运算后的返回值（null）
        // 所以报错了
        slice.call(options.input.attributes).forEach((attr) => attr.name === 'data-model' && (key = attr.value))
        // Array.from可以让一个array-like的对象转化为array类型，但是兼容性差(ie11+)
        // Array.from(options.input.attributes).for....

        if(key && data[key]) {
            let value = data[key]
            this.input.value = this.output.textContent = value
            this.dataBinder(data, key ,value)
        }

    }
    /**
     * 双向数据绑定
     * @description 输入对象的事件监听回调中的赋值是mvvm中的vm，即视觉层-》模型层。
     *              绑定数据自定义的set函数则是mvvm中mv的体现。
     * @param  {Object} data  包含绑定数据的对象集合
     * @param  {String} key   绑定数据的键名
     * @param  {String} value 绑定数据的键值（数据的类型应该可为多种，这里简单的以string类型为例）
     */
    dataBinder(data, key ,value) {
        this.input.addEventListener('input', (event) => data[key] = event.target.value)

        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: () => value,
            set: (newValue) => {
                if(newValue === value)
                    return
                value = newValue
                this.notify(value)
            }
        })
    }

    notify(value) {
        this.output.textContent = value
    }
}
