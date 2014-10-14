var gulp = require('gulp')
    , manifest = require('gulp-manifest')
    , concat = require('gulp-concat')
    , uglify = require('gulp-uglify');

gulp.task('default', ['buildJS'], function(){
    //concat and uglify
});

gulp.task('build', ['buildJS', 'manifest'], function(){
    //combine the js files
    //update the appcache manifest
});

gulp.task('manifest', function(){
    gulp.src(['public/built/*'])
        .pipe(manifest({
          hash: true,
          preferOnline: true,
          network: ['http://*', 'https://*', '*'],
          filename: 'manifest.appcache',
          exclude: 'manifest.appcache'
         }))
        .pipe(gulp.dest('public/built'));
});

gulp.task('buildJS', function(){
    gulp.src([
                'public/scripts/app.js'
                , 'public/scripts/components/**/*.js'
            ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/built'));
});