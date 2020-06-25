const webdriver = require('selenium-webdriver');
const { until } = webdriver
const { Given, When, Then } = require('cucumber');

Given(/^the user navigates to \"(.*?)\"$/, { timeout: 90000 }, function(login_url) {
  return this.driver.get(login_url);
});

//Enter email address
When(/^on the login form the user enters \"(.*?)\" in the email field$/, function(user_email) {
  return this.driver.wait(until.elementLocated({xpath: "/html/body/div/div[2]/div[2]/div[1]/form/div[1]/div[1]/div/div/input"}), 5000).then(element => element.sendKeys(user_email));
});

//Enter password
When(/^on the login form the user enters \"(.*?)\" in the password field$/, function(user_password) {
  return this.driver.wait(until.elementLocated({xpath: "/html/body/div/div[2]/div[2]/div[1]/form/div[1]/div[2]/div/div/input"}), 5000).then(element => element.sendKeys(user_password));
});

//Login form - Submit
When(/^on the login form the user submits the login form$/, function() {
  return this.driver.wait(until.elementLocated({xpath: "/html/body/div/div[2]/div[2]/div[1]/form/div[2]/div[1]/div/button"}), 5000).then(element => element.click());
});

//Dashboard loads as expected - Verify
Then(/^the user lands on the dms dashboard and sees \"(.*?)\" in the title$/, function(pageTitle) {
  //this passes when a subset of the text matches not an exact match.  need to address that
  return this.driver.wait(until.titleIs(pageTitle), 10000);
});
