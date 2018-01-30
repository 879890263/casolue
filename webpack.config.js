const path=require('path');

const ETWP=require('extract-text-webpack-plugin')
const HWP=require('html-webpack-plugin')
const fs=require('fs')
const webpack=require('webpack')
module.exports={
    entry:path.resolve("app.js"),
    output:{
        path:path.resolve('dist'),
        filename:"[name].js"
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                loader:"babel-loader"
            },
            {
                test:/\.css$/,
                use:ETWP.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                })
            },
            {
                test:/\.html$/,
                loader:"html-loader"

            },
            {
                test:/\.(jpg|png|gif|jpeg)$/,
                loader:"file-loader"
            }
        ]
    },
    devServer:{
        host:"localhost",
        port:8080,
        contentBase:".",
        setup(app){
            app.get('/mock',(req,res)=>{
                let filepath=path.resolve('src/data/data.json')
                res.end(fs.readFileSync(filepath))

            })
            

        }

    },
    plugins:[
        new HWP({
            filename:"index.html",
            template:"./src/index.html",
            inject:"body",
            hash:true
        }),
        new ETWP("main.css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:"common",
            filename:"common.js"
        }) 
    ]

}