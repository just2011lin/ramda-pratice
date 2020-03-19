const R = require('ramda');
const { log } = require('../util');

// Ramda库专项练习七
// 1.	move，创建一个函数，接收一个字符串数组（并且包含end字符串），将end字符串移动到最后
const move = R.chain(R.move(R.__, -1), R.indexOf('end'));
log('01', move(['start', 'end', 'middle']));

// 2.	multiply，创建一个函数，接收一个数字n，返回n*(n+1)的结果
const multiply = R.ap(R.multiply, R.inc);
log('02', multiply(3))

// 3.	nAry，创建一个函数，接收一个数字数组，返回数组前五位的最大值，不足五位时则返回NaN
const nAry = R.apply(R.nAry(5, Math.max));
log('03', nAry([3, 4, 1, 2, 5, 6, 7, 8]))

// 4.	negate，创建一个函数，接收一个数字数组，将数组中的奇数取反
const negate = R.map(R.ifElse(R.modulo(R.__, 2), R.negate, R.identity));
log('04', negate([1, 2, 3, 5, 4]))

// 5.	none，创建一个函数，接收一个字符串数组，判断数组中是否都是可以用Number函数转成数字的字符串
const none = R.none(R.pipe(Number, R.identical(Number.NaN)));
log('05', none(['12', '3']));

// 6.	not，创建一个函数，接收一个字符串数组，判断其中有没有空字符串，返回true表示有
const not = R.pipe(R.findIndex(R.not), R.lt(-1));
log('06', not(['3', 'a', '2']))

// 7.	nth，创建一个函数，接收一个数字数组，返回其中第一项与最后一项的和
const nth = R.converge(R.add, [R.nth(0), R.nth(-1)]);
log('07', nth([1, 2, 3, 5]))

// 8.	nthArg，创建一个函数，其行为与nth函数一致
const nthArg = 
log('08', nthArg(-1, [1, 2, 3, 4, 5]))

// 9.	o，创建一个函数，接收一个数组，去除其中不能通过Number函数转为数字的字符串，然后再将所有值转为数字后求和并返回结果
// 10.	objOf，创建一个函数，接收一个数字数组，返回以数组长度为key、数组总和为value的对象
// 11.	of，创建一个函数，接收一个数字n，返回由n与n的反数-n组成的二元数组
// 12.	omit，创建一个函数，接收一个对象，删除对象中值不为字符串的属性
// 13.	once，创建一个函数，获取一个1-10的随机数，并且此后每次重复执行都会获取相同的结果
// 14.	or，创建一个函数，接收一个数字n，判断n是否满足n<0或n>100
// 15.	otherwise，创建一个函数，接收一个promise，当promise失败时在控制台打印出错误消息
// 16.	over，创建一个函数，接收一个对象n，给n设置end属性、属性值为false
// 17.	pair，创建一个函数，接收一个字符串n，返回由n与n的大写字符串组成的数组
// 18.	partial，创建一个函数，接收一个数字n，返回n与100中较少的那个数
// 19.	partialRight，创建一个函数，接收一个数字m，返回m-10的结果
// 20.	partition，创建一个函数，接收一个数字数组，其中大于0的数的个数为m，不大于0的数的个数为n，返回m-n的值
// 好好学习 ，天天向上
