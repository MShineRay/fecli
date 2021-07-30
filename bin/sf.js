#!/usr/bin/env node

// Check node version before requiring/doing anything else
// The user may be on a very old node version

const chalk = require('chalk');//命令行输出样式美化
const semver = require('semver');
const pkg = require('../package.json');
const requiredVersion = pkg.engines.node;

function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(chalk.red(
      'You are using Node ' + process.version + ', but this version of ' + id +
      ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
    ));
    process.exit(1)
  }
}

checkNodeVersion(requiredVersion, pkg.name);

if (semver.satisfies(process.version, '9.x')) {
  console.log(chalk.red(
    `You are using Node ${process.version}.\n` +
    `Node.js 9.x has already reached end-of-life and will not be supported in future major releases.\n` +
    `It's strongly recommended to use an active LTS version instead.`
  ))
}
const fs = require('fs');//读写文件模块，这里主要用于读入用户配置文件，输出模板到文件
const program = require('commander');//NodeJs命令行工具，提供了用户命令行输入和参数解析，用户解析用户输入
// const download = require('download-git-repo');
const inquirer = require('inquirer');//NodeJs交互式命令行工具，询问操作者问题，获取用户输入，校验回答的合法性
const ora = require('ora');
const symbols = require('log-symbols');
// const config = require('../lib/cli.config.json');
// let choices = config.choices;

// function getGitUrl(choiceVal) {
//   for (let i = 0, len = choices.length; i < len; i++) {
//     if (choices[i].value === choiceVal) {
//       return choices[i].url;
//     }
//   }
//   return '';
// }

program
.version(pkg.version)
.usage('<command> [options]');

program
.command('parsewxhtml')
.description(`parse wx html`)
.action(() => {
  require('../src/parseWXHtml').parseWXHtml();
});


program
.command('info')
.description('print debugging information about your environment')
.action((cmd) => {
  console.log(chalk.bold('\nEnvironment Info:'));
  require('envinfo').run(
    {
      System: ['OS', 'CPU'],
      Binaries: ['Node', 'Yarn', 'npm','webpack','vue-cli3'],
      Browsers: ['Chrome', 'Firefox', 'Safari'],
      npmPackages: ['styled-components', 'babel-plugin-styled-components'],
      npmGlobalPackages: ['npm', 'typescript', 'jest','vue-cli3','vue','webpack'],
      Utilities: ['Git', 'Subversion']
   /*   System: ['OS', 'CPU'],
      Binaries: ['Node', 'Yarn', 'npm'],
      Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
      npmPackages: '/!**!/{typescript,*vue*,@vue/!*!/}',
      npmGlobalPackages: ['@vue/cli']*/
    },
    {
      showNotFound: true,
      duplicates: true,
      fullTree: true
    }
  ).then(console.log)
});

// output help information on unknown commands
program
.arguments('<command>')
.action((cmd) => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log()
});

// add some useful info on help
program.on('--help', () => {
  console.log();
  console.log(`  Run ${chalk.cyan(`${pkg.name} <command> --help`)} for detailed usage of given command.`);
  console.log()
});

program
.command('dir-tree')
.description(`generate directory tree under current directory`)
.action(() => {
  require('../lib/util/directory-tree').generateDirTreeFile();
});
program.commands.forEach(c => c.on('--help', () => console.log()));

// enhance common error messages
const enhanceErrorMessages = require('../lib/util/enhanceErrorMessages');

enhanceErrorMessages('missingArgument', argName => {
  return `Missing required argument ${chalk.yellow(`<${argName}>`)}.`
});

enhanceErrorMessages('unknownOption', optionName => {
  return `Unknown option ${chalk.yellow(optionName)}.`
});

enhanceErrorMessages('optionMissingArgument', (option, flag) => {
  return `Missing required argument for option ${chalk.yellow(option.flags)}` + (
    flag ? `, got ${chalk.yellow(flag)}` : ``
  )
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp()
}