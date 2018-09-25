var EC = protractor.ExpectedConditions;

describe('Navigation of Login Button', function() {
  it('Should launch the application in the browser', function() {
    browser.get('https://sport:sport@dev.tvac.bt.com/sportApp/');
    browser.manage().window().maximize();
    browser.executeScript("document.body.style.zoom='67%'");
  });

  it('Should see the Login button', function() {
    var loginButton = element(by.css('#login_button_id'));
    //browser.wait(EC.visibilityOf(loginButton), 15000);
    //expect(loginButton.isPresent()).toEqual(true);
    browser.wait(expect(loginButton.isPresent()).toBeTruthy(), 10000);
    browser.sleep(3000);
  });

  it('Should able to see the Enter BT ID page', function() {
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
    browser.actions().sendKeys(protractor.Key.RIGHT).perform();
    var testElement = element(by.css('#login_title_id'));
    browser.wait(expect(testElement.isPresent()).toBeTruthy(), 10000);
    expect(testElement.getText()).toEqual('Enter your BT ID');
    browser.sleep(3000);
  });

});
