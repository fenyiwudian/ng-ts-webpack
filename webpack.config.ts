
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        // 插件可以单独抽出一本或多本,按需变化
        jquery: ['jquery'],
        angular: ['angular'],
        // 自己的业务代码从入口开始层层依赖压成一本bundle.js
        // 需求不同也可以分成多本
        bundle: './src/index.ts',
        // 上面的模块之间如果有依赖关系,则要依赖顺序从前到后排列
        // 因为webpackHtmlPlugin会用这个顺序吧压成后脚本链接注入到index.html中
    },

    devtool: 'inline-source-map',
    output: {
        // 按规则导出到dist中,用entry名称加上八位hash
        filename: '[name]-[hash:8].js',
        path: path.resolve('./dist')
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        port: 8080
    },

    module: {
        rules: [
            // jquery因为是umd模块的,所以别webpack打包后,全局将不会存在$和jQuery
            // 而我们想沿用原来的全局使用的风格,所以使用expose-loader暴露一下
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
            { test: /\.ts$/, use: 'ts-loader', exclude: '/node_modules/' },
            { test: /\.html$/, use: ["html-loader"] },
            { test: /\.pug$/, use: ["pug-loader"] },
            {
                test: /\.(png|gif|jpe?g)$/,
                use: [{
                    // 使用file-loader处理图片,
                    // 图片都会变成原名称叫八位hash的方式放到dist中,所有引用该张图片的地方
                    // 引用的链接也会自动变更,
                    // 在style.less中展示了样式中引用图片的方式
                    // 在person-detail/template.pug中展示了在模板中使用图片的方式
                    // 在person-detail/component.ts中的$postLink方法中展示了脚本中引用图片的方式
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[hash:8].[ext]',
                        context: '',
                    }
                }]

            },
            {
                test: /\.less$/,
                // 样式文件经过loader处理可以被各种引用,
                // person-detail/component.ts中展示了如果引用一本样式文件
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            }
        ]
    },
    plugins: [
        // 这个插件用来往程序入口html文件中注入在output中导出的脚本或样式的链接
        new HtmlWebpackPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            template: './src/index.pug',
            filename: 'index.html'
        }),
        // 这个插件会在每次构建之前清楚掉dist目录,省的dist中残留的僵尸文件越来越多
        new CleanWebpackPlugin(path.resolve('./dist'))
    ],
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
}
