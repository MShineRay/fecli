const updateNotifier = require('update-notifier')
const chalk = require('chalk')
const pkg = require('../../package.json')

const notifier = updateNotifier({
  pkg,
  updateCheckInterval: 1000,
})

function checkVersion() {
  if (notifier.update) {
    console.log(`New version available: ${chalk.cyan(notifier.update.latest)}, it's recommended that you update before using.`)
    notifier.notify()
  } else {
    console.log(`Current version(${pkg.version}) is latest.`)
  }
}
module.exports = checkVersion
