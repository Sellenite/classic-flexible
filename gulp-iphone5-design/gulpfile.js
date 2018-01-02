var gulp = require('gulp');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var px2rem = require('postcss-px2rem');
var connect = require('gulp-connect');

// 创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('watch', function () {
	gulp.watch(['./public/html/*.html'], ['liveReload']);
});

// 使用postcss px2rem 得到rem
gulp.task('css', function () {
	var processors = [px2rem({
		remUnit: 75
	})];
	gulp.src('./public/less/*.less')
		.pipe(less())
		.pipe(postcss(processors))
		.pipe(gulp.dest('./public/dest/css/'));
});

// 输出html
gulp.task('html', function () {
	gulp.src('./public/html/*.html')
		.pipe(gulp.dest('./public/dest/'));
});

// 使用connect启动一个Web服务器
gulp.task('connect', function () {
	connect.server({
		root: 'public',
		port: '8000',
		livereload: true
	})
});

// liveReload
gulp.task('liveReload', function () {
	gulp.src('./public/html/*.html')
		.pipe(connect.reload())
		.pipe(gulp.dest('./public/dest/'));
});

// 运行gulp 默认的Task
gulp.task('default', ['css', 'html', 'connect', 'watch'])