#!/usr/bin/env node

/* --- IMPORTANT --- *//*
This File runs inside a docker context. It is not expected to run on a host machine
*//* --- IMPORTANT --- */

require('module-alias/register')
const { spawnCmd } = require('KegProc')
const { EXEC_CMD } = process.env
const coreLocation = "/keg/tap/node_modules/keg-core"

spawnCmd(`yarn ${ EXEC_CMD || 'web'}`, coreLocation)