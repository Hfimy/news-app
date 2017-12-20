const package = require('./package.json');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'app/src/index.js'),
        vendor: Object.keys(package.dependencies)
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
            },
            {
                test: /\.css|\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                            }
                        },
                        'postcss-loader',
                        'less-loader'
                    ]
                })
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)$/,
                loader: 'url-loader?limit=8192&name=font/[name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'url-loader?limit=8192&name=image/[name].[ext]'
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true,
                        }
                    }
                ],
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.BannerPlugin('版权所有，翻版必究 - hfimy'),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'app/src/index.tmpl.html'),
            favicon: path.resolve(__dirname, 'app/src/favicon.ico')
        }),
        new ExtractTextPlugin('styles.[chunkhash:8].css'),

        new UglifyJsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: '[name].[chunkhash:8].js'
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            },
            __DEV__: false
        })
    ]
}