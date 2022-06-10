# ReTheme
Tools for styling React or React Native components

## Setup
1. Add to your package.json

  ```js
    "re-theme": "9.5.0"
  ```

2. Wrap the entry point of your application with an instance of `ReThemeProvider`, e.g.:
```js
import { ReThemeProvider } from 're-theme'

const myCustomTheme = { 
  // theme styles go here 
}

export const App from Component {
  state = { theme: myCustomTheme }

  componentDidUpdate = () => {
    this.props.theme !== this.state.theme &&
      this.setState({ theme: this.props.theme })
  }

  render(){
    return  (
      <ReThemeProvider theme={this.state.theme} merge={false}>
        <App />
      </ReThemeProvider>
    )
  }
}
```
  * `ReThemeProvider` accepts two props
    * `theme`: the theme object, containing any global styles you want to use across your app
    * `merge`: a boolean indicating whether or not you want to merge the passed in theme prop with the current theme

## reStyle
* `reStyle` is the preferred utility in ReTheme for styling your components

### Usage
```js
  ...
  import { reStyle } from '@keg-hub/re-theme/reStyle'

  // basic styling with an object
  const StyledButton = reStyle(Button)({
    position: 'absolute'
  })

  // using global theme
  const StyledButton = reStyle(Button)(theme => ({
    // reStyle also supports style aliases. View these aliases in src/constants/ruleHelpers.js
    pos: 'absolute',
    c: theme.colors.red
  }))

  // using theme and props
  const StyledButton = reStyle(Button)((theme, props) => ({
    position: 'absolute',
    color: theme.colors.red
    borderColor: props.outline || theme.colors.borderColor
  })

  // for styling components with any props, set the default props
  const StyledIcon = reStyle(SomeSvgIcon)(
    { position: 'absolute' }
    theme => ({
      // these are default props passed to `SomeSvgIcon`, not style attributes
      width: 32,
      height: 32
      className: 'some-class',
      customProp: theme.customValue
    })
  )

  /**
   * For specifying a specific prop for styles, pass in a string for the 2nd argument.
   * This is equivalent to: 
   *  const styles = {
   *    main: { position: 'absolute' },
   *    content: { margin: 32 }
   *  }
   *  <Container styles={styles}>
   */
  const StyledContainer = reStyle(Container, 'styles')({
    main: {
      position: 'absolute'
    },
    content: {
      margin: 32
    }
  })
```


### API
Checkout the [Example App](https://keg-hub.github.io/re-theme/) for documentation.
