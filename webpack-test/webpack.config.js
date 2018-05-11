const path = require('path')
const Webpack = require('webpack')
const uglify = require('uglifyjs-webpack-plugin')
const htmlplugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 解决css背景图的路径问题
var website = {
    publicPath:" http://localhost:1717/"
}

module.exports = {
    entry:{
       entry: './src/index.js',
    } ,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: website.publicPath
    },
    module: {
        rules: [
            {
                //css
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader', // 回滚
                    use:'css-loader',
                    // publicPath:'../' //解决css背景图的路径问题
                })
            },
            {
                //图片
                test:/\.(png|jpg|gif)/,
                use:[{
                    loader: "url-loader",
                    options: {
                        limit:5000 ,// 表示小于50的图片转为base64,大于50000的是路径
                        outputPath:'images/'   //打包后在imges文件加下
                    }
                }]
            },
            {   //html中的图片
                test:/\.(html|htm)$/i,
                use:['html-withimg-loader']
            },
            {
                //less
                test:/\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader', // 回滚
                    use:[
                        {
                            loader:"css-loader"
                        },
                        {
                            loader:"less-loader"
                        }
                    ]
                    // publicPath:'../' //解决css背景图的路径问题
                })

            },
            {
                //sass
                test:/\.scss/,
                use:ExtractTextPlugin.extract({
                    fallback: 'style-loader', // 回滚
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                })
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

        }),
        new ExtractTextPlugin('css/index.css')
     //   new uglify()
    ]
}