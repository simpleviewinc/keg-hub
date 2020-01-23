# Navigation/Router
* Utilize `'Router'` for routing/navigation
* Display specific components based on current route

# Setup
* **Tap**
  * Setup a 'navigation' data model in your app.json/tap.json
    * `navigation.containerKeyMappings` - REQUIRED, should be an array of key-to-container mapping
    * `navigation.routeConfigs` is an array of route configs

    * **Example:**
      ```Javascript
        "navigation": {
          "containerKeyMappings": [
            {
              "key": "root",
              "container": "AppContainer" // case sensitive for your Container Component
            },
            {
              "key": "root",
              "container": "AppContainer"
            }
          ],
          "routeConfigs" [ // create routeConfigs here if you want it to come locally
            {
              "path": "/", // path where you want this key to load
              "key": "root",
              "exact": true
            },
            {
              "path": "/examples",
              "key": "examples",
              "exact": true
            },
          ]
        }
      ```
    * Setup the routes in the root of your App 
      * **Example:**
      ```Javascript
        import { ContainerRoutes } from 'SVNavigation'
        import * as Containers from 'SVContainers'

        const routeConfigs // data from db or app.json/tap.json
        /**
        * Root container of this Tap A
        */
        const AppContainer = withTheme(props => {
          const { theme } = props
          return (
            <View style={styles.container}>
              <ContainerRoutes switchTheme={theme} routeConfigs={routeConfigs} containers={Containers}/>
            </View>
          )
        })
      ```

* **Note(s):**
  * **where are the routeKeyMapping defined?**
    * In the Tap `root/app.json` code

  * `routeConfigs` can come from the network or locally. if locally, store them in `navigation.routeConfigs`
