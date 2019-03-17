import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'


let isProd = process.env.NODE_ENV === 'production'

export default {
    input: 'index.js',
    output: {
        format: 'cjs',
        file: 'dist.js'
    },
    sourceMap: true,
    plugins: [
        resolve()
    ]
}