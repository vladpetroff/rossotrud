'use strict';

/* Подключаем переменные для работы модулей и плагинов */
/* Чтобы вызов сработал, нужно установить webpack локально */
let path = require('path');
let webpack = require('webpack');


module.exports = {
	entry: "./frontend/js/app.js",
	output: {
		path: __dirname + '/public/new',
		filename: "build.js"
	},

	//watch: true,
	//devtool: 'source-map',

	/* loader - это то, что преобразовывает файлы */
	module: {
		loaders: [
			{
				test: /\.js?$/,
				include: path.resolve(__dirname, 'frontend/js'),
				exclude: /(node_modules|bower_components)/,
				loader: "babel",  // ||'babel-loader'
				query: {
					presets: ['es2015'],
					plugins: ['transform-es2015-modules-commonjs']
				}
			},
			{
				test: /\.jade/,
				loader: 'jade'
			}
		]
	},

	//plugins: [
	//	new webpack.optimize.UglifyJsPlugin({
	//		compress: {
	//			warnings: false
	//		}
	//	})
	//]

};