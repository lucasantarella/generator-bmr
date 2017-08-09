'use strict';
const yosay = require('yosay');
const chalk = require('chalk');
const path = require('path');
const Generator = require('yeoman-generator');
const _ = require('lodash');
const extend = require('deep-extend');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  initializing() {
    this.props = {};
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the superior ' + chalk.red('generator-bmr') + ' generator!'
    ));

    return this.prompt([
      {
        name: 'name',
        message: 'Project name',
        default: ''
      },
      {
        name: 'dir',
        message: 'Project directory',
        default: path.basename(process.cwd())
      }
    ]).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.dir) {
      this.log(
        '\n' + 'Your generator must be inside a folder named ' + chalk.green(this.props.dir) + '\n' +
        chalk.bold('I\'ll automatically create this folder.') + '\n'
      );
      mkdirp(this.props.dir);
      this.destinationRoot(this.destinationPath(this.props.dir));
    }
  }

  writing() {
    // Create project dirs
    mkdirp(this.destinationPath('collections'));
    mkdirp(this.destinationPath('controllers'));
    mkdirp(this.destinationPath('layouts'));
    mkdirp(this.destinationPath('models'));
    mkdirp(this.destinationPath('modules'));
    mkdirp(this.destinationPath('views'));
    mkdirp(this.destinationPath('vendor'));

    // Get package settings
    const bowerJson = this.fs.readJSON(this.destinationPath('bower.json'), {});
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const manifest = this.fs.readJSON(this.destinationPath('manifest.json'), {});

    // Bower
    extend(bowerJson, {
      name: this.props.name,
      description: this.props.description,
      authors: [
        this.props.authorName
      ],
      version: this.props.version,
      dependencies: {
        jquery: '^3.2.1',
        requirejs: '^2.3.4',
        'requirejs-text': 'latest',
        'require-css': 'latest',
        underscore: '^1.8.3',
        backbone: '^1.3.3',
        'backbone.radio': '^2.0.0',
        'backbone.marionette': '^3.4.0'
      }
    });
    this.fs.writeJSON(this.destinationPath('bower.json'), bowerJson);

    // Package
    extend(pkg, {
      name: _.kebabCase(this.props.name),
      version: '0.0.0',
      description: this.props.description,
      homepage: this.props.homepage,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      files: [this.destinationPath()],
      main: 'app.js',
      keywords: [],
      devDependencies: {
        requirejs: '^2.3.4',
        gulp: '^3.9.1',
        'gulp-clean-css': '^2.0.10',
        'gulp-header': '^1.8.7',
        'gulp-less': '^3.1.0',
        'gulp-pug': '^3.2.0',
        'gulp-rename': '^1.2.2',
        'gulp-uglify': '^1.5.4',
        'gulp-watch': '^4.3.11',
        'gulp-install': '^1.1.0'
      }
    });
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    // Manifest
    extend(manifest, {
      name: this.props.name,
      display: 'standalone'
    });
    this.fs.writeJSON(this.destinationPath('manifest.json'), manifest);

    // Gulpfile
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js'),
      {title: 'Gulp'}
    );

    // Index.html
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      {title: 'Index.html'}
    );

    // AppView
    this.fs.copy(
      this.templatePath('AppView.js'),
      this.destinationPath('views/AppView.js'),
      {title: 'AppView.js'}
    );

    // Boilerplate
    this.fs.copy(
      this.templatePath('boilerplate.js'),
      this.destinationPath('boilerplate.js'),
      {title: 'Boilerplate'}
    );

    // App JS
    this.fs.copy(
      this.templatePath('app.js'),
      this.destinationPath('app.js'),
      {title: 'App.js'}
    );

    // Main JS
    this.fs.copy(
      this.templatePath('main.js'),
      this.destinationPath('main.js'),
      {title: 'Main.js'}
    );

    // Build File
    this.fs.copy(
      this.templatePath('build.js'),
      this.destinationPath('build.js'),
      {title: 'Boilerplate'}
    );
  }

  install() {
    this.installDependencies({
      node: true,
      bower: true,
      skipMessage: true,
      callback: () => {
        this.spawnCommand('./node_modules/.bin/gulp', ['copy'], {cwd: this.destinationPath()});
        this.spawnCommand('./node_modules/.bin/r.js', ['-o build.js'], {cwd: this.destinationPath()});
      }
    });
  }
};
