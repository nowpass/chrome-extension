const gulp = require('gulp');
const { series } = require('gulp');
const zip = require('gulp-zip');
const fs = require('fs-extra');
const config = require('./build.config.json');

const destination = './dist/' + config.version;
const fileName = 'nowpass-' + config.version + '.zip';

// Simple deployment and packaging script
gulp.task('default', () => {
    console.log('Use build')
});

gulp.task('clean', async () => {
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

gulp.task('copy', async () => {
    return gulp.src('extension/**/*')
        .pipe(gulp.dest(destination));
});

gulp.task('zip', async () => {
    return gulp.src(destination + '/**')
        .pipe(zip(fileName))
        .pipe(gulp.dest('./dist'));
});

exports.build = series('zip');
