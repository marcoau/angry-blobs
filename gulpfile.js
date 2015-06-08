var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var util = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');

// WATCHED GLOBS
var SERVER_PATHS = ['./server/**/*.*', 'index.js'];
var JS_PATHS = ['./client/**/*.js', '!client/build/**/*.*'];
var SASS_PATHS =  ['./client/**/*.scss', '!client/build/**/*.*'];

// HELPER FUNCTIONS
var logError = function(err) {
  util.log(err);
  this.emit('end');
};

// TASK FUNCTIONS
var serverTask = function() {
  nodemon({
    script: 'index.js',
    watch: SERVER_PATHS
  })
  .on('start', function() {
    livereload.listen();
  })
  .on('restart', function() {
    // wait until server has restarted to do livereload
    setTimeout(function() {
      livereload.changed({ path: '/' });
    }, 1000);
  });
};
var jsTask = function() {
  browserify('./client/App.react.js')
    .on('error', logError)
    .transform(reactify)
    .transform(babelify)
    .bundle()
    .on('error', logError)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    // .pipe(uglify())  // use for production
    .pipe(gulp.dest('./client/build'))
    .pipe(notify({ message: 'js DONE.' }))
    .pipe(livereload());
};
var sassTask = function() {
  gulp.src('./client/app.scss')
    .pipe(sass())
    .on('error', logError)
    .pipe(concat('bundle.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./client/build'))
    .pipe(notify({ message: 'sass DONE.' }))
    .pipe(livereload());
};
var watchTask = function() {
  watch(JS_PATHS, jsTask);
  watch(SASS_PATHS, sassTask);
};

// GULP TASKS
gulp.task('server', serverTask);
gulp.task('js', jsTask);
gulp.task('sass', sassTask);
gulp.task('watch', watchTask);
gulp.task('serve', ['server', 'js', 'sass', 'watch']);
