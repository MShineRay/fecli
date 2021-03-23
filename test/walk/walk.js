var walk = require('walk');
var fs = require('fs');
var options;
var walker;

options = {
  followLinks: true,
  // directories with these keys will be skipped
  filters: [
    "node_modules",
    "git",
    "wwwroot",
    "dist",
    "idea",
    "test"
  ]
};
walker = walk.walk("../../", options);

walker.on("file", function (root, fileStats, next) {
  /* console.log('root', root)
   console.log('fileStats', fileStats)*/
  fs.readFile(fileStats.name, function () {
    // doStuff
    next();
  });
});

walker.on("directories", function (root, dirStatsArray, next) {
  // dirStatsArray is an array of `stat` objects with the additional attributes
  // * type
  // * error
  // * name
  console.log('root', root)
  console.log('dirStatsArray', dirStatsArray)
  next();
});

walker.on("errors", function (root, nodeStatsArray, next) {
  console.log('root', root)
  console.log('nodeStatsArray', nodeStatsArray)
  
  next();
});

walker.on("end", function () {
  console.log("all done");
});

var dirlist = fs.readdirSync('../../');
console.log(dirlist)