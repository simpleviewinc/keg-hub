
/*

* The size keys of sub objects get moved to the root level size keys
* This allows setting the size rules within the component it's self
* Given this, the two themes below will produce the same result =>

```js

  // theme1, size defined at the root level
  const theme1 = {
    small: {
      components: {
        button: {
          width: 30
        }
      }
    }
  }

  // theme2, size is defined within the component.button object
  // Size styles defined like this, will be move to the root level size object
  // So the end result will end up looking like theme1
  const theme2 = {
    components: {
      button: {
        small: {
          width: 30
        }
      }
    }
  }
  
```

* Size rules defined within the component, will override size rules defined from the root level
* Given this, using the theme below would set the button with to 100, not 30 =>

```js

const buttonTheme = {
  // Initial button width set to 30
  small: { components: { button: { width: 30 } } },
  components: {
    button: {
      // With set here overrides the width of 30 set above
      small: { width: 100 },
    }
  }
}

```

*/

const colors = {
  button: {
    text: '#2196f3',
    contained: '#2196f3',
    outlined: '#1287ea',
  }
}

export const buttonTheme = {
  small: { components: { button: { width: 30 } } },
  components: {
    button: {
      default: { small: { fontSize: 12, borderRadius: 10, }, },
      small: { width: 100 },
    }
  }
}

export const testTheme = {
  small: {
    components: {
      button: {
        width: 30
      }
    }
  },
  components: {
    button: {
      default: {
        $web: {
          padding: 8,
          borderRadius: 4,
          fontSize: 14,
          color: '#ffffff',
          small: {
            fontSize: 12,
            borderRadius: 10,
          },
          medium: {
            fontSize: 16,
            padding: 15,
          },
          large: {
            fontSize: 18,
            padding: 20,
          }
        },
        $native: {
          padding: 12,
          borderRadius: 5,
          fontSize: 12,
        }
      },
    }
  },
  colors,
  meeting: {
    xlarge: {
      text: {
        time: {
          font: 'WEB FONT',
        },
      }
    },
    large: {
      text: {
        $web: {
          time: {
            font: 'WEB FONT',
          },
        },
        $customPlatform: {
          time: {
            font: 'CUSTOM FONT',
          },
        },
        $native: {
          time: {
            font: 'NATIVE FONT',
          },
        }
      },
    },
    medium: {
      $web: {
        meetingListOffset: 200,
        $native: {
          text: {
            user: {
              width: '30px',
            },
          },
        },
        $web: {
          text: {
            user: {
              width: 200,
            },
          },
        },
        text: {
          user: {
            width: '107px',
          },
        },
      },
      $native: {
        meetingListOffset: 20,
        text: {
          user: {
            width: 75,
          },
        }
      },
    },
    small: {
      text: {
        user: {
          width: '95px',
        },
        time: {
          width: 125,
        },
      }
    },
    xsmall: {
      meetingList: {
        $web: {
          flex: 1,
        },
        $native: {
          flex: 2,
        }
      },
      text: {
        user: {
          width: '200px',
        },
        time: {
          width: 125,
        },
      },
    }
  },
  app: {
    container: {
      backgroundColor: '#f7f9fb',
      overflow: 'hidden',
      flex: 1,
      height: '100vh'
    },
    text: {
      flex: 1,
    },
    filter: {
      flex: 2,
      margin: 7,
      marginTop: 0,
    },
    table: {
      flex: 7,
      margin: 7,
      marginTop: 0,
    },
    bodyWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      flex: 1,
      padding: 18,
    }
  }
}