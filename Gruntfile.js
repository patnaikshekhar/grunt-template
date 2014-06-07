module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    /*'lib/angular/angular.min.js',
                    'lib/jquery/dist/jquery.min.js',
                    'lib/bootstrap/dist/bootstrap.min.js',*/
                    'js/global.js'
                ],

                dest: 'dist/js/production.js'
            }
        },

        uglify: {
            build: {
                src: 'dist/js/production.js',
                dest: 'dist/js/production.min.js'
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            dist: {
                files: {
                    'dist/css/global.min.css': 'dist/css/global.css'
                }
            }
        },

        watch: {
            options: {
                livereload: false
            },
            scripts: {
                files: ['js/*.js', 'lib/*.js'],
                tasks: ['concat', 'uglify'],
            },

            css: {
                files: ['sass/*.scss'],
                tasks: ['sass', 'autoprefixer'],
            },

            html: {
                files: ['*.html'],
                tasks: ['wiredep']
            },

            bower: {
                files: ['bower.json'],
                tasks: ['bower:install', 'wiredep']
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/css/global.css': 'sass/global.scss'
                }
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : ['*.html', 'dist/js/*.js', 'dist/css/*.css']
                },
                options: {
                    watchTask: true,
                    server: {
                        baseDir: "."
                    },
                    ghostMode: {
                        clicks: true,
                        scroll: true,
                        links: true,
                        forms: true
                    }
                }
            }
        },

        wiredep: {
            target: {
                src: [
                    'index.html',
                    'sass/global.scss'
                ]
            }
        },

        bower: {
            install: {

            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-bower-task');

    //grunt.registerTask('default', ['concat', 'uglify', 'sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
};
