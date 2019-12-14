// Ramda库专项练习二
const R = require('ramda');
const { log } = require('../util')
// 1.	call，创建一个函数 ，其接收多个数字，返回这些数字的和
const func01 = R.partial(R.call, [R.unapply(R.sum)]);
log('01', func01(1, 2, 3))

// 2.	chain，创建一个函数，其将一个字符串数组中的每一个字符串的内容都展开到一个数组中，例如将[‘好好学习’, ’天天向上’]=> [‘好’, ’好’, ’学’, ’习’, ’天’, ’天’, ’向’, ’上’]
const func02 = R.chain(R.split(''));
log('02', func02(['好好学习', '天天向上']))

// 3.	chain，创建一个函数 ，计算x * x - 2x的值
const subtractB = R.curry((a, b) => a - 2 * b);
const func03 = R.chain(subtractB, R.chain(R.multiply, R.identity))
const func03B = R.chain(R.multiply, R.subtract(R.__, 2))
log('03', func03B(1))

// 4.	clamp，创建一个函数，传入一个数字，如果该数字大于等于1且小于等于100则返回该数字；如果该数字小于1，则返回1；如果该数字大于100则返回100
const func04 = R.clamp(1, 100);
log('04', func04(200));

// 5.	clone，创建一个函数 ，传入一个对象后，返回一个这个对象的深度复制版本，且添加属性from，属性值为传入的对象
const func05 = R.ap(R.assoc('from'), R.clone);
{
    const obj = { a: 1 };
    const res = func05(obj);
    log('05', res);
    log('05', res.from === obj);
}

// 6.	comparator，创建一个函数，传入一个数字数组，对这个数组按照绝对值大小进行排序
const func06 = R.sort(R.comparator(R.pipe(R.unapply(R.map(Math.abs)), R.apply(R.lt))));
log('06', func06([2, -1, 4, -3]));

// 7.	complement，创建一个函数 ，用于判断一个数字不是NaN
const func07 = R.complement(Number.isNaN);
log('07', func07(1))

// 8.	concat，创建一个函数，接收一个数组和字符串，将字符串的每个字符添加到数组中。
const func08 = (arr, str) => R.concat(arr, R.split('', str));
log('08', func08(['a', 'b'], 'cde'));

// 9.	cond，创建一个函数，接收一个数字n，当n >= 0.95时返回A +；当n >= 0.8时返回A；当n >= 0.5时返回B；当n >= 0.05时返回C；其余返回D（返回字符串的方法可使用always函数创建）
const func09 = R.cond([
    [R.lte(0.95), R.always('A+')],
    [R.lte(0.8), R.always('A')],
    [R.lte(0.5), R.always('B')],
    [R.lte(0.05), R.always('C')],
    [R.T, R.always('D')]
])
log('09', func09(0.01))

// 10.	construct，创建一个函数，用于创建日期对象，日期对象的年月日固定为2018年08月 08日，只需要再传入时、分、秒即可创建一个日期对象
const func10 = R.construct(Date)(2018, 07, 08, R.__, R.__, R.__, 0);
log('10', func10(8, 8, 8))

// 11.	contains，创建一个函数，用于判断数组中是否有一个空对象
const func11 = R.contains({});
log('11', func11([{}]))

// 12.	converge，创建一个函数，传入一个数字数组，返回这组数字的平均值
const func12 = R.converge(R.divide, [R.sum, R.length]);
log('12', func12([1, 2, 3]))

// 13.	countBy，创建一个函数，接收一个中文名数组，获取每个姓氏的数量（假设数组中没有复姓名称）
const func13 = R.countBy(R.head);
log('13', func13(['陆林冲', '陆大侠', '张恩泽', '张大人', '朱快乐']))

// 14.	dec，创建一个函数，可以计算一个正整数阶乘的结果
const func14 = num => R.ifElse(R.gte(0), R.always(1), R.ap(R.multiply, R.pipe(R.dec, func14)))(num);
log('14', func14(3))

// 15.	defaultTo，创建一个函数func，接收一个函数A作为参数，并返回一个函数B；运行时将函数B的参数传给函数A，并计算函数A的结果，如果函数A 的结果为null、undefined或NaN则返回0，否则返回函数A的结果
const func15 = funcA => (...args) => R.defaultTo(0, R.apply(funcA, args));
log('15', func15(R.always(1))())

// 16.	descend，创建一个函数，对数组中的字符串按照其编码值降序来排列 ，比如数组[‘aa’, ’ab’] => [‘ab’, ‘aa’]
const func16 = R.sort(R.descend(R.identity));
log('16', func16(['aa', 'ab']))

// 17.	difference，创建一个函数，接收两个数组作为参数，判断第一个数组中是否有第二个数组中的值
const func17 = (arrA, arrB) => R.not(R.equals(R.length(arrA), R.length(R.difference(arrA, arrB))));
log('17', func17([1, 2, 3], [4, 5, 3]))

// 18.	differenceWith，创建一个函数，传入两个字符串数组，取出第一个 数组中未包含在第二个数组中的字符串（不区分大小写）
const func18 = R.differenceWith(R.pipe(R.unapply(R.map(R.toLower)), R.apply(R.equals)))
log('18', func18(['a', 'b', 'C'], ['B', 'c']))

// 19.	dissoc，创建一个函数，传入一个对象，删除该对象上值不为字符串或字符串数组的属性
const isStringOrStrArr = R.either(R.is(String), R.both(R.is(Array), R.all(R.is(String))));
const func19 = obj => {
    let res = R.clone(obj);
    R.forEachObjIndexed((value, key) => {
        if (R.not(isStringOrStrArr(value))) {
            res = R.dissoc(key, res);
        }
    }, res)
    return res;
}
log('19', func19({ name: 1, hello: 's', value: ['1', '2'], text: { a: 1, b: 2, c: 3 } }))

// 20.	dissocPath，创建一个函数，传入一个对象数组，其将会删除数组中最后一项的next属性
const func20 = arr => R.dissocPath([String(arr.length - 1), 'next'], arr);
log('20', func20([{ next: true }, { next: true }]))

// 好好学习，天天向上
