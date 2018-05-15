# webpack
#### ѧϰwebpack4.X���ѧϰ�ʼ�

1.����ģʽ������ģʽ

```
 "scripts": {
    "dev":"webpack --mode development",
    "build":"webpack --mode production",
  }
```
#### 2.�����

```
const path = require('path');
module.exports={
    //����ļ���������
    entry:{
        entry:'./src/entry.js',
        //����������������һ������ļ�
        entry2:'./src/entry2.js'
    },
    //�����ļ���������
    output:{
        //�����·��������Node�﷨
        path:path.resolve(__dirname,'dist'),
        //������ļ�����
        filename:'[name].js'
    },
    
}
```
#### 3.������ȸ���

```
npm install webpack-dev-server --save-dev
```

����webconfig
```
devServer:{
        contentBase:path.resolve(__dirname,'dist'),
        // ���÷�������ip��ַ��Ҳ������localhost
        host:'localhost',
        // ���ö˿�
        port:1717,
        // �����Զ����������
        open:true,
        //�����ȸ���,��Ҫ����webpackģ�� ���ڲ��plugins������new //Webpack.HotModuleReplacementPlugin(),
        hot:true
    },
```
����package.json

```
"scripts": {
    "dev": "webpack-dev-server --mode development"
  },
```
��plugins������

```
plugins:[
    // �����ȸ���
    new Webpack.HotModuleReplacementPlugin()
	]
```


> ���� npm run dev��������dist,�������������
#### 4.ѹ��css
��װstyle-loader css-loader

```
npm install style-loader css-loader --save -dev
```
���ù���

```
 module:{
   rules:[ //����һ��rules(����),rules��һ������,�������һ��һ���Ĺ���
     {
   	
       test:/\.css$/,  // test ��ʾ����ʲô�ļ�����
       use:[ // ʹ�� 'style-loader','css-loader'
         'style-loader','css-loader'
       ]
     }
   ]
 },
```
loader ������д��
һ��򵥵��õ�һ��,�漰�������õ��õ�����
1. use:['xxx-loader','xxx-loader']
2. loader:['style-loader','css-loader']
3. use:[{loader:'style-loader'},{loader:'css-loader'} ]

#### 5.����html
1.����
```
npm install html-webpack-plugin --save-dev
```
2.����
```
const HtmlWebpackPlugin = require('html-webpack-plugin');  
```
3.��webpack.config.js�����plugins�������ò��
```
new HtmlWebpackPlugin()
```
4.����
```
plugins:[
    new HtmlWebpakPlugin({
			minify:{
        collapseWhitespace:true, // �۵��հ����� Ҳ����ѹ������
        removeAttributeQuotes:true // �Ƴ�˫���ţ��������ÿ��Բ鿴�������
      },
      hash:true, //��html�����src���Ӻ�������һ��hashֵ,��������
      template:'./src/index.html',
      title:'webpackѧϰ'
    })
  ]
```
#### 6.ͼƬ����
#####  6.1css��ͼƬ����
1.����
```
npm install file-loader url-loader --save-dev
```
> **file-loader**���������·�������⣬��background��ʽ��url���뱳��ͼ��˵�����Ƕ�֪����webpack���ջὫ����ģ������һ���ļ������������ʽ�е�url·����������htmlҳ��ģ������������ԭʼcss�ļ����ڵ�·���ġ���ͻᵼ��ͼƬ����ʧ�ܡ������������file-loader����ģ�file-loader���Խ�����Ŀ�е�url���루��������css�����������ǵ����ã���ͼƬ��������Ӧ��·�����ٸ������ǵ����ã��޸Ĵ�����ļ�����·����ʹָ֮����ȷ���ļ���

> **url-loader**�����ͼƬ�϶࣬�ᷢ�ܶ�http���󣬻ή��ҳ�����ܡ�����������ͨ��url-loader�����url-loader�Ὣ�����ͼƬ���룬����dataURl���൱�ڰ�ͼƬ���ݷ����һ���ַ����ٰ��⴮�ַ�������ļ��У�����ֻ��Ҫ��������ļ����ܷ���ͼƬ�ˡ���Ȼ�����ͼƬ�ϴ󣬱�����������ܡ����url-loader�ṩ��һ��limit������С��limit�ֽڵ��ļ��ᱻתΪDataURl������limit�Ļ���ʹ��file-loader����copy��

2.����
```
 module: {
        rules: [
            {
                test:/\.(png|jpg|gif)/,
                use:[{
                    loader: "url-loader",
                    options: {
                        limit:50000  // ��ʾС��50000��ͼƬתΪbase64,����50000����·��
                    }
                }]
            }
        ]
    },
```
###### css����
1.����
```
npm install --save-dev extract-text-webpack-plugin@next
```
����@next�����webpack4.x�����֮ǰ�İ汾 ����Ҫ��@next
2.��webpack-config.js �ļ�������
```
const ExtractTextPlugin = require('extract-text-webpack-plugin');
```
3.��plugins�е��ò��(�����������css�����Լ��ᵽ����)
```
module:{
    rules:[ 
      {
        test:/\.css$/,  
        use:ExtractTextPlugin.extract({
          fallback:'style-loader', // �ع�
          use:'css-loader',
          publicPath:'../' //���css����ͼ��·������
      })
      }
    ]
}

```
##### 6.2html�е�ͼƬ
������������ͬС��
���أ�
```
npm install html-withimg-loader --save-dev
```
```
module:{
    rules:[ 
        {   //html�е�ͼƬ
                test:/\.(html|htm)$/i,
                use:['html-withimg-loader']
        }
    ]
}
```
ͼƬ�ȿӵ��˽���

#### 7.����less sass
1.0 ��װless �� less-loader ģ��
```
npm i less less-loader -D
```
1.1 ��װsass-loader ��node-sass
1.2 ����rules
```
{
	test:/\.less$/,     //sass ==>  /\.scss/ 
	use:['style-loader','css-loader','less-loader'] // ����˳���������
},
```
1.3 ʹ��ExtractTextPlugin������������css
```
{
	test:/\.less$/,     //sass ==>  /\.scss/ 
	// ���������css
	use:ExtractTextPlugin.extract({
		fallback:'style-loader',
		use:['css-loader','less-loader']
	})
},
```
#### 8.postԤ���� �Զ��������ǰ׺
1.��װ
```
cnpm install --save-dev postcss-loader autoprefixer
```
2.����
�ڸ�Ŀ¼���½�һ��postcss.config.js ���£�
```
module.exports={
    plugins:[
        require('autoprefixer')
    ]
}
```
��webpack.config.js���������£�
```
  module: {
    rules: [ //����һ��rules(����),rules��һ������,�������һ��һ���Ĺ���
      {
        test: /\.css$/, // test ��ʾ����ʲô�ļ�����
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader', // �ع�
          use: [
            {
              loader:'css-loader',
              options:{
                importLoaders:1 // ��css��ʹ��@import���������ļ�
              }
          },{
              loader: 'postcss-loader' //����importLoaders postcss-loader�������������ļ� 
          }
        ]
       
        })
      }
    ]
      
  }
```
3.[��������](https://note.youdao.com/)
#### 9.babel ����
>1 ʹ��babel-loader��babel-core��babei-preset-env ת��
```
npm i babel-loader babel-core babel-preset-env -D
```
>2 ��webpack.config.js �ļ��ж���һ���������
```
 // ʹ��babel-loader ת�����﷨
{
	test:/\.(js|jsx)$/,
	use:['babel-loader'],
	exclude:'/node_modules' // �ų�����ģ���ļ�Ŀ¼
}
```
>3 ��webpack.config.jsͬ��Ŀ¼����.bablelrc�ļ��������������£�
```
{
  "presets":[
    "env","react"
  ]
}
```
#### ���ر��˵���Ŀ
```
cnpm install
npm in stall --production
```
#### ���õ�����������jquery
���Ȱ�װjquery
```
cnpm install --save jquery
```
**��һ�ַ�����**
��index.js��
```
import $ from 'jquery'
```
����֮��д���jQuery������$��ʼ

**�ڶ��ַ��� �Ƽ�**

��webpack.config.js�е�plugins�н�������
```
//��Ҫ�����ļ��ײ�����webpack
  new Webpack.ProvidePlugin({
            $:'jquery'
        })
```
#### ʵս����
**�ڴ�����ļ�����������ʱ��**
ֻ��Ҫ����һ�����
 ```
 new Webpack.BannerPlugin('������Ȩ����')
 ```
#### �������
��ǰʹ�����ַ�������
```
  new Webpack.optimize.CommonsChunkPlugin({
          name:'jquery',
           filename:"assets/js/jquery.min.js",
             minChunks:2
        }),
```
����webpack4.X֮���Ѿ��ĳ�**config.optimization.splitChunks**
����ʹ�����£���entry plugins��Щƽ����һ��**optimization**
```
 optimization: {
        splitChunks: {
            cacheGroups: {
                commons:{
                    name:'jquery',
                    chunks: "initial",
                    filename:"assets/js/jquery.min.js",
                    minChunks:2
                }��
                //������������д������
            }
        }
    },
```
#### ��̬��Դ
1.��װcopy-webpack-plugin
```
cnpm install --save-de copy-webpack-plugin
```
2. ��plugins������ʹ��
 ```
//��webpack.config.js������
const CopyWebpackPlugin = require('copy-webpack-plugin');
// ��plugins ������
new CopyWebpackPlugin([ //֧������һ������
	{
			from: path.resolve(__dirname, 'src/public'), //��src/public�µ��ļ�
			to: './public' // ���Ƶ�distĿ¼�µ�public�ļ�����
	}
])
```