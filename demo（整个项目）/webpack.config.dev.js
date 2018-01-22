//导入html-webpack-plugin插件，作用是根据参照文件生成index.html(自动导入bundle.js)
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:'./src/main.js', //打包的入口文件
    module:{//打包非js文件的配置
        rules:[
            {
                test:/\.vue$/,
                use : ['vue-loader']
            },
            {
                test:/\.css$/,
                use : ['style-loader','css-loader']
            },
            {
                test:/\.(ttf|png|svg|gif)$/,
                use : ['url-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.vue','.js','*', '.json']//设置拓展名
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./template.html',//指定参照文件
            filename:'index.html'//最终生成的文件名称，发布到node服务器
        })
    ]
}
