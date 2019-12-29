const R = require('Ramda');
const _ = R.__;
// pratice
// 1.divide，创建一个函数，传入一个数字，获取其第一位上的数字
const position = R.pipe(R.toString, R.split('.'), R.head, R.length);
const divide = a => Math.floor(R.divide(a, Math.pow(10, position(a) - 1)));
console.log('divide', divide(0.12345));

// 2.drop，创建一个函数，传入一个字符串数组，将字符串值为start的项之前的项都删除
const findIndex = R.findIndex(R.equals('start'));
const drop = a => R.drop(findIndex(a), a);
console.log('drop', findIndex(['1', 'start']), drop(['1', 'start']));
//3.	dropLast，创建一个函数，接收一个字符串，删除字符串中$符号之后的内容
const findStringIndex = R.findIndex(R.equals('$'));
const stringIndex = R.pipe(R.split(''), findStringIndex)
const dropLast = a => R.dropLast(stringIndex(a), a);
console.log('dropLast', stringIndex('122333$3333'), dropLast('122333$3333'));

//4.dropLastWhile，创建一个函数，传入一个字符串，
//从后往前删除不是数字或字母的字符，如果有数字或字母则停止
const dropLastWhile = R.pipe(R.split(''), R.dropLastWhile(R.any(R.test(/[A-Za-z0-9]/)), _));
console.log('dropLastWhile', dropLastWhile('1张大  333'));

// 5.dropRepeats，创建一个函数，传入一个字符串，去除其中连续重复的字符（区分大小写）
const repeatStr = R.pipe(R.split(''), R.dropRepeats,R.join(''));
const dropRepeats = a=>R.replace(repeatStr(a),'',a);
console.log('dropRepeats', dropRepeats('1112345666'))

// 6.dropRepeatsWith，创建一个函数，传入一个字符串，去除其中连续重复的字符（不区分大小写）
const repeatsStr = R.pipe(R.split(''), R.dropRepeatsWith(R.eqBy(R.toLower)),R.join(''));
const dropRepeatsWith = a=>R.replace(repeatsStr(a),'',R.toLower(a));
console.log('dropRepeatsWith',dropRepeatsWith('aaA12345666'))

//7.dropWhile，创建一个函数，传入一个字符串格式的数字，去除其开头不是数字或者是0的字符
const dropWhile = R.pipe(R.split(''), R.dropWhile(R.anyPass([R.test(/[1-9]/), R.equals(0)]), _));
console.log('dropWhile', dropWhile('12w3333'));

//8.	either，创建一个函数，传入一个值，判断其类型是字符串或者字符串数组
const either = R.either(R.is(String), R.both(R.is(Array), R.all(R.is(String))));
console.log('either', either(['', '22']));

// 9.	empty，创建一个函数，传入一个对象，用empty函数初始化这个对象自身的所有属性值
const emptyValue = (value, key, target) => target[key] = R.empty(value);
const empty = R.forEachObjIndexed(emptyValue);
console.log('empty', empty({ a: { q: 2 } }))

// 10.	endsWith，创建一个函数，传入一个字符串数组，过滤出其中以end结尾的所有字符串
const endsWith = R.filter(R.endsWith('end'));
console.log('endsWith', endsWith(['1', '3end', 'wed', 'wend']));

//11.	eqBy，创建一个函数，其可以用来判断两个字符串是否在不区分大小写的情况下相同
const eqBy = R.eqBy(R.toLower);
console.log('eqBy', eqBy('a', 'Aq'));

//12.	eqProps，创建一个函数，接收两个对象，返回由两个对象自身所有的相等的属性值组成的对象
const eqProps = (a, b) => {
    let temp = {};
    for (let key in a) {
        if (a.hasOwnProperty(key) && R.eqProps(key, a, b)) {
            temp[key] = a[key];
        }
    }
    return temp;
}
console.log('eqProps', eqProps({ a: 0, c: 1 }, { a: 1, b: 1 }));

// 13.	equals，创建一个函数，传入一个对象，判断其是否是一个空对象 
const equal = R.pipe(R.keys,R.length,R.equals(0));
console.log('equal',equal({a:1}));

// 14. evolve，创建一个函数，传入一个有a和b属性的对象，返回一个也有a和b属性的对象，
//返回对象的a属性为参数a属性的大写，b属性为参数b属性的小写
const formatTarget = {
    a:R.toUpper,
    b:R.toLower,
};
const evolve = R.evolve(formatTarget);
console.log('evolve',evolve({a:'a',b:'w'}))
//15.	F，创建一个函数，接收一个数组，将数组中的所有项转为false
const mapF = R.map(R.F);
console.log('F',mapF([1,3,4]));
//16.	filter，创建一个函数，接收一个数字数组，过滤出其中大于10的数
const filter = R.filter(R.lt(10));
console.log('filter',filter([1,2,3,30,20]))
// 17.	find，创建一个函数，接收一个字符串数组，返回其中第一个有字符串皮卡丘的字符串
const find = R.find(R.includes('皮卡丘'));
console.log('find',find(['1','33','2皮卡丘','皮卡丘']));
//18.	findIndex，创建一个函数，接收一个数字数组，返回其中第一个值大于10的项的索引值
const findIndexQ = R.findIndex(R.lt(10));
console.log('findIndex',findIndexQ([12,2,2,3]))
//19.	findLast，创建一个函数，接收一个数字数组，返回其中最后一个小于10的数
const findLast = R.findLast(R.gt(10));
console.log('findLast',findLast([1,2,3,20,4,5]));
// 20.	findLastIndex，创建一个函数，接收一个字符串数组，返回其中最后一个包含有伊布的项的索引
const findLastIndex = R.findLastIndex(R.includes('伊布'));
console.log('findLastIndex',findLastIndex(['1','222','2伊布','伊布','']))
