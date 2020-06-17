const homedir = require('os').homedir()
const path = require('path')
const fs = require('fs')

const home = process.env.HOME || homedir
const todoPath = path.join(home, '.todo')

const dp = {
  read(path = todoPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: 'a+' }, (error, data) => {
        if (error) return reject(error)
        let list
        try {
          list = JSON.parse(data)
        } catch (error) {
          list = []
        }
        resolve(list)
      })
    })
  },
  write(list, path = todoPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list)
      fs.writeFile(path, string + '\n', (error) => {
        if (error) return reject(error)
        resolve()
      })
    })
  }
}

module.exports = dp