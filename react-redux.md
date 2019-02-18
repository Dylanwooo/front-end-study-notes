主要思想：
    使用context来进行store数据的共享。
    ![fbe382575402c0b8100785fd5fc95a35.png](evernotecid://D98F1639-E58C-490F-9699-C2A1D05D02E0/appyinxiangcom/10335219/ENNote/p32?hash=fbe382575402c0b8100785fd5fc95a35)
    

* Provider是用来承接context，作为最顶层的父组件，保证了自己写的组件不使用context
* connect是一个高阶，接受mapStateToProps和mapDispatchToProps两个参数，分别用于告诉 connect 这个组件需要什么数据和需要触发什么 action。
```javascript
// 两种写法：
1. 不实用修饰器
   返回一个经过connect加强的组件，注入了store数据和相应的dispatch方法
connect(mapStateToProps, mapDispatchToProps)(App)

2. 使用修饰器
@connect(mapStateToProps, mapDispatchToProps)
```
