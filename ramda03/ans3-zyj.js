// Ramda库专项练习三
const R = require('ramda');
const _ = R.__;
// 1.	divide，创建一个函数，传入一个数字，获取其第一位上的数字
    // const fn1 = a => parseInt(R.until(x => x < 10,R.divide(_,10),_)(a));
    // console.log(fn1(0.58))
    // console.log(fn1(58))
    // console.log(fn1(730))
// 2.	drop，创建一个函数，传入一个字符串数组，将字符串值为start的项之前的项都删除
    // const fun2 = a => R.drop(R.findIndex(x => x === 'start',a),a);
    // console.log(fun2(['e','g','d','start','end']))
// 3.	dropLast，创建一个函数，接收一个字符串，删除字符串中$符号之后的内容
    // const fn3 = a => R.join('',R.dropLast(R.indexOf('$',a),R.split('',a)))
    // console.log(fn3('ddd$pp'))
// 4.	dropLastWhie，创建一个函数，传入一个字符串，从后往前删除不是数字或字母的字符，如果有数字或字母则停止
    // const fn4 = a => R.join('',R.dropLastWhile(R.test(/[^a-zA-Z0-9]/),R.split('',a)))
    // console.log(fn4('ffdsf_*&^'))
// 5.	dropRepeats，创建一个函数，传入一个字符串，去除其中连续重复的字符（区分大小写）
    // const fn5 = a => R.join('',R.dropRepeats(R.split('',a)));
    // console.log(fn5('12322llkkJjiifjdk98'))
// 6.	dropRepeatsWith，创建一个函数，传入一个字符串，去除其中连续重复的字符（不区分大小写）
    // const fn6 = a => R.join('',R.dropRepeatsWith(R.eqBy(R.toLower),R.split('',a)));
    // console.log(fn6('12322llkkjJIifjdk98'))
// 7.	dropWhie，创建一个函数，传入一个字符串格式的数字，去除其开头不是数字或者是0的字符
    // const fn7 = a => R.join('',R.dropWhile(R.test(/\D|0/),R.split('',a)));
    // console.log(fn7('fkdjf0555'))
// 8.	either，创建一个函数，传入一个值，判断其类型是字符串或者字符串数组
    // const isString = R.is(String)
    // const isArray = R.is(Array)
    // const fn8 = R.either(isString,R.both(isArray,R.all(isString)));
    // console.log(fn8(3))
    // console.log(fn8([3]))
    // console.log(fn8('f'))
    // console.log(fn8(['f']))
// 9.	empty，创建一个函数，传入一个对象，用empty函数初始化这个对象自身的所有属性值
    // const fn9 = R.mapObjIndexed(R.empty);
    // console.log(fn9({value:1,arr: [1,2,3],obj: {prop: 'prop'}}))
// 10.	endsWith，创建一个函数，传入一个字符串数组，过滤出其中以end结尾的所有字符串
    // const fn10 = R.filter(R.endsWith('end'));
    // console.log(fn10(['heend','jjd','iend']))
// 11.	eqBy，创建一个函数，其可以用来判断两个字符串是否在不区分大小写的情况下相同
    // const fn11 = R.eqBy(R.toLower)
    // console.log(fn11('rrrr','fd'))
    // console.log(fn11('rrrr','RRRR'))
// 12.	eqProps，创建一个函数，接收两个对象，返回由两个对象自身所有的相等的属性值组成的对象
    // const fn12 = (x,y) => {
    //     const a = {};
    //     R.forEachObjIndexed((value,key) => {
    //         const isEq = R.eqProps(key,x,y);
    //         if(isEq) {
    //             a[key] = value;
    //         }
    //     },x)
    //     return a;
    // }
    // console.log(fn12({x:'x2',y:'y2',z: 'z'},{x:'x1',y:'y1',z: 'z'}))
// 13.	equals，创建一个函数，传入一个对象，判断其是否是一个空对象 
    // const fn13 = R.equals({});
    // console.log(fn13({r:'f'}))
// 14.	evolve，创建一个函数，传入一个有a和b属性的对象，返回一个也有a和b属性的对象，返回对象的a属性为参数a属性的大写，b属性为参数b属性的小写
    // const fn14 = R.evolve({a: R.toUpper,b: R.toLower});
    // console.info(fn14({a: 'uiiOO',b:'bgjGh'}))
// 15.	F，创建一个函数，接收一个数组，将数组中的所有项转为false
    // const fn15 = R.map(R.F);
    // console.info(fn15([1,2,5,6]))
// 16.	filter，创建一个函数，接收一个数字数组，过滤出其中大于10的数
    // const fn16 = R.filter(x => x > 10)
    // console.log(fn16([11,2,5,77]))
// 17.	find，创建一个函数，接收一个字符串数组，返回其中第一个有字符串皮卡丘的字符串
    // const fn17 = R.find(R.test(/皮卡丘/));
    // console.log(fn17(['fdfd','皮卡丘111']))
// 18.	findIndex，创建一个函数，接收一个数字数组，返回其中第一个值大于10的项的索引值
    // const fn18 = R.findIndex(x => x > 10);
    // console.log(fn18([8, 9, 12]))
// 19.	findLast，创建一个函数，接收一个数字数组，返回其中最后一个小于10的数
    // const fn19 = R.findLast(x => x < 10);
    // console.log(fn19([8, 9, 12]))
// 20.	findLastIndex，创建一个函数，接收一个字符串数组，返回其中最后一个包含有伊布的项的索引
    // const fn20 = R.findLastIndex(x => x < 10);
    // console.log(fn20([8, 9, 12]))
// 好好学习 ，天天向上