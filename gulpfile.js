// var gulp = require ('gulp');
// var browserSync = require('browser-sync').create();
//
// gulp.task('browserSync', function() {
//     browserSync.init ( {
//         server: {
//             baseDir: "./"
//         }
//     });
// });
//
// gulp.task('serve', ['browserSync'], function(){
//     gulp.watch("*.html").on('change', browserSync.reload);
//     gulp.watch("css/*.css").on('change', browserSync.reload);
// });
//
// gulp.task('default', ['serve']);

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var webpack = require('webpack')
var WebpackDevServer = require("webpack-dev-server")
var gutil = require("gulp-util");

gulp.task('browserSync', function() {
    browserSync.init ( {
      proxy: "localhost:5000",
        // server: {
        //     baseDir: "./",
        // }
    });
});

// gulp.task('sass', function () {
//   return gulp.src('./css/**/*.scss')
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./css'));
// });

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./resources/css/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./public/css"))
        .pipe(browserSync.stream());
});

gulp.task('sass-build', function() {
  return gulp.src("./resources/css/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("./public/css"))
});

gulp.task('sass:watch', function () {
  gulp.watch('./resources/css/**/*.scss', ['sass']);
});

gulp.task('serve', ['sass', 'browserSync'], function(){
    gulp.watch("*.html").on('change', browserSync.reload);

    gulp.watch("./resources/components/**/*.js", ['webpack'])
    gulp.watch("./resources/js/**/*.js", ['webpack'])
    gulp.watch("./resources/css/**/*.scss", ['sass'])

    gulp.watch("./public/js/**/*.js").on('change', browserSync.reload);
    gulp.watch("./public/css/*.css").on('change', browserSync.reload);
});


// gulp.task('webpack', function() {
//   return gulp.src('./resources/js/global.js')
//     .pipe(webpack( require('./webpack.config.js') ))
//     .pipe(gulp.dest('./public/js'));
// });

// modify some webpack config options
var myDevConfig = Object.create(require('./webpack.config.js'));

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack", function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack", err);
		gutil.log("[webpack]", stats.toString({
			colors: true
		}));
		callback();
	});
});

// gulp.task('default', ['sass:watch']);
gulp.task('default', ['sass','webpack','serve']);
gulp.task('production-build', ['sass-build', 'webpack']);
