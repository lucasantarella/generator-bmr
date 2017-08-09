const gulp = require('gulp');
const less = require('gulp-less');
const header = require('gulp-header');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const pkg = require('./package.json');
const install = require('gulp-install');

// Set the banner content
var banner = ['/*!\n',
  ' * <%= pkg.title %> - v<%= pkg.version %>\n',
  ' */\n',
  ''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function () {
  return gulp.src('assets/less/*.less')
    .pipe(less())
    .pipe(header(banner, {pkg: pkg}))
    .pipe(gulp.dest('assets/css/'));
});

// Copy vendor libraries from /bower_components into /vendor
gulp.task('copy', function () {
  
  gulp.src(['bower_components/jquery/dist/jquery.js', 'bower_components/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('vendor/jquery'));

  gulp.src('bower_components/backbone/backbone.js')
    .pipe(gulp.dest('vendor/backbone'));

  gulp.src('bower_components/backbone/backbone-min.js')
    .pipe(rename('backbone.min.js'))
    .pipe(gulp.dest('vendor/backbone'));

  gulp.src(['bower_components/backbone.radio/build/backbone.radio.js', 'bower_components/backbone.radio/build/backbone.radio.min.js'])
    .pipe(gulp.dest('vendor/backbone-radio'));

  gulp.src(['bower_components/backbone.marionette/lib/backbone.marionette.js', 'bower_components/backbone.marionette/lib/backbone.marionette.min.js'])
    .pipe(gulp.dest('vendor/backbone-marionette'));

  gulp.src('bower_components/underscore/underscore.js')
    .pipe(gulp.dest('vendor/underscore'));

  gulp.src('bower_components/underscore/underscore-min.js')
    .pipe(rename('underscore.min.js'))
    .pipe(gulp.dest('vendor/underscore'));

  gulp.src(['bower_components/requirejs/require.js'])
    .pipe(gulp.dest('vendor/requirejs'));

  gulp.src('bower_components/requirejs/require.js')
    .pipe(uglify())
    .pipe(rename('require.min.js'))
    .pipe(gulp.dest('vendor/requirejs'));

  gulp.src(['bower_components/require-css/css.js', 'bower_components/require-css/css.min.js'])
    .pipe(gulp.dest('vendor/require-css'));

  gulp.src('bower_components/requirejs-text/text.js')
    .pipe(gulp.dest('vendor/require-text'));

  gulp.src('bower_components/requirejs-text/text.js')
    .pipe(uglify())
    .pipe(rename('text.min.js'))
    .pipe(gulp.dest('vendor/require-text'));

  gulp.src(['bower_components/moment/min/moment.min.js'])
    .pipe(gulp.dest('vendor/moment'));

  gulp.src(['node_modules/material-components-web/dist/material-components-web.css', 'node_modules/material-components-web/dist/material-components-web.min.css', 'node_modules/material-components-web/dist/material-components-web.js', 'node_modules/material-components-web/dist/material-components-web.min.js'])
    .pipe(gulp.dest('vendor/material'));
});

// Run everything
gulp.task('default', ['minify-css', 'minify-js', 'views', 'copy']);

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'views', 'minify-css', 'js', 'minify-js'], function () {
  gulp.watch('less/*.less', ['less']);
  gulp.watch('dist/css/*.css', ['minify-css']);
  gulp.watch('js/*.js', ['minify-js']);
});

// Watch files and compile
gulp.task('watch', function () {
  gulp.watch('less/*.less', ['less']);
  gulp.watch('js/*.js', ['js']);
  gulp.watch('pages/*.{pug,jade}', ['views']);
});

// Setup for use
gulp.task('setup', ['copy'], function () {
  // FOR FUTURE USE
});

// Install Node and Bower dependencies
gulp.task('install', function () {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(install());
});
