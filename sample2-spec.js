var EC = protractor.ExpectedConditions;

describe('Checking UI elements of Login', function() {
  it('Should launch the application in the browser', function() {
    browser.get('https://sport:sport@dev.tvac.bt.com/sportApp/');
    browser.manage().window().maximize();
    browser.executeScript("document.body.style.zoom='67%'");
  });

  it('Should verify the Back button is present in Login Page', function() {
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    const backButton = element(by.css('#back_button_id'));
    browser.wait(expect(backButton.isPresent()).toBeTruthy(), 10000);
    //expect(backButton.isPresent()).toBeTruthy();
  });

  it('Should verify the Next button is present in Login Page', function() {
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    const nextButton = element(by.css('#next_button_id'));
    browser.wait(expect(nextButton.isPresent()).toBeTruthy(), 10000);
  });


});
