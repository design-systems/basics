module.exports = function(grunt) {  
  require('jit-grunt')(grunt);


  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
        },
        files: {
          "ui/assets/styles/css/style.css": "ui/assets/styles/less/style.less" // destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: ['ui/assets/styles/less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
};