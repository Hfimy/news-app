const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const package = require('./package.json');

module.exports = {
    entry: {
        app: path.resolve(__dirname, 'app/src/index.js'),
        vendor: Object.keys(package.dependencies)
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel-loader',
            },
            {
                test: /\.css|\.less$/,
                loader: 'style-loader!css-loader!postcss-loader!less-loader'
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)$/,
                loader: 'url-loader?limit=8192&name=font/[name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'url-loader?limit=8192&name=image/[name].[ext]',
            },
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        // proxy:{
        //     '/api':'localhost:3000'
        // },
        contentBase: path.resolve(__dirname, 'dist'),
        historyApiFallback: true,
        inline: true,
        hot: true,
        port: 8081,
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'app/src/index.tmpl.html'),
            favicon: path.resolve(__dirname, 'app/src/favicon.ico')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true
        })
    ]
}