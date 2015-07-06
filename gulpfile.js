// =============================================================================
// Imports
// =============================================================================

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var del = require('del');

// =============================================================================
// Configuration
// =============================================================================

var moduleName = 'aui-ng';

var paths = {
    distDir: 'dist',
    scripts: ['src/**/*.js'],
    styles: ['src/**/*.css', 'src/*.css']
};

// =============================================================================
// Tasks
// =============================================================================

gulp.task('clean', function(cb) {
    del([paths.distDir], cb);
});

gulp.task('dist:scripts', ['clean'], function() {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat(moduleName + '.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify('fail'))
        .pipe(sourcemaps.write('../' + paths.distDir))
        .pipe(gulp.dest(paths.distDir));
});

gulp.task('dist:styles', ['clean'], function() {
    return gulp.src(paths.styles)
        .pipe(concat(moduleName + '.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.distDir));
});


/**
 * By default this prepares the project and creates the distribution files - release
 */
gulp.task('default', ['clean'], function() {
    gulp.start('dist:styles', 'dist:scripts');
});
