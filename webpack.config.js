const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {resolve} = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

process.env.NODE_ENV = "development";

const commonCssLoader = [
    //"style-loader",
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            //publicPath: '/style/'
        }
    },
    "css-loader",
]

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/index.js',
        path: resolve(__dirname, 'build'),
        //publicPath: '/static/'
    },
    module: {
        rules: [
            {
                test: /\.(ttf|woff(\d)?|svg|eot)$/,
                loader: "url-loader",
                options: {
                    limit: 0,
                    name: '[name]-[hash:10].[ext]',
                    outputPath: 'media',
                    publicPath: '/media/'
                }
            },
            {
                oneOf: [
                    //  css-loader
                    {
                        test: /\.css$/,
                        use: [...commonCssLoader]
                    },
                    //  less-loader
                    {
                        test: /\.less$/,
                        use: [
                            ...commonCssLoader,
                            "less-loader"
                        ]
                    },
                    //  url-loader 圖片資源處理 
                    {
                        test: /\.(jpg|gif|png)$/,
                        //  npm i url-loader file-loader -D
                        //      url-loader 依賴 file-loader
                        loader: "url-loader",
                        options: {
                            //  小於8K,作base64處理
                            limit: 8 * 1024,
                            esModule: false,
                            name: '[name].[ext]',
                            //  生成路徑
                            outputPath: 'img',
                            //  引用路徑
                            publicPath: '/img/'
                            //  /static/img/img/dog
                        }
                    },
                    {
                        test: /\.html$/,
                        loader: "html-loader"
                    },
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'style/built.css'
            //  css中若有@font-face引用的文字檔,其會被file-loader撈取並打包至指定路徑,
            //  而built.css內@font-face仍維持原路徑,會導致找不到打包後的文字檔,
            //  所以需在file-loader["options"][publicPath]設定
            //  對原本被file-loader打包文件有引用關係的路徑,添加路徑前綴
        }),
        new CleanWebpackPlugin()
    ],
    mode: 'development',
    //  npm i webpack-dev-server
    devServer: {
        //  指定devServer打包生成的靜態文件,要在記憶體哪個位置
        //      若無設置 > 取output["publicPath"],再無 > "/"
        //  devServer打包後,將文檔放入內存的指定路徑
        //publicPath: "/static/",
        //  指定devServer前往哪裡取得文件
        //      指定devServer前往哪裡取得index.html
        //contentBase: resolve(__dirname, 'src'),
        //contentBase: '/static/',
        compress: true,
        port: 8080,
        hot: true
    }
}