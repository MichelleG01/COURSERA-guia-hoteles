module.exports = function(grunt){
	require('time-grunt')(grunt);
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin' //nos permite mimificar varios archivos
	});

	grunt.initConfig({
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.scss'],
					dest: 'css',
					ext: '.css'
				}]
			}
		},

		watch:{
			//De esta forma le indicamos que revice todos los archivos con esa extensión y al ver un cambio que ejecute esa tarea
			files: ['css/*.scss'],
			tasks: ['css']
		},

		browserSync:{
			dev: {
				bsFiles: { //browser files
					src: [
						'css/*.css',
						'*.html',
						'js/*.js'
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: './' //Directorio base para nuestro servidor
					}
				}
			}
		},

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: './',
					src: 'imagenes/*.{png,gif,jpg,jpeg}',
					dest: 'dist/'
				}]
			}
		},

		copy: {
			html: {
				files: [{
					expand: true,
					dot: true,
					cwd: './',
					src: ['*.html'],
					dest: 'dist/'
				}]
			},
			//Parte para solucionar el problema de los iconos
			fonts: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'node_modules/open-iconic/font',
					src: ['fonts/*.*'],
					dest: 'dist'
				}]
			}
		},

		clean: {
			build: {
				src: ['dist/']
			}
		},

		cssmin: {
			dist: {}
		},

		uglify: {
			dist: {}
		},

		filerev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 20
			},

			release: {
				files: [{
					src: [
						'dist/js/*.js',
						'dist/css/*.css',
					]
				}]
			}
		},

		concat: {
			options: {
				separator: ';'
			},
			dist: {}
		},

		useminPrepare:{
			foo: {
				dest: 'dist/',
				src: ['index.html', 'precios.html', 'about.html', 'contacto.html']
			},
			options: {
				flow: {
					steps: {
						css: ['cssmin'],
						js: ['uglify']
					},
					post: {
						css: [{
							name: 'cssmin',
							createConfig: function(context, block){
								var generated = context.options.generated;
								generated.options = {
									keepSpecialComments: 0,
									rebase: false
								}
							}
						}]
					}
				}
			}
		},

		usemin: {
			html: ['dist/index.html', 'dist/precios.html', 'dist/about.html', 'dist/contacto.html'],
			options: {
				assetsDir: ['dist', 'dist/css', 'dist/js']
			}
		}

	});
	//Agregamos las tareas y los paquetes o plugins que estamos utilizando
	//grunt.loadNpmTasks('grunt-contrib-sass');
	//grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-browser-sync');
	//grunt.loadNpmTasks('grunt-contrib-imagemin');
	//Comentariamos las lineas anteriores ya que con el require('jit-grunt') no hace falta definirlos
	grunt.registerTask('css', ['sass']);
	//Al ejecutar en consola grunt se ejecutara por defecta esta tarea
	grunt.registerTask('default', ['browserSync', 'watch']);
	grunt.registerTask('img:compress', ['imagemin']);
	//Con esto tendriamos la versión final de nuestro proyecto
	grunt.registerTask('build', [
		'clean',
		'copy',
		'imagemin',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'filerev',
		'usemin'
		])
};