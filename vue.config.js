const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const inquirer = require('inquirer');

const { parseArgv, testFile } = require('./utils.js');

// let projectConfig = require('./src/demo/config.js');  // 不加 ./ 会报错
// console.log('projectConfig', projectConfig);

// console.log(process.argv);

const isBuild = process.argv[2] == 'build'
let argvData = parseArgv(process.argv);
let project = argvData('--project') || 'demo';

// console.log('project', project);

let testProjectFile = testFile(project);

const zip = argvData('--zip');

// console.log('zip', zip);

console.log('testFile', testProjectFile('config.js'));
// console.log('testFile', JSON.parse(testProjectFile('config.js')).version);

if (!testProjectFile('main.js')) {
  console.log(chalk.red.bgCyan.bold('--------项目缺少入口文件---------\n'));
  process.exit();
}

if (!testProjectFile('config.js')) {
  console.log(chalk.red.bgCyan.bold('--------项目缺少配置文件---------\n'));
  process.exit();
}

let projectConfig = require(`./src/${project}/config.js`);

if (!projectConfig.version) {
  console.log(chalk.red.bgCyan.bold('--------请添加版本号---------\n'));
  process.exit();
}

// console.log('====', fs.existsSync(path.join(__dirname, './dis/t'))(`${project}-${projectConfig.version}`))

// if (fs.existsSync(path.join(__dirname, `./dist/${project}-${projectConfig.version}`)) && isBuild) {
//   console.log(chalk.red.bgCyan.bold('--------项目缺少配置文件---------\n'));
//   process.exit();
// }

let entryName = projectConfig.filename || 'index';


const config = {
  // outputDir: `dist/${project}-${project.version}`,
  // outputDir: `dist/${project}-${projectConfig.version}`,
  pages: {
    // index: {
    [entryName]: {
    // 1: {
      entry: `./src/${project}/main.js`,
      template: 'public/index.html',
      title: projectConfig.title || project,
      filename: entryName + '.html'
    },
    demo1: {
      entry: `./src/demo1/main.js`,
      template: 'public/index.html',
      title: '111',
      filename: 'demo1.html'
    }
  },
  chainWebpack: (config) => {
    if (zip === 'true' && isBuild) {
      config.plugin('filemanager').use(FileManagerPlugin, [{
        onEnd: {
          archive: [
            { source: `${__dirname}/dist/${project}-${version}`, destination: `${__dirname}/dist/${project}-${version}.zip` },
          ],
        },
      }])
    }
  },
}

module.exports = config;

