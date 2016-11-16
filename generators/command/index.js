'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
	constructor: function () {
    	yeoman.Base.apply(this, arguments);

		this.option('typescript', {alias: 't', required: false});
	},

	prompting: function () {
		this.log(yosay(
			'Welcome to the ' + chalk.red('yamdbf') + ' command generator!'
		));

		var prompts = [{
			type: 'input',
			name: 'name',
			message: 'Command name:',
			default: 'foo'
		},{
			type: 'input',
			name: 'aliases',
			message: 'Aliases (separated by commas, eg. "foo, bar, baz")?:',
			default: ''
		},{
			type: 'input',
			name: 'description',
			message: 'Quick command description:',
			default: ''
		},{
			type: 'input',
			name: 'usage',
			message: 'Command usage string:',
			default: ''
		},{
			type: 'input',
			name: 'group',
			message: 'Command group:',
			default: 'base'
		},{
			type: 'confirm',
			name: 'guildOnly',
			message: 'Is this command guild only?:',
			default: false
		},{
			type: 'confirm',
			name: 'ownerOnly',
			message: 'Is this command owner only?:',
			default: false
		}];

		return this.prompt(prompts).then(function (props) {
			this.props = props;
		}.bind(this));
	},

	writing: function () {
		var className = this.props.name.replace(/[^a-zA-Z]/g, '');
		className = className.charAt(0).toUpperCase() + className.slice(1);

		var aliases = this.props.aliases.replace(/ +/g, '').split(',')
			.map(function(a) { return "'" + a + "'"}).join(', ');
		if (aliases === "''") aliases = '';

		var template = 'Command' + (this.options.typescript ? '.ts.template' : '.js.template');
		var output = className + (this.options.typescript ? '.ts' : '.js');

		this.fs.copyTpl(
			this.templatePath(template),
			this.destinationPath('./src/commands/' + output), {
				className: className,
				name: this.props.name.toLowerCase(),
				aliases: aliases,
				description: this.props.description,
				usage: this.props.usage,
				group: this.props.group,
				guildOnly: this.props.guildOnly,
				ownerOnly: this.props.ownerOnly
			}
		);

		this.log('\n\n' + chalk.red('REMINDER') + ': If you want to add any requisite roles or permissions, remember that\nthey will override the "guildOnly" property to true, as roles and permissions are\nnot supported outside of guilds.\n\n');
	}
});
