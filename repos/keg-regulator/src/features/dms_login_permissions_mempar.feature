@regression @login_dms @group_mempar
Feature: User logs into DMS

Scenario: User logs into DMS
  Given the user navigates to "https://qa.qa.simpleviewdms.com"
  When on the login form the user enters "nnormansv+dms.qa.user02@gmail.com" in the email field
    And on the login form the user enters "svtesting08" in the password field
    And on the login form the user submits the login form
  Then the user lands on the dms dashboard and sees "Simpleview DMS" in the title
