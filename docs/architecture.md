## Keg Core
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
* Webpack and Metro ( react-native ) configs
* Contains app logic to consume the Tap 
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

## Tap Resolver
* Loads the correct code from the Tap into Core
* Allows dynamic loading based on platform and context
  * Knows when to load a mobile version of a plugin vs web version
* Allow Tap to merge / overwrite logic defined in Keg Core
  * For Example => defining custom redux actions or default data of the redux store

## Keg Components
* Defines a universal definition of how content is displayed or consumed
* Cross platform components
  * Mostly Javascript
  * Some components have platform specific code
  * Can be rendered anywhere
* Consumes the theme from Re-theme
* Is Consumed by a Tap
  * Used to define the views / layouts specific to the Tap
  * Tap defined theme passed to the Components
    * Tells theme how to render based on the Platform

## Re-Theme
* Custom theme / style renderer based on the platform
* Theme passed in from the Tap
  * Defines the supported platforms
  * Defines platform specific styles and shared styles
* Renders the correct platform styles from theme
* Passes the styles to the Keg Components

## Tap
* Code **SPECIFIC** to the client
* Just javascript
  * No native code requirements
* Defines supported platforms
* Consumes Keg Components through Keg-Core
  * Custom layouts / designs
* Consumes Re-Theme
  * Define Theme / Styles
* Is consumed by Keg Core

## Other

### Cloud Provider ( Stores Content )
* Google / AWS / ?
* CDN - Content caching
* Holds and serves content:
  * Built Tap code
  * Media ( Images, Videos, Documents, etc )

### Database Provider
* Firebase / Firestore

### Analytics
* Firebase / Google / Pendo

### Authentication
* Firebase - Provides auth through these providers
  * Google / Twitter / Apple / Facebook / Email

### Content Providers ( Delivers Content )
* Codesy Platform
* ITunes
* Play Store
* Amazon Prime
* Netflix
* Window Apps Store

### Docker
* Docker
* Mutagen ( Docker folder syncing )
* Docker-Composer
* Docker-Machine
* Github Packages - ( Docker Repository )

### 3rd Party
**Custom Content Render**
* https://github.com/chentsulin/awesome-react-renderer
* https://github.com/necolas/react-native-web
* https://microsoft.github.io/react-native-windows/
* https://github.com/react-native-community/react-native-tvos