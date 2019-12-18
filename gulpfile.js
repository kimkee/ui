const gulp = require("gulp");
// const sass = require("gulp-sass");
// const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
// const babel = require('gulp-babel');
const uglify = require("gulp-uglify");
const minify = require('gulp-minify');
const cssmin = require("gulp-clean-css");
const concat  = require("gulp-concat"); // 여러 js  병합
const concatCss = require("gulp-concat-css"); // 여러 css  병합
const urlAdjuster_mc = require("gulp-css-url-adjuster");
// const webserver = require("gulp-webserver");

// const imgDomain_mc ="http:/\//dev-app.fapee.com:8081" ;
const imgDomain_mc ="/\//10.120.160.172:8081" ;
const css_mc = [
	"css/jquery-ui.css",
	"css/swiper.css",
	"css/base.css",
	"css/common.css",
	"css/member.css",
	"css/look.css",
	"css/home.css"
];

const js_mc = [
	"js/iscroll.js",
	"js/swiper.js",
	"js/hammer.js",
	"js/imagesloaded.pkgd.js",
	"js/masonry.pkgd.js",
	"js/pullToRefresh.js",
	"js/jquery-listswipe.js",
	"js/autosize.js",
	"js/ui.js"
];

const d = new Date();
const css_ver = d.getFullYear() +"."+ d.getMonth() +"."+ d.getDay() +"."+ d.getHours() +"."+ d.getMinutes() +"."+ d.getSeconds();

function styles() {
	return gulp.src(css_mc)
		.pipe(urlAdjuster_mc({
			replace: ["../","/"],
			prepend: imgDomain_mc+"/resources2/app",
			append: "?v="+css_ver
		}))
		// .pipe(cssmin())
		.pipe(concatCss("_style.min.css"))
		.pipe(cssmin({debug: true}, function(details) {
			console.log(details.name + ' : ' + details.stats.originalSize +' > '+ details.stats.minifiedSize);
		}))
		.pipe(gulp.dest("css/"))
		.on('end', function(e) {
			console.log("CSS완료");
		});
}

function scripts(){
	return gulp.src(js_mc)
		.pipe(concat('_bundle.js'))
		.pipe(minify({
			ext:{
				src:'.js',
				min:'.min.js'
        	},
		}))
		.pipe(gulp.dest('js/'))
		.on('end', function() {
			console.log("JS완료");
		});
}

function watch() {
	gulp.watch(css_mc, styles);
	gulp.watch(js_mc, scripts);
}

const build = gulp.series(styles,scripts, gulp.parallel(watch));


exports.default = build;
