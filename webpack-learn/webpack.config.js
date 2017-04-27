var path = require('path');
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var production = process.env.NODE_ENV === 'production';

var ROOT_PATH = path.join(__dirname); // 项目根目录
var BUILD_PATH = path.resolve(ROOT_PATH, 'build'); // 最后输出放置公共资源的目录

var plugins = [
    new ExtractPlugin('bundle.css'),    // 提取css后的文件
    new webpack.optimize.CommonsChunkPlugin({
        name: 'main',
        children: true,
        minChunks: 2,
    }),
];

if (production) {
    plugins = plugins.concat([
        // 在打包前清空 builds/ 文件夹
        new CleanPlugin('builds'),
        // 这个插件用来寻找相同的包和文件，并把它们合并在一起
        // WARNING in DedupePlugin: This plugin was removed from webpack. remove it from configuration.
        // 新版本webpack的变化
        // new webpack.optimize.DedupePlugin(),

        // 这个插件根据包/库的引用次数来优化它们
        // 加了会报错
        // new webpack.optimize.OccurenceOrderPlugin(),

        // 这个插件用来阻止Webpack把过小的文件打成单独的包
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200, // ~50kb
        }),

        // 压缩js文件
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false, // 禁止生成warning
            },
        }),

        // 这个插件提供了各种可用在生产环境下的变量
        // 通过设置为false，可避免生产环境下调用到它们
        new webpack.DefinePlugin({
            __SERVER__: !production,
            __DEVELOPMENT__: !production,
            __DEVTOOLS__: !production,
            'process.env': {
                BABEL_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ]);
}

module.exports = {
    // entry: './src',
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        './src/index.js'
    ],
    output: {
        path: BUILD_PATH,
        filename: production ? '[name]-[hash].js' : 'bundle.js',
        // 版本化chunk包
        chunkFilename: '[name]-[chunkhash].js',
        // output.publicPath告诉Webpack
        // 从当前页面的位置出发哪里可以找到需要的资源（在这个例子里是/builds/）
        publicPath: 'http://localhost:8080/builds/',
    },
    devServer: {
        hot: true,
    },
    plugins: plugins,
    module: {
        loaders: [
            {
                test: /\.js/,
                // 针对es2015(es6)进行转化
                loader: 'babel-loader',
                // 我们希望在自己的.js代码进行转化，而第三方如jquery，则避免。
                // 所以在include(|| exclude)字段设置包含需要转化的文件所在文件夹。
                // 字段值可以是字符串 || 正则 || 回调 等。
                include: __dirname + '/src',
            },{
                test: /\.scss/,
                // webpack会依次处理不同loader的返回结果
                // 有两种表达方式
                // ExtractPlugin.extract的两个参数
                // 第一个参数代表当它处于已经打包好的包（'style'）里时，如何处理那些提取出来的东西
                // 第二个参数代表当它在主文件（'css!sass'）里时，如何对待提取出的东西
                loader: ExtractPlugin.extract({fallback: 'style-loader', use: 'css-loader!sass-loader'}),
                // Or
                // loaders: ['style-loader', 'css-loader', 'sass-loader'],
            },{
                test: /\.html/,
                loader: 'html-loader',
            },{
                test: /\.(png|gif|jpe?g|svg)$/i,
                loader: 'url-loader',
                query: {
                  limit: 10000,
                }
            }
        ]
    }
};
