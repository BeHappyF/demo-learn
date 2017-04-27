// Observer定义
class Observer {
    constructor (data) {
        this.data = data;
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
                console.log('你设置了 ' + key + ', 新的值为' + value);
            }
        })
    }
}

/**------------------------ 测试代码 --------------------------**/
const test = new Observer({
    name: 'Humiliter',
    age: 24
});

const test2 = new Observer({
  university: 'bupt',
  major: 'computer'
});

const test3 = new Observer({
    company: 'netease',
    person: {
        name: 'humiliter',
        code: 23423
    }
});

test.data.name;         // 你访问了name
test.data.age = 30;     // 你设置了 age, 新的值为30

test2.data.university;          // 你访问了 university
test2.data.major = 'science';   // 你设置了 major，新的值为 science

test3.data.person.name;         // 你访问了person \n 你访问了name
test3.data.person.code = 1231;  // 你访问了person \n 你设置了code，新的值为1231

/**------------------------ todo --------------------------**/
// 数组对象的设置
// 修改普通类型属性的值为对象类型



