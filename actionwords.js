exports.Actionwords = {
  iLaunchTheBTSportApplication: function() {
    // browser.manage().deleteAllCookies()
    browser.get('https://sport:sport@dev.tvac.bt.com/sportApp/');
    browser.sleep(3000);
    browser.manage().window().maximize();
    //browser.executeScript("try {localStorage.removeItem('access_token');} catch(exception) {}");
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
    browser.manage().deleteAllCookies();
    browser.navigate().refresh();
    browser.sleep(5000);
    browser.executeScript("document.body.style.zoom='50%'");
    browser.sleep(3000);
  }
}
