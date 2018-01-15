const gulp = require('gulp');
const zip = require('gulp-zip');
const fs = require('fs');
const config = require('./build.config.json');

const destination = './dist/' + config.version;
const fileName = 'nowpass-' + config.version + '.zip';

// Simple deployment and packaging script
gulp.task('default', function () {
    try {
        fs.mkdirSync(destination);
    } catch (err) {
        // Ignore
    }

    try {
        fs.unlinkSync(destination + '/' + fileName);
    } catch (err) {
        // Ignore
    }

    gulp.src('extension/**/*')
        .pipe(gulp.dest(destination));

    gulp.src(destination + '/**')
        .pipe(zip(fileName))
        .pipe(gulp.dest(destination));
});
