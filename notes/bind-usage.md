bind 用法 <br>

**bind()** 方法创建一个新的函数，在调用时设置this关键字为提供的值。并在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项

```JavaScript
function.bind(thisArg[, arg1[, arg2[, ...]]])
```

1. 创建绑定函数,改变绑定作用域 <br>
``` JavaScript
this.x = 9;    // 在浏览器中，this指向全局的 "window" 对象
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); // 81

var retrieveX = module.getX;
retrieveX();   
// 返回9 - 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81

var boundGlobalGetX = retrieveX.bind(window)
boundGetX() // 9,这里bind this的效果是一样的
```

假如在上面的代码中去掉第一行：
``` JavaScript
this.x = 9; //定义在全局的一个x
```
那通过一个中间变量()调用方法会导致找不到this.x的值,它是根据原型链层层往上查找,去掉最开头的定义后最终找不到
``` javascript
var retrieveX = module.getX
retrieveX()  // 由于失去了this,此处输出undefined
```
然而通过这种直接调用的方式:
```JavaScript
module.getX() // 81,相当于this.module.getX()
```

* 在react中,通常需要在元素绑定事件是通过bind方法:
```JavaScript
// 将点击事件绑定到当前元素上,不使用bind方法则找不到this指向, 通过bind将this绑定到当前元素上
<button onClick={this.handleClick.bind(this)}>
    {this.state.isToggleOn ? 'ON' : 'OFF'}
</button>
```
* 当然还有一种简便的方法是使用箭头函数, 其内置了bind方法
```JavaScript
<button onClick={()=>{this.handleClick}}
    {this.state.isToggleOn ? 'ON' : 'OFF'}
</button>
```

2. 偏函数实现: 使一个函数拥有预设的初设参数
```JavaScript
function addArguments(arg1, arg2) {
    return arg1 + arg2
}
// 创建一个偏函数,设置预设参数37
var addThirtySeven = addArguments.bind(null, 37)
// 这个偏函数传入的其他参数会加载预设函数的后面
addThirtySeven(1,3) // 37+1+3

function list() {
  return Array.prototype.slice.call(arguments);
}
var newList = list.bind(null, 3)
newList(1,2,3) // [3,1,2,3]
```
