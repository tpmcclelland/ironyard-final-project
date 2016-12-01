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
var webpack = require('webpack-stream')
var WebpackDevServer = require("webpack-dev-server")
var gutil = require("gulp-util");

gulp.task('browserSync', function() {
    browserSync.init ( {
        server: {
            baseDir: "./"
        }
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

gulp.task('sass:watch', function () {
  gulp.watch('./resources/css/**/*.scss', ['sass']);
});

gulp.task('serve', ['sass', 'browserSync'], function(){
    gulp.watch("*.html").on('change', browserSync.reload);
    // gulp.watch("./js/**/*.js").on('change', browserSync.reload);
    gulp.watch("./resources/components/**/*.js", ['webpack']);
    gulp.watch("./resources/js/**/*.js", ['webpack']);
    gulp.watch("./resources/css/**/*.scss", ['sass']);
    // gulp.watch("css/*.css").on('change', browserSync.reload);
});


gulp.task('webpack', function() {
  return gulp.src('./resources/js/global.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('./public/js'));
});

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack({
        // configuration
    });

    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

        // keep the server alive or continue?
        // callback();
    });
});
// gulp.task('default', ['sass:watch']);
gulp.task('default', ['serve']);
