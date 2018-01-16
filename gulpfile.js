const gulp = require('gulp');
const zip = require('gulp-zip');
const fs = require('fs-extra');
const config = require('./build.config.json');

const destination = './dist/' + config.version;
const fileName = 'nowpass-' + config.version + '.zip';

// Simple deployment and packaging script
gulp.task('default', function () {
    console.log('Use build')
});

gulp.task('clean', function () {
    try {
        fs.removeSync(destination);
    } catch (err) {
        // Ignore
    }

    try {
        fs.mkdirSync(destination);
    } catch (err) {
        // Ignore
    }

    return true;
});

gulp.task('copy', ['clean'], function () {
    return gulp.src('extension/**/*')
        .pipe(gulp.dest(destination));
});

gulp.task('zip', ['copy'], function () {
    return gulp.src(destination + '/**')
        .pipe(zip(fileName))
        .pipe(gulp.dest(destination));
});

gulp.task('build', ['clean', 'copy', 'zip']);
