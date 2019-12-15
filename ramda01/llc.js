const R = require('ramda');
const { log } = require('../util')
// Ramda库专项练习一
// 1.	add，使用该函数创建一个n+10的 函数
const func01 = R.add(10);

// 2.	addIndex、map，创建一个函数，该函数可以将数字数组[a]中的每一项乘以索引值
const func02 = R.addIndex(R.map)(R.multiply);
console.log('02: ', func02([1, 2, 3]))

// 3.	adjust，创建一个函数 ，将数组中的最后一项值修改为字符串end
const func03 = R.adjust(-1, R.always('end'));
console.log('03: ', func03([1, 2, 3]))

// 4.	all，创建一个函数，用于判断数组中的所有值是否都是数字
const func04 = R.all(R.is(Number));
console.log('04: ', func04(['0', 1]))
console.log('04: ', func04([1, 2]))

// 5.	allPass，创建一个函数，可以用来判断一个值：是数组、数组中有值和值都为字符串
// 0<n，n>0
const func05 = R.allPass([R.is(Array), R.complement(R.isEmpty), R.all(R.is(String))]);
console.log('05: ', func05([]));
console.log('05: ', func05(['23', 132]));
console.log('05: ', func05(1));
console.log('05: ', func05(['23', '234']));

// 6.	always，创建一个函数，这个函数永远返回字符串我爱你
const func06 = R.always('我爱你'); // '我爱你'

// 7.	and，创建一个函数，当传入一个转为布尔值为false的值时返回这个值，否则返回一个字符串pass
const func07 = R.and(R.__, 'pass');
log('07', func07(2))

// 8.	any，创建一个函数，用于判断数组[a]中是否有一个值的类型为数字
const func08 = R.any(R.is(Number));

// 9.	anyPass，创建一个函数，用于判断一个值是数字或者是可以转为数字的字符串
const func09 = R.anyPass([R.is(Number), R.both(R.is(String), R.complement(isNaN))])
log('09', func09('1'))
log('09', func09(1))
log('09', func09('a'))
log('09', func09(false))

// 10.	ap，创建一个函数，传入一个数字数组，获取一个新的数组，新数组的内容分别为原数组内容、原数组每项+1和原数组每项-1；
const func10 = R.ap([R.identity, R.inc, R.dec]);
const func10B = R.ap([R.identity, R.add(1), R.add(-1)]);
log('10', func10([1, 2, 3]));

// 11.	ap，创建一个函数，传入一个数字a，获取a是否大于等于a*a的值（题目修改：将原来的a是否大于等于a*a+1做一定修改）
const func11 = R.ap(R.gte, R.curry(Math.pow)(R.__, 2));
const func11B = R.ap(R.gte, R.ap(R.multiply, R.identity));
log('11', func11B(2))
log('11', func11B(0.5))

// 12.	aperture，创建一个函数，传入数组，判断该数组中是否有相邻元素相等
const func12 = R.pipe(R.aperture(2), R.any(R.apply(R.equals)));
log('12', func12([1, 1, 2, 3, 4]))

// 13.	append，创建一个函数，传入数组，将在这个数组的末尾添加一个字符串end
const func13 = R.append('end');

// 14.	apply，创建一个函数，用于获取数字数组中的最小值
const func14 = R.apply(Math.min);
log('14', func14([2, 1, 3]));

// 15.	applySpec，创建一个函数，接收两个数字x和y，并返回一个由a、b、c三个属性组成的对象，其中a为x+y，b为x-y，c为x*y
const func15 = R.applySpec({
    a: R.add,
    b: R.subtract,
    c: R.multiply,
})
log('15', func15(3, 2));

// 16.	applyTo，创建一个函数，其接收一个数字，并返回此数字的平方值
const func16 = R.applyTo(R.__, R.ap(R.multiply, R.identity));
log('16', func16(4))

// 17.	ascend、sort，创建一个函数，传入一个数字数组，使其按照数字的绝对值进行从小到大排序
const func17 = R.sort(R.ascend(Math.abs));
log('17', func17([2, -1, -4, 3]))

// 18.	assoc，创建一个函数，传入一个对象，其会将这个对象的from属性设置为值字符串Earth
const func18 = R.assoc('from', 'Earth');

// 19.	assocPath，创建一个函数，传入一个对象，其会给这个对象的from属性设置为字符串Earth
const func19 = R.assoc(['from'], 'Earth');

// 20.	binary，创建一个Math.max函数的两个参数的版本
const func20 = R.binary(Math.max);
log('20', func20(2, 1, 3, 4));

// 21.	bind，创建一个函数，接收两个参数，一个是对象obj，另一个是字符串key，返回obj是否有这个key属性。注：使用Object.prototype.hasOwnProperty方法
const func21 = (obj, key) => R.bind(Object.prototype.hasOwnProperty, obj)(key);
log('21', func21({ name: 'llc' }, '424'))

// 22.	both，创建一个函数，用于判断数组中的值均为数字且数字都是>=0且<=100
const func22 = R.all(R.allPass([R.is(Number), R.gte(R.__, 0), R.lte(R.__, 100)]));
const func22B = R.both(R.all(R.is(Number)), R.all(R.both(R.lte(0), R.gte(100))));
log('22', func22([22, 33, 0, 55]))

// 好好学习 ，天天向上
