# jsutils

A small utility library for commonly used helper methods. Similar to lodash, underscore, etc...

See docs [here](https://lancetipton.github.io/jsutils)

## Install

  * Download the repo
    ```js
      // Clone repo
      git clone https://github.com/lancetipton/jsutils.git
      // Or Add to package.json
      "dependencies": {
        "jsutils": "git+https://github.com/lancetipton/jsutils.git"
        ...
      },
    ```
  * Add to your code
    ```js
      // * Import into code
        import jsutils from 'jsutils'
        // Or only the methods you need
        import { capitalize } from 'jsutils/string'
        import { reduceObj, mapObj } from 'jsutils/object'

      // * Or require code
        const jsutils = require('jsutils')
      
      // * Add as html script
        <script src='/path/to/jsutils/build/jsutils.min.js'></script>
        // jsutils will be available on the window 
        <script>
          const jsutils = window.jsutils
          
        </script>
    ```
