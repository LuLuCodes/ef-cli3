#!/usr/bin/env node

const program = require('commander');
const updateCheck = require('../lib/update');

program
  // 定义命令和参数
  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    // 打印执行结果
    console.log('name:', name, 'options:', options);
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

// 解析命令行参数
program.parse(process.argv);
