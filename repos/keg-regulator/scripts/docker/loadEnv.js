#!/usr/bin/env node

const path = require("path")
const regulatorRoot = path.join(__dirname, '../../')
require('dotenv').config({ path: `${ regulatorRoot }/container/.env` })

