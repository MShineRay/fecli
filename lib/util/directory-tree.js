/**
 * @desc 目录树
 * @type {directoryTree}
 */
const FileUtils = require('./fileUtils')
const treeNodeCli = require('tree-node-cli');

/**
 * 生成 directoryTreeDesc.md
 * @param filename
 * @param path
 */
async function generateDirTreeFile(filename = "directoryTreeDesc.md", path = './') {
  const options = {
    allFiles: true,
    dirsFirst: true,
    exclude: [/^node_modules$/, /^.git$/, /^.idea$/]
  }
  const string = treeNodeCli('./', options);
  console.log(string);
  FileUtils.writeFile(filename, `~~~\n${string}\n~~~`);
}

module.exports = {
  generateDirTreeFile
};
