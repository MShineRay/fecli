/**
 * 工具类
 * @type {{}}
 */
let utils = {

};

/**
 * Tests if the supplied parameter is of type RegExp
 * @param  {any}  regExp
 * @return {Boolean}
 */
utils.isRegExp = (regExp) => {
  return typeof regExp === "object" && regExp.constructor === RegExp;
};

/**
 * 获取当前运行时node版本号
 */
utils.nodeVersion = () => {
  return process.version
};

utils.webpackVersion = ()=>{
  let webpack = require('webpack');
  return webpack.version;
};

module.exports = utils;