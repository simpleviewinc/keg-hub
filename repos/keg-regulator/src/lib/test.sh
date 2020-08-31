#!/bin/bash

# test.sh
# Description: Runs tests on an array of browsers
# Accepted environment variables:
#  @param {string} TEST_FILTER_TAGS - tag(s) to filter tests by. See format here: https://cucumber.io/docs/cucumber/api/#tag-expressions
#  @param {number} WINDOW_WIDTH - defines the window width in the browser (default: 640px)
#  @param {number} WINDOW_HEIGHT - defines the window height in the browser (default: 480px)
#  @param {boolean} HEADLESS - true if the test should run in headless browser

# Add the logging helpers
source $(pwd)/src/lib/logging.sh

# Runs the tests on the browser passed in
# @example: keg_run_browser_tests chrome
keg_run_browser_tests() {
  local BROWSER="$1"

  # Only use the tags flag if env is not empty. If we didn't do this
  # Cucumber would complain about the empty --tags value
  if [[ ! -z "$TEST_FILTER_TAGS" ]]; then
    # run the tests
    HEADLESS="$HEADLESS" BROWSER="$BROWSER" yarn test:cucumber --tags "$TEST_FILTER_TAGS"
  else
    HEADLESS="$HEADLESS" BROWSER="$BROWSER" yarn test:cucumber
  fi

  # Build the path to the browsers json output from the tests run above
  local FILE_PATH="$(pwd)/src/reports/cucumber/$BROWSER.json"

  # Update the cucumber json with metadata
  node $(pwd)/src/lib/addMetadata.js $FILE_PATH $BROWSER

}

# Loop over each bowser and run the tests for that browser
keg_loop_browsers(){

  # Array of browsers to test 
  local BROWSERS=(chrome firefox)

  # Make a string of all the BROWSERS
  local BROWSER_NAMES=$(printf ", %s" "${BROWSERS[@]}")
  BROWSER_NAMES=${BROWSER_NAMES:1}

  local PIDS=""
  local RESULT=0

  # run tests on each browser in parallel
  echo -e "\n =================================================== \n"
  echo -e "\t RUNNING TESTS ON: $BROWSER_NAMES"
  echo -e "\n =================================================== \n"

  for BROWSER in ${BROWSERS[@]}; do
    keg_run_browser_tests $BROWSER &
    PIDS="$PIDS $!"
  done

  # Wait for each process to finish
  for PID in $PIDS; do
    wait $PID || let "RESULT=1"
  done

  # If any process failed, return with exit code 1
  if [[ "$RESULT" == "1" ]]; then
    exit 1
  fi

}

# Loop over each browser, and run the tests on it
keg_loop_browsers "$@"


