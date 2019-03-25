* 接受函数作为参数

* return可以为函数

1. 函数柯里化
``` JavaScript
// es5实现
function plus(a) {
  return function(b) {
    return function(c) {
       return a + b*c;
    }
  } 
}
// es6实现
const plus = a => b => c => a + b * c;
```
`plus(1)(2)(4)`计算过程如下：
`a+4*b ==> a+8 ==> 1+8 ==> 9`

2. 高阶组件
**高阶组件也是一个函数，不是一个组件，它接受一个组件作为参数，返回一个新的组件**

忘了如何使用看这：[点我](http://huziketang.mangojuice.top/books/react/lesson28)
```JavaScript
import React, { Component } from 'react'

export default (WrappedComponent) => {
  class NewComponent extends Component {
    // 可以做很多自定义逻辑
    render () {
      return <WrappedComponent />
    }
  }
  return NewComponent
}
```