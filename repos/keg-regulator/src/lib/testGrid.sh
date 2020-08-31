#!/bin/bash

# Add the logging helpers
source $(pwd)/src/lib/logging.sh

# Loops over the containers array, and tells them to wait for the container to start
loop_containers(){

  # Wait 15 seconds on each browser container
  local WAIT_AMOUNT=15
  # pPort container will be listening on for health check  
  local PORT=5555
  # Array of supported browsers container names
  local CONTAINERS=(selenium-chrome selenium-firefox)

  # Loop browser containers
  for CONTAINER in ${CONTAINERS[@]}; do
    $(pwd)/src/lib/wait-for-it.sh -t $WAIT_AMOUNT $CONTAINER:$PORT

    # If the exit was not 0, then log error and exit!
    if [ $? -ne 0 ]; then
      keg_error "Failure: Timed out to connect to hub: $CONTAINER." >&2
      exit 1
    fi
  done

}

# Run the tests for the browsers
run_bdd_tests(){
  bash $(pwd)/src/lib/test.sh
}

# Generate a Report or the tests
run_bdd_reports(){
  keg_success "\n =================== GENERATING REPORT =================== \n"
  yarn report:generate
}

# Ensure the containers are ready
loop_containers

# Run the tests
run_bdd_tests

# Generate the reports
run_bdd_reports
