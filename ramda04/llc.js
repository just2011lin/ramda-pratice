// Ramda库专项练习四
const R = require('ramda')
const { log } = require('../util');
// 1.	flatten，创建一个函数，接收一个字符串数组，将字符串数组中的字符串先按照&分离，再按=分离，最近再将结果用空格连接在一起，例如a=1&b=2&c=3 => a 1 b 2 c 3
const func01 = R.pipe(R.split('&'), R.map(R.split('=')), R.flatten, R.join(' '));
log('01', func01('a=1&b=2&c=3'))

// 2.	flip，创建divide函数的变种，使除数为第一个参数，被除数为第二个 参数
const func02 = R.flip(R.divide);
log('02', func02(2, 4))

// 3.	forEach，创建一个函数，接收一个对象数组，将每个对象的list属性设置为该对象数组
const func03 = arr => R.forEach((value) => value.list = arr)(arr);
log('03', func03([{}, { a: 1 }]))

// 4.	forEachObjIndexed，创建一个函数，接收一个对象，将对象的每个属性值都设置为key
const func04 = obj => R.forEachObjIndexed((value, key) => obj[key] = key, obj);
log('04', func04({ a: 3, b: 4 }))

// 5.	fromPairs，创建一个函数，将$k1=$v1&$k2=$v2…这种格式的字符串转为对象，如果有重复的$k则取后面的值
const func05 = R.pipe(R.split('&'), R.map(R.split('=')), R.fromPairs);
log('05', func05('a=1&b=2&c=3'))

// 6.	groupBy，创建一个函数，将中文姓名（不考虑复姓）字符串数组按照姓氏进行分组
const func06 = R.groupBy(R.head);
log('06', func06(['陆林冲', '陆俊杰', '陆逊', '朱凯峰', '朱文', '朱元璋']))

// 7.	groupWith，创建一个函数，接收一个书名字符串数组，将相邻且书名长度相同的字符串分在一起
const func07 = R.groupWith(R.pipe(R.eqBy(R.length)))
log('07', func07(['123', '12', '12', '1234', '1234', '12']))

// 8.	gt，创建一个函数，传入一个数字数组，过滤出其中大于200的 数字
const func08 = R.filter(R.gt(R.__, 200));
log('08', func08([300, 201, 100, 150, 400]))

// 9.	gte，创建一个函数，传入一个数字数组，判断其中是否有一个大于等于1000的数字
const func09 = R.any(R.gte(R.__, 1000))
log('09', func09([100, 1, 2]))

// 10.	has，hasIn，创建一个函数，传入一个对象obj，判断其是否有every属性，当其是自身所有时返回2，原型链所有时返回1，没有时返回0
const func10 = R.cond([
    [R.has('every'), R.always('2')],
    [R.hasIn('every'), R.always('1')],
    [R.T, R.always('0')]
])
log('10', func10({ every: '123' }))
log('10', func10([]))
log('10', func10({}))

// 11.	hasPath，创建一个函数，传入一个数组，判断其第一项是否有属性start
const func11 = R.hasPath(['0', 'start']);
log('11', func11([{ start2: 1 }]))

// 12.	head，创建一个函数，传入一个姓名（不考虑复姓）字符串数组，获取其中数量最多的姓氏
const func12 = R.pipe(R.groupBy(R.head), R.mapObjIndexed(R.length), Object.entries, R.reduce(R.maxBy(R.last), ['*', 0]), R.head);
log('12', func12(['陆林冲', '陆逊', '陆游', '陆抗', '朱元璋', '曹操', '孙权', '刘备']))

// 13.	identical，创建一个函数，传入一个字符串数组，过滤出其中非NaN的字符串
const func13 = R.filter(R.complement(R.pipe(Number, R.identical(NaN))))
log('13', func13(['02', 'xx', '13', 'bb']))

// 14.	identity，创建一个函数，传入一个字符串数组 ，按照字符串本身的字符串值进行排序
const func14 = R.sortBy(R.identity)
log('14', func14(['a', 'B', 'A']))

// 15.	ifElse，创建一个函数，接收一个数字，如果其小于0则返回0，如果其大于100则返回100
const func15 = R.ifElse(R.both(R.lte(0), R.gte(100)), R.identity, R.ifElse(R.gt(0), R.always(0), R.always(100)))
log('15', func15(102))

// 16.	inc，使用此函数与递归写一个 n*(n+1)*(n+2)*...(m-1)*m的函数
const func16 = (n, m) => R.ifElse(
    R.lt(n),
    m => n * func16(R.inc(n), m),
    R.identity
)(m)
log('16', func16(1, 5));

// 17.	includes，创建一个函数，传入一个二维数组，判断数组中每一个数组都没有undefined或null
const func17 = R.all(R.complement(R.anyPass([R.includes(undefined), R.includes(null)])));
log('17', func17([[1, 2, null], [2], [3], [4]]))

// 18.	indexBy，创建一个函数，传入一个人员对象数组，按照人员对象的姓名(name)+编号(id)作为key，将数组转为对象
const func18 = R.indexBy(R.converge((strA, strB) => strA + strB, [R.prop('name'), R.prop('id')]))
log('18', func18([{ name: 'llc', id: '01' }, { name: 'zdf', id: '02' }]))

// 19.	indexOf，创建一个函数，接收一个字符串数组，去除其中start字符串之前的内容
const func19 = R.chain(R.drop, R.pipe(R.indexOf('start'), R.ifElse(R.gt(0), R.always(0), R.identity)));
log('19', func19(['1', 'start', '2', '3']))

// 20.	init，创建一个函数， 传入一个字符串数组，如果数组的最后一位为字符$，则删除该最后一项
const func20 = R.ifElse(R.endsWith(['$']), R.init, R.identity)
log('20', func20([1, 2, 3, '$']))

// 好好学习 ，天天向上


