const fs = require('fs');
const path = require('path');
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
  console.log('readFileSync:', path)
  let data = fs.readFileSync(path, options);
  return data;
}

/**
 * 异步生成文件
 * @param {String} fileName
 * @param {String} fileContent
 * @param {Function} callback
 */
function writeFile(fileName = 'file.txt', fileContent = '', callback = null) {
  //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
  // let str = JSON.stringify(fileContent, null, '  ');
  fs.writeFile(
    fileName,
    fileContent,
    function (err, data) {
      if (err) throw err;
      callback && callback();
    }
  )
}


module.exports = {
  readFileAsync,
  readFileSync,
  writeFile
};
