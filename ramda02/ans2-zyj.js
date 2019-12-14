// Ramda库专项练习二
const R = require('ramda');
const _ = R.__;
// 1.	call，创建一个函数 ，其接收一个多多个数字，返回这些数字的和
    // const fn1 = (...arg) => R.call(R.sum,[...arg])
    // console.log(fn1(5,6,7))
// 2.	chain，创建一个函数，其将一个字符串数组中的每一个字符串的内容都展开到一个数组中，例如将[‘好好学习’,’天天向上’]=>[‘好’,’好’,’学’,’习’,’天’,’天’,’向’,’上’]
    // const fn2 = R.chain(R.split(''));
    // console.log(fn2(['好好学习','天天向上']));
// 3.	chain，创建一个函数 ，计算x*x-2x的值 x(x-2)
    // const fn3 = R.chain(R.multiply,R.subtract(_,2));
    // console.log(fn3(5))
// 4.	clamp，创建一个函数，传入一个数字，如果该数字大于等于1且小于等于100则返回该数字；如果该数字小于1，则返回1；如果该数字大于100则返回100
    // const fn4 = R.clamp(1,100);
    // console.log(fn4(15))
// 5.	clone，创建一个函数 ，传入一个对象后，返回一个这个对象的深度复制版本，且添加属性from，属性值为传入的对象
    // const fn5 = R.assoc('from',_,R.clone);
    // console.log(fn5({name: 'supperobj'}))
// 6.	comparator，创建一个函数，传入一个数字数组，对这个数组按照绝对值大小进行排序
    // const fn6 = R.sort(R.comparator((a,b) => Math.abs(a) < Math.abs(b)));
    // console.log(fn6([2,5,42,-8]))
// 7.	complement，创建一个函数 ，用于判断一个数字不是NaN
    // const fn7 = R.complement(isNaN);
    // console.log(fn7(NaN))
// 8.	concat，创建一个函数，接收一个数组和字符串，将字符串的每个字符添加到数组中。
    // const fn8 = (a,b) => R.concat(a,R.split('',b));
    // console.log(fn8(['t','y'],'jjdj'))
// 9.	cond，创建一个函数，接收一个数字n，当n>=0.95时返回A+；当n>=0.8时返回A；当n>=0.5时返回B；当n>=0.05时返回C；其余返回D（返回字符串的方法可使用always函数创建）
    // const fn9 = R.cond([
    //     [a => a >= .95,   R.always('A+')],
    //     [a => a >= .8,   R.always('A')],
    //     [a => a >= .5,   R.always('B')],
    //     [a => a >= .05,   R.always('C')],
    //     [R.T , R.always('D')]]);
    //     console.log(fn9(.75))
// 10.	construct，创建一个函数，用于创建日期对象，日期对象的年月日固定为2018年08月 08日，只需要再传入时、分、秒即可创建一个日期对象
    // const subDate = function(time) {
    //     return new Date('2018-08-08 '+time);
    // }
    // const fn10 = R.construct(subDate);
    // console.log(fn10('15:10:10'))
// 11.	contains，创建一个函数，用于判断数组中是否有一个空对象
    // const fun11 = R.contains({});
    // console.log(fun11([{}]))
// 12.	converge，创建一个函数，传入一个数字数组，返回这组数字的平均值
    // const fn12 = R.converge(R.divide,[R.sum,R.length]);
    // console.log(fn12([5,4,3,6,7]))
// 13.	countBy，创建一个函数，接收一个中文名数组，获取每个姓氏的数量（假设数组中没有复姓名称）
    // const fn13 = R.countBy(a => a[0]);
    // console.log(fn13(['张三','李四','李大','张三丰']))
// 14.	dec，创建一个函数，可以计算一个正整数阶乘的结果
// const fn14 = R.product()
    // const fn14 = a => R.product(R.range(1,R.inc(a)));
    // console.log(fn14(4))
// 15.	defaultTo，创建一个函数func，接收一个函数A作为参数，并返回一个函数B；运行时将函数B的参数传给函数A，并计算函数A的结果，如果函数A 的结果为null、undefined或NaN则返回0，否则返回函数A的结果
    // const fn15 = funa => {
    //     return (...args) => {
    //         return R.defaultTo(0,R.apply(funa,args))
    //     }
    // }
    // console.log(fn15(a => a / 10)('lll'))
    // console.log(fn15(a => a / 10)(150))
    // console.log(fn15((...args) => R.sum(args))(150,15,16))
    // console.log(fn15((...args) => R.sum(args))(150,'hehe',16))

// 16.	descend，创建一个函数，对数组中的字符串按照其编码值降序来排列 ，比如数组[‘aa’,’ab’] => [‘ab’, ‘aa’]
    // const fn16 = R.sort(R.descend(a => a));
    // console.log(fn16(['zyj','jjj','aaa','zzz']))
// 17.	difference，创建一个函数，接收两个数组作为参数，判断第一个数组中是否有第二个数组中的值
    // const fn17 = (a,b) =>  R.difference(a,R.difference(a,b)).length > 0 ;
    // console.log(fn17([1,2,3],[4,8,6,5]))
    // console.log(fn17([1,2,3],[4,8,3,5]))
// 18.	differenceWith，创建一个函数，传入两个字符串数组，取出第一个 数组中未包含在第二个数组中的字符串（不区分大小写）
    // const fn18 = (a,b) => R.differenceWith((x,y) => x === y,a,b)[0];
    // console.log(fn18(['a','g'],['a','t','l']))
// 19.	dissoc，创建一个函数，传入一个对象，删除该对象上值不为字符串或字符串数组的属性
    
// 20.	dissocPath，创建一个函数，传入一个对象数组，其将会删除数组中最后一项的next属性