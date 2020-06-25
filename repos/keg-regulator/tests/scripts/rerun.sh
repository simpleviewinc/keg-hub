#!/bin/bash

# run the tests for each browser
./scripts/test.sh

echo -e "\n =================== GENERATING REPORT =================== \n"

# generate report
yarn report
