module.exports = function(grunt){
    "use strict";
   require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
					options: {
							sourceMap: true
					},
        dist: {
            files: {
                'app/build/css/main.css': 'app/src/sass/style.scss'
            }
					}
				},
				concat: {
					options: {
						separator: ';',
					},
					dist: {
						src: ['app/bower_components/handlebars/handlebars.min.js', 'app/bower_components/esprima/esprima.js'],
						dest: 'app/src/js/lib.js',
					},
				},
				connect: {
					server: {
						options: {
							port: 8000,
							base: 'app'
						}
					}
				},
        watch: {
            js: {
                files: ['app/src/js/script.js','app/src/js/validator.js','app/src/js/lib.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['app/src/sass/**/*.scss'],
                tasks: ['sass']
            }
        },
        uglify: {
            build: {
                files: {
                    'app/build/js/script.min.js': 'app/src/js/script.js',
										'app/build/js/validator.min.js': 'app/src/js/validator.js',
										'app/build/js/lib.min.js':	'app/src/js/lib.js',
										'app/build/js/ace.js' : 'app/bower_components/ace-builds/src-min-noconflict/ace.js',
										'app/build/js/mode-javascript.js' : 'app/bower_components/ace-builds/src-min-noconflict/mode-javascript.js'									
                }
            }
        }

    });

    grunt.registerTask('default', ['concat','uglify','sass']);
		grunt.registerTask('serve', ['connect','watch']);

};