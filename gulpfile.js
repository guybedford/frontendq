'use strict';

var browserSync = require('browser-sync');
var debug       = require('gulp-debug');
var del         = require('del');
var flow        = require('gulp-flowtype');
var fs          = require('fs');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var install     = require('gulp-install');
var minifyHTML  = require('gulp-minify-html');
var minimist    = require('minimist');
var path        = require('path');
var plumber     = require('gulp-plumber');
var sequence    = require('gulp-sequence');
var url         = require('url');
var util        = require('gulp-util');
var watch       = require('gulp-watch');


var TARGET   = 'target';
var HTML_SRC = 'src/html/**/*';
var JS_SRC   = 'src/js/**/*';

var knownOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'development' }
};
var options = minimist(process.argv.slice(2), knownOptions);


// TASKS ------------------------------------------------------------------------------


gulp.task('default', ['build-dev']);

gulp.task('build-dev', sequence('clean', 'install', ['browser-sync', 'html', 'js']));

gulp.task('install', function () {
  // this is a promise, you probably want to make the gulp task dependent on its completion?
  require('jspm').install(true, { lock: true });

  // QUESTION: Is there a better way to get to this functionality and/or should it be exposed via the API?
  // not currently - we can add an API method for this certainly. I've created https://github.com/jspm/jspm-cli/issues/545
  require('jspm/lib/core').checkDlLoader();

  return gulp
    .src(['./bower.json', './package.json'])
    .pipe(plumber({errorHandler: errorHandler}))
    .pipe(install());
});


gulp.task('clean', function () {
  del([TARGET + '/*', '!' + TARGET + '/jspm_packages']);
});



gulp.task('systemjs', function () {

});

gulp.task('js', function () {
  return gulp
    .src(JS_SRC)
    .pipe(options.env === 'development' ? watch(JS_SRC) : util.noop())
    .pipe(gulp.dest(TARGET + '/js'))
    .pipe(flow({
      weak: false,
      beep: true
    }));
});


gulp.task('html', function () {
  return gulp
    .src(HTML_SRC)
    .pipe(plumber({errorHandler: errorHandler}))
    .pipe(options.env === 'development' ? watch(HTML_SRC) : util.noop())
    .pipe(gulpif(options.env === 'production', minifyHTML({})))
    .pipe(gulp.dest(TARGET))
    .pipe(gulpif(browserSync.active, browserSync.reload({stream: true})));
});


var defaultFile = 'index.html';
var folder = path.resolve(__dirname, TARGET);
gulp.task('browser-sync', function () {
  browserSync({
    port: 3000,
    open: false,
    server: {
      baseDir: './target',
      middleware: [
        function (req, res, next) {
          var fileName = url.parse(req.url);
          fileName = fileName.href.split(fileName.search).join("");
          var fileExists = fs.existsSync(folder + fileName);
          if (!fileExists && 0 > fileName.indexOf('browser-sync-client')) {
            req.url = "/" + defaultFile;
          }
          return next();
        }
      ]
    }
  });
});


/**
 * This is here so Gulp will continue if there is an error with a file instead of aborting.
 */
function errorHandler (error) {
  console.log("Swallowing the following error:");
  console.log(error.toString());
  this.emit('end');
}
