const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
// const jschardet = require('jschardet')
// const iconvLite = require('iconv-lite')
/**
 * parseFile
 * @type {string}
 *
 */


const fileWhiteList = [
  'html',
  'png',
  'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'
]

function isAssetTypeAnImage(ext) {
  return [
    'png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(ext.toLowerCase()) !== -1;
}

/**
 * 根据文件路径获取文件后缀（文件类型）
 * @param filePath
 * @returns {string}
 */
function getFileExt(filePath) {
  //获取最后一个.的位置
  var index = filePath.lastIndexOf(".");
  // var extname=path.extname("123.html");	 //获取文件的后缀名
  //获取后缀
  return filePath.substr(index + 1)
}

// 递归创建目录 异步方法
// function mkdirs(dirname, callback) {
//   fs.exists(dirname, function (exists) {
//     if (exists) {
//       callback();
//     } else {
//       // console.log(path.dirname(dirname));
//       mkdirs(path.dirname(dirname), function () {
//         fs.mkdir(dirname, callback);
//         console.log('在' + path.dirname(dirname) + '目录创建好' + dirname  +'目录');
//       });
//     }
//   });
// }

/**
 * 递归创建目录 同步方法
 * @param dirname
 * @returns {boolean}
 */
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

/**
 * 递归删除文件夹及其下子目录
 * @param filePath
 * @param callback
 */
function rmdir(filePath, callback, delDir = true) {
  // 先判断当前filePath的类型(文件还是文件夹,如果是文件直接删除, 如果是文件夹, 去取当前文件夹下的内容, 拿到每一个递归)
  fs.stat(filePath, function (err, stat) {
    if (err) return console.log(err)
    if (stat.isFile()) {
      fs.unlink(filePath, callback)
    } else {
      fs.readdir(filePath, function (err, data) {
        if (err) return console.log(err)
        let dirs = data.map(dir => path.join(filePath, dir))
        let index = 0
        !(function next() {
          // 此处递归删除掉所有子文件 后删除当前 文件夹
          if (index === dirs.length) {
            fs.rmdir(filePath, callback)
          } else {
            rmdir(dirs[index++], next)
          }
        })()
      })
    }
  })
}


/**
 *
 * @param fileOrDirPath {String} 文件或文件夹路径
 * @param fileDir {String} 文件或文件夹上级路径
 * @param filename
 * @param filePath
 * @param isDir
 * @param isFile
 * @param dirLevel
 * @param fileType
 */
function parseWXHTML(fileOrDirPath, {
  fileDir,//文件所在文件夹
  filename,
  filePath,//文件绝对路径
  isDir,
  isFile,
  dirLevel = 0,
  fileType
} = {}) {
  if (fileOrDirPath) {
    let isDirDef = isDir;// true || false 判断是不是文件夹
    let isFileDef = isFile;// true || false 判断是不是文件夹

    if (!filePath) {
      let lstatSync = fs.lstatSync(fileOrDirPath);
      isDirDef = lstatSync.isDirectory()
      isFileDef = lstatSync.isFile()
    }

    if (isDirDef) {
      //根据文件路径读取文件，返回文件列表
      fs.readdir(fileOrDirPath, function (err, files) {
        if (err) {
          console.warn(err)
        } else {
          //遍历读取到的文件列表
          // console.log('files:', files)
          dirLevel++
          files.forEach(function (filename) {
            //获取当前文件的绝对路径
            const filePath = path.join(fileOrDirPath, filename);
            const stat = fs.lstatSync(filePath);
            const isDir = stat.isDirectory();// true || false 判断是不是文件夹
            const isFile = stat.isFile();// true || false 判断是不是文件夹
            //获取后缀
            const fileType = getFileExt(filePath);
            const encoding = 'utf-8'
            const fileInfo = {
              fileDir: fileOrDirPath,
              filename,
              filePath,
              isDir,
              isFile,
              dirLevel,
              fileType,
              encoding
            }
            if (isDir || isFile && (fileWhiteList.includes(fileType) || fileType === filePath)) {
              parseWXHTML(filePath, fileInfo);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          });
        }
      });
    } else if (isFileDef) {
      let fileList = filePath.split('data')
      fileList.splice(0, 1)
      let fileDistDir = fileList.join('data')
      mkdirsSync('./dist' + fileDistDir.split(filename)[0])

      if (fileType === 'html' && dirLevel<2) {
        let file = fs.readFileSync(filePath, 'utf8')
        var $ = cheerio.load(file)
        $("[style='display:none;']").remove()
        // $("[data-id='heading-0']").remove()// cheerio未实现根据data-id属性的查找dom
        $("section[data-role='outer']").remove()
        var js_content = $('#js_content').html()

        var newHtml = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
        </head>
        <body>
        ${js_content}
        </body>
        </html>`
        fs.writeFile('./dist' + fileDistDir, newHtml, 'utf8', function (err) {
          if (err) return console.log(err);
        });
      } else {
        let file = fs.readFileSync(filePath, 'binary')
        fs.writeFileSync('./dist' + fileDistDir, file, 'binary')
      }
    }
  }

}



const parseWXHtml = ()=>{
  mkdirsSync('./dist')
  
  rmdir('./dist/', function () {
    console.log('dist删除成功')
  })
  
  /**
   * 实现思路
   * 1、遍历src下的所有文件并解析,找到src/*.html, 解析其文件名，在当前目录找到其对应的子目录（资源文件）
   * 3、获取html内容（id为js_content)的内容，获取对应子目录（资源文件）下所有的图片
   * 4、将内容追加到html模版里，并写到dist下
   * 5、拷贝对应的资源文件至dist下
   * 6、clean 删除 src下已经处理过的源文件及其依赖的资源文件
   * @type {string}
   */
  let filePath = path.resolve(__dirname + '/data');
  
  if(!fs.existsSync(filePath)){
    filePath = path.resolve(__dirname);
  }
  
  console.log('filePath:', filePath)
  
  parseWXHTML(filePath)
}
module.exports = {
  parseWXHtml
};
