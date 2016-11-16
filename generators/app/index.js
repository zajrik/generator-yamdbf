'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
	constructor: function () {
    	yeoman.Base.apply(this, arguments);

		this.option('typescript', {alias: 't', required: false});
	},

	prompting: function () {
		var done = this.async();
		this.log(yosay(
			'Welcome to the terrific ' + chalk.red('yamdbf') + ' generator!'
		));

		var prompts = [{
			type: 'input',
			name: 'name',
			message: 'Bot name:',
			default: 'bot'
		},{
			type: 'input',
			name: 'version',
			message: 'Bot version:',
			default: '0.0.0'
		},{
			type: 'confirm',
			name: 'selfbot',
			message: 'Selfbot?:',
			default: false
		},{
			type: 'input',
			name: 'statusText',
			message: 'Status text (leave blank for null):',
			default: 'null'
		},{
			type: 'input',
			name: 'prefix',
			message: 'Command prefix:',
			default: '/'
		},{
			type: 'input',
			name: 'token',
			message: 'Bot token (optional, can be added later):',
			default: ''
		},{
			type: 'input',
			name: 'owner',
			message: 'Owner id (optional):',
			default: ''
		}];

		var disableBase = [];
		var disableCommands = function()
		{
			var toDisable = {
				name: 'disableBase',
				message: 'Base commands to disable (leave blank to continue):',
			}
			return this.prompt([toDisable]).then(function(props) {
				if (props.disableBase !== '') {
					disableBase.push(props.disableBase);
					return disableCommands();
				} else {
					this.props.disableBase = disableBase;
				}
			}.bind(this));
		}.bind(this);

		return this.prompt(prompts).then(function (props) {
			this.props = props;
			return disableCommands();
		}.bind(this)).then(done);
	},

	writing: function () {
		var template = this.options.typescript ? 'bot.ts.template' : 'bot.js.template';
		var output = this.options.typescript ? 'bot.ts' : 'bot.js';
		var pkg = {	dependencies: {	yamdbf: '*'	} };
		if (this.options.typescript) pkg.devDependencies = {
			'@types/node': '*',
			'typescript': '*',
			'tslint': '*'
		}
		this.fs.writeJSON(this.destinationPath('package.json'), pkg);
		this.fs.copyTpl(
			this.templatePath(template),
			this.destinationPath('src/' + output), {
				name: this.props.name,
				selfbot: this.props.selfbot,
				version: this.props.version,
				statusText: this.props.statusText || 'null',
				disableBase: this.props.disableBase.length > 1 ? '\n' + this.props.disableBase.map(function(a) { return "\t\t'" + a + "'" }).join(',\n') + '\n\t' : '',
				prefix: this.props.prefix
			}
		)
		this.fs.copyTpl(
			this.templatePath('config.json.template'),
			this.destinationPath('src/config.json'), {
				token: this.props.token,
				owner: this.props.owner	
			}
		);
		this.fs.copyTpl(
			this.templatePath('.gitignore'),
			this.destinationPath('.gitignore'));
		mkdirp.sync('./src/commands/');
	},

	install: function () {
		this.installDependencies({bower: false});
	}
});
