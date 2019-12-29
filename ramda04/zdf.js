const R = require('ramda')
const _ = R.__
const curry = R.curry
const log = curry(console.log)
// 1.flatten，创建一个函数，接收一个字符串数组，将字符串数组中的字符串先按照&分离，再按=分离，
// 最近再将结果用空格连接在一起，例如a=1&b=2&c=3 => a 1 b 2 c 3
const flatten = R.pipe(R.split('&'), R.chain(R.split('=')), R.join(' '))
log('flatten', flatten('a=1&b=2&c=3'))
// 2.flip，创建divide函数的变种，使除数为第一个参数，被除数为第二个参数
const mergeThree = (a, b) => [].concat(a, b)
const flip = R.flip(mergeThree)
const flipDivide = (a, b) => R.divide(R.head(flip(_)), R.last(flip(a, b)))
log('flip', flipDivide(0.5, 2))
// 3.forEach，创建一个函数，接收一个对象数组，将每个对象的list属性设置为该对象数组
const setProp = x => {
  return y => {
    y['list'] = x
  }
}
const forEach = a => R.forEach(setProp(a, _), a)
log('forEach', forEach([{q: 1}, {a: 2}]))
// 4.forEachObjIndexed，创建一个函数，接收一个对象，将对象的每个属性值都设置为key
const printKeyConcatValue = (value, key, obj) => obj[key] = key
const forEachObjIndexed = R.forEachObjIndexed(printKeyConcatValue)
log('forEachObjIndexed', forEachObjIndexed({x: 1, y: 2}))
// 5.fromPairs，创建一个函数，将$k1=$v1&$k2=$v2…这种格式的字符串转为对象，
// 如果有重复的$k则取后面的值
const fromPairs = R.pipe(R.split('&'), R.map(R.split('=')), R.fromPairs)
log(fromPairs('$k1=$v1&$k2=$v2'))
// 6.groupBy，创建一个函数，将中文姓名（不考虑复姓）字符串数组按照姓氏进行分组
const groupBy = R.groupBy(function (firstname) {
  return R.head(R.split('', firstname))
})
log(groupBy(['张丹峰', '陆林冲', '邹永健', '张三']))
// 7.groupWith，创建一个函数，接收一个书名字符串数组，将相邻且书名长度相同的字符串分在一起
const groupWith = R.groupWith((a, b) => R.equals(R.length(a), R.length(b)))
log('groupWith', groupWith(['JavaScript编程指南', 'css世界', '函数式编程', '函数式编程']))
// 8.gt，创建一个函数，传入一个数字数组，过滤出其中大于200的 数字
const gt = R.filter(R.gt(_, 200))
log(gt([200, 300, 425, 1, 3]))
// 9.gte，创建一个函数，传入一个数字数组，判断其中是否有一个大于等于1000的数字
const gte = R.pipe(R.filter(R.gte(_, 1000)), R.length, R.gte(_, 1))
log('gte', gte([200, 1300, 425, 1, 3]))
// 10.has，hasIn，创建一个函数，传入一个对象obj，判断其是否有toString属性，
// 当其是自身所有时返回2，原型链所有时返回1，没有时返回0
const has = R.ifElse(
  R.has('toString'),
  R.always(2),
  R.ifElse(
    R.hasIn('toString'),
    R.always(1),
    R.always(0)
  )
)
log(has({toString: 1}))
// 11.hasPath，创建一个函数，传入一个数组，判断其第一项是否有属性start
const hasPath = R.pipe(R.head, R.hasPath(['start'], _))
log(hasPath([{start: 1}]))
// 12.head，创建一个函数，传入一个姓名（不考虑复姓）字符串数组，获取其中数量最多的姓氏
const groupByName = R.groupBy(function (firstname) {
  return R.head(R.split('', firstname))
})
const findBest = a => {
  let count = 0,target = ''
  const propFn = (value, key) => {
    if (R.gte(R.length(value), count)) {
      count = R.length(value)
      target = key
    }
  }
  R.forEachObjIndexed(propFn, groupByName(a))
  return target
}
log(findBest(['张丹峰', '陆林冲', '邹永健', '张三']))
// 13.identical，创建一个函数，传入一个数字数组，过滤出其中非NaN的数字
const identical = R.filter(R.complement(R.identical(_, NaN)))
log(identical([1, 2, 3, NaN]))
// 14.identity，创建一个函数，传入一个字符串数组 ，按照字符串本身的字符串值进行排序
const identity = R.sortBy(R.identity)
log(identity(['1', '3', '2']))
// 15.ifElse，创建一个函数，接收一个数字，如果其小于0则返回0，如果其大于100则返回100
const isElse = R.ifElse(
  R.lt(_, 0),
  R.always(0),
  R.ifElse(
    R.gt(_, 100),
    R.always(100),
    R.always(null)
  )
)
log(isElse(122))
// 16.inc，使用此函数与递归写一个 n*(n+1)*(n+2)*...(m-1)*m的函数
const inc = (n, m) => {
  if (n >= m) return m
  return n * inc(R.inc(n), m)
}
log('inc', inc(1, 5))
// 17.includes，创建一个函数，传入一个二维数组，判断数组中每一个数组都没有undefined或null
const inludes = R.pipe(R.find(R.anyPass([R.includes(undefined), R.includes(null)])), R.equals(undefined, _))
log('inludes', inludes([[1, 2, 3], [2, 4, null]]))
// 18.indexBy，创建一个函数，传入一个人员对象数组，按照人员对象的姓名(name)+生日(birthday)作为key，将数组转为对象
const key = a => R.concat(R.prop('name', a), R.prop('birthday', a))
const indexBy = R.indexBy(key)
log(indexBy([{name: 'zdf',birthday: '1122'}, {name: 'z',birthday: '12'}]))
// 19.indexOf，创建一个函数，创建一个函数，接收一个字符串数组，去除其中start字符串之前的内容
const drop = a => R.drop(R.indexOf('start', a), a)
const indexOf = R.map(drop)
log(indexOf(['123jiushistart', '122']))
// 20.init，创建一个函数， 传入一个字符串数组，如果数组的最后一位为字符$，则删除该最后一项
const init = R.ifElse(
  R.pipe(R.last, R.equals('$', _)),
  R.init,
  R.identity
)
log(init([1, 2, 3, '$']))