1. 针对对象： 引用类型
基本类型的拷贝直接对值进行拷贝，基本类型是按值访问的
     
 
```
// 基本类型
var a = 1;
var b = a;
a = 2;
console.log(a, b); // 2, 1 ，a b指向不同的数据

// 引用类型指向同一份数据
var a = {c: 1};
var b = a;
a.c = 2;
console.log(a.c, b.c); // 2, 2 全是2，a b指向同一份数据
```
2. 浅拷贝实现：实际就是属性遍历然后复制
```
function shallowClone(source) {
   var target = {}
   for(var i in source) {
     if (soucre.hasOwnProperty(i)) {
       target[i] = source[i]
     }
   }
  return target
}
```
3. 简单的深拷贝：浅拷贝+递归 
```
// 假设有这个数据，就需要深拷贝 
var a1 = {b: {c: {d: 1}};
```
```
// 对象检验函数
function isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]';
}
function clone(source) {
    var target = {};
    // 非对象，直接返回
    if (!isObject(source)) return source
    for(var i in source) {
        if (source.hasOwnProperty(i)) {
            if (typeof source[i] === 'object') {
                target[i] = clone(source[i]); 
            } else {
                target[i] = source[i];
            }
        }
    }

    return target;
}
```
4. 递归的情况很容易引起爆栈
*     借助一个栈stack，深度遍历source对象，子节点是对象，放入栈内，否则直接拷贝
* 同时要解决循环引用问题，如
```
var b = 1;
var a = {a1: b, a2: b};
a.a1 === a.a2 // true
var c = clone(a);
c.a1 === c.a2 // false
```
所以可以写成：
```
 // 
    function find(arr, item) {
        for(let i = 0; i < arr.length; i++) {
            if (arr[i].source === item) {
                return arr[i];
            }
        }

        return null;
    }

   function cloneLoop(x) {
    const root = {};

    // 栈
    const stack = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ];

    while(stack.length) {
        // 深度优先
        const node = stack.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }
        
        // 数据已经存在
        let uniqueData = find(uniqueList, data);
        if (uniqueData) {
            parent[key] = uniqueData.target;
            break; // 中断本次循环
        }

        // 数据不存在
        // 保存源数据，在拷贝数据中对应的引用
        uniqueList.push({
            source: data,
            target: res,
        });

        for(let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    stack.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return root;
}
```