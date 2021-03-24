const fs = require('fs');

/**
 * 异步读取文件内容
 * @param path
 * @returns {Promise}
 */
function readFileAsync(path, options = {encoding: 'utf-8'}) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * 同步读取
 * @param path
 * @returns {Promise.<*>}
 */
function readFileSync(path, options = {encoding: 'utf-8'}) {
  let data = fs.readFileSync(path, options);
  return data;
}

module.exports = {
  readFileAsync,
  readFileSync
};

/*
let res = readFileSync('../1.css')
let note = require('./note.js').parseNote(res)
console.log(note)*/
console.log(require('path').dirname('E:\itcast\Nodejs\basename\www'))