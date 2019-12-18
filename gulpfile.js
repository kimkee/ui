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
	"static/css/jquery-ui.css",
	"static/css/swiper.css",
	"static/css/base.css",
	"static/css/common.css",
];

const js_mc = [
	"static/js/iscroll.js",
	"static/js/swiper.js",
];

const inc_mc = [
	"src/inc",
];



const d = new Date();
const css_ver = d.getFullYear() +"."+ d.getMonth() +"."+ d.getDay() +"."+ d.getHours() +"."+ d.getMinutes() +"."+ d.getSeconds();

function styles() {
	return gulp.src(css_mc)
		.pipe(urlAdjuster_mc({
			replace: ["/","/"],
			prepend: imgDomain_mc+"/resources/app",
			append: "?v="+css_ver
		}))
		// .pipe(cssmin())
		.pipe(concatCss("_style.min.css"))
		.pipe(cssmin({debug: true}, function(details) {
			console.log(details.name + ' : ' + details.stats.originalSize +' > '+ details.stats.minifiedSize);
		}))
		.pipe(gulp.dest("static/dist/css/"))
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
		.pipe(gulp.dest('static/dist/js/'))
		.on('end', function() {
			console.log("JS완료");
		});
}
function includes(){
	console.log(css_ver);
}
function watch() {
	gulp.watch(css_mc, styles);
	gulp.watch(js_mc, scripts);
	gulp.watch(inc_mc, includes);
}

const build = gulp.series(gulp.parallel(watch));


exports.default = build;
