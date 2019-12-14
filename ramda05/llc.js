const R = require('ramda');
const { log } = require('../util');
// Ramda库专项练习五
// 1.	innerJoin，创建一个函数，传入两个字符串数组，获取两个字符串数组中相同的字符串（可以有重复）
const func01 = R.innerJoin(R.equals);
log('01', func01(['1', '2', '3'], ['2', '3', '4']))

// 2.	insert，创建一个函数，传入一个数字数组，在第一个小于10的数字前插入数字10
const func02 = R.chain(R.insert(R.__, 10), R.findIndex(R.gt(10)));
log('02', func02([12, 9, 10, 4]));

// 3.	insertAll，创建一个函数，传入一个数字数组，在第一个大于10的数字之后插入数字1、2、3、4
const func03 = R.chain(R.insertAll(R.__, [1, 2, 3, 4]), R.pipe(R.findIndex(R.lt(10)), R.inc));
log('03', func03([8, 11, 2]));

// 4.	intersection，创建一个函数，传入两个字符串数组，获取两个数组中重复字符串的数量（不包含重复元素）
const func04 = R.pipe(R.intersection, R.length);
log('04', func04([1, 2, 3, 4], [3, 2, 5, 6]))

// 5.	intersperse，创建一个函数，接收一个数字数组，将这个数组的平均值作为分割元素插入该数组
const func05 = R.chain(R.intersperse, R.mean);
log('05', func05([1, 2, 3, 4]));

// 6.	into，创建一个函数，接收字符串数组A和数字数组B，将数组A中能转为数字（使用parseInt）的字符串转成数字并添加到数组B中
const func06 = (strs, nums) => R.into(nums, R.pipe(R.map(Number), R.filter(R.complement(isNaN))), strs);
log('06', func06(['a', '1', 'b', '2'], [0]))

// 7.	invert，创建一个函数，接收一个对象obj和一个任意类型值val，获取obj中值为val的属性的个数
const func07 = (obj, val) => R.pipe(R.invert, R.prop(val), R.length, R.ifElse(isNaN, R.always(0), R.identity))(obj);
log('07', func07({ 'a': 1, 'b': 1, 'c': 2, 'd': 1 }, 3))

// 8.	invertObj，创建一个函数，接收一个对象obj和一个任意类型值val，获取obj中值为val的一个属性名，没有则返回undefined
const func08 = (obj, val) => R.pipe(R.invertObj, R.prop(val))(obj);
log('08', func08({ a: 1, b: 2, c: 3 }, 2))

// 9.	invoker，创建一个函数，参数只有两个数组，返回这两个数组合并之后的结果（顺序不限）
const func09 = R.invoker(1, 'concat');
log('09', func09([1, 2, 3], [4, 5, 6]))

// 10.	is，创建一个函数，接收一个值，判断其是否是一个Date实例
const func10 = R.is(Date);
log('10', func10(new Date()))
log('10', func10(1))

// 11.	isEmpty，创建一个函数，接收一个数组，过滤掉其中的空值（值是否为空值用isEmpty函数）
const func11 = R.filter(R.complement(R.isEmpty));
log('11', func11([0, undefined, 2, '', '4', {}, { a: 1 }, [], [2, 3]]))

// 12.	isNil，创建一个函数，接收一个对象，删除其中所有值为null或undefined的属性
const func12 = R.forEachObjIndexed((val, key, obj) => {
    if (R.isNil(val)) {
        delete obj[key];
    }
});
log(12, func12({ a: null, b: undefined, c: 1 }))

// 13.	join，创建一个函数，接收一个字符串数组strs，将strs用分隔字符-连接成一个字符串
const func13 = R.join('-');
log(13, func13(['a', 'b', 'c']))

// 14.	juxt，创建一个函数，接收数字a,b,c,...,n（参数个数任意），获取由这些数的总和、这些数的个数与这些数的平均值三项组成的数组
const func14 = R.juxt([R.unapply(R.sum), R.unapply(R.length), R.unapply(R.mean)]);
log(14, func14(1, 2, 3, 4, 5))

// 15.	keys，创建一个函数，接收一个对象，获取此对象自身有的属性数量
const func15 = R.pipe(R.keys, R.length)
log(15, func15({ a: 1 }))

// 16.	keysIn，创建一个函数，接收一个对象，获取此对象上非自身所有属性的数量
const func16 = R.converge(R.subtract, [R.pipe(R.keys, R.length), R.pipe(R.keysIn, R.length)]);
class A {
    constructor() {
        this.name = '姓名';
        this.age = 24;
    }
    say() {
        console.log(this.name)
    }
}
class B extends A {
    constructor() {
        super();
        this.height = 10;
        this.width = 12;
    }
}
log(16, R.keysIn(new B()))

// 17.	last，创建一个函数，接收一个数字数组，判断其最后一项是否是前面所有项之和
const func17 = R.converge(R.equals, [R.last, R.pipe(R.init, R.sum)]);
log(17, func17([1, 2, 3, 4]))

// 18.	lastIndexOf、splitAt，创建一个函数，接收一个字符串数组，将这个字符串数组在最后一个值为字符串=的位置上分割为一个二维数组
const func18 = R.chain(R.splitAt, R.lastIndexOf('='));
log(18, func18(['a', '=', '3']));

// 19.	length，创建一个函数，接收一个二维数组，获取这个二维数组中所有项的个数（一维数组的项数不计入）
const func19 = R.pipe(R.map(R.length), R.sum);
log(19, func19([[2, 3], [1], [4, 5, 6]]))

// 20.	lens，创建一个数组平均值lens，该lens可以处理数字数组，读取lens时返回数组的平均值，设置lens时将数组的所有项设置为该值
const lens20 = R.lens(R.mean, (a, s) => R.map(R.always(a), s));
log(20, R.view(lens20, [1, 2, 3, 4]))
log(20, R.set(lens20, 3, [1, 2, 3, 4]))

// 好好学习 ，天天向上
