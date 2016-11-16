# generator-yamdbf [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Easily generate base files necessary for creating Discord.js bots using YAMDBF

## Installation

First, install [Yeoman](http://yeoman.io) and generator-yamdbf using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).

```bash
npm install -g yo
npm install -g generator-yamdbf
-------------------------------
yarn global add yo
yarn global add generator-yamdbf
```

## Bot project generation
To generate a new YAMDBF bot project, from the command line,  run:

```bash
yo yamdbf [-t]
```
The optional `-t` flag will generate the project using Typescript. `typescript`, `tslint`, and `@types/node` will be added to the package dependencies and installed for you, but you will still need to install any necessary build dependencies and typings you would normally use.

For quick reference of Discord.js and YAMDBF typings installation:
```bash
typings install github:acdenisSK/discord.js-typings/discord.d.ts --save --global
typings install github:zajrik/yamdbf-typings/yamdbf.d.ts --save --global
```

## Command class file generation
A command file base can be generated at any time for Javascript or Typescript using:
```bash
yo yamdbf:command [-t]
```

You'll want to run this from your project root, as it will try to put command files in `./src/commands`

## Getting To Know Yeoman
 * [Learn more about Yeoman](http://yeoman.io/)

## License

MIT © [Zack Campbell](https://github.com/zajrik)


[npm-image]: https://badge.fury.io/js/generator-yamdbf.svg
[npm-url]: https://npmjs.org/package/generator-yamdbf
[daviddm-image]: https://david-dm.org/zajrik/generator-yamdbf.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/zajrik/generator-yamdbf
