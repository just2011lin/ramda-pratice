//  practice two
// 1.	call，创建一个函数 ，其接收一个多多个数字，返回这些数字的和
const call = (...args) => R.call(R.reduce(R.add, 0, _), args);
console.log('call', call(1, 4, 6))
// 2.	chain，创建一个函数，其将一个字符串数组中的每一个字符串的内容都展开到一个数组中，
// 例如将[‘好好学习’,’天天向上’]=>[‘好’,’好’,’学’,’习’,’天’,’天’,’向’,’上’]
const split = n => R.split('', n);
const chain = a => R.chain(split, a);
console.log('chaim', chain(['好好学习', '天天向上']));
//3.	chain，创建一个函数 ，计算x*x-2x的值
const chainCoumpute = R.chain(R.multiply, R.subtract(_, 2)); //=> R.multiply(R.subtract(a,2),a)
console.log('chainCoumpute', chainCoumpute(3), R.multiply(R.subtract(3, 2), 3))
// 4.	clamp，创建一个函数，传入一个数字，
//如果该数字大于等于1且小于等于100则返回该数字；如果该数字小于1，则返回1；
//如果该数字大于100则返回100
const clamp = R.clamp(1, 100, _);
console.log('clalmp', clamp(0))
// 5.	clone，创建一个函数 ，传入一个对象后，返回一个这个对象的深度复制版本，且添加属性from，属性值为传入的对象
const clone = b => R.assoc('from', R.clone(b))(b)
console.log('clone', clone({ name: 'zdf', age: 18 }))
// 6.	comparator，创建一个函数，传入一个数字数组，对这个数组按照绝对值大小进行排序
const comparator = R.comparator((a, b) => Math.abs(a) > Math.abs(b));
const comparatorSort = R.sort(comparator, _);
console.log('comparator', comparatorSort([-2, 3, 4, -6, 7]))
// 7.	complement，创建一个函数 ，用于判断一个数字不是NaN
const complement = R.complement(isNaN);
console.log('complement', complement(7))
// 8.	concat，创建一个函数，接收一个数组和字符串，将字符串的每个字符添加到数组中。
const concat = (a, b) => R.concat(a, R.split('', b));
console.log('concat', concat([1, 2, 3], 'sdfff'));
// 9.	cond，创建一个函数，接收一个数字n，当n>=0.95时返回A+；当n>=0.8时返回A；
// 当n>=0.5时返回B；当n>=0.05时返回C；其余返回D（返回字符串的方法可使用always函数创建）
const cond = R.cond([
    [R.gte(_, 0.95), R.always('A++')],
    [R.gte(_, 0.8), R.always('A')],
    [R.gte(_, 0.5), R.always('B')],
    [R.gte(_, 0.05), R.always('C')],
    [R.T, R.always('D')]
]);
console.log('cond', cond(1), cond(0.9), cond(0.6), cond(0.45), cond(0.01))
// 10.	construct，创建一个函数，用于创建日期对象，
//日期对象的年月日固定为2018年08月 08日，只需要再传入时、分、秒即可创建一个日期对象
class _Date {
    constructor(ms) {
        this.time = `2018-08-08 ${ms}`;
    }
    getDateObj() {
        return new Date(this.time)
    }
}
const getDateObj = R.invoker(0, 'getDateObj');
const construct = R.compose(getDateObj, R.construct(_Date));
console.log('construct', construct("20:11:11"))

// 11.	contains，创建一个函数，用于判断数组中是否有一个空对象
const contains = R.contains({}, _);
console.log('cnontains', contains([0, 1, 2]))
// 12.	converge，创建一个函数，传入一个数字数组，返回这组数字的平均值
const converge = R.converge(R.divide, [R.sum, R.length]);
console.log(converge([1, 2, 3, 4]))
// 13.	countBy，创建一个函数，接收一个中文名数组，获取每个姓氏的数量（假设数组中没有复姓名称）
const countBy = R.countBy(R.nth(0, _), _);
console.log('countBy', countBy(['张丹峰', '张录啊', '孙小']))
// 14.	dec，创建一个函数，可以计算一个正整数阶乘的结果
const decTest = (n) => {
    if (n <= 1) return 1;
    return n * decTest(R.dec(n));
};
console.log('dec', decTest(3))
// 15.	defaultTo，创建一个函数func，接收一个函数A作为参数，并返回一个函数B；
// 运行时将函数B的参数传给函数A，并计算函数A的结果，
// 如果函数A 的结果为null、undefined或NaN则返回0，否则返回函数A的结果
const defaultTo = R.defaultTo(0);
const func = a => {
    return (b) => {
        return defaultTo(a(b));
    }
}
console.log('defaultTo', func(a => a)(null))
// 16.	descend，创建一个函数，对数组中的字符串按照其编码值降序来排列 ，
// 比如数组[‘aa’,’ab’] => [‘ab’, ‘aa’]
const descend = R.descend(R.identity);
const descendSort = R.sort(descend, _);
console.log('descend', descendSort(['aa', 'ab']));
// 17.	difference，创建一个函数，接收两个数组作为参数，判断第一个数组中是否有第二个数组中的值
const difference = (a, b) => R.lt(R.length(R.difference(b, a)), R.length(b));
console.log('difference', difference([5, 4], [1, 2, 3, 5])) //等于a的长度则一个没有 小于则包含
// 18.	differenceWith，创建一个函数，传入两个字符串数组，
// 取出第一个 数组中未包含在第二个数组中的字符串（不区分大小写）
const cmp = (a, b) => R.toLower(a) === R.toLower(b);
const differenceWith = (a, b) => R.differenceWith(cmp, a, b);
console.log('differenceWith', differenceWith(['a', 'b', 'c'], ['e', 'a']))
// 19.	dissoc，创建一个函数，传入一个对象，删除该对象上值不为字符串或字符串数组的属性
const test = a=>R.is(Array,a) && R.all(R.is(String),a);

console.log('test',test('2'),test(['2','test']))
const propsCheck = R.anyPass([R.both(R.is(Array), R.all(R.is(String))),R.is(String)]);
const isProps = (value, key, target) => {
    if (propsCheck(value)) {
        return R.dissoc(key, target);
    }
    return target;
}
const curryforEachObj = curry((target) => {
    for (let key in target) {
        target = isProps(target[key], key, target)
    }
    return target;
})
console.log('dissoc', curryforEachObj({ a: '1', b: [2] }));
// 20.	dissocPath，创建一个函数，传入一个对象数组，其将会删除数组中最后一项的next属性
const last = R.last();
const changeArray = a => { let temp = []; temp.push(R.dissocPath(['next'], R.last(a))); return temp };
const resultPath = a => R.concat(R.init(a), changeArray(a));
console.log('resultPath', resultPath([{ 'name': 'ww' }, { 'next': 'true' }]))
console.log(R.dissocPath(['next'], { 'next': 'true' }))