// Observer定义
class Observer {
    constructor (data) {
        this.data = data;
        // 记录被this.$watch调用过的属性和回调函数
        // this.watched的数据结构如下
        // this.watched[0]: [...key] 记录被watch的key
        // this.watched数组内剩下的都是对象
        // 每个对象内的数据结构为:
        // key: 'xxx',
        // method: [...cb]
        this.watched = [];
        this.walk(data);
    }
    // 遍历对象的所有属性
    walk (data) {
        let value;
        // for..in..是返回对象key-value对的key
        for(var key in data) {
            value = data[key];
            // 只需要遍历对象本身的属性
            if(data.hasOwnProperty(key)) {
                // 如果对象的属性仍为一个对象，则递归之
                if(({}).toString.call(value) === '[object Object]') {
                    new Observer(value);
                    // this.walk(data[key])
                }

                this.convert(key, value);
            }
        }
    }
    // 对象中每个属性定制get和set方法。获得指定输出
    convert (key, value) {
        let _watched = this.watched;
        Object.defineProperty(this.data, key, {
            enumerable: true,
            configurable: true,
            get () {
                console.log("你访问了" + key);
                return value;
            },
            set (newValue) {
                if(newValue === value) return;
                value = newValue;
                // 新设置的值为一个对象类型
                if(newValue instanceof Object) {
                    new Observer(newValue);
                    console.log('你设置了一个对象，对象的属性有:')
                    for(let key in newValue) {
                        if(newValue.hasOwnProperty(key)) {
                            console.log(key);
                        }
                    }
                    return;
                }
                // 拦截数据的设置函数，如果有对其watch，则调用对应的回调
                if(_watched[0] && _watched[0].indexOf(key) !== -1) {
                    _watched.forEach((item) => {
                        if(item.key && item.key === key) {
                            for(let callback of item.method) {
                                // 这里的this为整体的this.data
                                // 回调的参数为key对应的值
                                callback(this[key]);
                            }
                        }
                    })
                    return;
                }
                console.log('你设置了 ' + key + ', 新的值为' + value);
            }
        })
    }
    // 监听数据的改变，调用注册了的回调
    $watch(key, cb) {
        // 第一次watched设置，需要设置watched[0]为一个数组
        !this.watched[0] && (this.watched[0] =[]);
        // 没有被watch的key
        if(this.watched[0].indexOf(key) === -1) {
            let _callback = {
                key: key,
                method: [cb]
            };
            // 在watched的数组内添加这个key
            this.watched[0].push(key);
            this.watched.push(_callback);
        // 如果this.watched[0]中有了这个key,则只需要在对应的对象中的method加入回调
        } else {
            this.watched.forEach((item) => {
                if(item.key && item.key === key) {
                    item.method.push(cb);
                }
            })
        }
    }
}

/**------------------------ 测试代码 --------------------------**/
const test = new Observer({
    name: 'Humiliter',
    age: 24
});


const test2 = new Observer({
    company: 'netease',
    person: {
        name: 'humiliter',
        code: 23423
    }
});

const test3 = new Observer({
    infos: 'test',
    age: 22
});

test.data.name;         // 你访问了name
test.data.age = 30;     // 你设置了 age, 新的值为30

test2.data.person.name;         // 你访问了person \n 你访问了name
test2.data.person.code = 1231;  // 你访问了person \n 你设置了code，新的值为1231

// 你设置了一个对象，对象的属性有:
// name
// sex
test3.data.infos = {
    name: 'behappy',
    sex: 'man'
};

test3.data.infos.sex;           // 你访问了infos \n 你访问了sex
test3.data.infos.name = 'xxx';  // 你访问了infos \n 你设置了 name, 新的值为xxx

let test4 = new Observer({
        name: 'youngwind',
        age: 25
});

test4.$watch('age', function(age) {
        console.log(`我的年纪变了，现在已经是：${age}岁了`);
});

test4.$watch('age', function (age) {
    console.log(`heihei,实现了一个参数绑定多个回调`);
})

test4.$watch('name', function (age) {
    console.log(`heihei,实现了多个参数的回调绑定`);
});

test4.data.age = 100;
test4.data.name = 'humiliter';

/**------------------------ todo --------------------------**/
// 数组对象的设置



