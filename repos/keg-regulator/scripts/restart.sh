#!/bin/bash

# restart just the tests container
docker-compose restart tests

echo -e "\n =========== Running tests and assembling report... =========== \n"

# run the reporter
bash scripts/report.sh &

# follow the keg-test logs
yarn logs

