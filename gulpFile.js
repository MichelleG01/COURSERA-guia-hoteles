'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del= require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin= require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleancss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

//Creamos las tareas
gulp.task('sass', function(){
	//A diferencia de grunt aqui tendremos un objeto que, al definir una tarea, va a usar este concepto de stream
  	//Va tener el source, que es donde comienza a procesar este flujo de archivos y empieza a armar el "pipe", o tubería
    return gulp.src('./css/*.scss')
    	//Aqui es la cadena de procesos que vamos a ir aplicando, en este caso la tarea SASS
		.pipe(sass().on('error', sass.logError))
		//hasta terminar con un "dest" que es dónde lo va a volcar. Acá le estamos diciendo que lo vuelque en la misma carpeta.
		.pipe(gulp.dest('./css'));
})

//Con esto habilitamos el watch automático para que cualquier cambio en los archivos SASS, corra la tarea SASS y nos genere los CSS
gulp.task('sass:watch', function () {
	//Con la nueva actualización de gulp esta forma cambio
  	//gulp.watch('./css/*.scss', ['sass']);
    gulp.watch('./css/*.scss', gulp.series('sass'));

}); 

//Acá asociamos ya una función que lo que hace es buscar los HTML, los CSS, los IMG, y cualquier cambio que haya, recarga nuestra tarea.
gulp.task('browser-sync', function(){
	var files = ['./*.html', './css/*.css', './imagenes/*.{png, jpg, gif, jpeg}', './js/*.js'];
    	browserSync.init(files, {
	 	    server: {
				baseDir: './'
	 		}
		});
}); 

/*gulp.task('default', ['browser-sync'], function(){
  gulp.start('sass:watch');
});*/
gulp.task('default', gulp.parallel('browser-sync', 'sass:watch'));


gulp.task('clean', function(){
	return del(['dist']);
});

gulp.task('copyfonts', function(){
	return gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf,woff,eof,svg,eot,otf}*')
	.pipe(gulp.dest('./dist/fonts'));
});

gulp.task('imagemin', function(){
	return gulp.src('./imagenes/*.{png,jpg,jpeg,gif}')
	.pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true,}))
	.pipe(gulp.dest('dist/imagenes'));
});

gulp.task('usemin', function(){
	return gulp.src('./*.html')
	.pipe(flatmap(function(stream, file){
		return stream
		.pipe(usemin({
			css: [rev()],
			html: [function() {return htmlmin({collapseWhitespace: true})}],
			js: [uglify(), rev()],
			inlinejs: [uglify()],
			inlinecss: [cleancss(), 'concat']
		}));
	}))
	.pipe(gulp.dest('dist/'));
});

gulp.task('build', gulp.series('clean','copyfonts','imagemin','usemin'));
