const path = require('path');
const webpackConfig = require("webpack-typescript-boilerplate")

module.exports = webpackConfig({
    devtool: 'inline-source-map',
    entryPoints: {
        main: "src/index.ts"
    },
    mode: "development",
    sourceFolder: "src",
    assetsFolder: "assets",
    HTMLTemplate: "src/index.html",
    templateParameters: {
        "title": "Webpack typescript boilerplate"
    },
    https: false
})