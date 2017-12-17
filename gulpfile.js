const
    gulp = require('gulp'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    cmq = require('gulp-combine-mq'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    svgstore = require('gulp-svgstore'),
    path = require('path'),
    paths = {
        source: './app/Resources/assets/',
        views: './app/Resources/views/',
        dist: './web/dist/'
    }
;

//CLEAN
gulp.task('clean', function (cb) {
    del([
        paths.dist + '**/*'
    ], cb);
});

//IMAGES
gulp.task('images', ['imgCopy']);

gulp.task('imgCopy', ['imgSvg'], function () {
    return gulp
        .src(['!icons', '!icons/**/*', '**/*'], {cwd: paths.source + 'images'})
        .pipe(gulp.dest('', {cwd: paths.dist + 'images'}))
        ;
});

gulp.task('imgSvg', function () {
    return gulp
        .src('*.svg', {cwd: paths.source + 'images/icons'})
        .pipe(rename({prefix: 'icon-'}))
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(gulp.dest('icons', {cwd: paths.views}))
        ;
});

//CSS + FONTS
gulp.task('css', ['fontCopy'], function () {
    return gulp
        .src('*.scss', {cwd: paths.source + 'styles'})
        .pipe(sass().on('error', sass.logError))
        // autoprefixer
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        // combine media queries
        .pipe(cmq({
            beautify: false,
            showLog: false
        }))
        .pipe(gulp.dest('', {cwd: paths.dist + 'styles'}));
});

gulp.task('fontCopy', function () {
    return gulp
        .src(['**/*'], {cwd: paths.source + 'fonts'})
        .pipe(gulp.dest('', {cwd: paths.dist + 'fonts'}))
        ;
});

//BUILD
gulp.task('default', ['images', 'css'], function () {
    console.log('Default done !');
});

//WATCH FILES BY TYPE
gulp.task('watch', ['default'], function () {
    gulp
        .watch([paths.source + 'images/**/*'], ['images'], function () {
            console.log('\nWatching...');
        })
        .on('change', function (event) {
            console.log('File ' + event.path + ' has been ' + event.type);
        });
    gulp
        .watch([paths.source + 'styles/' + '**/*'], ['css'], function () {
            console.log('\nWatching...');
        })
        .on('change', function (event) {
            console.log('File ' + event.path + ' has been ' + event.type);
        });
});

gulp.task('w', ['watch'], function () {
    console.log('\nWatching...');
});
