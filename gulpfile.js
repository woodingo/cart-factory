'use strict';

let gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create(),
    rimraf = require('rimraf');

let path = {
    build: {
        html: 'build/',
        icons: 'build/icons/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        favicons: 'build/favicons/'
    },

    src: {
        pug: ['src/*.pug', 'src/pages/**/*.pug'],
        icons: 'src/icons/*.svg',
        js: 'src/script.js',
        style: 'src/**/*.sass',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        favicons: 'src/favicons/**/*.*'
    },

    watch: {
        pug: 'src/**/*.pug',
        icons: 'src/icons/*.svg',
        js: 'src/**/*.js',
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

gulp.task('icons:build', function () {
    return gulp.src(path.src.icons)
        .pipe(plugins.svgSprites({mode: "symbols"}))
        .pipe(gulp.dest(path.build.icons))
        .pipe(browserSync.stream());
});

gulp.task('html:build', function () {
    gulp.src(path.src.pug)
        .pipe(plugins.pug())
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.stream())
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(plugins.include())
        .pipe(plugins.concat('script.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream())
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(plugins.sass({includePaths: require('node-normalize-scss').includePaths}))
        .pipe(plugins.concat('style.css'))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.cleanCss({compatibility: '*'}))
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream())
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.stream())
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('favicons:build', function() {
    gulp.src(path.src.favicons)
        .pipe(gulp.dest(path.build.favicons))
});

gulp.task('watch', function(){
    gulp.watch(path.watch.icons, function (event, cb) {
        gulp.start('icons:build');
    });
    gulp.watch(path.watch.pug, function (event, cb) {
        gulp.start('html:build');
    });
    gulp.watch(path.watch.style, function(event, cb) {
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

gulp.task('webserver', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        tunnel: false,
        host: 'localhost',
        port: 9000,
        logPrefix: "Woody_Just"
    });
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('build', [
    'icons:build',
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'favicons:build'
]);

gulp.task('default', ['build', 'webserver', 'watch']);