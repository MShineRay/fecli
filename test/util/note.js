/**
 * 解析包含@desc 的注释内容
 * @param str
 * @param reg
 * @returns {*}
 */
function parseNote(str, reg = /@desc?/) {
  let result = "";
  if (str) {
    let lastMatchIndex = 0;
    let firstMatchIndex = 0;
    
    if (/^\/\*(\s|.)*?\*\/(\s|\r|\n)*$/.test(str)) {
      if ((str).match(reg)) {
        firstMatchIndex = (str).match(reg)['index'];
        if ((str).match(/\*?\s?\*+\/(\s|\r|\n)*$/)) {
          lastMatchIndex = (str).match(/\*?\s?\*+\/(\s|\r|\n)*$/)['index'];
        }
      }
    } else if (/^<!--(\s|.)*?-->$/.test(str)) {
      if ((str).match(reg)) {
        firstMatchIndex = (str).match(reg)['index'];
        if ((str).match(/\s?-->$/)) {
          lastMatchIndex = (str).match(/\s?-->$/)['index'];
        }
      }
    }
    
    if (firstMatchIndex > 0 && lastMatchIndex > 0) {
      result = str.substring(firstMatchIndex + 5, lastMatchIndex);
    }
  }
  return result;
}


module.exports = {
  parseNote
};

/*let testStr1 = '**1@desc文件注释';
console.log(testStr1 + '\n解析后:', parseNote(testStr1))
let testStr2 = '/!**1@desc文件注释*!/';
console.log(testStr2 + '\n解析后:', parseNote(testStr2))
let testStr3 = '<!--@desc 文件注释3-->';
console.log(testStr3 + '\n解析后:', parseNote(testStr3))*/
