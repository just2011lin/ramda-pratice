const R = require('ramda');
const _ = R.__;
const {
    log
} = require('../util');
// 1.	move，创建一个函数，接收一个字符串数组（并且包含end字符串），将end字符串移动到最后
const move = R.chain(R.move(_, -1), R.findIndex(R.equals('end')))
log('01', move(['1', 2, 'end', 2, 4]))
// 2.	multiply，创建一个函数，接收一个数字n，返回n*(n+1)的结果
const multiply = R.chain(R.multiply, R.inc);
log('02', multiply(2))
// 3.	nAry，创建一个函数，接收一个数字数组，返回数组前五位的最大值，不足五位时则返回NaN
const nAry = R.pipe(R.nAry(5, (a, b, c, d, e) => [a, b, c, d, e]), R.sort((a, b) => b - a, _), R.head);
log('03', nAry(1, 2, 6, 3, 5))
// 4.	negate，创建一个函数，接收一个数字数组，将数组中的奇数取反
const negate = R.map(R.ifElse(
    R.modulo(_, 2),
    R.negate(_),
    R.identity
));
log('04', negate([1, 2, 3]))
// 5.	none，创建一个函数，接收一个字符串数组，判断数组中是否都是可以用Number函数转成数字的字符串
const none = R.none(x => R.equals(NaN, Number(x)))
log('05', none([1, 2, '2', undefined]))
// 6.	not，创建一个函数，接收一个字符串数组，判断其中有没有空字符串，返回true表示有
const not = R.pipe(R.findIndex(R.complement(R.equals('', _))), R.not);
log('06', not([1, 2, '']))
// 7.	nth，创建一个函数，接收一个数字数组，返回其中第一项与最后一项的和
const nth = a => R.add(R.nth(0, a), R.nth(-1, a));
log('07', nth([1, 2, 3]))
// 8.	nthArg，创建一个函数，其行为与nth函数一致
const nthArg = R.nthArg(0, _)
log('08', R.nthArg(0)(1, 2, 3))
// 9.	o，创建一个函数，接收一个数组，去除其中不能通过Number函数转为数字的字符串，然后再将所有值转为数字后求和并返回结果
const o = R.o(R.reduce(R.add, 0, _), R.filter(R.pipe(Number, R.equals(NaN, _), R.not)));
log('09', o([1, 2, '3', undefined, null, 2]))
// 10.	objOf，创建一个函数，接收一个数字数组，返回以数组长度为key、数组总和为value的对象
const objOf = a => R.objOf(R.length(a), R.reduce(R.add, 0, a))
log('10', objOf([1, 2, 3]))
// 11.	of，创建一个函数，接收一个数字n，返回由n与n的反数-n组成的二元数组
const of = a=>R.aperture(1,R.concat(R.of(R.negate(a)),R.of(a)));
log('11', of (29))
// 12.	omit，创建一个函数，接收一个对象，删除对象中值不为字符串的属性
const omit = target => {
    let res = R.clone(target);
    R.forEachObjIndexed((value, key) => {
        if (R.not(R.is(String,value))) {
            res = R.omit([key], res);
        }
    }, res)
    return res;
}
log('12', omit({
    a: 1,
    b: '2'
}))
// 13.	once，创建一个函数，获取一个1-10的随机数，并且此后每次重复执行都会获取相同的结果
const once = R.once(x=>R.inc(Math.random()*9));
log('13',once())
log('13',once())
// 14.	or，创建一个函数，接收一个数字n，判断n是否满足n<0或n>100
const or = R.or(R.lt(_,0),R.gt(_,10))
log('14',or(2))
// 15.	otherwise，创建一个函数，接收一个promise，当promise失败时在控制台打印出错误消息 

//  这个没理解这个api

// 16.	over，创建一个函数，接收一个对象n，给n设置end属性、属性值为false
const over = R.over(R.lensProp('end'),R.set(R.identity, false,_))
log('16',over({a:1,end:1}))
// 17.	pair，创建一个函数，接收一个字符串n，返回由n与n的大写字符串组成的数组
const pair = (a,b)=>R.pair(R.toUpper(a),R.toUpper(b));
log('17',pair('zdf','ee'))
// 18.	partial，创建一个函数，接收一个数字n，返回n与100中较少的那个数
const partial = R.partial((a, b) => a > b ? b : a, [100]);
log('18', partial(39))
// 19.	partialRight，创建一个函数，接收一个数字m，返回m-10的结果
const partialRight = R.partialRight((a, b) => R.subtract(a, b), [10])
log('19', partialRight(2))

//20.	partition，创建一个函数，接收一个数字数组，其中大于0的数的个数为m，不大于0的数的个数为n，返回m-n的值
const partition = R.pipe(R.partition(R.gt(_, 0)), (_) => R.subtract(R.length(R.head(_)), R.length(R.last(_))))
log('20', partition([1, 2, -3, -5, 8, -6, 6]))