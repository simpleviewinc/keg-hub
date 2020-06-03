# Architecture
  * Keg Framework
    * Keg-Cli
      * Runs the docker containers
      * Uses docker-machine / docker-compose / docker-sync
    * Keg-Core
      * Gets deployed to a CDN
      * URL would like this => kegcore.staging.kegdev.xyz
    * Keg-Components
    * Re-Theme
    * Tap-Resolver
    * Tap ( Client Application )
      * Gets deployed to a CDN
      * URL would like this => tap.staging.kegdev.xyz
    * Keg-Tests
      * Does not include Unit Testing
      * Frameworks
        * Cucumber
        * webdriver
        * Xray API connector ( Rest API )
          * Jira integration
          * After tests run, would POST test results to Xray, which is connected to Jira
      * Tests
        * Written by QA Engineer

### CI
  * Github Actions
    * Before we merge into develop for any Keg Repos
    * Execute tests residing in Keg-Tests repo

### Test Scopes
  * Unit Testing - Engineering Tests
  * UI / Functional Testing - QA Tests

### Xray
* Test case management
* Connects to Jira
  * Has execute button in Jira once connected


# Workflow

## QA Engineer
* Get a ticket in the QA Queue
* Write test case in Locally
  * Create on off of a feature branch
  * Written inside of Key-Tests
  * Each Test has 2 files
    * Test.feature File
      * Each line connects to a test in the tests.js files
      * Easy to read syntax describing the test case
    * Tests.js Files
      * Actual code that validate the test case and runs the test
* Once all test cases pass locally
  * Push feature branch to Github Keg-Test repo
  * Submit pull request
    * On pull request submit
      * Github Action runs all tests
      * Reports results to Jira
    * Syntax Reviewed by Engineers

## Deploy
* Make changes to code, and ready to commit to Github feature branch
  * Run tests in Keg-Test repo locally
    * If tests pass
      * Push to Github, and submit pull request
      * Note tests that should be updated due to expected code changes
    * If tests fail
      * Fix code to ensure tests pass
  * Submit pull request
    * Other developers review
    * Unit tests are validated
  * On feature branch merge into develop
  * Ticket gets sent to QA Queue


# Keg-Test Repo

