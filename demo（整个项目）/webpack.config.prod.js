//导入html-webpack-plugin插件，作用是根据参照文件生成index.html(自动导入bundle.js)
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

var webpack = require('webpack')

//打包之前，删除dist目录
var CleanWebpackPlugin = require('clean-webpack-plugin')

//抽离样式的第三方包
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: {
        //属性名称最终单独打包出来生成文件名称，值是就是安装的第三方包
        'vue-resource': ['vue-resource'], //把vue-resource单独打包出来
        'mint-ui': ['mint-ui'],
        'moment': ['moment'],
        'vue-preview': ['vue-preview'],
        'quanjiatong': ['vue', 'vue-router', 'vuex'],
        'axios': ['axios'],
        'bundle': './src/main.js', //别忘记打包我们自己的源代码
    }, //打包的入口文件
    output: {//出口
        path: path.join(__dirname, "dist"), //路径
        filename: 'js/[name].js' //生成的文件名称
    },
    module: {//打包非js文件的配置
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader']
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.(png|svg|gif)$/,
                use: [
                    {
                        /*
                            limit：
                                表示的是一个阀值,如果当前我们资源中的图片大于
                                4kb就从bundle.js中剥离出来，如果小于4kb打包进bundle.js,4kb只是我这设置的一个值,实际开发过程中要根据业务来
    
                            name:抽离出来的图片，放在哪个文件夹下，用什么文件名称命名
                                [name]代表你原始的文件名称
                                [hash:5] 避免图片换了之后，浏览器还加在原先的图片,解决缓存的问题
                                [ext] 图片本身的拓展名
                        */
                        loader: "url-loader?limit=4000&name=images/[name]-[hash:5].[ext]"
                    }
                ]
            },
            {
                test: /\.(ttf)$/,
                use: [
                    {
                        /*
                            limit：
                                表示的是一个阀值,如果当前我们资源中的图片大于
                                4kb就从bundle.js中剥离出来，如果小于4kb打包进bundle.js,4kb只是我这设置的一个值,实际开发过程中要根据业务来
    
                            name:抽离出来的图片，放在哪个文件夹下，用什么文件名称命名
                                [name]代表你原始的文件名称
                                [hash:5] 避免图片换了之后，浏览器还加在原先的图片,解决缓存的问题
                                [ext] 图片本身的拓展名
                        */
                        loader: "url-loader?limit=4000&name=fonts/[name]-[hash:5].[ext]"
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, //排除第三方包
                loader: "babel-loader"
            },
            {//对我们的vue-preview单独处理
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.vue', '.js', '*', '.json']//设置拓展名
    },
    plugins: [
        //打包之前，删除dist目录，写在其它插件前面
        new CleanWebpackPlugin('dist'),

        new HtmlWebpackPlugin({
            template: './template.html',//指定参照文件
            filename: 'index.html',//最终生成的文件名称，发布到node服务器
            minify: {//压缩生成的index.html
                collapseWhitespace: true, //去除空格
                minifyCSS: true,//压缩css
                minifyJS: true,//压缩js
                removeComments: true,//去除注释
            }
        }),
        // 设置环境为生产环境
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false //去除警告
            },
            comments: false //去掉版权信息等注释
        }),
        //抽离第三方包的，这里不要写bundle.js
        new webpack.optimize.CommonsChunkPlugin({
            name: ['mint-ui', 'moment', 'quanjiatong', 'vue-resource', 'vue-preview', 'axios'],
            // filename: "vendor.js"
            // (给 chunk 一个不同的名字)

            minChunks: Infinity,
            // (随着 entry chunk 越来越多，
            // 这个配置保证没其它的模块会打包进 vendor chunk)
        }),
        //把抽离出来的文件放在某个文件中去
        new ExtractTextPlugin("css/styles.css")
    ]
}
