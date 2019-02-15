
createStore对外暴露几个方法：

* dispatch
* getState
* subscribe
* replaceReducer
* [$$observable]

```javascript
export default function createStore(reducer, preloadedState, enhancer){
  //...初始条件的判断和设定
  function getState() {
    // getState方法的实现
  }
  function subscribe() {
    // subscribe方法的实现
  }
  function dispatch() {
    // dispatch方法的实现
  }
  function replaceReducer() {
    // replaceReducer方法的实现
  }
  function observable() {
    // observable方法的实现
  }
  // store被创建后，自动分发一个'INIT' action。渲染出初始化的state树。
  dispatch({ type: ActionTypes.INIT })
}
```

1. getState方法, 返回当前的state
```javascript
function getState() {
    if (isDispatching) {
      throw new Error(
      )
    }
   return currentState
}
```
2. dispatch方法
```javascript
try {
      isDispatching = true
      /**第一步：
       * 变更state
       * currentReducer用于接受旧state和action，返回新的state
       */
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }
    /** 第二步：
      * 遍历listener监听并执行每一个listener，
      * 每个listener是一个函数，是进行页面重新渲染的操作，
      * 可以理解为renderApp(store.getState())
      * 为了保证数据有变化的时候能重新渲染页面
    */
    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()
    }
    /**第三步：
      * 返回action
    */
    return action
```

3. subscribe方法
```JavaScript
/**第一步：
 * 将监听放入数组
*/
let listeners = []
const subscribe = (listener) => listeners.push(listener)
/**第二部：
 * 返回一个取消监听函数，
 * 将改listener从数组剔除
*/
return function unsubscribe() {
  const index = nextListeners.indexOf(listener)
  nextListeners.splice(index, 1)
}
```

4. replaceReducer方法
```JavaScript
 function replaceReducer(nextReducer) {
    /**第一步：
     * 用传入的reducer更新reducer，
     * reducer就是一个通过action.type来判断如何处理state的函数
    */
    currentReducer = nextReducer
    /**第二步：
     * dispatch一个redux内部的action
    */
    dispatch({ type: ActionTypes.REPLACE })
  }
```