const R = require('ramda');
const { log } = require('../util');
// Ramda库专项练习六
// 1.	lensIndex，创建一个函数，接收三个参数分别为索引i、值v和数组arr，该方法将返回一个arr数组的副本并且索引i处的值设置为v
const func01 = (i, v, arr) => R.set(R.lensIndex(i), v, arr);
log('01', func01(2, 'c', ['a', 'b', 'd']));

// 2.	lensPath，创建一个lens，可以用来读取和设置一个数组中第一项（索引为0）的first属性
const lens02 = R.lensPath(['0', 'first']);
log('02', R.set(lens02, true, [{}, {}, {}]))

// 3.	lensProp，创建一个lens，可以用来读取和设置对象的name属性
const lens03 = R.lensProp('name');
log('03', R.set(lens03, '陆林冲', {}));

// 4.	lt，创建一个函数，接收一个数字数组nums，将nums中小于0的数转为0
const func04 = R.map(R.ifElse(R.lt(R.__, 0), R.always(0), R.identity));
log('04', func04([-1, 1, -2, 2]))

// 5.	lte，创建一个函数，接收一个数字n，判断n是否为非负数
const func05 = R.lte(0);
log('05', func05(1))

// 6.	mapAccum，创建一个函数，接收一个数字数组nums，对nums进行累加操作，返回此nums所有数字和与每次叠加结果组成的数组
const func06 = R.mapAccum((acc, n) => [R.add(acc, n), R.add(acc, n)], 0);
log('06', func06([1, 2, 3, 4]));

// 7.	mapObjIndexed、toString，创建一个函数，接收一个对象，将对象中的非字符串值转为字符串
const func07 = R.mapObjIndexed(R.toString);
log('07', func07({ a: 1, b: 2, c: false, d: undefined }));

// 8.	match，创建一个函数，接收一个价格字符串，比如10元一斤，获取其中的数字
const func08 = R.pipe(R.match(/[1-9]\d*\.?\d/g), R.head);
log('08', func08('2.33元一斤'));

// 9.	max，创建一个函数，接收一个数字n，如果n大于10则返回n，否则返回10
const func09 = R.max(10);
log('09', func09(9))

// 10.	maxBy，创建一个函数，接收两个数字，获取其中绝对值较大的值
const func10 = R.maxBy(Math.abs);
log('10', func10(-2, 1))

// 11.	mean，创建一个函数，接收一个二维数字数组，获取每个内部数组的平均值的平均值
const func11 = R.pipe(R.map(R.mean), R.mean);
log('11', func11([[1, 3], [2, 2], [4, 0]]))

// 12.	median，创建一个函数，接收一个数字数组，过滤出其中大于中位数的数字
const func12 = R.chain(R.filter, R.pipe(R.median, R.lt));
log('12', func12([7, 2, 10, 9]));

// 13.	memoizeWith，创建一个函数，接收一段字符串后，返回一个1-1000的随机数，并在之后输入相同的字符串时输出相同的结果
const func13 = R.memoizeWith(R.identity, () => Math.floor(Math.random() * 1000));
log('13', func13('30'));
log('13', func13('30'));
log('13', func13('30'));
log('13', func13('31'));

// 14.	merge、invertObj，创建一个函数，接收一个对象m，将对象m的属性和值互换后与m合并，并返回合并后的结果
const func14 = R.chain(R.merge, R.invertObj);
log('14', func14({ a: 'b' }))

// 15.	mergeAll、unapply，创建一个函数，接收对象a,b,c,…n为参数，返回这些对象合并后的结果
const func15 = R.unapply(R.mergeAll);
log('15', func15({ a: '1' }, { b: '2' }))

// 16.	mergeDeepRight，创建一个函数，其效果与mergeDeepLeft一致
const func16 = R.flip(R.mergeDeepRight);
log('16', func16({ a: '1' }, { a: '2' }))

// 17.	mergeWithKey，创建一个函数，用于合并两个对象，在合并相同属性的时候，若左边值布尔运算后为true则选择左边，否则选择右边
const func17 = R.mergeWithKey((k, l, r) => l && r);

// 18.	min，创建一个函数，接收一个数字数组，获取其中最小值（不使用Math.min函数），若数字数组中值均大于0，则返回结果为0
const func18 = R.reduce(R.min, 0);
log('18', func18([1, -2, 3]))

// 19.	minBy，创建一个函数，接收两个字符串，返回其中长度小的那个
const func19 = R.minBy(R.length);
log('19', func19('123', '12'))

// 20.	module，创建一个函数，接收一个数字数组，返回数组总和与长度的求模结果
const func20 = R.converge(R.modulo, [R.sum, R.length]);
log('20', func20([1, 2, 3, 4, 5, 6]))

// 好好学习 ，天天向上