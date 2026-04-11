const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imageMin = require('gulp-imagemin');

function styles(){
    return gulp.src('./src/styles/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
}

function images(){
    return gulp.src('./src/img/**/*', {allowEmpty: true})
        .pipe(imageMin([
            imageMin.mozjpeg({quality: 75, progressive: true}),
            imageMin.optipng({optimizationLevel: 5})
        ], {
            verbose: true
        }))
        .pipe(gulp.dest('./dist/img'));
}

exports.default = gulp.parallel(styles, images);

exports.watch = function() {
    gulp.watch('./src/styles/**/*.scss', gulp.series(styles));
    gulp.watch('./index.html');
};