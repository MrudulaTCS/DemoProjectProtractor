var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['sample-spec.js'],
  onPrepare: function() {
    browser.ignoreSynchronization = true
    // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
    jasmine.getEnv().addReporter(new HtmlReporter({
      baseDirectory: 'beautifulReporter/screenshots'
    }).getJasmine2Reporter());
  }
}
