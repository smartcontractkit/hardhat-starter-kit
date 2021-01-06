'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    watch: {
      testNLint: {
        files: '{lib,test}/**/*.js',
        tasks: ['jshint', 'mochaTest']
      },
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish'),
        reporterOutput: ''
      },
      all: '{lib,test}/**/*.js'
    },

    mochaTest: {
      options: {
        reporter: 'spec',
        globals: ['chai', 'should'],
        require: 'test/common'
      },
      src: 'test/**/*.spec.js'
    },
  });

  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('ci', ['jshint:all', 'mochaTest']);
};
