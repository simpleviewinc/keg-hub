#!/bin/bash

# run the tests for each browser
./src/lib/test.sh

echo -e "\n =================== GENERATING REPORT =================== \n"

# generate report
yarn report:generate
