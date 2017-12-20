const path = require('path');
const gulp = require('gulp');
const clean = require('gulp-clean');

//思考为何此处使用pipe方法时不能再添加'end'事件监听
gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean())
})

// gulp.task('copy', ['clean'], function () {
//     return gulp.src('public/static/**/*')
//         .pipe(gulp.dest('dist/static'))
// })

gulp.task('default', ['clean'])