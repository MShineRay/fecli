/**
 * @desc 目录树
 * @type {directoryTree}
 */
const FileUtils = require('./fileUtils')
const NoteUtils = require('./note')
const Utils = require('./utils')
const directoryTree = require("directory-tree");
const defaultExclude = /node_modules|wwwroot|.idea|.git|test|dist|mock/;


/**
 * 获取指定路径的目录结构对象
 * @param path
 * @param options
 * @param onEachFile
 * @param onEachDirectory
 * @returns {*}
 */
function getDirTreeObj(path = "./", options = {normalizePath: true}, onEachFile, onEachDirectory) {
  // Skip if it matches the exclude regex
  let excludes = [defaultExclude];
  if (options && options.exclude) {
    excludes = Utils.isRegExp(options.exclude)
      ? excludes.concat([options.exclude])
      : excludes.concat(options.exclude);
  }
  options.exclude = excludes;
  return directoryTree(
    path,
    options,
    onEachFile,
    onEachDirectory
  );
}

/**
 * 将树结构对象扁平化
 * @param treeObj
 * @param ary
 * @returns {*|Array}
 */
function flattenDirTree(treeObj = {}, ary = []) {
  let result = ary || [];
  if (treeObj.type === 'directory') {
    result.push(treeObj.name)
    if (treeObj.children && treeObj.children.length > 0) {
      for (let i = 0, len = treeObj.children.length; i < len; i++) {
        flattenDirTree(treeObj.children[i], result)
      }
    }
  } else {
    result.push(treeObj.name)
  }
  return result
}

/**
 * 生成 directoryTreeDesc.md
 * @param filename
 * @param path
 */
async function generateDirTreeFile(filename = "directoryTreeDesc.md", path = './') {
  let dirTree = getDirTreeObj(path, {
      normalizePath: true
    }
  );
  if (dirTree) {
    await convertTreeObj(dirTree)
    let flattenDirTreeAry = flattenDirTree(dirTree);
    if (flattenDirTreeAry.length > 0) {
      flattenDirTreeAry.unshift('```')
      flattenDirTreeAry.unshift('# 目录结构')
      flattenDirTreeAry.push('```')
    }
    FileUtils.writeFile(filename, flattenDirTreeAry.join('\n'));
  }
}

/**
 * 更新treeObj的name和level
 * @param treeObj
 * @param level
 */
async function convertTreeObj(treeObj = {}, level = 0) {
  if (treeObj.type === 'directory') {
    treeObj.level = level;
    treeObj.name = preDirStr(level) + treeObj.name;
    if (treeObj.children && treeObj.children.length > 0) {
      level += 1;
      for (let i = 0, len = treeObj.children.length; i < len; i++) {
        await convertTreeObj(treeObj.children[i], level)
      }
    }
  } else {
    treeObj.level = level;
    if (/\.(js|html|vue|css)$/.test(treeObj.name)) {
      let fileNote = await fileFirstLineData(treeObj.path);
      let note = NoteUtils.parseNote(fileNote);
      if (note) {
        note = " # " + note;
      }
      treeObj.name = preDirStr(level) + treeObj.name + note;
    } else {
      treeObj.name = preDirStr(level) + treeObj.name;
    }
  }
}

/**
 * 给目录、文件添加对应的级别前缀
 * @param level
 * @returns {string}
 */
function preDirStr(level = 0) {
  let pre = "  |".repeat(level);
  return pre + (level > 0 ? "--" : "|--");
}

/**
 * 获取文件第一行内容
 * @param path
 * @returns {Promise.<*>}
 */
async function fileFirstLineData(path) {
  let firstLineData = await FileUtils.readFileSync(path);
  if (firstLineData && firstLineData.length > 0) {
    let firstLineIndex = firstLineData.indexOf('\r')
    if (firstLineIndex > -1) {
      return firstLineData.substring(0, firstLineIndex);
    } else {
      return firstLineData
    }
  } else {
    return ''
  }
}

module.exports = {
  generateDirTreeFile
};