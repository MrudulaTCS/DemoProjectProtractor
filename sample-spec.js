describe('Upsell', function() {
  beforeEach(function() {
    this.actionwords = Object.create(require('./actionwords.js').Actionwords);
  });

  it('UPSL_01 Verify if the EE Small Scale_Heston user sees upsell message on trying login from the app from channel Packshot (uid:4a364c72-bbb1-4ebb-8016-441d731c01a8)', function() {
    // Tags: P1 AllClients
    // Given I launch the BTSport application
    this.actionwords.iLaunchTheBTSportApplication();
    // Given I am not Logged in and I am on LoginPage from BTSport1HDPackshot_HomePage
  });
});
