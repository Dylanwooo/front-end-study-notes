**1. prototype** 

是一个显式原型属性，只有**函数**才拥有该属性。基本上所有函数都有该属性，除了，
```JavaScript
let fun = Function.prototype.bind()
```
这种方法创建出的函数无prototype属性

**如何生成？**
在函数被创建时即有：
```JavaScript
function Foo() {}
```

**2. \__proto__**

**实例对象**的隐式原型属性，指向了创建该对象的构造函数的原型
```JavaScript
function Foo() {}
// 这个函数是 Function 的实例对象
// function 就是一个语法糖
// 内部调用了 new Function(...)

// 在new的时候__proto__被创建
var instance = new Foo()
// __proto__指向Foo这个构造函数的prototype
instance.__proto__ === Foo.prototype //true
```

>对于实例对象来说，都是通过 new 产生的，无论是 function Foo() 还是 let a = { b : 1 } ,都可取到__proto__属性

对于原型的总结:

* Object 是所有对象的爸爸，所有对象都可以通过 __proto__ 找到它

* Function 是所有函数的爸爸，所有函数都可以通过 __proto__ 找到它

* Function.prototype 和 Object.prototype 是两个特殊的对象，他们由引擎来创建

* 除了以上两个特殊对象，其他对象都是通过构造器 new 出来的

* 函数的 prototype 是一个对象，也就是原型

* 对象的 __proto__ 指向原型， __proto__ 将对象和原型连接起来组成了原型链
