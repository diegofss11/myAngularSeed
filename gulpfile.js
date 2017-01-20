const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const runSequence = require('run-sequence');
const inject = require('gulp-inject');
const templateCache = require('gulp-angular-templatecache');
const sass = require('gulp-sass');
const npmFiles = require('gulp-npm-files');
const reload = browserSync.reload;
const Server = require('karma').Server;

var dev = true;
var paths = {
  scripts: 'app/src/scripts/**/*.js',
  styles: ['app/src/styles/**/*.scss', 'app/src/styles/manifest.scss'],
  index: './app/index.html',
  templates: ['app/src/templates/**/*.html'],
  distFolder: 'app/dist',
  distScriptsFolder: 'app/dist/scripts',
  distStylesFolder: 'app/dist/styles',
  distScripts: 'app/dist/scripts/**/*.js',
  distStyles: 'app/dist/styles/**/*.css'
};

var devFilesToInject = [
  //SCRIPTS
  'app/src/scripts/app.module.js',
  'app/src/scripts/configuration.js',
  'app/src/scripts/**/*.controller.js',
  'app/src/scripts/**/*.service.js',
  'app/src/scripts/**/*.component.js',

  //STYLES
   paths.distStyles
];

var vendorFilesToInject = [
  //VENDORS
  'app/dist/node_modules/angular/angular.js',
  'app/dist/node_modules/angular-ui-router/release/angular-ui-router.js',
  paths.distStylesFolder + '/manifest.css'
];

/////////////////////////////////////////////////////////////////////////////////////
// COPY NPM FILES TO DIST
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('copy-npm-dependencies', () => {
  console.log('-----> Copying NPM dependencies');
  gulp.src(npmFiles(true), {base:'./'}).pipe(gulp.dest(paths.distFolder));
});

/////////////////////////////////////////////////////////////////////////////////////
// CREATE TEMPLATE CACHE
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('template-cache', ['clean'], () => {
  console.log('-----> Creating template cache');
  return gulp.src(paths.templates)
    .pipe(templateCache())
    .pipe(gulp.dest(paths.distScriptsFolder));
});

/////////////////////////////////////////////////////////////////////////////////////
// SASS
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('sass', () => {
  console.log('-----> Compiling SASS');
  return gulp.src(paths.styles[1])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.distStylesFolder));
});

gulp.task('sass:watch', () => {
  gulp.watch('app/src/style/**/*.scss', ['sass']);
});

/////////////////////////////////////////////////////////////////////////////////////
// INJECT
/////////////////////////////////////////////////////////////////////////////////////
//NOT REMOVING PATH AND NEITHER WORKS BOTH AT THE SAME TIME

gulp.task('inject', () => {
  console.log('-----> Injecting JS and CSS in ' + paths.index);
  var devFilesSources = gulp.src(devFilesToInject, {read: false});
  var vendorFilesSources = gulp.src(vendorFilesToInject, {read: false});

  return gulp.src(paths.index)
    .pipe(inject(devFilesSources), {ignorePath: 'app/src'})
    .pipe(inject(vendorFilesSources), {ignorePath: 'app'})
    .pipe(gulp.dest('app'));
});

/////////////////////////////////////////////////////////////////////////////////////
// CLEAR
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('clean', del.bind(null, [ paths.distScriptsFolder, paths.distStylesFolder]));

/////////////////////////////////////////////////////////////////////////////////////
// TESTS
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('test', (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test-watch', (done) => {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

/////////////////////////////////////////////////////////////////////////////////////
// MAIN TASKS
/////////////////////////////////////////////////////////////////////////////////////
gulp.task('default', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence([
      'clean',
      'sass',
      'template-cache',
      'copy-npm-dependencies',
      'inject',
      'serve'],
      resolve
    );
  });
});

gulp.task('serve', () => {
  browserSync.init({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['./app']
    }
  });

  gulp.watch([paths.templates]).on('change', reload);
});
