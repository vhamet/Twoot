const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', () => gulp.src('src/Styles/scss/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    cascade: false,
  }))
  .pipe(sass({ outputStyle: 'compressed' }))
  .pipe(gulp.dest('src/Styles/css')));

gulp.task('sass:watch', () => {
  gulp.watch('src/Styles/scss/**/*.scss', gulp.series('sass'));
});
