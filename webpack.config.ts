
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: {
        jquery: ['jquery'],
        angular: ['angular'],
        bundle: './src/index.ts',
    },

    devtool: 'inline-source-map',
    output: {
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
        new CleanWebpackPlugin(path.resolve('./dist'))
    ],
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
}
