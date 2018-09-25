exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['sample2-spec.js', 'sample-spec.js'],
  framework: 'jasmine2',
  // capabilities: {
  //   browserName: 'chrome',
  //   chromeOptions: {
  //     args: ["--headless", "--window-size=800x600"]
  //   }
  // },
  plugins: [{
    package: 'jasmine2-protractor-utils',
    disableHTMLReport: false,
    disableScreenshot: false,
    screenshotPath: './reports/screenshots',
    screenshotOnExpectFailure: true,
    screenshotOnSpecFailure: true,
    clearFoldersBeforeTest: true,
    htmlReportDir: './reports/htmlReports',
    // failTestOnErrorLog: {
    //   failTestOnErrorLogLevel: 900,
    //   excludeKeywords: ['keyword1', 'keyword2']
    // }
  }],
  onPrepare: function() {
    browser.ignoreSynchronization = true
    var jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
      consolidateAll: true,
      savePath: 'testresults',
      filePrefix: 'xmloutput'
    }));
  },
  onComplete: function() {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function(caps) {
      browserName = caps.get('browserName');
      browserVersion = caps.get('version');
      platform = caps.get('platform');

      var HTMLReport = require('protractor-html-reporter-2');

      testConfig = {
        reportTitle: 'Protractor Test Execution Report',
        outputPath: './',
        outputFilename: 'ProtractorTestReport',
        screenshotPath: './reports/screenshots',
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: true,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform
      };
      new HTMLReport().from('./testresults/xmloutput.xml', testConfig);
    });
  }
};