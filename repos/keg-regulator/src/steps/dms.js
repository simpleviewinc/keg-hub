const webdriver = require('selenium-webdriver');
const { until } = webdriver
const { Given, When, Then } = require('cucumber');
const timeout = 20000

Given(/^the user navigates to \"(.*?)\"$/, { timeout }, function(login_url) {
  return this.driver.get(login_url);
});

//Enter email address
When(/^on the login form the user enters \"(.*?)\" in the email field$/, { timeout }, function(user_email) {
  return this.driver.wait(until.elementLocated({xpath: "/html/body/div/div[2]/div[2]/div[1]/form/div[1]/div[1]/div/div/input"}), timeout).then(element => element.sendKeys(user_email));
});

//Enter password
When(/^on the login form the user enters \"(.*?)\" in the password field$/, { timeout }, function(user_password) {
  return this.driver.wait(until.elementLocated({xpath: "/html/body/div/div[2]/div[2]/div[1]/form/div[1]/div[2]/div/div/input"}), timeout).then(element => element.sendKeys(user_password));
});

//Login form - Submit
When(/^on the login form the user submits the login form$/, { timeout }, function() {
  return this.driver.wait(until.elementLocated({xpath: "/html/body/div/div[2]/div[2]/div[1]/form/div[2]/div[1]/div/button"}), timeout).then(element => element.click());
});

//Dashboard loads as expected - Verify
Then(/^the user lands on the dms dashboard and sees \"(.*?)\" in the title$/, { timeout }, function(pageTitle) {
  //this passes when a subset of the text matches not an exact match.  need to address that
  return this.driver.wait(until.titleIs(pageTitle), timeout);
});
