var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'vendor': [
            'jquery',
            'knockout',
            'devextreme/integration/knockout',
            'devextreme/ui/date_box',
            'devextreme/ui/toolbar',
            'devextreme/ui/nav_bar',
            'devextreme/framework/html/command_container',
            'devextreme/framework/html/html_application',
            'devextreme/framework/html/view_engine_components',
            'devextreme/framework/router',
            'devextreme/framework/state_manager',
            'devextreme/framework/view_cache',
            'devextreme/framework/html/presets',
            'devextreme/framework/html/layout_controller',
            'devextreme/core/devices',
            'devextreme/mobile/process_hardware_back_button',
            'devextreme/dist/css/dx.common.css',
            'devextreme/dist/css/dx.spa.css',
            'devextreme/dist/css/dx.light.css'
        ],
        'app': './main.js'
    },

    resolve: {
        extensions: ['.js']
    },

    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'raw-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor']
        }),

        new HtmlWebpackPlugin({
            template: 'index.html'
        }),

        new ExtractTextPlugin('[name].css'),

        new webpack.optimize.UglifyJsPlugin()
    ],

    devtool: 'cheap-source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js'
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
};