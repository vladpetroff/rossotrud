'use strict';

const gulp = require('gulp');  //https://www.npmjs.com/package/gulp-4.0.build
const sass = require('gulp-sass');  //https://www.npmjs.com/package/gulp-sass/
const jade = require('gulp-jade'); //https://www.npmjs.com/package/gulp-jade/
const debug = require('gulp-debug');  //https://www.npmjs.com/package/gulp-debug/
const imagemin = require('gulp-imagemin'); //https://www.npmjs.com/package/gulp-imagemin/
const rename = require('gulp-rename');  //https://www.npmjs.com/package/gulp-rename/
const browserSync = require("browser-sync").create();  //https://www.npmjs.com/package/browser-sync
const reload = browserSync.reload;
const uncss = require('gulp-uncss'); // Удаляет неиспользуемые стили. https://www.npmjs.com/package/gulp-uncss/
const sourcemaps = require('gulp-sourcemaps');  //https://www.npmjs.com/package/gulp-sourcemaps
const del = require('del'); // Удаляет файлы. https://www.npmjs.com/package/del
const newer = require('gulp-newer'); // копирует только новые файлы. https://www.npmjs.com/package/gulp-newer
const concat = require('gulp-concat-css'); // объединяет файлы-css

/* Обработка ошибок */
const notify = require('gulp-notify'); // https://www.npmjs.com/package/gulp-notify
const plumber = require('gulp-plumber'); // передает onError через все потоки по цепочке

const webpackStream  = require('webpack-stream');
const webpack = webpackStream.webpack;
const wpath = require('path');
const autoprefixer = require('gulp-autoprefixer');  //https://www.npmjs.com/package/gulp-autoprefixer/
const minifyCSS = require('gulp-minify-css');  //https://www.npmjs.com/package/gulp-minify-css
const named = require('vinyl-named');  //определяет какой файл в какую сборку по названию
const gulplog = require('gulplog');
//const svgSprite = require('gulp-svg-sprite'); //https://www.youtube.com/watch?v=VqYAitDKbpo&list=PLDyvV36pndZFLTE13V4qNWTZbeipNhCgQ&index=13

/************************************************/

const path = {
	public: { //Тут мы укажем куда складывать готовые после сборки файлы
		html: 'public/',
		jade: 'public/',
		scripts: 'public/js/',
		style: 'public/css/',
		fonts: 'public/fonts/',
		img: 'public/img/'
	},
	src: { // Пути откуда копируем исходники
		scripts: [
			'assets/js/**/*.js',
			'src/bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
			//'src/bower_components/jquery/public/jquery.min.js'
		],
		style: 'assets/css/*.css',
		fonts: 'assets/fonts/*.*',
		assets: 'assets/**/*.*'
	},
	watch: { // Укажем, за изменением каких файлов мы хотим наблюдать
		html: 'public/*.html',
		jade: 'src/**/*.jade',
		scripts: 'src/js/*.js', // только скрипты верхнего уровня
		sass: [
			'src/bower_components/bootstrap-sass/assets/stylesheets/bootstrap/**/*.scss',
			'src/css/*.scss'
		],
		style: 'src/css/*.css',
		img: 'src/img/**/*.*',
		imgcomponents: 'public/js/img/**/*.*'
	},
	clean: { // Файлы, которые нужно удалить после сборки
		map: 'public/css/*.map',
		jsmap: 'public/js/*.map',
		includes: 'public/includes',
		modules: 'public/js/modules',
		imgcomponents: 'public/js/img'
	}
};

/************************************************/

gulp.task('jade', function () {
	return gulp.src(path.watch.jade)
		// .pipe(debug({title: "jade;"}))
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: 'Jade',
					message: err.message
				};
			})
		}))
		.pipe(jade({
			pretty: true
		}))
		.pipe(newer(path.public.jade))
		.pipe(gulp.dest(path.public.jade))
});

gulp.task('html', function () {
	return gulp.src(path.watch.html, {since: gulp.lastRun('html')})
		// .pipe(rigger())  // сборка футера, хидера,...
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: 'HTML',
					message: err.message
				};
			})
		}))
		.pipe(newer(path.public.html))
		.pipe(gulp.dest(path.public.html))
});

gulp.task('sass', function () {
	return gulp.src(path.watch.sass) //, {since: gulp.lastRun('sass')}
		//.pipe(debug({title: "sass;"}))
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: 'Sass',
					message: err.message
				};
			})
		}))
		.pipe(newer(path.public.style))
		.pipe(sourcemaps.init()) // file получил пустой sourcemap
		.pipe(sass())
		.pipe(autoprefixer('last 5 versions'))
		.pipe(sourcemaps.write('.'))  // заполняем sourcemap и кладем в тот же каталог отдельно
		.pipe(debug({title: "sass:"}))
		.pipe(gulp.dest(path.public.style))
});

gulp.task('imgcomponents', function () {
	return gulp.src(path.watch.imgcomponents)
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: 'imgcomponents',
					message: err.message
				};
			})
		}))
		.pipe(gulp.dest(path.public.img))
})

gulp.task('webpack', function(callback) {
	// сигнализируем об окончании сборки, чтоб не подвешивать поток
	let firstBuildReady = false;

	function done(err, stats) {
		firstBuildReady = true;

		if (err) { // hard error - ломает сборку
			return;
		}

		gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
			colors: true
		}));
	}

	let options = {
		//entry: "src/js/**/*.js",
		//output: {
		//	path: __dirname + '/public/new',
		//	filename: "main.js"
		//},

		watch: true,
		//devtool: 'source-map',

		/* loader - это то, что преобразовывает файлы */
		module: {
			loaders: [
				{
					test: /\.js?$/,
					include: wpath.resolve(__dirname),
					exclude: /(node_modules|bower_components)/,
					loader: "babel",
					query: {
						presets: ['es2015'],
						plugins: ['transform-es2015-modules-commonjs']
					}
				},
				{
					test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
					//loader: 'file?name=[path][name].[ext]'
					loader: 'file?name='+'./img/imgComponents/'+'[name].[ext]'
				},{
					test: /\.jade/,
					loader: 'jade'
				},
				{
					test: /\.scss$/,
					loader: 'style!css!resolve-url!sass'  // необходимо установить все эти лоадеры
				}
			]
		},

		plugins: [
			//new webpack.optimize.UglifyJsPlugin({
			//	compress: {
			//		warnings: false
			//	}
			//})

			/* Выносим общие куски файлов js в отдельный common.js */
			/* https://www.youtube.com/watch?v=aET3GxoHBug&list=PLDyvV36pndZHfBThhg4Z0822EEG9VGenn&index=14 */
			//new webpack.optimize.CommonsChunkPlugin({
			//	name: "common",
			//  minChunks: 2  // выносит общие модули, если их используют мин. 2 файла js
			//}),

			/* Если ошибка, сборку останавливаем */
			new webpack.NoErrorsPlugin()
		]
	};

	return gulp.src(path.watch.scripts)
		.pipe(plumber({
			errorHandler: notify.onError(err => ({
				title: 'Webpack',
				message: err.message
			}))
		}))
		.pipe(named())
		.pipe(webpackStream(options, null, done))
		.pipe(gulp.dest(path.public.scripts))
		.on('data', function() { // эмулируем завершение сборки (хак)
			if (firstBuildReady) {
				callback();
			}
		});
});

gulp.task('assets', function () {
	return gulp.src(path.src.assets, {since: gulp.lastRun('assets')})
		//.pipe(debug({title: "assets;"}))
		.pipe(newer(path.src.assets))
		.pipe(gulp.dest('public'))
});

gulp.task('clean', function () {
	return del([path.clean.includes, path.clean.jsmap, path.clean.map, path.clean.modules, path.clean.imgcomponents]);
});

gulp.task('minify-css', function () {
	return gulp.src('public/css/style.css')
		//.pipe(debug({title: "minifyCSS;"}))
		.pipe(uncss({
			html: [path.watch.html]
		}))
		.pipe(minifyCSS({keepBreaks: false}))
		//.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.public.style))
});

gulp.task('imagemin', function () {
	return gulp.src(path.watch.img)
		.pipe(plumber({
			errorHandler: notify.onError(function(err) {
				return {
					title: 'Image',
					message: err.message
				};
			})
		}))
		.pipe(newer(path.public.img))
		//.pipe(debug({title: "imagemin;"}))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			// use: [pngquant()],
			interlaced: true
		}))
		.pipe(gulp.dest(path.public.img))
});

gulp.task('browserSync', function () {
	browserSync.init({
		server: {
			baseDir: path.public.html
		},
		port: 8080,
		open: true,
		notify: false
	});
	browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

/***********************************************/

gulp.task('watch', function() {
	gulp.watch(path.watch.sass, gulp.series('sass'));
	//gulp.watch(path.watch.scripts, gulp.series('scripts'));
	gulp.watch(path.watch.jade, gulp.series('jade'));
	gulp.watch(path.watch.img, gulp.series('imagemin'));
	gulp.watch(path.watch.imgcomponents, gulp.series('imgcomponents'));
});

gulp.task('default', gulp.series(
	gulp.parallel('jade', 'assets', 'sass', 'imgcomponents', 'imagemin', 'webpack'),
	gulp.parallel('watch', 'browserSync')
	)
);

gulp.task('build', gulp.series(
	'clean',
	gulp.parallel('imagemin', 'minify-css'))
);
