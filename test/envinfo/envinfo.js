const envinfo = require('envinfo');

async function getNodeInfo() {
  const node = await envinfo.helpers.getNodeInfo();
  console.log(
    await envinfo.helpers.getnpmInfo(
    
    )
  )
  /*console.log(
    'result:',
    await envinfo.run(
      {
        System: ['OS', 'CPU'],
        Binaries: ['Node', 'Yarn', 'npm','webpack','vue-cli3'],
        Browsers: ['Chrome', 'Firefox', 'Safari'],
        npmPackages: ['styled-components', 'babel-plugin-styled-components'],
        npmGlobalPackages: ['npm', 'typescript', 'jest'],
        Utilities: ['Git', 'Subversion']
      },
      {json: true, console: false, showNotFound: true})
  )*/
  
  /* console.log(
     envinfo.log()
   )*/
  
  /*console.log(
    node.fileExists()
  )*/
  
  /*console.log(
    node.getPackageJsonByName()
  )*/
  
  /*console.log(
    await node.getnpmPackages()
  )*/
  
  /*run: [Function: u],
  log: [Function: f],
  fileExists: [Function: l],
  readFile: [Function: h],
  requireJson: [Function: p],
  versionRegex: /\d+\.[\d+|.]+/g,
    findDarwinApplication: [Function: v],
  generatePlistBuddyCommand: [Function: g],
  matchAll: [Function: m],
  parseSDKManagerOutput: [Function: parseSDKManagerOutput],
  isLinux: false,
    isMacOS: false,
    NA: 'N/A',
    NotFound: 'Not Found',
    isWindows: true,
    isObject: [Function: isObject],
  noop: [Function: noop],
  pipe: [Function: pipe],
  browserBundleIdentifiers:
  { Chrome: 'com.google.Chrome',
    'Chrome Canary': 'com.google.Chrome.canary',
    Firefox: 'org.mozilla.firefox',
    'Firefox Developer Edition': 'org.mozilla.firefoxdeveloperedition',
    'Firefox Nightly': 'org.mozilla.nightly',
    Safari: 'com.apple.Safari',
    'Safari Technology Preview': 'com.apple.SafariTechnologyPreview' },
  ideBundleIdentifiers:
  { Atom: 'com.github.atom',
    IntelliJ: 'com.jetbrains.intellij',
    PhpStorm: 'com.jetbrains.PhpStorm',
    'Sublime Text': 'com.sublimetext.3',
    WebStorm: 'com.jetbrains.WebStorm' },
  runSync: [Function: runSync],
  which: [Function: which],
  getDarwinApplicationVersion: [Function: getDarwinApplicationVersion],
  uniq: [Function: uniq],
  toReadableBytes: [Function: toReadableBytes],
  omit: [Function: omit],
  pick: [Function: pick],
  getPackageJsonByName: [Function: getPackageJsonByName],
  getPackageJsonByPath: [Function: getPackageJsonByPath],
  getPackageJsonByFullPath: [Function: getPackageJsonByFullPath],
  getAllPackageJsonPaths: [Function: getAllPackageJsonPaths],
  sortObject: [Function: sortObject],
  findVersion: [Function: findVersion],
  condensePath: [Function: condensePath],
  determineFound: [Function: determineFound],
  getnpmPackages: [Function: getnpmPackages],
  getnpmGlobalPackages: [Function: getnpmGlobalPackages],
  getHomeBrewInfo: [Function: getHomeBrewInfo],
  getNodeInfo: [Function: getNodeInfo],
  getnpmInfo: [Function: getnpmInfo],
  getWatchmanInfo: [Function: getWatchmanInfo],
  getYarnInfo: [Function: getYarnInfo],
  getChromeInfo: [Function: getChromeInfo],
  getChromeCanaryInfo: [Function: getChromeCanaryInfo],
  getEdgeInfo: [Function: getEdgeInfo],
  getFirefoxInfo: [Function: getFirefoxInfo],
  getFirefoxDeveloperEditionInfo: [Function: getFirefoxDeveloperEditionInfo],
  getFirefoxNightlyInfo: [Function: getFirefoxNightlyInfo],
  getInternetExplorerInfo: [Function: getInternetExplorerInfo],
  getSafariTechnologyPreviewInfo: [Function: getSafariTechnologyPreviewInfo],
  getSafariInfo: [Function: getSafariInfo],
  getMongoDBInfo: [Function: getMongoDBInfo],
  getMySQLInfo: [Function: getMySQLInfo],
  getPostgreSQLInfo: [Function: getPostgreSQLInfo],
  getSQLiteInfo: [Function: getSQLiteInfo],
  getAndroidStudioInfo: [Function: getAndroidStudioInfo],
  getAtomInfo: [Function: getAtomInfo],
  getEmacsInfo: [Function: getEmacsInfo],
  getIntelliJInfo: [Function: getIntelliJInfo],
  getNanoInfo: [Function: getNanoInfo],
  getNvimInfo: [Function: getNvimInfo],
  getPhpStormInfo: [Function: getPhpStormInfo],
  getSublimeTextInfo: [Function: getSublimeTextInfo],
  getVimInfo: [Function: getVimInfo],
  getVSCodeInfo: [Function: getVSCodeInfo],
  getWebStormInfo: [Function: getWebStormInfo],
  getXcodeInfo: [Function: getXcodeInfo],
  getBashInfo: [Function: getBashInfo],
  getElixirInfo: [Function: getElixirInfo],
  getGoInfo: [Function: getGoInfo],
  getJavaInfo: [Function: getJavaInfo],
  getPerlInfo: [Function: getPerlInfo],
  getPHPInfo: [Function: getPHPInfo],
  getPythonInfo: [Function: getPythonInfo],
  getRubyInfo: [Function: getRubyInfo],
  getRustInfo: [Function: getRustInfo],
  getScalaInfo: [Function: getScalaInfo],
  getAndroidSDKInfo: [Function: getAndroidSDKInfo],
  getiOSSDKInfo: [Function: getiOSSDKInfo],
  getApacheInfo: [Function: getApacheInfo],
  getNginxInfo: [Function: getNginxInfo],
  getContainerInfo: [Function: getContainerInfo],
  getCPUInfo: [Function: getCPUInfo],
  getMemoryInfo: [Function: getMemoryInfo],
  getOSInfo: [Function: getOSInfo],
  getShellInfo: [Function: getShellInfo],
  getCMakeInfo: [Function: getCMakeInfo],
  getGCCInfo: [Function: getGCCInfo],
  getGitInfo: [Function: getGitInfo],
  getMakeInfo: [Function: getMakeInfo],
  getDockerInfo: [Function: getDockerInfo],
  getParallelsInfo: [Function: getParallelsInfo],
  getVirtualBoxInfo: [Function: getVirtualBoxInfo],
  getVMwareFusionInfo: [Function: getVMwareFusionInfo] }
*/
  // console.log(node)
  // return node
}

// each helper returns a promise
getNodeInfo()
// The promises resolve to an array of values: ["Name", "Version", "Path"]
// e.g. ["Node", "10.9.0", "/usr/local/bin/node"]

// console.log(`Node: ${node[1]} - ${node[2]}`); // "Node: 10.9.0 - ~/.nvm/versions/node/v8.14.0/bin/node"
