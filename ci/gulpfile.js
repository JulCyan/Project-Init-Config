var gulp = require("gulp");
var less = require("gulp-less");
var minifycss = require("gulp-minify-css");

gulp.task("less", function() {
  return gulp
    .src("resources/less/**/*.less")
    .pipe(less())
    .pipe(minifycss())
    .pipe(gulp.dest("public/v2/css"));
});

gulp.task("server", function() {
  return gulp
    .watch("resources/less/**/*.less")
    .on("change", gulp.series("less"));
});

gulp.task("default", gulp.series("server"));
