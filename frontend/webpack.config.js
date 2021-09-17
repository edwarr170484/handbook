const HtmlWebpackPlugin  = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

const path = require('path');

module.exports={
    mode: 'development',
    entry:{
        main: path.resolve(__dirname,'src/js/app.js')
    },
    output:{
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, '../public'),
        publicPath: '/'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    },
    module:{
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: path.resolve(__dirname, 'dist/css'),
                        }
                    },
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname + '/src/index.html'),
            filename: path.resolve(__dirname, '../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename:'[contenthash].css',
        }),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new VueLoaderPlugin(),
        new ESLintPlugin()
    ]
}