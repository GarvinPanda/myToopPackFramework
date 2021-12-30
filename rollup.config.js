import path from 'path'
import resolve from 'rollup-plugin-node-resolve' // 依赖引用插件
import commonjs from 'rollup-plugin-commonjs' // commonjs模块转换插件
import ts from 'rollup-plugin-typescript2'
const getPath = _path => path.resolve(__dirname, _path)
import packageJSON from './package.json'

const basePath = __dirname;
const input = path.join(basePath, 'src/index.ts');

const main = path.join(basePath, 'dist/index.js');
const module = path.join(basePath, 'dist/index.esm.js');

const extensions = [
    '.js',
    '.ts',
    '.tsx'
]

// ts
const tsPlugin = ts({
    tsconfig: getPath('./tsconfig.json'), // 导入本地ts配置
    extensions
})


// 基础配置
const commonConf = {
    input,
    plugins: [
        resolve(extensions),
        commonjs(),
        tsPlugin,
    ]
}
// 需要导出的模块类型
const outputMap = [
    {
        file: main, // 通用模块
        format: 'umd',
    },
    {
        file: module, // es6模块
        format: 'es',
    }
]


const buildConf = options => Object.assign({}, commonConf, options)


export default outputMap.map(output => buildConf({ output: { name: packageJSON.name, ...output }}));