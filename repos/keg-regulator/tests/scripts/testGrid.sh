#!/bin/bash

timeout=15  # wait 15 seconds on each browser container
port=5555   # port container will be listening on for health check  
containers=(
  selenium-chrome
  selenium-firefox
)

for container in ${containers[@]}
do
   ./scripts/wait-for-it.sh -t $timeout $container:$port

  if [ $? -ne 0 ]; then
    echo "Failure: Timed out to connect to hub: $container." >&2
    exit 1
  fi
done

# run the tests for each browser
bash ./scripts/test.sh

# generate report
echo -e "\n =================== GENERATING REPORT =================== \n"
yarn report
