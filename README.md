# webpack
#### 学习webpack4.X间的学习笔记

1.开发模式和生产模式

```
 "scripts": {
    "dev":"webpack --mode development",
    "build":"webpack --mode production",
  }
```
#### 2.多入口

```
const path = require('path');
module.exports={
    //入口文件的配置项
    entry:{
        entry:'./src/entry.js',
        //这里我们又引入了一个入口文件
        entry2:'./src/entry2.js'
    },
    //出口文件的配置项
    output:{
        //输出的路径，用了Node语法
        path:path.resolve(__dirname,'dist'),
        //输出的文件名称
        filename:'[name].js'
    },
    
}
```
#### 3.服务和热更新

```
npm install webpack-dev-server --save-dev
```

配置webconfig
```
devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        // 设置服务器的ip地址，也可以是localhost
        host:'localhost',
        // 设置端口
        port:1717,
        // 设置自动拉起浏览器
        open:true,
        //设置热更新,需要引入webpack模块 并在插件plugins中配置new //Webpack.HotModuleReplacementPlugin(),
        hot:true
    },
```
配置package.json

```
"scripts": {
    "dev": "webpack-dev-server --mode development"
  },
```
在plugins中配置

```
plugins:[
    // 配置热更新
    new Webpack.HotModuleReplacementPlugin()
	]
```


> 运行 npm run dev不会生成dist,而会拉起浏览器
#### 4.压缩css
安装style-loader css-loader

```
npm install style-loader css-loader --save -dev
```
配置规则

```
 module:{
   rules:[ //配置一个rules(规则),rules是一个数组,里面包含一条一条的规则
     {
   	
       test:/\.css$/,  // test 表示测试什么文件类型
       use:[ // 使用 'style-loader','css-loader'
         'style-loader','css-loader'
       ]
     }
   ]
 },
```
loader 的三种写法
一般简单的用第一种,涉及参数配置的用第三种
1. use:['xxx-loader','xxx-loader']
2. loader:['style-loader','css-loader']
3. use:[{loader:'style-loader'},{loader:'css-loader'} ]

#### 5.配置html
1.下载
```
npm install html-webpack-plugin --save-dev
```
2.引入
```
const HtmlWebpackPlugin = require('html-webpack-plugin');  
```
3.在webpack.config.js里面的plugins里面配置插件
```
new HtmlWebpackPlugin()
```
4.配置
```
plugins:[
    new HtmlWebpakPlugin({
			minify:{
        collapseWhitespace:true, // 折叠空白区域 也就是压缩代码
        removeAttributeQuotes:true // 移除双引号，更多配置可以查看插件官网
      },
      hash:true, //向html引入的src链接后面增加一段hash值,消除缓存
      template:'./src/index.html',
      title:'webpack学习'
    })
  ]
```
#### 6.图片处理
#####  6.1css中图片处理
1.下载
```
npm install file-loader url-loader --save-dev
```
> **file-loader**：解决引用路径的问题，拿background样式用url引入背景图来说，我们都知道，webpack最终会将各个模块打包成一个文件，因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在的路径的。这就会导致图片引入失败。这个问题是用file-loader解决的，file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。

> **url-loader**：如果图片较多，会发很多http请求，会降低页面性能。这个问题可以通过url-loader解决。url-loader会将引入的图片编码，生成dataURl。相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。当然，如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy。

2.配置
```
 module: {
        rules: [
            {
                test:/\.(png|jpg|gif)/,
                use:[{
                    loader: "url-loader",
                    options: {
                        limit:50000  // 表示小于50000的图片转为base64,大于50000的是路径
                    }
                }]
            }
        ]
    },
```
###### css分离
1.下载
```
npm install --save-dev extract-text-webpack-plugin@next
```
其中@next是针对webpack4.x如果是之前的版本 不需要加@next
2.在webpack-config.js 文件中引入
```
const ExtractTextPlugin = require('extract-text-webpack-plugin');
```
3.在plugins中调用插件(配置提出来的css名称以及提到哪里)
```
module:{
    rules:[ 
      {
        test:/\.css$/,  
        use:ExtractTextPlugin.extract({
          fallback:'style-loader', // 回滚
          use:'css-loader',
          publicPath:'../' //解决css背景图的路径问题
      })
      }
    ]
}

```
##### 6.2html中的图片
与上述方法大同小异
下载：
```
npm install html-withimg-loader --save-dev
```
```
module:{
    rules:[ 
        {   //html中的图片
                test:/\.(html|htm)$/i,
                use:['html-withimg-loader']
        }
    ]
}
```
图片踩坑到此结束

#### 7.处理less sass
1.0 安装less 和 less-loader 模块
```
npm i less less-loader -D
```
1.1 安装sass-loader 和node-sass
1.2 配置rules
```
{
	test:/\.less$/,     //sass ==>  /\.scss/ 
	use:['style-loader','css-loader','less-loader'] // 编译顺序从右往左
},
```
1.3 使用ExtractTextPlugin插件分离编译后的css
```
{
	test:/\.less$/,     //sass ==>  /\.scss/ 
	// 分离编译后的css
	use:ExtractTextPlugin.extract({
		fallback:'style-loader',
		use:['css-loader','less-loader']
	})
},
```
#### 8.post预处理 自动添加属性前缀
1.安装
```
cnpm install --save-dev postcss-loader autoprefixer
```
2.配置
在根目录下新建一个postcss.config.js 如下：
```
module.exports={
    plugins:[
        require('autoprefixer')
    ]
}
```
在webpack.config.js中配置如下：
```
  module: {
    rules: [ //配置一个rules(规则),rules是一个数组,里面包含一条一条的规则
      {
        test: /\.css$/, // test 表示测试什么文件类型
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader', // 回滚
          use: [
            {
              loader:'css-loader',
              options:{
                importLoaders:1 // 在css中使用@import引入其他文件
              }
          },{
              loader: 'postcss-loader' //不加importLoaders postcss-loader不会操作引入的文件 
          }
        ]
       
        })
      }
    ]
      
  }
```
3.[更多配置](https://note.youdao.com/)
#### 9.babel 配置
>1 使用babel-loader、babel-core、babei-preset-env 转化
```
npm i babel-loader babel-core babel-preset-env -D
```
>2 在webpack.config.js 文件中定义一个处理规则
```
 // 使用babel-loader 转化新语法
{
	test:/\.(js|jsx)$/,
	use:['babel-loader'],
	exclude:'/node_modules' // 排除依赖模块文件目录
}
```
>3 在webpack.config.js同级目录配置.bablelrc文件：配置内容如下：
```
{
  "presets":[
    "env","react"
  ]
}
```
#### 下载别人的项目
```
cnpm install
npm in stall --production
```
#### 引用第三方库例如jquery
首先安装jquery
```
cnpm install --save jquery
```
**第一种方法：**
在index.js中
```
import $ from 'jquery'
```
完了之后写你的jQuery代码以$开始

**第二种方法 推荐**

在webpack.config.js中的plugins中进行配置
```
//需要先在文件首部引入webpack
  new Webpack.ProvidePlugin({
            $:'jquery'
        })
```
#### 实战积累
**在打包的文件中著名作者时间**
只需要配置一个插件
 ```
 new Webpack.BannerPlugin('刘莲版权所有')
 ```
#### 抽离类库
以前使用这种方法抽离
```
  new Webpack.optimize.CommonsChunkPlugin({
          name:'jquery',
           filename:"assets/js/jquery.min.js",
             minChunks:2
        }),
```
但是webpack4.X之后已经改成**config.optimization.splitChunks**
具体使用如下：和entry plugins这些平级加一个**optimization**
```
 optimization: {
        splitChunks: {
            cacheGroups: {
                commons:{
                    name:'jquery',
                    chunks: "initial",
                    filename:"assets/js/jquery.min.js",
                    minChunks:2
                }，
                //如果抽离多个类库写在这里
            }
        }
    },
```
#### 静态资源
1.安装copy-webpack-plugin
```
cnpm install --save-de copy-webpack-plugin
```
2. 在plugins中配置使用
 ```
//在webpack.config.js中引用
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 在plugins 中配置
new CopyWebpackPlugin([ //支持输入一个数组
	{
			from: path.resolve(__dirname, 'src/public'), //将src/public下的文件
			to: './public' // 复制到dist目录下的public文件夹中
	}
])
```