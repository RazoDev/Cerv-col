const gulp  = require('gulp'),
    sass    = require('gulp-sass'),
    htmlmin = require('gulp-htmlmin'),
    uglify  = require('gulp-uglify'),
    pump = require('pump'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


     
    gulp.task('sass', function () {
        return gulp.src('app/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
    });


    gulp.task('minify', (cb) =>{
        pump([
            gulp.src('app/js/*.js'),
            uglify(),
            gulp.dest('dist/js')
        ],
        cb
    );
    });


    gulp.task('htmlminify', function() {
        return gulp.src('app/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/'));
    });

    gulp.task('imgmin', () =>
    gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
    );

    gulp.task('serve', ['sass','htmlminify', 'minify'], () => {
        browserSync.init(['dist/css/*.css','dist/*.html','dist/js/*.js'], {
            server: {
                baseDir: 'dist'
            }
        });
    });


    gulp.task('watch', ['sass','htmlminify', 'minify', 'serve'], function() {
        gulp.watch('app/scss/*.scss', ['sass']);
        gulp.watch('app/*.html', ['htmlminify']);
        gulp.watch('app/js/*.js', ['minify']);
    });

    gulp.task('default', ['watch']);