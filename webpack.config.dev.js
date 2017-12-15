const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].bundle.js',
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        historyApiFallback: true,
        inline: true,
        hot: true,
        port: 8081,
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
                use: ['style-loader',
                    'css-loader',
                    'less-loader',
                    //  'postcss-loader'
                ]
            },
            {
                test:/\.jpe?g|\.png|\.gif$/,
                loader:'url-loader?limit8192&name=image/[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.tmpl.html'),
            favicon: path.resolve(__dirname, 'public/static/favicon.ico')
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}