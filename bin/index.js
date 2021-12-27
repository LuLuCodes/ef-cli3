#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const figlet = require('figlet');
const updateCheck = require('../lib/update');

program
  // 定义命令和参数
  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    require('../lib/create.js')(name, options);
  });

program
  // 配置版本号信息
  .version(`v${require('../package.json').version}`, '-v, --version')
  .usage('<command> [option]');

// upgrade 检测更新
program
  // 声明的命令
  .command('upgrade')
  // 描述信息，在帮助信息时显示
  .description('Check ef-cli3 version.')
  .action(() => {
    // 执行 lib/update.js 里面的操作
    updateCheck();
  });

program
  // 监听 --help 执行
  .on('--help', () => {
    console.log(
      '\r\n' +
        figlet.textSync('ef-cli3', {
          font: 'Ghost',
          horizontalLayout: 'default',
          verticalLayout: 'default',
          width: 80,
          whitespaceBreak: true,
        })
    );

    // 新增说明信息
    console.log(
      `\r\nRun ${chalk.cyan(
        `ef-cli3 <command> --help`
      )} for detailed usage of given command\r\n`
    );
  });

// 解析命令行参数
program.parse(process.argv);
