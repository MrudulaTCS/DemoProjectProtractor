describe('Upsell', function() {
  beforeEach(function() {
    this.actionwords = Object.create(require('./actionwords.js').Actionwords);
  });

  it('UPSL_01 Verify if the EE Small Scale_Heston user sees upsell message on trying login from the app from channel Packshot (uid:4a364c72-bbb1-4ebb-8016-441d731c01a8)', function() {
    // Tags: P1 AllClients
    // Given I launch the BTSport application
    this.actionwords.iLaunchTheBTSportApplication();
    // Given I am not Logged in and I am on LoginPage from BTSport1HDPackshot_HomePage
    this.actionwords.iAmNotLoggedInAndIAmOnLoginPageFromBTSport1HDPackshotHomePage();
    // When I enter valid username as "ee@btsport.com" then valid password as "Pass@1234" and select login
    this.actionwords.iEnterValidUsernameAsP1ThenValidPasswordAsP2AndSelectLogin("ee@btsport.com", "Pass@1234");
    // Then I should see the text for "Title_Upsell" as "How to watch"
    this.actionwords.iShouldSeeTheTextForP1AsP2("Title_Upsell", "How to watch");
    // Then I should see the text for "Message_Upsell" as "To access the BT Sport app on this device you'll need to upgrade your subscription, for more info on how to do this visit https://ee.co.uk/why-ee/bt-sport."
    this.actionwords.iShouldSeeTheTextForP1AsP2("Message_Upsell", "To access the BT Sport app on this device you'll need to upgrade your subscription, for more info on how to do this visit https://ee.co.uk/why-ee/bt-sport.");
    // Then I should see the "BackButton_Upsell"
    this.actionwords.iShouldSeeTheP1("BackButton_Upsell");
    // Then I navigate to BackButton_Upsell
    this.actionwords.iNavigateToBackButtonUpsell();
    // Then I select the "BackButton_Upsell"
    this.actionwords.iSelectTheP1("BackButton_Upsell");
    // Then I should see the "HomePage"
    this.actionwords.iShouldSeeTheP1("HomePage");
  });
});
