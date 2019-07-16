#### **1. JavaScript数据类型 7种**
* 基本数据类型undefined，null，boolean，number，string，Symbol六种
* 引用类型 Object包括function，object，Date，RegExp

#### **2. 写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？**
* 增加唯一标识的key，能保证节点渲染的正确性。在diff对比新旧节点时，会通过新节点的key去对比旧节点的key，如果没有找到对应旧节点key，就会认为是新增节点，进而创建新节点。但是在这种情况下，如果没有key的话会采用遍历的形式去查找旧节点，如果节点数量庞大，遍历时性能会有所降低
```JavaScript
// vue源码摘录，patch.js
// oldCh 是一个旧虚拟节点数组
if (isUndef(oldKeyToIdx)) {
  oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
}
if(isDef(newStartVnode.key)) {
  // map 方式获取
  idxInOld = oldKeyToIdx[newStartVnode.key]
} else {
  // 遍历方式获取
  idxInOld = findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
}
```

* 但是存在另外一个问题，不是有key就一定能提高渲染效率。使用key的作用，是在更新组件时**判断两个节点是否相同**，相同就复用，不同就销毁并重新创建。因为key的唯一性，每次更新都找不到可复用的节点，需要销毁并重新创建vnode（但是diff算法不止这么简单，自身也会做优化）。

* 而不使用key，对于一下简单的例子，不带key时节点能够复用，省去了销毁/创建组件的开销，同时只需要修改DOM文本内容而不是移除/添加节点，原地复用。（但是这个复用会带来bug，本该更新的内容没有更新）

#### **3. ['1', '2', '3'].map(parseInt) what & why ?**
>parseInt(string, radix)

第二个参数radix是解析的进制基数,在2-36范围内
>在radix为 undefined，或者radix为 0 或者没有指定的情况下，JavaScript 作如下处理：

* 如果字符串 string 以"0x"或者"0X"开头, 则基数是16 (16进制).

* 如果字符串 string 以"0"开头, 基数是8（八进制）或者10（十进制），那么具体是哪个基数由实现环境决定。ECMAScript 5 规定使用10，但是并不是所有的浏览器都遵循这个规定。因此，永远都要明确给出radix参数的值。

* 如果字符串 string 以其它任何值开头，则基数是10 (十进制)。

所以以上代码实际上是：
```JavaScript
['1', '2', '3'].map((item, index) => {
	return parseInt(item, index)
})
parseInt('1',0)  // radix为0，使用10 -> 1
parseInt('2',1)  // radix为1，不在范围内，->NaN
parseInt('3',2)  // radix为2，表示二进制，但是‘3’不是二进制，二进制只有0，1，->NaN
```

**类似的题目：**['10','10','10','10','10'].map(parseInt) 
```JavaScript
['10','10','10','10','10'].map((item,index)=>{
    return parseInt(item,index)
})
parseInt('10',0) // ->10
parseInt('10',1) // 不在范围内 ->NaN
parseInt('10',2) // 二进制10，->2
parseInt('10',3) // 三进制10，->3的一次方 ->3
parseInt('10',4) // 四进制10，->4的一次方 ->4
```

#### **4. 事件循环（event loop）**
>指浏览器或Node的一种解决javaScript单线程运行时不会阻塞的一种机制，也就是我们经常使用异步的原理

* js数组实现栈：push和pop 后进先出
* js数组实现队列：shift和splice 先进先出

1. **MacroTask（宏任务)**: script(整体代码), setTimeout, setInterval, setImmediate（node独有）, I/O, UI rendering
2. **MicroTask（微任务）**: process.nextTick（node独有）, Promises, Object.observe(废弃), MutationObserver（用于监听dom变化的，异步）

在一个事件循环中，用户代理（user agent）会不断从MacroTask（宏任务）队列中取出task执行，每完成一个task（函数执行栈为空）会去检查MicroTask（微任务）队列是否为空，如果不为空则一次性执行完所有MicroTask（微任务），然后进入下一个循环执行task。。。

看一个例子
```javascript
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

Promise.resolve().then(function() {
  console.log('promise111');
}).then(function() {
  console.log('promise222');
});

console.log('script end');

//script start
//script end
//promise1
//promise111
//promise2
//promise222
//setTimeout
```

1. console.log操作进入task队列，按照顺序执行
2. 遇到**setTimeout**，为宏任务进入task队列，在下一轮事件循环中执行
3. 遇到promise，为微任务，第一个和第二个promise进入microtask队列，在task任务执行完后函数执行栈为空，检查微任务队列不为空，执行promise，then返回的依旧是promise，继续入队列，返回promise2和promise222
4. 此时micritask队列空了，进入下一个事件循环，开始执行setTimeout的内容


#### **5. async/await使用**

* **await底层实现原理**
```javascript
async function foo(v) {
  const w = await v;
  return w;
}
// 当函数调用时，它会将参数 v 包装为 Promise 并暂停执行异步函数，直到该 Promise 的状态变为 resolved。一旦发生这种情况，函数的执行将恢复并且这个 fulfilled 的 Promise 的值被赋值给 w。然后从异步函数中返回此值。
```

