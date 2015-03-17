// Gruntfile for live_score.
// John Bernier <john.b.bernier@gmail.com>

module.exports = function(grunt) {
  var L = grunt.log.writeln;
  var BANNER = '/**\n' +
                ' * live_score <%= pkg.version %> built on <%= grunt.template.today("yyyy-mm-dd") %>.\n' +
                ' * Copyright (c) 2015 John Bernier <john.b.bernier@gmail.com>\n' +
                ' *\n' +
                ' * https://github.com/jbernie2/live_score\n' +
                ' */\n';
  var BUILD_DIR = 'build';
  var RELEASE_DIR = 'releases';
  var TARGET_RAW = BUILD_DIR + '/live_score-debug.js';
  var TARGET_MIN = BUILD_DIR + '/live_score-min.js';
  
  var HTML_DIR = 'src/html';
  var CSS_DIR = 'src/css';
  
  var SOURCES = [ "src/js/*.js" ];

  var ALL_JS = [ "src/js/*.js", "support/*.js" ];
 

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: BANNER
      },
      build: {
        src: ALL_JS,
        dest: TARGET_RAW
      }
    },
    uglify: {
      options: {
        banner: BANNER,
        sourceMap: true
      },
      build: {
        src: TARGET_RAW,
        dest: TARGET_MIN
      }
    },
    browserify: {
      live_score: {
        options: {
          banner: BANNER,
          browserifyOptions: {
            debug: true,
            standalone: "live_score"
          }
        },
        files: [
          { src: ALL_JS, dest: TARGET_RAW }
        ]
      }
    },
    jshint: {
      files: SOURCES,
      options: {
        eqnull: true,   // allow == and ~= for nulls
        sub: true,      // don't enforce dot notation
        trailing: true, // no more trailing spaces
      }
    },
    copy: {
      release: {
        files: [
          {
            expand: true,
            dest: RELEASE_DIR,
            cwd: BUILD_DIR,
            src    : ['*.js', 'docs/**', '*.map']
          }
        ]
      },
      build: {
        files: [
          {
            expand: true,
            dest: BUILD_DIR,
            cwd: HTML_DIR,
            src    : ['*.html']
          },
          {
            expand: true,
            dest: BUILD_DIR,
            cwd: CSS_DIR,
            src   : ['*.css']
          }
        ]
      }
    },
    docco: {
      src: SOURCES,
      options: {
        layout: 'linear',
        output: 'build/docs'
      }
    },
    clean: [BUILD_DIR, RELEASE_DIR],
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-docco');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'browserify:live_score', 'uglify', 'copy:build', 'docco']);
};
