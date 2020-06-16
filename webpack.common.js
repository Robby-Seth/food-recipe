const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry:'./src/main.js',
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:'bundled.js'
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[
                    {
                        loader:'style-loader'
                    },
                    {
                        loader:'css-loader'
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader:'url-loader?limit=10000',
                    },
                    {
                        loader:'img-loader'
                    }
                  ] 
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: "./src/base.html",
            filename: "index.html"
        })
    ]
};