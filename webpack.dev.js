const merge = require("webpack-merge")
const common = require("./webpack.common.js")
const path = require("path")

module.exports = merge(common, {
    devtool: "source-map",
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname),
        compress: true,
        port: 9000
    }
})