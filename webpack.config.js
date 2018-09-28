
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build-[hash:8].js',
        path: path.resolve('./dist')
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        compress: true,
        port: 8080
    },

    module: {
        rules: [
            { test: /\.html$/, use: ["html-loader"] },
            { test: /\.pug$/, use: ["pug-loader"] },
            {
                test: /\.(png|gif|jpe?g)$/, 
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[hash:8].[ext]',
                        context: '',
                    }
                }]

            },
            {
                test: /\.less$/,
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
        new HtmlWebpackPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            template: './src/index.pug',
            filename: 'index.html'
        }),
        new Webpack.ProvidePlugin({
            $: 'jquery',
            ng: 'angular',
            'window.jQuery': 'jquery'
        }),

        new CleanWebpackPlugin(path.resolve('./dist'))
    ],
    mode: 'development', 
    resolve: {},
}
