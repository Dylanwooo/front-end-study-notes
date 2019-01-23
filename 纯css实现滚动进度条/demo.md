假设我们的页面被包裹在 <body> 中，可以滚动的是整个 body，给它添加这样一个从左下到到右上角的线性渐变：
```
body {
    background-image: linear-gradient(to right top, #ffcc00 50%, #eee 50%);
    background-repeat: no-repeat;
}
```

![ffa488e3dc3f1f8ad90902757edae326.gif](evernotecid://D98F1639-E58C-490F-9699-C2A1D05D02E0/appyinxiangcom/10335219/ENResource/p15)
我们运用一个伪元素，把多出来的部分遮住：

```
body::after {
    content: "";
    position: fixed;
    top: 5px;
    left: 0;
    bottom: 0;
    right: 0;
    background: #fff;
    z-index: -1;
}
```
再调整一下body的高度：
```
body {
    background-image: linear-gradient(to right top, #ffcc00 50%, #eee 50%);
    background-size: 100% calc(100% - 100vh + 5px);
    background-repeat: no-repeat;
}
```
这里使用了 calc 进行了运算，减去了 100vh，也就是减去一个屏幕的高度，这样渐变刚好在滑动到底部的时候与右上角贴合。

而 + 5px 则是滚动进度条的高度，预留出 5px 的高度。