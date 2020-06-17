const dp = require('./dp')
const inquirer = require('inquirer');

module.exports.add = async (title) => {
  let list = await dp.read()
  list.push({ title, done: false })
  await dp.write(list)
}

module.exports.clear = async () => {
  await dp.write([])
}

module.exports.showAll = async () => {
  let list = await dp.read()
  printTask(list)
}

function printTask(list) {
  inquirer
    .prompt({
      type: 'list',
      name: 'index',
      message: '请选择你想操作的任务',
      choices: [{ name: '退出', value: '-1' }, ...list.map((item, index) => {
        return { name: `${item.done ? '[x]' : '[_]'} ${index + 1} - ${item.title}`, value: index.toString() }
      }), { name: '创建任务', value: '-2' }],
    })
    .then(answers1 => {
      const index = parseInt(answers1.index)
      if (index >= 0) {
        askForAction(list, index)
      } else if (index === -2) {
        askForCreateTask(list)
      }
    });
}

function askForAction(list, index) {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: '请选择操作',
      choices: [
        { name: '退出', value: 'quit' },
        { name: '已完成', value: 'markAsDone' },
        { name: '未完成', value: 'markAsUnDone' },
        { name: '改标题', value: 'updateTitle' },
        { name: '删除', value: 'remove' }
      ],
    })
    .then(answers2 => {
      markObj[answers2.action] && markObj[answers2.action](list, index)
    });
}

const markObj = {
  markAsDone: function markAsDone(list, index) {
    list[index].done = true
    dp.write(list)
  },
  markAsUnDone: function markAsUnDone(list, index) {
    list[index].done = false
    dp.write(list)
  },
  updateTitle: function updateTitle(list, index) {
    inquirer.prompt({
      type: 'input',
      name: 'title',
      message: '请输入新的标题',
      default: list[index].title
    })
      .then(answers3 => {
        list[index].title = answers3.title
        dp.write(list)
      })
  },
  remove: function remove(list, index) {
    list.splice(index, 1)
    dp.write(list)
  }
}

function askForCreateTask(list) {
  inquirer.prompt({
    type: 'input',
    name: 'title',
    message: '请输入任务标题'
  })
    .then(answers4 => {
      list.push({ title: answers4.title, done: false })
      dp.write(list)
    })
}