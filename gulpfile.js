'use strict';

let gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    rimraf = require('rimraf');

let path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },

    src: {
        pug: ['src/*.pug', 'src/pages/**/*.pug'],
        js: 'src/js/main.js',
        style: 'src/**/*.sass',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },

    watch: {
        pug: 'src/**/*.pug',
        js: 'src/js/**/*.js',
        style: 'src/**/*.sass',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },

    clean: './build'
};

let config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Woody_Just"
};

gulp.task('html:build', function () {
    gulp.src(path.src.pug)
        .pipe(plugins.pug())
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(plugins.sass({includePaths: require('node-normalize-scss').includePaths}))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.cleanCss({compatibility: '*'}))
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('watch', function(){
    gulp.watch([path.watch.pug], function(event, cb) {
        gulp.start('html:build');
    });
    gulp.watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    gulp.watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    gulp.watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    gulp.watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

gulp.task('default', ['build', 'webserver', 'watch']);