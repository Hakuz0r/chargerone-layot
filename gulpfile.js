// const gulp = require("gulp");
// const sass = require("gulp-sass")(require("sass"));
// const autoprefixer = require("gulp-autoprefixer");
// const cleanCSS = require("gulp-clean-css");
// const sourcemaps = require("gulp-sourcemaps");
// const browserSync = require("browser-sync").create();
// const rename = require("gulp-rename");

// // Пути к файлам
// const paths = {
//   scss: {
//     src: "./assets/scss/**/*.scss",
//     dest: "./assets/css",
//   },
//   html: {
//     src: "./**/*.html",
//   },
//   php: {
//     src: "./**/*.php",
//   },
//   js: {
//     src: "./assets/js/**/*.js",
//   },
//   images: {
//     src: "./assets/images/**/*.{jpg,jpeg,png,svg,gif,webp}",
//   },
// };

// // Компиляция SCSS
// function style() {
//   return gulp
//     .src("./assets/scss/main.scss")
//     .pipe(sourcemaps.init())
//     .pipe(sass().on("error", sass.logError))
//     .pipe(
//       autoprefixer({
//         cascade: false,
//       }),
//     )
//     .pipe(gulp.dest(paths.scss.dest)) // Сохраняем обычный CSS
//     .pipe(cleanCSS())
//     .pipe(rename({ suffix: ".min" }))
//     .pipe(sourcemaps.write("."))
//     .pipe(gulp.dest(paths.scss.dest)) // Сохраняем минифицированный CSS
//     .pipe(browserSync.stream());
// }

// // Слежение за изменениями
// function watch() {
//   browserSync.init({
//     // Важно: замените на адрес вашего локального сервера, если используете OpenServer/MAMP/LocalWP
//     // proxy: "http://chargerone.local",
//     server: {
//       baseDir: "./",
//     },
//   });

//   gulp.watch(paths.scss.src, style);
//   gulp.watch(paths.html.src).on("change", browserSync.reload);
//   gulp.watch(paths.php.src).on("change", browserSync.reload);
//   gulp.watch(paths.js.src).on("change", browserSync.reload);
//   gulp.watch(paths.images.src).on("change", browserSync.reload);
// }

// exports.style = style;
// exports.watch = watch;
// exports.default = gulp.series(style, watch);
// exports.build = style;


const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const rename = require("gulp-rename");
const fileinclude = require("gulp-file-include"); // <-- ДОБАВИЛИ ПЛАГИН

// Пути к файлам
const paths = {
  scss: {
    src: "./assets/scss/**/*.scss",
    dest: "./assets/css",
  },
  html: {
    // Откуда берем страницы для сборки
    srcPages: "./html/pages/**/*.html",
    // За какими файлами следим (страницы + компоненты)
    srcWatch: "./html/**/*.html",
    // Куда выплевываем готовые собранные файлы (в корень)
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

// Компиляция SCSS (осталась без изменений)
function style() {
  return gulp
    .src("./assets/scss/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
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

// НОВАЯ ФУНКЦИЯ: Сборка HTML
function html() {
  return gulp
    .src(paths.html.srcPages) // Берем файлы только из папки pages
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file' // Ищем компоненты относительно текущего файла
    }))
    .pipe(gulp.dest(paths.html.dest)) // Сохраняем готовый index.html в корень
    .pipe(browserSync.stream()); // Обновляем браузер
}

// Слежение за изменениями
function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch(paths.scss.src, style);
  // Теперь при изменении ЛЮБОГО html в папке src_html мы запускаем сборку html()
  gulp.watch(paths.html.srcWatch, html); 
  gulp.watch(paths.php.src).on("change", browserSync.reload);
  gulp.watch(paths.js.src).on("change", browserSync.reload);
  gulp.watch(paths.images.src).on("change", browserSync.reload);
}

// Экспортируем задачи
exports.style = style;
exports.html = html; // Добавили экспорт HTML
exports.watch = watch;

// При запуске gulp по умолчанию: сначала собираем стили и HTML, потом включаем слежение
exports.default = gulp.series(gulp.parallel(style, html), watch);

// Команда для финальной сборки без слежения
exports.build = gulp.parallel(style, html);