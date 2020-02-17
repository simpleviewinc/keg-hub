# ReTheme
Simple React and React Native Theme builder / switcher

### Setup
Add to your package.json

  ```js
    "re-theme": "git+https://github.com/simpleviewinc/re-theme"
  ```

### Example 
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
      <ReThemeProvider theme={theme} merge={false} >
        <App />
      </ReThemeProvider>
    )
  }

}
```

### API
Checkout the [Example App](https://simpleviewinc.github.io/re-theme/) for documentation.
