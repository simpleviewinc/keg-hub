const report = require('multiple-cucumber-html-reporter');

const customData = {
  title: 'Run info',
  data: [
    {
      label: 'Project',
      value: 'Keg Regulator'
    },
    {
      label: 'Report generated on',
      value: new Date().toString()
    },
    {
      label: 'Reporter:',
      value: '<a href="https://www.npmjs.com/package/multiple-cucumber-html-reporter" ' +
        'target="_blank">multiple-cucumber-html-reporter</a>'
    },
  ]
};


/**
 * Command line docs
 * @param {string} arg1 - the directory to read json files from
 */
const [ jsonDir='./src/reports/cucumber' ] = process.argv.slice(2)

// generates the cucumber report that will be viewed in the browser
report.generate({
  customData,
  jsonDir,
  reportPath: jsonDir,
  displayDuration: true,
  removeFolders: true,
  pageTitle: 'Keg Regulator Results',
  reportName: 'Keg Regulator Results',
  openReportInBrowser: true,
  pageFooter:
    '<div class="created-by"><p><a href="https://www.simpleviewinc.com/" target="_blank">Simpleview</a></p></div>',
})
