import { flex } from '../flex'
import { colors } from '../colors'
import { get } from 'jsutils'

const defaultSectionStyle = {
  height: '100%', 
  backgroundColor: 'transparent'
}

const defaultSideSectionStyle = {
  main: {
    ...defaultSectionStyle,
    flexDirection: 'row',
    maxWidth: '20%',
  },
  content: {
    container: {
      ...defaultSectionStyle,
    },
    icon: {
      style: {  
        alignSelf: 'center', 
        padding: 5   
       },
      color: '#111111',
      size: 30
    }
  },
  native: {
    content: {
      container: {
        ...flex.center,
        flex: 0
      },
    }
  }

}
export const appHeader = {
  default: {
    container: {
      $native: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flex: 0,
        shadow: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 1
        },
        title: {}
      },
      $web: {
        shadow: {
          boxShadow: '0px 4px 7px 0px #9E9E9E'
        }
      },
      $all: {
        backgroundColor: get(colors, 'surface.primary.colors.dark'),
        height: 70,
        width: '100%',
        ...flex.left,
        flexDirection: 'row',
      }
    },
    side: {
      left: {
        $all: {
          main: {
            ...flex.left,
            ...defaultSideSectionStyle.main
          },
          content: {
            ...defaultSideSectionStyle.content
          }
        },
        $web: {
          content: {
            container: {
              ...flex.left,
            }
          }
        },
        $native: {
          ...defaultSideSectionStyle.native
        },
      },
      right: {
        $all: {
          main: {
            ...flex.right,
            ...defaultSideSectionStyle.main
          },
          content: {
            ...defaultSideSectionStyle.content
          }
        },
        $web: {
          content: {
            container: {
              ...flex.right,
            }
          }
        },
        $native: {
          ...defaultSideSectionStyle.native
        },
      },

    },
    center: {
      $native: {
        main: {},
        content: {
          title: {}
        }
      },
      $web: {
        main: {},
        content: {}
      },
      $all: {
        main: {
          ...flex.center,
          ...defaultSectionStyle,
          width: '60%'
        },
        content: {}
      }
    }
  }
}
