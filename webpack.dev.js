const merge = require("webpack-merge")
const common = require("./webpack.common.js")

module.exports = merge(common, {
    devtool: "source-map",
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
})