module.exports = function(grunt) {
  grunt.initConfig({
    clean: ['build'],
    copy: {
      files: {
        src: ['**'],
        dest: 'build/'
      }
    },
    mochaTest: {
      test: {
        src: ['test/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nsp-package');
  grunt.loadNpmTasks('grunt-retire');

  grunt.registerTask('default', ['build']);
  grunt.registerTask('test', ['build']);
  grunt.registerTask('prod', ['build']);
  grunt.registerTask('build', ['clean', 'copy', 'mochaTest']);
};
