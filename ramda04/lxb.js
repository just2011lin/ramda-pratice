const R = require('Ramda');
const log = (num, messsage) => console.log(num + ': ', messsage);

// 1.  flatten，创建一个函数，接收一个字符串数组，将字符串数组中的字符串先按照&分离，再按=分离，最后再将结果用空格连接在一起，例如a=1&b=2&c=3 => a 1 b 2 c 3
const func01 = R.pipe(R.ap([R.split('&')]), R.flatten, R.ap([R.split('=')]), R.flatten);
log(01, func01(['a=1&b=2&c=3', 'd=4&e=5&f=6']));

// 2.  flip，创建divide函数的变种，使除数为第一个参数，被除数为第二个参数
const func02 = R.flip(R.divide);
log(02, func02(1, 2));

// 3.  forEach，创建一个函数，接收一个对象数组，将每个对象的list属性设置为该对象数组
const func03 = arr => R.forEach(x => x.list = R.clone(arr), arr);
log(03, func03([{ a: 1 }, { b: 2 }, { c: 3 }]));

// 4.  forEachObjIndexed，创建一个函数，接收一个对象，将对象的每个属性值都设置为key
const func04 = R.forEachObjIndexed((value, key, obj) => obj[key] = 'key');
log(04, func04({ a: 1, b: 2, c: 3 }));

// 5.  fromPairs，创建一个函数，将$k1=$v1&$k2=$v2…这种格式的字符串转为对象，如果有重复的$k则取后面的值
const func05 = R.pipe(R.split('&'), R.ap([R.split('=')]), R.fromPairs);
log(05, func05('$k1=$v1&$k2=$v2'));

// 6.  groupBy，创建一个函数，将中文姓名（不考虑复姓）字符串数组按照姓氏进行分组
const func06 = R.groupBy(R.head);
log(06, func06(['李贤波', '陆林冲', '邹永健']));

// 7.  groupWith，创建一个函数，接收一个书名字符串数组，将相邻且书名长度相同的字符串分在一起
const func07 = R.groupWith(R.eqBy(R.length));
log(07, func07(['嫌疑人X的现身', '白夜行', '红手指', '麒麟之翼']));

// 8.  gt，创建一个函数，传入一个数字数组，过滤出其中大于200的 数字
const func08 = R.filter(R.gt(R.__, 200));
log(08, func08([1, 2, 3, 200, 201, 202, 203]));

// 9.  gte，创建一个函数，传入一个数字数组，判断其中是否有一个大于等于1000的数字
const func09 = R.any(R.gte(R.__, 1000));
log(09, func09([1, 2, 3, 200, 201, 202, 203, 1000]));

// 10. has，hasIn，创建一个函数，传入一个对象obj，判断其是否有toString属性，当其是自身所有时返回2，原型链所有时返回1，没有时返回0
const func10 = R.cond([
    [R.complement(R.hasIn('toString')), R.always(0)],
    [R.both(R.complement(R.has('toString')), R.hasIn('toString')), R.always(1)],
    [R.both(R.has('toString')), R.always(2)]
])
log(10, func10({}));

// 11. hasPath，创建一个函数，传入一个数组，判断其第一项是否有属性start
const func11 = R.hasPath([0, 'start']);
log(11, func11([{ a: 1, start: 2 }, { c: 3 }]));

// 12. head，创建一个函数，传入一个姓名（不考虑复姓）字符串数组，获取其中数量最多的姓氏
const func12 = (arr) => {
    let obj = R.countBy(R.head)(arr);
    let max = R.pipe(R.values, R.apply(Math.max))(obj);
    let result = [];
    R.forEachObjIndexed((value, key) => {
        if (R.equals(value, max)) {
            result.push(key);
        }
    }, obj);
    return result;
}
log(12, func12(['李贤波', '陆林冲', '邹永健', '陆毅', '李青青']));


// 13. identical，创建一个函数，传入一个数字数组，过滤出其中非NaN的数字
const func13 = R.filter(R.complement(R.identical(NaN)));
log(13, func13([1, 2, 3, NaN]));

// 14. identity，创建一个函数，传入一个字符串数组 ，按照字符串本身的字符串值进行排序
const func14 = R.sort(R.ascend(R.identity));
log(14, func14(['b', 'a', 'c']));

// 15. ifElse，创建一个函数，接收一个数字，如果其小于0则返回0，如果其大于100则返回100
const func15 = R.ifElse(R.gt(0), R.always(0), R.ifElse(R.lt(100), R.always(100), R.identity));
log(15, func15(111));

// 16. inc，使用此函数与递归写一个 n*(n+1)*(n+2)*...(m-1)*m的函数
const func16 = (n, m) => R.gt(n, m) ? 1 : R.multiply(n, func16(R.inc(n), m));
log(16, func16(2, 5));

// 17. includes，创建一个函数，传入一个二维数组，判断数组中每一个数组都没有undefined或null
const func17A = R.pipe(R.flatten, R.both(R.complement(R.includes(undefined)), R.complement(R.includes(null))));
const func17B = R.all(R.both(R.complement(R.includes(undefined)), R.complement(R.includes(null))));
log(17, func17A([1, [2, 3], [4, 5, null]]));
log(17, func17B([1, [2, 3], [4, 5, null]]));

// 18. indexBy，创建一个函数，传入一个人员对象数组，按照人员对象的姓名(name)+生日(birthday)作为key，将数组转为对象
const func18 = R.indexBy((obj) => R.concat(R.prop('name', obj), R.prop('birthday', obj)));
log(18, func18([{ name: '李贤波', birthday: '六月初一' }, { name: '邵猪', birthday: '十二月二十八'}]));

// 19. indexOf，创建一个函数，创建一个函数，接收一个字符串数组，去除其中start字符串之前的内容
const func19 = R.chain(R.drop, R.indexOf('start'));
log(19, func19(['a', 'b', 'end', 'start']));

// 20. init，创建一个函数， 传入一个字符串数组，如果数组的最后一位为字符$，则删除该最后一项
const func20 = R.both(R.pipe(R.last, R.equals('$')), R.init);
log(20, func20(['abc', '123', '$']));