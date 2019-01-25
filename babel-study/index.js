import * as babylon from 'babylon'

const code = `
  let a = 4
`
const ast = babylon.parse(code)
console.log(ast)