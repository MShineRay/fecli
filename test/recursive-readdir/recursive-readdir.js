var recursive = require("recursive-readdir");
/**
 * @XDF_FILE_DESC
 */

recursive("../../", ["node_modules", ".idea",".git"], function (err, files) {
  // `files` is an array of file paths
  console.log(files);
});