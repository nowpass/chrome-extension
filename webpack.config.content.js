module.exports = {
    entry: './src/content/app.js',
    output: {
        path: __dirname + '/extension/static/js',
        filename: 'content-script.min.js'
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
