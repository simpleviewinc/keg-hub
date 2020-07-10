#!/bin/bash

# test.sh
# Description: Runs tests on an array of browsers
# Accepted environment variables:
#  @param {string} TEST_FILTER_TAGS - tag(s) to filter tests by. See format here: https://cucumber.io/docs/cucumber/api/#tag-expressions
#  @param {number} WINDOW_WIDTH - defines the window width in the browser (default: 640px)
#  @param {number} WINDOW_HEIGHT - defines the window height in the browser (default: 480px)
#  @param {boolean} HEADLESS - true if the test should run in headless browser

# array of browsers to test 
browsers=(
  chrome
  firefox
)

# make a string of all the browsers
browsers_string=$(printf ", %s" "${browsers[@]}")
browsers_string=${browsers_string:1}

# runs the tests on the browser passed in
# @example: runTestsOn chrome
runTestsOn() {
  browser="$1"

  # only use the tags flag if env is not empty. If we didn't do this, cucumber would complain about the empty --tags value
  if [[ ! -z "$TEST_FILTER_TAGS" ]]; then
    # run the tests
    HEADLESS="$HEADLESS" BROWSER="$browser" yarn cucumber --tags "$TEST_FILTER_TAGS"
  else
    HEADLESS="$HEADLESS" BROWSER="$browser" yarn cucumber
  fi

  FILE_PATH="./reports/cucumber/$browser.json"

  # update the cucumber json with metadata
  node ./scripts/addMetadata.js $FILE_PATH $browser
}

pids=""
result=0

# run tests on each browser in parallel
echo -e "\n =================================================== \n"
echo -e "\t RUNNING TESTS ON: $browsers_string"
echo -e "\n =================================================== \n"
for browser in ${browsers[@]}; do
  runTestsOn $browser &
  pids="$pids $!"
done

# wait for each process to finish
for pid in $pids; do
  wait $pid || let "result=1"
done

# if any process failed, return with exit code 1
if [[ "$result" == "1" ]]; then
  exit 1
fi
