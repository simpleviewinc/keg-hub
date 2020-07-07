# Keg Core

## Overview

The keg is a platform for developing cross-platform react apps.
It comes preconfigured to target both web and mobile, and it contains a 
collection of utilities for simplifying development, including:
  * built-in routing and navigation
  * a reducer based on the relational data model
  * dynamic theming via [re-theme](https://github.com/simpleviewinc/re-theme)
  * cross platform persistent storage

## Tap usage

* To start, first setup the [keg-cli](https://github.com/simpleviewinc/keg-cli#install)
* Next, use the cli to generate a tap:
`keg gn tap`
* `cd` into your tap's directory, then run `yarn setup`
* The tap you generated will have installed `keg-core` as a dependency
* Read more about tap-development [here](https://www.some-docs-we-need-to-write.confluence.com)

## Architecture

* [Reducers](core/base/reducers/README.md)
