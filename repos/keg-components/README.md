# Keg Components
 * Base UI Components for the Keg Core and Tap extensions

# Dev setup
* `yarn install`
* `yarn sb` - local storybook
* `yarn sb:native` - native local storybook
* `yarn sb:web` - web local storybook
* `yarn format` - formats your code based on the config set in `configs/eslint.config.js` && `configs/prettier.config.js`
* `yarn eslint:watch` - watches any code change for any lint errors

# Theming

Keg Components leverages [re-theme](https://github.com/simpleviewinc/re-theme) for dynamic theming across platforms and viewport sizes

## Theme objects
* For new components, create and export your theme objects in `src/theme/components`

## Using themes in components
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
* in the first case, the theme object would not have the `content` styles on the `$web` platform, making it inconsistent with `$native`
