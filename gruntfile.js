module.exports = function(grunt) {

  var pkgFile = grunt.file.readJSON('package.json');
  var srcFiles = ['src/**/*.js'];
  var orderedTasks = ['jshint', 'clean', 'amd_tamer', 'uglify'];

  grunt.initConfig({
    pkg: pkgFile,
    amd_tamer: {
      options: {
        base: 'src/'
      },
      dist: {
        src: srcFiles,
        dest: 'js/app.js'
      }
    },
    clean: ['js'],
    uglify: {
      production: {
        files: {
          'js/app.min.js': 'js/app.js'
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', srcFiles]
    },
    watch: {
      scripts: {
        files: srcFiles,
        tasks: orderedTasks,
        options: {
          spawn: false,
        },
      },
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', 'Default task', orderedTasks);

};
