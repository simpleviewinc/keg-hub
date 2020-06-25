#!/bin/bash

# start all the containers
yarn up -d --build --remove-orphans

echo -e "\n =========== Running tests and assembling report... =========== \n"

# wait for the reports to be generated, then open them in a browser
./scripts/report.sh &

# follow the keg-test logs in the mean time
yarn logs

