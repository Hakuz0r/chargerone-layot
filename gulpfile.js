const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");
const fileinclude = require("gulp-file-include");
const webpackStream = require('webpack-stream');

// Пути к файлам
const paths = {
  scss: {
    src: "./assets/scss/**/*.scss",
    dest: "./assets/css",
  },
  html: {
    srcPages: "./html/pages/**/*.html",
    srcWatch: "./html/**/*.html",
    dest: "./", 
  },
  php: {
    src: "./**/*.php",
  },
  js: {
    src: "./assets/js/**/*.js",
  },
  images: {
    src: "./assets/images/**/*.{jpg,jpeg,png,svg,gif,webp}",
  },
};

// Компиляция SCSS
function style() {
  return gulp
    .src("./assets/scss/main.scss")
    .pipe(sourcemaps.init())
    // .pipe(sass().on("error", sass.logError))
    .pipe(sass({ includePaths: ['node_modules'] }).on("error", sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      }),
    )
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

// ВОЗВРАЩЕНА ФУНКЦИЯ: Сборка HTML
function html() {
  return gulp
    .src(paths.html.srcPages)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file' 
    }))
    .pipe(gulp.dest(paths.html.dest)) 
    .pipe(browserSync.stream()); 
}

// НОВАЯ ФУНКЦИЯ: Сборка JavaScript через Webpack
function scripts() {
  return gulp
    .src('./assets/js/main.js') 
    .pipe(webpackStream({
      mode: 'development', 
      output: {
        filename: 'main.min.js', 
      }
    }))
    .pipe(gulp.dest('./assets/js/')) 
    .pipe(browserSync.stream()); 
}

// Слежение за изменениями
function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch(paths.scss.src, style);
  gulp.watch(paths.html.srcWatch, html); 
  gulp.watch(paths.php.src).on("change", browserSync.reload);
  gulp.watch(paths.js.src, scripts); // Запуск Webpack при изменении JS
  gulp.watch(paths.images.src).on("change", browserSync.reload);
}

// Экспортируем задачи
exports.style = style;
exports.html = html; 
exports.scripts = scripts; // Экспорт JS
exports.watch = watch;

// ИСПРАВЛЕНО: Добавлен scripts в стартовую сборку
exports.default = gulp.series(gulp.parallel(style, html, scripts), watch);

// ИСПРАВЛЕНО: Добавлен scripts в билд
exports.build = gulp.parallel(style, html, scripts);