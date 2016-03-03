const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        app: './assets/src/js/app.js',
        vendor: ['knockout']
    },
    output: {
        path: './assets/dist/js',
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract( 'style', 'raw!sass' )
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        }),
        new ExtractTextPlugin('../../dist/css/style.css', {
            allChunks: true
        })
    ]
}

