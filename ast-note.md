1. type为**Identifier**时表示已经没有任何子节点属性了
2. **路径对象(node)**——用于连接两个节点之间的对象
* 路径是一个节点在树中的位置以及关于该节点各种信息的响应式 **Reactive** 表示
* 当访问节点时起时访问/修改的的是路径(node)，而非节点本身
```JavaScript
{
  "parent": {
    "type": "FunctionDeclaration",
    "id": {...},
    ....
  },
  "node": {
    "type": "Identifier",
    "name": "square"
  }
}
```
```JavaScript
const MyVisitor = {
  Identifier(path) {
    // 此处的path就是连接节点的路径，而非节点本身
    console.log("Visiting: " + path.node.name);
  }
};
// 输出 Visiting: a
       Visiting: b
       Visiting: c
```