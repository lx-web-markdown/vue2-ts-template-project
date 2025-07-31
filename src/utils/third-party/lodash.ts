// lodash 常用方法 TypeScript 封装
// 使用前请确保已安装 lodash 和 @types/lodash
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import uniq from 'lodash/uniq'
import get from 'lodash/get'
import set from 'lodash/set'
import merge from 'lodash/merge'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import flatten from 'lodash/flatten'
import uniqBy from 'lodash/uniqBy'
import chunk from 'lodash/chunk'

// 类型安全导出
export {
  debounce,
  throttle,
  cloneDeep,
  isEqual,
  uniq,
  get,
  set,
  merge,
  pick,
  omit,
  groupBy,
  sortBy,
  flatten,
  uniqBy,
  chunk
}

// ========== 使用技巧 ========== //
// 1. 防抖/节流
// const fn = debounce(() => { ... }, 300);
// const fn = throttle(() => { ... }, 300);

// 2. 深拷贝对象
// const newObj = cloneDeep(obj);

// 3. 判断对象/数组是否相等
// isEqual(obj1, obj2)

// 4. 数组去重
// uniq([1,2,2,3])
// uniqBy(arr, 'id')

// 5. 安全获取/设置对象属性
// get(obj, 'a.b.c', defaultValue)
// set(obj, 'a.b.c', value)

// 6. 合并对象
// merge(obj1, obj2)

// 7. 挑选/忽略对象属性
// pick(obj, ['a', 'b'])
// omit(obj, ['a', 'b'])

// 8. 按属性分组
// groupBy(arr, 'type')

// 9. 排序
// sortBy(arr, 'age')

// 10. 数组扁平化
// flatten([1, [2, [3]]])

// 11. 数组分块
// chunk([1,2,3,4,5], 2)
