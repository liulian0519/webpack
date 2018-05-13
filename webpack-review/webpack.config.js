const path = require('path')
const Webpack = require('webpack');
const htmlplugin = require('html-webpack-plugin')
const glob = require('glob')
const purifyCssPlugin = require('purifycss-webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const entry = require('./webpack_config/entry_webpack')

// 解决css背景图的路径问题
var website = {
    publicPath:" http://localhost:1717/"
}


module.exports = {
    devtool:'',
    entry:{
        entry:'./src/index.js',
        jquery:'jquery',
        vue:'vue'
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
                //css
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader', // 回滚
                    use:[
                        {
                            loader:'css-loader',
                            options:{importLoaders:1},

                        },
                        'postcss-loader'
                    ]
                    // publicPath:'../' //解决css背景图的路径问题
                })
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader: 'url-loader',
                    options: {
                         outputPath:'images/',
                        limit:500  // 表示小于50000的图片转为base64,大于50000的是路径
                    }
                }]
            },
            {
                test: /\.(htm|html)$/i,
                use:[ 'html-withimg-loader']
            },
            // 使用babel-loader 转化新语法
            {
                test:/\.(js|jsx)$/,
                use:['babel-loader'],
                exclude:'/node_modules' // 排除依赖模块文件目录
            }

        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons:{
                    name:'jquery',
                    chunks: "initial",
                    filename:"assets/js/jquery.min.js",
                    minChunks:2
                },
                b:{
                    name:'vue',
                    chunks: "initial",
                    filename:"assets/js/vue.js",
                    minChunks:2
                }
            }
        }
    },
    plugins: [
        // new Webpack.optimize.CommonsChunkPlugin({
        //     name:'jquery',
        //     filename:"assets/js/jquery.min.js",
        //     minChunks:2
        // }),
        new Webpack.HotModuleReplacementPlugin(),
        new htmlplugin({
            minify:{
                collapseWhitespace:true, // 折叠空白区域 也就是压缩代码
                removeAttributeQuotes:true // 移除双引号
            },
            hash:true, //向html引入的src链接后面增加一段hash值,消除缓存
            template:'./src/index.html'

        }),
        new purifyCssPlugin({
            paths:glob.sync(path.join(__dirname,'src/*.html'))
        }),

        new ExtractTextPlugin("css/index.css"),
        new Webpack.ProvidePlugin({
            $:'jquery'
        }),
        new Webpack.BannerPlugin('刘莲版权所有')

    ],
//在原来基础上加下边这个就行
    devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        // 设置服务器的ip地址，也可以是localhost
        host:'localhost',
        // 设置端口
        port:1717,
        // 设置自动拉起浏览器
        open:true,
        hot:true,
    },
    watchOptions: {
        poll: 1000,
        aggregateTimeout:500,
        ignored:/node_modules/
    }

}

