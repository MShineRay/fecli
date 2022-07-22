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
const download = require('download-git-repo');
const inquirer = require('inquirer');//NodeJs交互式命令行工具，询问操作者问题，获取用户输入，校验回答的合法性
const ora = require('ora');
const symbols = require('log-symbols');
const path = require('path')
const {/*copyFileByStream,*/ copyDir} = require('../lib/util/fileUtils')
const config = require('../lib/cli.config.json');
let choices = config.choices;
const sglConfig = require('../lib/sgl.config.json');
let sglChoices = sglConfig.choices;
const fecliConfig = require('../lib/config.json');
let fecliConfigChoices = fecliConfig.choices;

const rm = require('rimraf').sync
const validateProjectName = require('validate-npm-package-name')

function getChoiceItem(choiceVal, configList=choices){
  if(choiceVal){
    for (let i = 0, len = configList.length; i < len; i++) {
      if (configList[i].value === choiceVal) {
        return configList[i];
      }
    }
  }
  return {}
}

function getGitUrl(choiceVal, configList=choices) {
  return getChoiceItem(choiceVal, configList).url;
}

program
.version(pkg.version)
.usage('<command> [options]');

function checkProjectName(projectName, cwd) {
  const inCurrent = projectName === '.'
  const name = inCurrent ? path.relative('../', cwd) : projectName
  const result = validateProjectName(name)
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`))
    result.errors && result.errors.forEach(err => {
      console.error(chalk.red.dim('Error: ' + err))
    })
    result.warnings && result.warnings.forEach(warn => {
      console.error(chalk.red.dim('Warning: ' + warn))
    })
    process.exit(1)
  }
}

// fe create
program
.command('create [projectName]')
.option('-c, --clone <gitUrl>', 'create a new project with git clone(eg. fe create proDemo -c https://github.com/MShineRay/template-pc-vue2-elementui)')
.description(`create a new project powered by ${pkg.name}`)
.action((projectName, options)=>{
  console.log(options.clone)
  let defaultPrompt = []
  if(!projectName){
    defaultPrompt.unshift({
      name: 'projectName',
      message: 'Please input your project name'
    })
  }

  if(!options.clone){
    defaultPrompt.push({
      type: "list",
      name: 'cliTemplate',
      message: 'Please select your project template',
      choices: choices
    })
  }
  inquirer.prompt(defaultPrompt).then((answers) => {
    if(projectName){
      answers.projectName = projectName
    }

    const cwd = options.cwd || process.cwd()
    checkProjectName(answers.projectName, cwd);

    if (!fs.existsSync(answers.projectName)) {
      const spinner = ora();
      let tip = 'download project template...'
      if(options.clone){
        tip = 'download project template with git clone '+options.clone
      }
      spinner.start(tip);
      let gitUrl = getGitUrl(answers.cliTemplate);
      if(options.clone){
        gitUrl = 'direct:' + options.clone
      }

      if (gitUrl) {
        download(gitUrl, answers.projectName, {clone: true,checkout:false, depth:1}, (err) => {
          if (err) {
            console.log(err)
            spinner.fail(symbols.error);
          } else {
            spinner.succeed();
            const fileName = `${answers.projectName}/package.json`;
            const meta = {
              name: answers.projectName
            };
            if (fs.existsSync(fileName)) {
              const content = fs.readFileSync(fileName).toString();
              const contentJson = JSON.parse(content);
              let newResult = {
                ...contentJson,
                ...meta
              };
              newResult = JSON.stringify(newResult, null, '  ');
              fs.writeFileSync(fileName, newResult);
            }
            console.log(symbols.success, chalk.green(`The project ${ answers.projectName} init success`));
          }
        })
      } else {
        spinner.fail("git url is null");
      }

    } else {
      // 错误提示项目已存在，避免覆盖原有项目
      console.log(chalk.red(`Failed init the project！Error:The project ${answers.projectName} already exists`));
    }
  })
});

// fe info
program
.command('info')
.description('print debugging information about your environment')
.action((cmd) => {
  console.log(chalk.bold('\nEnvironment Info:'));
  console.log('\n@a0znpm/cli install path: '+ __dirname)

  require('envinfo').run(
    {
      System: ['OS', 'CPU'],
      Binaries: ['Node', 'Yarn', 'npm','webpack','vue-cli3'],
      Browsers: ['Chrome', 'Edge','Firefox', 'Safari'],
      npmPackages: ['styled-components', 'babel-plugin-styled-components'],
      npmGlobalPackages: ['npm', 'typescript', 'jest','vue-cli3','vue','webpack', '@vue/cli', '@a0znpm/fecli'],
      Utilities: ['Git', 'Subversion']
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

// fe tree
program
.command('tree')
.description(`generate directory tree under current directory(more about tree-node-cli)`)
.action(() => {
  require('../lib/util/directory-tree').generateDirTreeFile();
});
program.commands.forEach(c => c.on('--help', () => console.log()));

// fe inject
program
.command('inject')
.description(`Add single function template to project`)
.option('-c, --clone <gitUrl>', 'inject template to project with git clone(eg. fe inject -c https://github.com/MShineRay/template-sgl-editorconfig)')
.action((options) => {
  if(options.clone){
    const fromUrl = path.resolve(__dirname+'/'+sglConfig.cache+'/tempClone')
    download('direct:' + options.clone, fromUrl, {clone: true, checkout:false, depth:1}, (err) => {
      rm(fromUrl+'/.git')
      const spinner = ora();
      if (err) {
        console.log(err)
        spinner.fail(symbols.error);
        copyDir(fromUrl+'/', process.cwd())
      } else {
        copyDir(fromUrl+'/', process.cwd(), function (error) {

        })
        spinner.succeed();
        console.log(symbols.success, chalk.green(`The template ${ options.clone  } init success`));
      }
    })

    return true
  }
  inquirer.prompt([
    {
      type: "list",
      name: 'sglFunTemplate',
      message: 'Please select your single function template',
      choices: sglChoices
    },
  ]).then((answers) => {
    if (!fs.existsSync(answers.sglFunTemplate)) {
      const spinner = ora();
      let gitUrl = getGitUrl(answers.sglFunTemplate, sglConfig.choices);
      if (gitUrl) {
        const fromUrl = path.resolve(__dirname+'/'+sglConfig.cache+'/'+answers.sglFunTemplate)
        console.log('fromUrl:'+fromUrl)
        if(fs.existsSync(fromUrl)){ // Cache not invalidated
          console.log('add the single function template from cache')
          rm(fromUrl+'/.git')
          copyDir(fromUrl+'/', process.cwd())
          // copyFileByStream(fromUrl, process.cwd()+'/'+answers.sglFunTemplate)
          // spinner.succeed();
        }else{
          spinner.start('add the single function template from github...\n');
          rm(sglConfig.cache + '/'+answers.sglFunTemplate+'/.git')
          const distDir = path.resolve(sglConfig.cache + '/'+answers.sglFunTemplate)
          console.log('distDir:' + distDir)
          download(gitUrl, fromUrl, {clone: true, checkout:false, depth:1}, (err) => {
            if (err) {
              console.log(err)
              spinner.fail(symbols.error);
              rm(fromUrl+'/.git')
              copyDir(fromUrl+'/', process.cwd())
            } else {
              rm(fromUrl+'/.git')
              copyDir(fromUrl+'/', process.cwd(), function (error) {

              })
              spinner.succeed();
              console.log(symbols.success, chalk.green(`The project ${ answers.sglFunTemplate} init success`));
            }
          })
        }
      } else {
        spinner.fail("git url is null");
      }
    } else {
      // 错误提示项目已存在，避免覆盖原有项目
      console.log(chalk.red(`Failed add！Error:The template ${answers.sglFunTemplate} already exists`));
    }
  })
});

// fe clean
program
.command('clean')
.description(`clean the cli cache`)
.action(() => {
  const cacheRoot = __dirname + '/.cache'
  rm(cacheRoot)
});

// fe server
program
.command('server')
.description(`start node static http service by server(more about live-server)`)
.action((utility, args, options) => {
  // const action = options.dryRun ? 'Would run' : 'Running';
  // console.log(`${action}: ${utility} ${args.join(' ')}`);
  require('../lib/util/server')();
});

program
.command('check-version')
.description("check the @a0znpm/fecli version.")
.action(() => {
  require('../lib/util/checkVersion')();
})


// fe config
program
  .command('config')
  .description(`update config file of fecli`)
  .action((options) => {
    const cacheDir = fecliConfig.cache
    console.log(cacheDir)
    const fromUrl = path.resolve(__dirname+'/'+cacheDir)
    console.log('fromUrl:'+fromUrl)
    const spinner = ora();
    rm(fromUrl)
    spinner.start('fetch the fecli config from github...\n');
    download(fecliConfig.github, fromUrl, {clone: true, checkout:false, depth:1}, (err) => {
      rm(fromUrl+'/.git')
      if (err) {
        console.log(err)
        spinner.fail(symbols.error);
      } else {
        spinner.succeed();
        console.log(symbols.success, chalk.green(`fetch the fecli config success`));
        // 引入 最新的config.json 对比已有的 version
        // 如果版本高，则复制
        const fecliConfigVersion = fecliConfig.version
        try{
          const newFeConfig = JSON.parse(fs.readFileSync(fromUrl+'/config.json', 'utf8'))
          console.log(newFeConfig)
          // 显示更新的选项
          const needUpdate = semver.gt(newFeConfig.version, fecliConfigVersion)
          if(needUpdate) {
            spinner.start('start replace the fecli config file...\n');
            copyDir(fromUrl + '/config.json', './lib/config.json', function (error) {
              spinner.succeed();

              if (error) {
                console.log(symbols.success, chalk.green(`replace the fecli config file failed:`));
                console.log(error)
              } else {
                console.log(symbols.success, chalk.green(`replace the fecli config file success`));
                //
                showConfigPrompt(require('../lib/config.json'))
              }
            })
          }else{
            showConfigPrompt(require('../lib/config.json'))
          }
        }catch (e){
          console.log(e)
        }
      }
    })
  });

function showConfigPrompt(feCofigObj){
  inquirer.prompt([
    {
      type: "list",
      name: 'selected',
      message: 'Please select the config file to update',
      choices: feCofigObj.choices
    },
  ]).then((answers) => {
    console.log('answers')
    console.log(answers)
    const selectInfo = getChoiceItem(answers.selected, fecliConfig.choices)
    const cacheDir = feCofigObj.cache
    console.log(cacheDir)
    const fromUrl = path.resolve(__dirname+'/'+cacheDir)
    console.log('fromUrl:'+fromUrl)
    const spinner = ora();
    rm(fromUrl)
    spinner.start('fetch the '+answers.selected+' config from github...\n');
    download(selectInfo.url, fromUrl, {clone: true, checkout:false, depth:1}, (err) => {
      rm(fromUrl+'/.git')
      if (err) {
        console.log(err)
        spinner.fail(symbols.error);
      } else {
        spinner.succeed();
        console.log(symbols.success, chalk.green(`fetch the ${answers.selected} config success`));
        // 引入 最新的config.json 对比已有的 version
        // 如果版本高，则复制
        try{
          const srcFile = fromUrl+'/'+selectInfo.src
          const distFile = path.resolve(__dirname+'/../'+selectInfo.dist)
          const newConfig = JSON.parse(fs.readFileSync(srcFile, 'utf8'))
          const oldConfig = JSON.parse(fs.readFileSync(distFile, 'utf8'))
          // 显示更新的选项
          const needUpdate = semver.gt(newConfig.version, oldConfig.version)
          if(needUpdate) {
            spinner.start(`start replace the ${selectInfo.src} config file...\n`);
            copyDir(srcFile, distFile, function (error) {
              spinner.succeed();
              if (error) {
                console.log(symbols.success, chalk.green(`replace the ${selectInfo.src} config file failed:`));
                console.log(error)
              } else {
                console.log(symbols.success, chalk.green(`replace the ${selectInfo.src} config file success`));
              }
            })
          }
        }catch (e){
          console.log(e)
        }
      }
    })
  })
}

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
