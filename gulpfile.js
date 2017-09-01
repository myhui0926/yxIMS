var gulp = require('gulp'),
    connect = require('gulp-connect'),//内建服务器插件
    less = require('gulp-less'),//编译less
    cssmin = require('gulp-clean-css'),//压缩css
    rename = require('gulp-rename'),//文件更名
    sourcemaps = require('gulp-sourcemaps'),//资源映射
    notify = require('gulp-notify'),//通知处理
    plumber = require('gulp-plumber'),//错误处理
    spriter = require('gulp-css-spriter'),//雪碧图npm
    htmlmin = require('gulp-htmlmin'),//压缩处理HTML
    useref = require('gulp-useref'),
    autoprefixer=require('gulp-autoprefixer');//css自动加厂商前缀

//导出、压缩HTML，替换资源引用路径，输出到指定位置：
gulp.task('minifyHTML',function(){
    gulp.src('src/*.html')
        .pipe(useref())
        .pipe(htmlmin({
            removeComments:true,//清除注释
            collapseWhitespace: true,//压缩HTML为一行
            collapseBooleanAttributes:true,//省略布尔属性值
            minifyJS:true,//压缩页面JS
            minifyCSS:true,//压缩页面CSS
            removeScriptTypeAttributes:true,//删除页面<script>的type="text/javascript"
            removeStyleLinkTypeAttributes:true//删除<style>和<link>的type="text/css"
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

//修改HTML资源引用路径
gulp.task('useref',function(){
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

//编译less：
gulp.task('less',function(){
    gulp.src('src/less/*.less')
        .pipe(sourcemaps.init())
        .pipe(plumber({errorHandler:notify.onError('Error:<%= error.message %>')}))
        .pipe(less())
        .pipe(autoprefixer({
        browsers:['last 2 versions'],
        cascade:true,
        remove:true
    })).
    pipe(spriter({
        'spriteSheet':'./src/img/spriteSheet.png',
        'pathToSpriteSheetFromCSS':'../img/spriteSheet.png'
    }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('src/css'))
        .pipe(connect.reload());
});
//压缩css:
gulp.task('cssmin',function () {
    gulp.src('src/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(spriter({
            'spriteSheet':'./dist/img/spriteSheet.png',
            'pathToSpriteSheetFromCSS':'../img/spriteSheet.png'
        }))
        .pipe(cssmin({compatibility:'ie8'},{debug:true},function(details){
            console.log(details.name+': '+ details.stats.originalSize);
            console.log(details.name+': '+details.stats.minifiedSize);
        }))
        .pipe(rename({suffix:'.min'}))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('dist/css'));
});

//创建开发测试内置服务器：
gulp.task('connect',function(){
    connect.server({
        name:'yxIMS Dev',
        livereload:true,
        port:8080
    });
});
//自动刷新HTML
gulp.task('autoReload',function(){
    gulp.src(['src/*.html','dist/*.html'])
        .pipe(connect.reload());
});
//自动将各类小图标生成雪碧图
gulp.task('spriter',function(){
    return gulp.src('./src/css/main_layout.css')
        .pipe(spriter({
            'spriteSheet':'./src/img/spriteSheet.png',
            'pathToSpriteSheetFromCSS':'../img/spriteSheet.png'
        }))
        .pipe(gulp.dest('./src/css'));
});
//自动添加浏览器厂商前缀
gulp.task('autoprefix',function(){
    gulp.src('src/css/*.css')
        .pipe(autoprefixer({
            browsers:['last 2 versions'],
            cascade:true,
            remove:true
        }))
        .pipe(gulp.dest('src/css'));
});
//监视文件改变，自动执行相应任务
gulp.task('watch',function(){
    gulp.watch('./src/*.html',['minifyHTML']);
    gulp.watch('./src/less/*.less',['less']);
    gulp.watch('./src/css/*.css',['cssmin']);
});
//添加默认任务
gulp.task('default',['connect','watch']);
