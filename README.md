![keg-build](https://github.com/simpleviewinc/keg-hub/workflows/keg-build/badge.svg)
![keg-tests](https://github.com/simpleviewinc/keg-hub/workflows/keg-tests/badge.svg)

<br/>

# Keg-Hub

> NOTE: This repository is deprecated and unmaintained. Please use [@keg-hub/keg-hub](https://github.com/keg-hub/keg-hub) instead.

## Overview

The keg is a platform for developing cross-platform react apps.
It comes preconfigured to target both web and mobile, and it contains a 
collection of utilities for simplifying development, including:
  * built-in routing and navigation
  * a reducer based on the relational data model
  * dynamic theming via re-theme
  * cross platform persistent storage

<br/>

## Repositories

### Keg Core
* [See the code](/repos/keg-core)
* Code needed to build / deploy a Tap for different platforms
  * IOS / Android / Desktop / Web
* Consumes the Tap-Resolver
  * Used to resolve / consume Tap code
  * Sets up dynamic alias to Tap files
  * Allows for cross-platform development within the Keg
* Application Defaults 
  * Many can be overwritten by a Tap
* Application initialization code
  * Handles all boiler plate for setting up an application
* Compatiable with multiple code bundlers
  * Webpack ( Web )
  * Metro ( Native )
  * Rollup ( Components )
* Is consumed by a Tap 
  * Taps install keg-core as a node_module
  * Base files to augment a Tap's code
    * Templates
    * Global Styles (Web only)
    * Routing
    * Actions / Reducers / Store
      * Logic for reducer changes / updates
      * Logic for store initialization
      * Custom action initialization
  * Cross-platform plugins exposed to the Tap
    * Firebase / Database
    * Camera / QR Code reader
    * Temporary Local Storage
    * Expo Plugins
    * ...To many to list
  * Utility function helpers
* See the [Keg-Core docs]() for more information

### Tap Resolver
* [See the code](/repos/tap-resolver)
* Loads the correct code from the Tap into Core
* Allows dynamic loading based on platform and context
  * Knows when to load a mobile version of a plugin vs web version
* Allow Tap to merge / overwrite logic defined in Keg Core
  * For Example => defining custom redux actions or default data of the redux store
* See the [Tap-Resolver docs]() for more information

### Keg Components
* [See the code](/repos/keg-components)
* Defines a universal definition of how content is displayed or consumed
* Cross platform components
  * Mostly Javascript
  * Some components have platform specific code
  * Can be rendered anywhere
* Consumes the theme from Re-theme
* Used to define the views / layouts specific to the Tap
* Tap defined theme passed to the Components
  * Tells theme how to render based on the Platform
* See the [Keg-Components docs]() for more information

### Re-Theme
* [See the code](/repos/re-theme)
* Custom theme / style renderer based on the platform
* Theme passed in from the Tap
  * Defines the supported platforms
  * Defines platform specific styles and shared styles
* Renders the correct platform styles from theme
* Passes the styles to the Keg Components
* See the [ReTheme docs]() for more information

### Tap
* [See the code](/taps/tap-release-client)
* Code **SPECIFIC** to an App, Web site, or component library
* Just javascript
  * No native code requirements
* Defines supported platforms
* Consumes Keg Components through Keg-Core
  * Custom layouts / designs
* Consumes Re-Theme
  * Define Theme / Styles
* See the [Tap docs]() for more information

### Keg-CLI
* [See the code](/repos/keg-cli)
* Task manager for running keg platform tasks
* Manages docker, docker-compose, within the context of the Keg and a Tap
* See the [Keg-CLI docs]() for more information
