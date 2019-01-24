1. **用法**
`Object.defineProperty(object, propertyname, descriptor)`

* * *

>    直接在一个对象上定义一个新的属性，或者是修改已存在的属性。最终这个方法会返回该对象。
```
var a = {}
a.name = 'dylanwoo'   //传统方法
// 这种方法
Object.defineProperty(someOne, 'name', {
    value : 'dylanwoooo'
})
```
`descriptor`中有三个值可以设置：`writable`(可写性),`configurable`(可修改性)，`enumerable`(可否通过`for-in`或在`object.key`中枚举出来)

2. **.方法和defineProperty区别**
```
var someOne = { };
someOne.name = 'coverguo';
console.log(Object.getOwnPropertyDescriptor(someOne, 'name'));
//输出 Object {
        value: "coverguo", 
        writable: true, 
        enumerable: true, 
        configurable: true}
```
.方法设置属性时三个descriptor都是默认为true的
```
var otherOne = {};
Object.defineProperty(otherOne, "name", {
    value:"coverguo" 
});  
console.log(Object.getOwnPropertyDescriptor(otherOne, 'name'));
//输出 Object {
        value: "coverguo", 
        writable: false, 
        enumerable: false, 
        configurable: false}
```
Object. defineProperty方法如果不设置三个descriptor默认为false
>**我们可以通过使用Object.defineProperty，来定义和控制一些特殊的属性，如属性是否可读，属性是否可枚举，甚至修改属性的修改器（setter）和获取器(getter)**

3. **实际应用**
使用set方法批量设置一些重复的代码：
```
Object.defineProperty(dom, 'translateX', {
set: function(value) {
         var transformText = 'translateX(' + value + 'px)';
        dom.style.webkitTransform = transformText;
        dom.style.transform = transformText;
}
//这样再后面调用的时候, 十分简单
dom.translateX = 10;
dom.translateX = -10;
```
使用get方法在读取对象属性时触发事件：
```
var b = {
    name: 'dylanwoo'
}
Object.defineProperty(b, 'name', {
    get: function() {
        console.log('dont touch!!')
    }
})
```