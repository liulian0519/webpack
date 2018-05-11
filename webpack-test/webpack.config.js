const path = require('path')
const Webpack = require('webpack')

module.exports = {
    entry:{
       entry: './src/index.js',
       entry2:'./src/index2.js'
    } ,
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
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
        new Webpack.HotModuleReplacementPlugin()
    ]
}