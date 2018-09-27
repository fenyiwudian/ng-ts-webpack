// 基于node的 遵循commonjs规范的
let path = require('path');//node的模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: './src/index.js', // 入口
    output: {
        filename: 'build.js',
        // 这个路径必须是绝对路径
        path: path.resolve('./dist')
    }, // 出口
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        compress: true,
        port: 8080
    },

    module: {}, // 模块配置
    plugins: [
        new HtmlWebpackPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html',
            filename: 'index.html'
        })],
    mode: 'development', // 可以更改模式
    resolve: {}, // 配置解析
}
// 在webpack中如何配置开发服务器 webpack-dev-server
