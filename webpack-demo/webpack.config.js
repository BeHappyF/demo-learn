var webpack = require('webpack');
var path =  require('path');

module.exports = {
    entry: {
        main: './app/index.js',
        vendor: 'moment'
    },
    output: {
        filename: '[chunkhash].[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'], // Specify the common bundle's name.
            minChunks: function (module) {
               // this assumes your vendor imports exist in the node_modules directory
               return module.context && module.context.indexOf('node_modules') !== -1;
            }
        })
    ]
}
