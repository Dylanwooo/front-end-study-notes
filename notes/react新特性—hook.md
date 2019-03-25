1. **hook种类：**
   `useEffect`，`useState`, `useContext`, `useReducer`
   [API](https://reactjs.org/docs/hooks-reference.html)
2.  避免同类型的副作用（side effects）在不同的生命周期中使用
 如：接口请求，订阅数据，监听
    原本订阅在`componentDidMount`中订阅，在`componentWillUnmount`中取消订阅，现在可以直接写在`useEffect`中
    
```JavaScript
useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
   return () => {
   ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

3. **useState使用**——替代传统`state`定义和`setState`方法
```JavaScript
import { useState } from 'react';
function Example() {
    //定义state和改变state的方法
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>You clicked {count} times</p>
             <button onClick={() => setCount(count + 1)}>click
              </button>
        </div>
    )
}
```

4. **useEffect使用**——代替传统的生命周期方法
    1. 将同过程的effect(调用，监听)放于同一个effect中
    `以前的方式：` 
```
 componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```
现在可以这样：
 
```
useEffect(() => {
    ChatAPI.subscribe(props.friend.id, handleStatusChange);
    return () => {
          ChatAPI.unsubscribe(props.friend.id, handleStatusChange);
    };
```
useEffect每次state更新都会调用，return是在组件unmount的时候调用
如果要让组件更高效，也有类似componentWillUpdate的方式检测更新：
```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); 
```
第二个参数是触发比较更新的，如果原来state与现在相同（===），会skip effect，有任何一点不同就会触发effect重新渲染视图

5. **useEffect使用要点：**
    1. 不在循环、条件判断和嵌套函数中使用
    2. 只能在react function中使用，在普通js函数中使用无效
    3. react的state根据hook的调用顺序来获取state