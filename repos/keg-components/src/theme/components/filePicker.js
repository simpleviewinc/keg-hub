export const filePicker = {
  default: {
    $all: {
      main: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      content: {
        input: {
          opacity: 0,
          position: 'absolute',
          display: 'none',
        },

        view: {
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        },

        file: {
          marginLeft: 5,
          fontSize: 11,
        },

        button: {
          margin: 0,
        },
      },
    },
  },
  disabled: {},
  hover: {},
  active: {},
}
