/*
  npm i -D gulp
  npm i -D gulp-uglify
  npm i -D babel-cli babel-preset-es2015
  npm i -D gulp-babel
  
  gulp minify
  gulp
 */

const gulp = require('gulp'),
         uglify = require('gulp-uglify'),
          // gutil = require('gulp-util'),
          babel = require('gulp-babel'),
          uglifyCss = require('gulp-uglifycss'),
          concat = require('gulp-concat'),
          sass = require('gulp-sass'),
          browserSync = require('browser-sync'),
          reload = browserSync.reload,
          paths = {
              html:['index.html'],
              css:['src/scss/*.scss'],
              script:['src/js/*.js']
            };




gulp.task('hello', function () {
  console.log('Hello, world');
})

gulp.task('minify', function () {
  /*1*/
   gulp.src(paths.script)
          .pipe(concat('index.js'))
          .pipe(babel({
              presets: ['es2015']
          }))
          .pipe(uglify())
          .pipe(gulp.dest('dist/js/'))
          .pipe(reload({stream:true}));
})

gulp.task('minCss', function () {
  gulp.src(paths.css)
        .pipe(concat('index.css'))
        .pipe(uglifyCss())
        .pipe(gulp.dest('dist/css/'));
})

gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(concat('bootstrap.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
    port: 8081,
    open: true,
    notify: false
  });
});

gulp.task('html', function(){
  gulp.src(paths.html)
  .pipe(reload({stream:true}));
});

gulp.task('watcher',function(){
  gulp.watch(paths.css, ['minCss']);
  gulp.watch(paths.script, ['minify']);
  gulp.watch(paths.html, ['html']);
});


gulp.task('default',  ['watcher', 'browserSync']);

// gulp.task('default', function () {
//   // gulp.run('minify');

//   // gulp.watch('src/scss/*.scss', function () {
//   //   gulp.run('sass');
//   // });

//   // gulp.src('src/js/app.js')
//   //           .pipe(babel({
//   //               presets: ['es2015']
//   //           }))
//   //           .pipe(uglify())
//   //           .pipe(gulp.dest('dist/js/index.js'))

// })



