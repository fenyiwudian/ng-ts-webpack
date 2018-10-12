
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LangPlugin = require('./lang-plugin');
const VendorPlugin = require('./vendor-plugin');
const HtmlWebpackPrefixPlugin = require('html-webpack-prefix-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const cdnConfig = {
  local: 'http://localhost:8080',
  staging: 'http://localhost:8080',
  prod: 'http://localhost:8080',
  // staging: 'https://staging.cdn.com',
  // prod: 'https://prod.cdn.com',
};

module.exports = (env) => {
  const local = env.NODE_ENV === 'local';

  const cdn = cdnConfig[env.NODE_ENV];
  return {
    optimization: {
      minimizer: [
        new TerserPlugin(),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    entry: {
      jquery: ['jquery'],
      lang: './src/lang.ts',
      bundle: './src/index.ts',
    },
    output: {
      filename: local ? '[name].js' : '[name]-[contenthash:8].js',
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
          test: /lang\/.+\.ts$/,
          use: {
            loader: './lang-loader.js',
            options: {
              local,
            }
          },
        },
        {
          test: require.resolve('jquery'),
          use: [{
            loader: 'expose-loader',
            options: 'jQuery'
          }, {
            loader: 'expose-loader',
            options: '$'
          }]
        },
        { test: /\.ts$/, use: 'ts-loader', exclude: '/node_modules/' },
        { test: /\.html$/, use: ["html-loader"] },
        { test: /\.pug$/, use: ["pug-loader"] },
        {
          test: /\.(svg|png|gif|jpe?g)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: local ? '[name].[ext]' : '[name]-[hash:8].[ext]',
              context: '',
              publicPath: 'asstes/'
            }
          }]

        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader'
            }, {
              loader: 'less-loader'
            }]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.pug',
        filename: 'index.html',
        prefix: cdn + '/',
        excludeAssets: [/bundle.*\.js/]
      }),
      new HtmlWebpackExcludeAssetsPlugin(),
      new HtmlWebpackPrefixPlugin(),
      new CleanWebpackPlugin(path.resolve('./dist')),
      new MiniCssExtractPlugin({
        filename: local ? '[name].css' : '[name]-[contenthash:8].css',
      }),
      new LangPlugin({ directory: 'lang', local, prefix: cdn }),
      new VendorPlugin({
        local,
        prefix: cdn,
        jsBefore: 'lang',
        vendors: {
          'vendor.css': [
            "node_modules/swiper/dist/css/swiper.css",
          ],
          'vendor.js': [
            "node_modules/angular/angular.js",
            "node_modules/angular-sanitize/angular-sanitize.js",
            "node_modules/angular-translate/dist/angular-translate.js",
            'node_modules/sortablejs/Sortable.js',
            'node_modules/screenfull/dist/screenfull.js',
          ]
        }
      })
    ],
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        config: path.join(__dirname, `config/${env.NODE_ENV}.ts`),
      },
    }
  };
};
