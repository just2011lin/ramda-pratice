const R = require('Ramda');
const log = (num, messsage) => console.log(num + ': ', messsage);
// 1. call， 创建一个函数， 其接收一个或多个数字， 返回这些数字的和
const func01 = R.call(R.unapply, R.sum);
log(01, func01(1, 2, 3));

// 2. chain， 创建一个函数， 其将一个字符串数组中的每一个字符串的内容都展开到一个数组中， 例如将['好好学习', '天天向上'] => ['好', '好', '学', '习', '天', '天', '向', '上']
const func02 = R.chain(R.splitEvery(1));
log(02, func02(['好好学习', '天天向上']));

// 3. chain， 创建一个函数， 计算x * x - 2 x的值
const func03 = x => R.chain(R.subtract, R.compose(R.divide(R.__, 4), R.curry(Math.pow)(R.__, 2)))(R.multiply(x, 2));
log(03, func03(4))

// 4. clamp， 创建一个函数， 传入一个数字， 如果该数字大于等于1且小于等于100则返回该数字； 如果该数字小于1， 则返回1； 如果该数字大于100则返回100
const func04 = R.clamp(1, 100);
log(04, func04(50));
log(04, func04(-50));
log(04, func04(150));

// 5. clone， 创建一个函数， 传入一个对象后， 返回一个这个对象的深度复制版本， 且添加属性from， 属性值为传入的对象
const func05 = R.chain(R.assoc('from'), R.clone);
log(05, func05({ a: 1, b: 2 }));

// 6. comparator， 创建一个函数， 传入一个数字数组， 对这个数组按照绝对值大小进行排序
const func06 = R.sort(R.comparator((a, b) => Math.abs(a) < Math.abs(b)));
log(06, func06([2, 4, 1, 3]));

// 7. complement， 创建一个函数， 用于判断一个数字不是NaN
// 这道题很奇怪，如果要判断不是NaN其实只需要R.is(Number)即可
const func07 = R.complement(R.complement(R.is(Number)));
log(07, func07(NaN))

// 8. concat， 创建一个函数， 接收一个数组和字符串， 将字符串的每个字符添加到数组中。
const func08 = (arr, string) => R.concat(arr, R.splitEvery(1, string));
log(08, func08([1, 2, 3], '456'))

// 9. cond， 创建一个函数， 接收一个数字n， 当n >= 0.95 时返回A + ；当n >= 0.8 时返回A； 当n >= 0.5 时返回B； 当n >= 0.05 时返回C； 其余返回D（ 返回字符串的方法可使用always函数创建）
const func09 = R.cond([
    [R.lte(0.95), R.always('A+')],
    [R.lte(0.8), R.always('A')],
    [R.lte(0.5), R.always('B')],
    [R.lte(0.05), R.always('C')],
    [R.T, R.always('D')]
]);
log(09, func09(1));
log(09, func09(0.9));
log(09, func09(0.7));
log(09, func09(0.1));
log(09, func09(0));


// 10. construct， 创建一个函数， 用于创建日期对象， 日期对象的年月日固定为2018年08月 08 日， 只需要再传入时、 分、 秒即可创建一个日期对象
// const func10 =

// 11. contains， 创建一个函数， 用于判断数组中是否有一个空对象
const func11 = R.contains({});
log(11, func11([1, { a: 2 }, [3], {}]));

// 12. converge， 创建一个函数， 传入一个数字数组， 返回这组数字的平均值
const func12 = R.converge(R.divide, [R.sum, R.length]);
log(12, func12([2, 3, 4]));

// 13. countBy， 创建一个函数， 接收一个中文名数组， 获取每个姓氏的数量（ 假设数组中没有复姓名称）
const func13 = R.countBy(R.identity);
log(13, func13(['李', '林']));

// 14. dec， 创建一个函数， 可以计算一个正整数阶乘的结果
// const

// 15. defaultTo， 创建一个函数func， 接收一个函数A作为参数， 并返回一个函数B； 运行时将函数B的参数传给函数A， 并计算函数A的结果， 如果函数A 的结果为null、 undefined或NaN则返回0， 否则返回函数A的结果
// const func15 =

// 16. descend， 创建一个函数， 对数组中的字符串按照其编码值降序来排列， 比如数组['aa', 'ab'] => ['ab', 'aa']
// const func16 =

// 17. difference， 创建一个函数， 接收两个数组作为参数， 判断第一个数组中是否有第二个数组中的值
const func17 = (a, b) => { return !R.equals(R.length(a), R.length(R.difference(a, b))); }
log(17, func17([1, 2, 3], [3, 4, 5]));

// 18. differenceWith， 创建一个函数， 传入两个字符串数组， 取出第一个 数组中未包含在第二个数组中的字符串（ 不区分大小写）
const func18 = R.differenceWith((x, y) => R.equals(R.toLower(x), R.toLower(y)));
log(18, func18(['a', 'b', 'c'], ['A', 'c', 'e']));

// 19. dissoc， 创建一个函数， 传入一个对象， 删除该对象上值不为字符串或字符串数组的属性
// 第一步：传入一个对象，返回对象中所有值不为字符串或字符串数组的属性

// const func19 =


// 20. dissocPath， 创建一个函数， 传入一个对象数组， 其将会删除数组中最后一项的next属性
// 第一步：取出数组最后一项；
// 第二步：删除数组最后一项的next属性；
// 第三步：删除数组最后一项；
// 第四步：将删除next属性后的对象拼接到数组上。
const func20 = (arr) => R.append(R.dissocPath(['next'], R.last(arr)), R.init(arr));
const func20B = (arr) => R.dissocPath([R.dec(R.length(arr)), 'next'], arr);
log(20, func20([{ a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4, next: 5 }]));
log(20, func20B([{ a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4, next: 5 }]));