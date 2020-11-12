# Keg Components
 * Base UI Components for the Keg Core and Tap extensions

## Add to your project
```js
  yarn add @keg-hub/keg-components
  npm install @keg-hub/keg-components
```

## Developer setup
* `git clone https://github.com/simpleviewinc/keg-hub.git ~/keg-hub`
* `cd ~/keg-hub/repos/keg-components`
* `yarn install`
* `yarn sb` - local storybook
* `yarn sb:native` - native local storybook
* `yarn sb:web` - web local storybook
* `yarn format` - formats your code based on the config set in `configs/eslint.config.js` && `configs/prettier.config.js`
* `yarn eslint:watch` - watches any code change for any lint errors

## Theming

Keg Components leverages [re-theme](https://github.com/simpleviewinc/re-theme) for dynamic theming across platforms and viewport sizes

### Theme objects
* For new components, create and export your theme objects in `src/theme/components`

### Using themes in components
* Use the `useThemePath` hook:

  ```javascript
  import { useThemePath } from '../../hooks'

  const FooBar = (props) => {
    // theme from `src/theme/components/fooBar.js`
    const fooBarTheme = useThemePath('fooBar')
    return (
      <View style={fooBarTheme.main}>
        ...
      </View>
    )
  }
  ```

## Conventions
**Folder structure:**
  * if you are creating a function that has a different implementation for `native`
    * **DO**
      * place them in a folder with the same name as the export
      * add an alias for them in the `/configs/aliases.json` file
      * add a `index.js` exporting the alias
      ```Javascript
         /src/components
            /linearGradient
               linearGradient.js
               linearGradient.native.js
               index.js   
                
          // /configs/aliases.json
          {
            ...other aliases,
            "KegLinearGradient": "src/components/linearGradient/linearGradient${platform}.js",
          }

          // /src/components/linearGradient/index.js
          export * from 'KegLinearGradient'

      ```

Every component implemented in keg-components that has a theme should define `main` and `content` styles:
```javascript
/* src/theme/components/sampleButton.js */
export const sampleButton = {
  main: { ... },
  content: { ... }
}
```
  * **main**: the root styles of the component
  * **content**: the styles for content in the component
  * Example: a simple Button component's `main` style would theme its root View component, whereas the `content` style themes its inner Text component:
    ```javascript
    /* src/components/button/sampleButton.js */
    export const SampleButton = (props) => {
      const buttonTheme = useThemePath('sampleButton', props.style)
      return (
        <View style={buttonTheme.main}>
          <Text style={buttonTheme.content}>
            { props.text }
          </Text>
        </View>
      )
    }
    ```

Components sometimes import/consume other keg-components and then need to style those imported components within their styling context. These styles should be defined in the consumer's theme object

* Example: a button with an icon
```javascript
/* src/theme/components/iconButton.js */
export const iconButton= {
  main: { ... },
  content: { ... },
  icon: {
    main: { ... },
    content: { ... }
  }
}
```

Use size keys (e.g. $small, $medium, etc.) and platform keys (e.g. $native, $web, $all, etc.) to wrap style properties only. This ensures that the shape of the theme object remains constant across all platforms and viewport sizes.

* **DON'T** do this:
```javascript
export const button = {
  $web: { 
    main: {
      backgroundColor: 'coral'
    },
  },
  $native: {
    main: { 
      backgroundColor: 'green' 
    },
    content: { 
      margin: 15 
    }
  }
}
```
* **DO** this:
```javascript
export const button = {
  main: {
    $native: { 
      backgroundColor: 'green'
    },
    $web: { 
      backgroundColor: 'coral'
    }
  },
  content: {
    $native:  { 
      margin: 15
    }
  }
}
```
* In the first case, the theme object would not have the `content` styles on the `$web` platform, making it inconsistent with `$native`


## Icons
 * **TODO - add info on adding SVG's**

## Accessibility

* Mapping of accessibilityRole prop value to Web Element
* Example => `<Link accessibilityRole='link'>` => `<a role='link'>`
```js
  article: 'article',
  banner: 'header',
  complementary: 'aside',
  contentinfo: 'footer',
  form: 'form',
  link: 'a',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  region: 'section',
  adjustable: 'slider',
  button: 'button',
  // Heading mapping leverages the `aria-level` prop to determine the heading element
  // Example <Text accessibilityRole='header' aria-level='1' > => <h1>
  header: 'heading',
  image: 'img',
  link: 'link',
  none: 'presentation',
  search: 'search',
  summary: 'region',
```

## Create Element
* This library exports a `createElement` method
* This method allows create custom native elements per platform, for needs such as:
  * Defining `className` when on a web platform
  * Overwriting the `Text` component, but still taking advantage of the `accessability` props
  * **TODO: Give more examples**
