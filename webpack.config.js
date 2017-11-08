const webpack = require('webpack');
const path = require('path');

const PUBLIC = path.resolve(__dirname, 'public');
const SRC = path.resolve(__dirname, 'src');

var config = {
    entry: path.resolve(SRC, 'index.js'),
    output: {
        path: PUBLIC,
        filename: 'bundle.js'
    },
    devServer: {
      contentBase: PUBLIC
    },
    module: {
      loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                  limit: 10000
                }
            },
            {
                test: /\.jsx?$/,
                include: SRC,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: [
                      'transform-class-properties',
                      'babel-plugin-transform-decorators-legacy'
                    ]
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({   
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ]
};

module.exports = config;