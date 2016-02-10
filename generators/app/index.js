'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
    prompting: function() {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the great ' + chalk.red('gulp-typescript-sass') + ' generator!'
        ));

        // var prompts = [{
        //   type: 'confirm',
        //   name: 'someOption',
        //   message: 'Would you like to enable this option?',
        //   default: true
        // }];
    
        var prompts = [{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname
        }, {
                type: 'input',
                name: 'author',
                message: 'Your name',
                default: 'Maurits Elbers <magicmau@gmail.com>'
            }, {
                type: 'input',
                name: 'license',
                message: 'License',
                default: 'UNLICENSED'
            }]

        this.prompt(prompts, function(props) {
            this.props = props;
            // To access props later use this.props.someOption;

            done();
        }.bind(this));
    },

    writing: function() {
        
        var tpls = ['_package.json', '_bower.json'];
        tpls.forEach(function(element) {
            this.fs.copyTpl(this.templatePath(element), this.destinationPath(element.replace("_", "")), this.props);
        }, this);
        
        this.fs.copy(this.templatePath('gulpfile.js'), this.destinationPath('gulpfile.js'));
        
        var dirs = ['.vscode', 'app', 'app/css', 'app/fonts', 'app/images', 'app/js', 'app/scss', 'app/ts', 'dist', 'bower_components']
        dirs.forEach(function(dir) {
            mkdirp.sync(path.join(this.destinationPath(), dir));
            this.directory(dir, dir);
        }, this);
    },

    install: function() {
        this.installDependencies();
    }
});
