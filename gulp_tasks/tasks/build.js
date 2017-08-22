/*eslint quotes: ["error", "single"]*/
// Related to: https://github.com/Microsoft/TypeScript/issues/13270
'use strict';

const gulp = require('gulp');
const sourceMaps = require('gulp-sourcemaps');
const tsc = require('gulp-typescript');
const gulpConfig = require('./../gulp-config');

gulp.task('transpile', ['clean'], function() {
    const tsResult = gulp.src(gulpConfig.allGeneratorTypescript, { base: '.' })
        .pipe(sourceMaps.init())
        .pipe(tsc(gulpConfig.typescriptCompilerOptions))
        .on('error', function(err) {
            throw new Error('TypeScript transpilation error: ' + err);
        });

    return tsResult.js
        .pipe(sourceMaps.write('.', { includeContent: false, sourceRoot: './' }))
        .pipe(gulp.dest(''));
});