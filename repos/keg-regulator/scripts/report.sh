#!/bin/bash
reports_path="tests/reports/cucumber/index.html" 
polling_interval=500

# wait until the report is ready
node ./scripts/waitForCreate.js "$reports_path" 

# now open in a browser
node ./scripts/openURL.js "$reports_path"
