// 1.lensIndex，创建一个函数，接收三个参数分别为索引i、值v和数组arr，
// 该方法将返回一个arr数组的浅复制副本并且索引i处的值设置为v
const lensIndex = (i, v, arr) => R.set(R.lensIndex(i), v, arr)
log('lensIndex', lensIndex(1, 'zdf', [1, 2, 'z']))
// 2.lensPath，创建一个lens，可以用来读取和设置一个数组中第一项（索引为0）的first属性
const xHeadYLens = R.lensPath([0, 'first'])
R.view(xHeadYLens, [{first: 4, z: 3}, {y: 4, z: 5}])
R.set(xHeadYLens, 1, [{first: 2, z: 3}, {y: 4, z: 5}])
log(R.view(xHeadYLens, [{first: 4, z: 3}, {y: 4, z: 5}]), R.set(xHeadYLens, 1, [{first: 2, z: 3}, {y: 4, z: 5}]))
// 3.lensProp，创建一个lens，可以用来读取和设置对象的name属性
const xLens = R.lensProp('name')
R.view(xLens, {name: 1, y: 2})
R.set(xLens, 4, {x: 1, y: 2})
console.log(R.view(xLens, {name: 1, y: 2}), R.set(xLens, 4, {name: 1, y: 2}))
// 4.lt，创建一个函数，接收一个数字数组nums，将nums中小于0的数转为0
const lt = R.map(R.ifElse(
  R.lt(_, 0),
  R.always(0),
  R.identity
))
log(lt([1, -1, 3, 0]))
// 5.lte，创建一个函数，接收一个数字n，判断n是否为非负数
const lte = R.complement(R.ifElse(
  R.equals(0, _),
  R.always(false),
  R.lte(_, 0)))
log(lte(-1))
// 6.mapAccum，创建一个函数，接收一个数字数组nums，对nums进行累加操作，返回此nums所有数字和与每次叠加结果组成的数组
const mapAccum = R.mapAccum((a, b) => [a + b, a + b],0);
log(mapAccum([1,2,3]));
//7.mapObjIndexed、toString，创建一个函数，接收一个对象，将对象中的非字符串值转为字符串
const mapObjIndexed = R.mapObjIndexed(R.ifElse(
    R.is(String,_),
    R.identity,
    R.toString(_),
  ));
log(mapObjIndexed({x:'1',y:null}));
// 8.match，创建一个函数，接收一个价格字符串，比如10元一斤，获取其中的数字
const match = R.match(/(^[0-9]*)/g);
log(match('10元一斤'))
// 9.max，创建一个函数，接收一个数字n，如果n大于10则返回n，否则返回10
const max = R.max(10);
log(max(20),max(3))
// 10.maxBy，创建一个函数，接收两个数字，获取其中绝对值较大的值
const maxBy = R.maxBy(curry(Math.abs));
log(maxBy(1,-3));
// 11.mean，创建一个函数，接收一个二维数字数组，获取每个内部数组的平均值的平均值
const mean = R.map(R.mean);
log(mean([[1,2],[2,4],[3]]));
// 12.median，创建一个函数，接收一个数字数组，过滤出其中大于中位数的数字
const median  = a=>R.filter(R.gt(_,R.median(a)),a)
log(median([1,2,3,4]))
// 13.memoizeWith，创建一个函数，接收一段字符串后，返回一个1-1000的随机数，并在之后输入相同的字符串时输出相同的结果
const memoizeWith = R.memoizeWith(R.identity, n => {
  return R.inc(Math.random()*999);
});
log(memoizeWith('zdf'),memoizeWith('zdf'));
// 14.merge、invertObj，创建一个函数，接收一个对象m，将对象m的属性和值互换后与m合并，并返回合并后的结果
const invertObj = a=>R.merge(R.invertObj(a),a);
log(invertObj({ 'name': 'fred', 'age': '10' }))
// 15.mergeAll、unapply，创建一个函数，接收对象a,b,c,…n为参数，返回这些对象合并后的结果
const mergerAll = R.pipe(R.unapply(JSON.stringify),JSON.parse,R.mergeAll);
log(mergerAll({a:1,b:2,c:3}));
// 16.mergeDeepRight，创建一个函数，其效果与mergeDeepLeft一致
const mergeDeepRight = R.mergeDeepRight;
log(mergeDeepRight({ name: 'fred', age: 10},
{ age: 40, contact: { email: 'baa@example.com' }}))
// 17.mergeWithKey，创建一个函数，用于合并两个对象，在合并相同属性的时候，若左边值布尔运算后为true则选择左边，否则选择右边
let concatValues = (k, l, r) => Boolean(l)?l:r;
const mergeWithKey = R.mergeWithKey(concatValues);
log(mergeWithKey({ a: true, thing: 'foo', values: [10, 20] },
{ b: true, thing: 'bar', values: [15, 35] }));
// 18.min，创建一个函数，接收一个数字数组，获取其中最小值（不使用Math.min函数），若数字数组中值均大于0，则返回结果为0
const min  =a=>R.reduce(R.min(_), Infinity,a);
const minResult =R.ifElse(
    R.gt(_,0),
    R.always(0),
    R.identity
)
log(minResult(min([5,2,6])))

// 19.minBy，创建一个函数，接收两个字符串，返回其中长度小的那个
const minBy = R.minBy(R.length);
log(minBy('ZDF','ZZZZ'));
// 20.module，创建一个函数，接收一个数字数组，返回数组总和与长度的求模结果
const appender = (a, b) => [a + b, a + b];
const mapAccumModulo = R.pipe(R.mapAccum(appender, 0,_),R.head);
const modulo = a=>R.modulo(mapAccumModulo(a),R.length(a));
log(modulo([1,2,3]))