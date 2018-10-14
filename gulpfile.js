// 像加载标准node模块那样加载gulp插件
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const watch = require('gulp-watch');


gulp.task('default', () => {    // 创建一个gulpfile
  return gulp.src('app/*.jsx') // 用gulp自带的文件工具gulp.src查找所有的react jsx 文件
    .pipe(sourcemaps.init())   //开始监听源文件,为调试构建源码映射
    .pipe(babel({
      presets: ['es2015', 'react']   //使用es2015和react(jsx)配置gulp-babel
    }))
    .pipe(concat('all.js'))   //所有的源码文件拼到一个all.js中
    .pipe(sourcemaps.write('.'))  //单独写入源码映射文件
    .pipe(gulp.dest('dist'));  //将所有文件放到dist目录下
});

gulp.task('watch', () => {
  watch('app/**.jsx', () => gulp.start('default'));
});