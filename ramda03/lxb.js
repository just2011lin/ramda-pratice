const R = require('Ramda');
const log = (num, messsage) => console.log(num + ': ', messsage);
// 1.  divide，创建一个函数，传入一个数字，获取其第一位上的数字
const func01 = num => Math.floor(R.divide(num, Math.pow(10, R.dec(R.compose(R.length, R.toString)(num)))))
log(01, func01(9875421));

// 2.  drop，创建一个函数，传入一个字符串数组，将字符串值为start的项之前的项都删除
const func02 = R.chain(R.drop, R.findIndex(R.equals('start')));
log(02, func02(['1', '2', 'start', 'end']));

// 3.  dropLast，创建一个函数，接收一个字符串，删除字符串中$符号之后的内容
const func03 = R.chain(R.dropLast, R.compose(R.inc, R.findIndex(R.equals('$'))));
log(03, func03('12$end'));

// 4.  dropLastWhile，创建一个函数，传入一个字符串，从后往前删除不是数字或字母的字符，如果有数字或字母则停止
const func04 = R.dropLastWhile(R.complement(R.either(R.test(/[a-zA-Z]/), R.test(/[0-9]/))));
log(04, func04('!@#$%abc1^&*('));

// 5.  dropRepeats，创建一个函数，传入一个字符串，去除其中连续重复的字符（区分大小写）
const func05 = R.pipe(R.dropRepeats, R.join(''));
log(05, func05('aaaAbbb'));

// 6.  dropRepeatsWith，创建一个函数，传入一个字符串，去除其中连续重复的字符（不区分大小写）
const func06 = R.pipe(R.dropRepeatsWith(R.eqBy(R.toLower)), R.join(''));
log(06, func06('aaaAbbb'));

// 7.  dropWhile，创建一个函数，传入一个字符串格式的数字，去除其开头不是数字或者是0的字符
const func07 = R.dropWhile(R.either(R.pipe(Number, isNaN), R.equals('0')));
log(07, func07('abcd001'))


// 8.  either，创建一个函数，传入一个值，判断其类型是字符串或者字符串数组
const func08 = R.either(R.is(String), R.both(R.is(Array), R.all(R.is(String))));
log(08, func08(['1', '2']));

// 9.  empty，创建一个函数，传入一个对象，用empty函数初始化这个对象自身的所有属性值
const func09 = obj => {
    let res = R.clone(obj);
    R.forEachObjIndexed((value, key) => {
        res[key] = R.empty(value)
    }, res);
    return res;
}
log(09, func09({ x: [1, 2, 3], y: 'abc', z: { a: 1, b: 2, c: 3 } }));

// 10. endsWith，创建一个函数，传入一个字符串数组，过滤出其中以end结尾的所有字符串
const func10 = R.filter(R.endsWith('end'));
log(10, func10(['firstend', 'secondend', 'endinfirst']));

// 11. eqBy，创建一个函数，其可以用来判断两个字符串是否在不区分大小写的情况下相同
const func11 = R.eqBy(R.toLower, R.__, R.__);
log(11, func11('abc', 'ABC'));

// 12. eqProps，创建一个函数，接收两个对象，返回由两个对象自身所有的相等的属性值组成的对象
const func12 = (obj1, obj2) => {
    let res = {};
    R.forEachObjIndexed((value, key) => {
        if (R.eqProps(key, obj1, obj2)) {
            res[key] = value;
        }
    }, obj1);
    return res;
};
log(12, func12({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 4 }));

// 13. equals，创建一个函数，传入一个对象，判断其是否是一个空对象
const func13 = R.equals({});
log(13, func13({}));

// 14. evolve，创建一个函数，传入一个有a和b属性的对象，返回一个也有a和b属性的对象，返回对象的a属性为参数a属性的大写，b属性为参数b属性的小写
const func14 = R.evolve({ a: R.toUpper, b: R.toLower });
log(14, func14({ a: 'abc', b: 'ABC' }));

// 15. F，创建一个函数，接收一个数组，将数组中的所有项转为false
const func15 = R.ap([R.F]);
log(15, func15([1, 2, 3]));

// 16. filter，创建一个函数，接收一个数字数组，过滤出其中大于10的数
const func16 = R.filter(R.lt(10));
log(16, func16([1, 2, 3, 10, 11, 12]));

// 17. find，创建一个函数，接收一个字符串数组，返回其中第一个有字符串皮卡丘的字符串
const func17 = R.find(R.contains('皮卡丘'));
log(17, func17(['杰尼龟', '妙蛙花', '皮卡丘皮卡皮卡']));

// 18. findIndex，创建一个函数，接收一个数字数组，返回其中第一个值大于10的项的索引值
const func18 = R.findIndex(R.lt(10));
log(18, func18([1, 2, 3, 10, 11, 12]));

// 19. findLast，创建一个函数，接收一个数字数组，返回其中最后一个小于10的数
const func19 = R.findLast(R.gt(10));
log(19, func19([1, 2, 3, 10, 11, 12]));

// 20. findLastIndex，创建一个函数，接收一个字符串数组，返回其中最后一个包含有伊布的项的索引
const func20 = R.findLastIndex(R.contains('伊布'));
log(20, func20(['杰尼龟', '妙蛙花', '伊布1', '皮卡丘皮卡皮卡', '伊布2']));
