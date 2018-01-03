module.exports = {
    entry: './src/background/app.js',
    output: {
        path: __dirname + '/extension/static/js',
        filename: 'background.min.js'
    },
    externals: {
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    devtool: 'source-map'
};
