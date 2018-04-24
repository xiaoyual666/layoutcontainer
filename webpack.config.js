const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    entry: {
        LayoutContainer: "./index.js",
        example: "./example/example.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modeuls|bower_components)/,
                use: {
                    loader: "buble-loader",
                    options: {
                        objectAssign: "Object.assign"
                    }
                }
            }

        ]
    },
    devtool: "source-map",

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
}