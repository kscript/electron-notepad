import typescript from 'rollup-plugin-typescript'
import replace from 'rollup-plugin-replace'
import babel from "rollup-plugin-babel"

const env = process.env.NODE_ENV
const config = {
    input: 'src/renderer.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    },
    plugins: [
        typescript({
            "target": "es5",
            "sourceMap": false
        }),
        babel(),
        replace({
            ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
        })
    ]
}

export default config
