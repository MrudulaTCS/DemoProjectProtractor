exports.config = {
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['upsell_test.js'],
  framework: 'jasmine2',
  //allScriptsTimeout: 600000,
  capabilities: {
    browserName: 'chrome',
    // chromeOptions: {
    //   args: ["--headless", "--disable-gpu", "--window-size=800x600"]
    // }
  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 6000000
  },
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
      savePath: './',
      filePrefix: 'xmlresults'
    }));
    // var myReporter = {
    //   specStarted: function(result) {
    //     console.log("Spect started...", result.fullName);
    //   },
    //   specDone: function(result) {
    //     if (result.status === 'failed') {
    //       console.log("Spec done... failed", result);
    //     } else {
    //       console.log("Spec done... passed...", result);
    //     }
    //   },
    //   suiteDone: (result) => {
    //     console.log('Suite done: ' + result.description + ' was ' + result.status);
    //   }
    // }

    // jasmine.getEnv().addReporter(myReporter);
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
      new HTMLReport().from('xmlresults.xml', testConfig);
    });
  }
};
