var util = require('util'),
    path = require('path'),
    gulp = require('gulp'),
    gulpUtil = require('gulp-util'),
    pkg = require('./package.json'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    template = require('gulp-template'),
    browserify = require('gulp-browserify'),
    exorcist = require('exorcist'),
    debug = require('gulp-debug'),
    plumber = require('gulp-plumber'),
    transform = require('vinyl-transform'),
    _ = require('lodash');

pkg = _.extend(pkg, {
    date: (function(d) {
        return util.format('%d/%d/%d', d.getFullYear(), d.getMonth(), d.getDate());
    })(new Date()),
    selDOMjs: pkg.name + '.js',
    selDOMjs_min: pkg.name + '.min.js'
});

// Lint JS
gulp.task('lint', function() {
    gulp.src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Template Replace, Concat & Minify JS
gulp.task('minify', function() {
    gulp.src(['./src/selDOM.js'])
        .pipe(plumber())
        .pipe(browserify({
            debug: true
        }))
        .pipe(transform(function() {
            return exorcist(path.join(__dirname, 'dist/', pkg.name + '.js.map'));
        }))
        .pipe(template(pkg))
        .pipe(rename(pkg.name + '.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename(pkg.name + '.min.js'))
        .pipe(uglify({
            outSourceMap: true
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('move', function() {
    gulp.src(['./src/*.html'])
        .pipe(template(pkg))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    gulp.watch(['./src/*.html'], ['move']);
    gulp.watch(['./src/*.js'], ['lint', 'minify']);
});

// Default
gulp.task('default', ['lint', 'minify', 'move'], function() {
    gulp.watch(["./gulpfile.js", "./src/*.js", './src/*.html'], ['lint', 'minify', 'move'],
        function(event) {
            gulpUtil.log(gulpUtil.colors.cyan(event.path), 'changed');
        }
    );
});