/**
 * Created by Drew on 12/17/2014.
 */

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            react: {
                files: ['app/react/**/*.jsx','app/**/*.js'],
                tasks: ['browserify']
            }
        },

        browserify: {
            options: {
                transform: [ require('grunt-react').browserify ],
                browserifyOptions: { debug: true }
            },
            client: {
                src: ['app/react/**/*.jsx'],
                dest: 'public/js/bundle.js'
            }
        },
        nodemon: {
            dev: {
                script: 'server',
                options: {
                    ext: 'js,jsx,html,ejs'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('default', [
        'browserify'
    ]);
};