var grunt = require('grunt');
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
  babel: {
    dist: {
      options: {
          sourceMap: true
      },
      files: [
        {expand: true, cwd: 'src/', dest: 'dist/', ext: '.js', src: '**/*.js'}
      ]
    },
    acceptance: {
      options: {
        sourceMap: true
      },
      files: [
        {expand: true, cwd: 'test/acceptance/', dest: 'test/cacceptance/', ext: '.js', src: '**/*.js'},
        {dest: 'test/testRunner.js', src: 'test/testRunner.es6'}
      ]
    }
  },
  bytesize: {
    all: {
      src: ['dist/*.js']
    }
  },
  browserify: {
    test: {
      src: 'test/cacceptance/runner.js',
      dest: 'test/cacceptance/bundle.js'
    },
    sandbox: {
      src: 'test/sandbox/sandbox.js',
      dest: 'test/sandbox/bundle.js'
    }
  },
  eslint: {
    target: ['src', 'test/acceptance/*.js']
  },
  peg: {
    dist: {
      src: 'src/grammar.pegjs',
      dest: 'dist/parser.js'
    }
  },
  watch: {
    scripts: {
      files: ['**/*.js'],
      tasks: ['default'],
      options: {
        spawn: false
      }
    },
    test: {
      files: ['**/*.js', 'test/**/*.es6'],
      tasks: ['default', 'acceptance'],
      options: {
        spawn: false
      }
    }
  },
  templateSize: {
    benchmark: {
      src: ['benchmark/templates/*.td']
    }
  }
});

grunt.task.loadTasks('grunt-tasks/');

grunt.registerTask('dist', ['peg', 'eslint', 'babel:dist']);
grunt.registerTask('acceptance', ['dist', 'babel:acceptance', 'browserify:test']);
grunt.registerTask('sandbox', ['dist', 'browserify:sandbox']);
grunt.registerTask('benchmark', ['dist', 'bytesize', 'templateSize']);

grunt.registerTask('default', ['dist', 'browserify']);
