# Keg Test

## Description

A test-runner for behavior tests defined in the [keg](https://github.com/simpleviewinc/keg-core), its associated repos, and taps. It uses a selenium grid of docker containers to test cucumber features across multiple browsers in parallel.

Tests are:
- written in [cucumber](https://cucumber.io/)
  - an ordinary language that bridges the gap between business and technical people
- executed with [docker selenium](https://github.com/SeleniumHQ/docker-selenium)
  - automates execution, simplifies the setup, and avoids any local installation of browser specific dependencies
- integrated with the [keg-cli](https://github.com/simpleviewinc/keg-cli) (soon)

## Prerequisites
* Docker must be installed on your machine
* If you are using windows or mac, you'll need docker for desktop

## Getting started

* `yarn install`
* `yarn start`
* wait for the grid to initialize and the tests to finish. A browser window should open to display the test results.

## Commands

* `yarn start`
  * starts the docker containers
    * `selenium-hub`: which manages the grid of browser containers
    * `node-<browser>`: one container per browser tested (currently firefox and chrome)
    * `keg-test`: a simple container that runs the tests in a node environment. See the `tests/` directory and the `Dockerfile` there for more
  * displays logs for the tests
  * opens a browser window displaying the test results once the tests are complete
  * accepted environment variables:
    - TEST_FILTER_TAGS: tag(s) to filter cucumber tests. See format here: https://cucumber.io/docs/cucumber/api/#tag-expressions
    - WINDOW_HEIGHT: pixel height of browser window `(default: 480)`
    - WINDOW_WIDTH: pixel width of browser window `(default: 640)`
* `yarn stop`
  * stops all the containers
* `yarn restart:tests`
  * reruns the `keg-test` container **only**
  * quick, because it does not restart the other docker containers
  * requires that the selenium grid containers are all up and running first (i.e first run yarn start)
  * note: docker-selenium recommends restarting the containers frequently, so don't use this exlusively or you might encounter issues
* `yarn restart:all`
  * stops all the containers, then starts them again
* `yarn logs`
  * shows (and follows) the current logs for `keg-test`
* `yarn enter`
  * enter the `keg-test` container with a bash terminal, if it hasn't exited
* `yarn report`
  * open the report in a browser window
* `yarn console`
  * opens the selenium grid console page, showing the status of the grid

## Historical Reports
* reports from previous runs are stored at `tests/reports/archive/`

## Common Issues
* if you try to start the containers and encounter an error declaring that docker cannot connect to the docker daemon, try running:
```bash
docker-machine env  # It's helps to get environment variables
eval "$(docker-machine env default)" # Set environment variables
```

## Development Notes
* in the `tests/` directory, the directories `features/` and `reports/` are mounted into the `keg-test` container as volumes. You can update these files, then run `yarn restart:tests` to get quick feedback on those changes.
