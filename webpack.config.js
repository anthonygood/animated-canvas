const path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var htmlPlugin = new HtmlWebpackPlugin({
  title: 'Canvas Experiment'
})

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: "./index.js",
    output: {
        filename: "./build/bundle.js"
    },
    module: {},
    plugins: [htmlPlugin],

    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 8080
    }
};

module.exports = config;
