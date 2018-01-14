const gulp = require('gulp');
const zip = require('gulp-zip');
const fs = require('fs');
const config = require('./build.config.json');

const destination = './dist/' + config.version;

gulp.task('default', function () {
    try {
        fs.mkdirSync(destination);
    } catch (err) {
        // Ignore
    }

    return gulp.src('extension/**/*')
        .pipe(zip('nowpass-' + config.version + '.zip'))
        .pipe(gulp.dest(destination));
});
