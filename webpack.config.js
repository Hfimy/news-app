const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: __dirname + '/src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        inline: true,
        hot: true,
        port:8081,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
            },
            {
                test: /\.css|\.less?$/,
                loader: 'style-loader!css-loader?modules!less-loader!postcss-loader',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/template/index.tmpl.html',
        }),
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.optimize.CommonsChunkPlugin({
            name:'commons',
            filename:'commons.js'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('styles.css'),

    ]

}