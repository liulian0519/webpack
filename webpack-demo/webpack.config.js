const path = require('path');
module.exports ={
    //入口
    entry: {
        entry:'./src/entry.js',
        entry2:'./src/entry2.js'
    },
    //出口
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "[name].js"
    },
    module: {

    },
    plugins: [],      //插件
    //服务
    devServer: {
        contentBase:path.resolve(__dirname,'dist'),
        host:'192.168.1.133',
        compress:true,    //服务器压缩
        port:1717
    }
}