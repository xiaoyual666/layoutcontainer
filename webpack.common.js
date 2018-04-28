const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        // LayoutContainer: "./index.js",
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
    }
}