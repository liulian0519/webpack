const path = require('path')
const Webpack = require('webpack')
const uglify = require('uglifyjs-webpack-plugin')
const htmlplugin = require('html-webpack-plugin')
module.exports = {
    entry:{
       entry: './src/index.js',
    } ,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use: ['style-loader','css-loader']
            }
        ]
    },
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        // 设置服务器的ip地址，也可以是localhost
        host:'localhost',
        // 设置端口
        port:1717,
        // 设置自动拉起浏览器
        open:true,
        //设置热更新,需要引入webpack模块，
        hot:true
    },
    plugins: [
        // 配置热更新
        new Webpack.HotModuleReplacementPlugin(),
        //html
        new htmlplugin({
            minify:{
                collapseWhitespace:true, // 折叠空白区域 也就是压缩代码
                removeAttributeQuotes:true // 移除双引号
            },
            hash:true, //向html引入的src链接后面增加一段hash值,消除缓存
            template:'./src/index.html'

        })
     //   new uglify()
    ]
}