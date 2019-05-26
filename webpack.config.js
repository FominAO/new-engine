const path = require('path');
const webpack = require('webpack');


//plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: { 
        app: './src/app/app.ts',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),

    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.jpg']
    },
    devServer: {
      contentBase: './dist',
      writeToDisk: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',

            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            },
            {
              test: /\.(jpg|png)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/images',
                    publicPath: 'assets/images'
                  }
                }
              ]
            },
            // {
            //   test: /\.(png|jp(e*)g|svg)$/,  
            //   use: [{
            //       loader: 'url-loader',
            //       options: { 
            //           // limit: 8000, // Convert images < 8kb to base64 strings
            //           name: '[name].[ext]',
            //           outputPath: 'assest/images',
            //           publicPath: 'assets/images'
            //       } 
            //   }]
            // },
            {
                test: /\.ttf$/,
                use: {
                  loader: "file-loader",
                  options: {
                    name: "css/fonts/[name].[ext]",
                  },
                },
              },
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader',
                }),
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            
        ],
    },
    plugins: [
        new ExtractTextPlugin (
            'css/[name].css'
        ),
        new HtmlWebpackPlugin ({
          filename: 'index.html',
          template: 'src/index.html',
          chunks: ['app']
        }),
        new CleanWebpackPlugin (['dist'])
    ],
        
};