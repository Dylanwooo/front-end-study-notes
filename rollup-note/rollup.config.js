import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
    input: 'index.js',
    output: {
        format: 'cjs',
        file: 'dist.js'
    },
    plugins: [
        babel({
          exclude: 'node_modules/**'
        }),
        commonjs()
    ]
}