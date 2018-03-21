/**
 * Created by CQ on 2017/5/5.
 */
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    browserify = require('gulp-browserify'),
    sequence = require('gulp-run-sequence'),
    es2015 = require("babel-preset-es2015"),
    babel = require('gulp-babel'),
  /*  react = require("gulp-react"),*/
    flatten = require('gulp-flatten'),
    del = require('del'),
    gulpLoadPlugins =require('gulp-load-plugins');
/*var babelify = require('babelify');
var babel = require('gulp-babel');
var reactify = require('reactify');
var reactTools = require('react-tools');
var source = require('vinyl-source-stream');
var gulpReactify = require('gulp-reactify');*/


var baseJs = './dev/js-dev/*.js';

var originJS = [baseJs];

var baseCss = './dev/css-dev/*.css';

var originCss = [baseCss];

gulp.task('init', function () {
    del(
        ['./rev-manifest.json',
            './page/*',
            './js/*',
            './css/*'
        ]
    )
});

gulp.task('minifycss', function () {
    return gulp.src(originCss)
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest('./css'))
        .pipe(rev.manifest(
            {
                merge: true,
                base: ""
            }
        ))
        .pipe(gulp.dest('./'));
});
/*gulp.task('browserify', function () {
    return gulp.src(originJS)
       .pipe(react())
       /!* .pipe(source('bundle.js'))*!/
        .pipe(gulp.dest('./js'));
});*/


gulp.task('browserify', function () {
    return gulp.src(originJS)
        .pipe(browserify({
            //利用reactify工具将jsx转换为js
            transform: ['reactify']
        }))
       /* .pipe($.babel())*/    //靠这个插件编译es6
        .pipe(flatten())
        .pipe(rev())
        .pipe(gulp.dest('./js/'))
        .pipe(rev.manifest({
            merge: true,
            base: ''
            //path: 'js.json'
        }))
        .pipe(gulp.dest('./'))
});


gulp.task('minifyjs', function () {
    return gulp.src('./js/*.js')
        .pipe(flatten())
        /*.pipe(rev())*/
        .pipe(uglify())
        .pipe(gulp.dest('./js/'))
        .pipe(rev.manifest(
            {
                merge: true,
                base: ""
            }
        )).pipe(gulp.dest('./'));
});


gulp.task('vul', function () {
    return gulp.src(['./rev-manifest.json', './dev/page-dev/*.html'])
        .pipe(revCollector(
            {
                replaceReved: true
            }
        )).
        pipe(gulp.dest('./page'))
});

gulp.task('default', function () {
    sequence('init', 'browserify','minifycss', /*'minifyjs', */'vul')
});