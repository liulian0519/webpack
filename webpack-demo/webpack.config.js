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
    devServer: {

    }
}