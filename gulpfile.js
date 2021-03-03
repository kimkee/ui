const gulp = require("gulp");
// const sass = require("gulp-sass");
// const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
// const babel = require('gulp-babel');
const uglify = require("gulp-uglify");
const minify = require("gulp-minify");
const cssmin = require("gulp-clean-css");
const concat  = require("gulp-concat"); // 여러 js  병합
const concatCss = require("gulp-concat-css"); // 여러 css  병합
const urlAdjuster_mc = require("gulp-css-url-adjuster");
// const webserver = require("gulp-webserver");

const imgDomain_mc ="https:/\//kimkee.gitlab.io/ui" ;
// const imgDomain_mc ="/\//10.120.160.172:8081" ;
const css_mc = [
	"static/css/jquery-ui.css",
	"static/css/swiper.css",
	"static/css/base.css",
	"static/css/common.css",
];

const js_mc = [
	"static/js/iscroll.js",
	"static/js/swiper.js",
	"static/js/moment.js",
	"static/js/circle-progress.js",
	"static/js/pullToRefresh.js",
	"static/js/ui.js",
];

const inc_mc = [
	"static/src/inc",
];

function styles() {
	var d = new Date();
	var css_ver = d.getFullYear() +"_"+ (d.getMonth()+1) +"_"+ d.getDate() +"_"+ d.getHours() +"_"+ d.getMinutes() +"_"+ d.getSeconds();	
	return gulp.src(css_mc)
		.pipe(urlAdjuster_mc({
			replace: ["../img/","/static/img/"],
			prepend: imgDomain_mc+"",
			append: "?v="+css_ver
		}))
		//.pipe(cssmin())
		.pipe(concatCss("style.min.css"))
		.pipe(cssmin({debug: true /* ,format: 'keep-breaks' */}, function(details) {
			console.log(details.name + ' : ' + details.stats.originalSize +' > '+ details.stats.minifiedSize);
		}))
		.pipe(gulp.dest("static/dist/css/"))
		.on('end', function(e) {
			console.log("CSS완료");
		});
}

function scripts(){
	return gulp.src(js_mc)
		.pipe(concat('bundle.js'))
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
	console.log();
}
	
function watchers() {
	gulp.watch(css_mc, styles);
	gulp.watch(js_mc, scripts);
	// gulp.watch(inc_mc, includes);
}

const build = gulp.series(styles , scripts , gulp.parallel(watchers));


exports.default = build;
