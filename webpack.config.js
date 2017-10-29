const path = require('path');

 module.exports = {
     entry: {
         home: [
             './js/home.jsx',
         ],
         view: [
             './js/view.jsx',
         ]
     },
     output: {
         path: path.resolve(__dirname, 'js'),
         filename: 'dist/[name].js',
     },
     module: {
         loaders: [{
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     }
 }