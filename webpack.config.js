let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: [
            'webpack/hot/dev-server',
            'webpack-hot-middleware/client?reload=true',
            path.join(__dirname, 'webclient', 'clientapp.jsx')
        ]
    },
    output: {
        path: path.join(__dirname, 'webclient', 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loaders: ['babel?presets[]=react,presets[]=es2015,presets[]=stage-0']
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.(jpe?g|png|gif|svg|pdf)$/i,
                loaders: ['file-loader']
            }, {
                test: /\.json$/,
                loaders: ['json-loader']
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '/index.js', '/index.jsx']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({template: path.resolve('./webclient/index.html')}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false,
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true
            },
            output: {
                comments: false
            },
            exclude: [/\.min\.js$/gi]
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new CompressionPlugin({asset: '[path].gz[query]', algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/, threshold: 10240, minRatio: 0})
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
