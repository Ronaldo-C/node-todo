#!/usr/bin/env node
const program = require('commander');
const api = require('./index')
const pkg = require('./package.json')

program
  .version(pkg.version)

program
  .command('add')
  .description('add a task')
  .action((args) => {
    const words = args.parent.args.join(' ')
    api.add(words).then(() => console.log('添加成功'), () => console.log('添加失败'))
  });

program
  .command('clear')
  .description('clear all tasks')
  .action((args) => {
    api.clear().then(() => console.log('清除成功'), () => console.log('清除失败'))
  });

if (process.argv.length === 2) {
  api.showAll()
}

program.parse(process.argv);


