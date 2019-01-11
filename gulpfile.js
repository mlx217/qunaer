var gulp = require("gulp");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var connect = require("gulp-connect");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var babel = require("gulp-babel");



gulp.task("sass",function(){
	gulp.src("sass/*.scss")
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle:"compressed"}))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("dist/css"));
});
gulp.task("copy-html",function(){
	gulp.src("*.html")
	.pipe(connect.reload())
	.pipe(gulp.dest("dist"));
});
gulp.task("copy-img",function(){
	gulp.src("img/*.{jpg,png,gif}")
	.pipe(gulp.dest("dist/img"));
});
gulp.task("copy-js",function(){
	gulp.src("js/*.js")
	.pipe(babel({"presets":["es2015"]}))
	.pipe(uglify())
	.pipe(gulp.dest("dist/js"))
});
gulp.task("watch",function(){
	gulp.watch(["*.html","img/**","sass/*.scss"],["copy-html","copy-img","sass"])
})
gulp.task("server",function(){
	connect.server({
		root:"dist",
	  livereload:true
	})
	
})

gulp.task("default",["server","watch"]);

