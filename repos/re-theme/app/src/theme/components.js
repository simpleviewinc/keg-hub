export const components = {
  button: {
    default: {
      backgroundColor: '#0b81fc',
      color: '#fefefe',
      padding: '12px 16px',
      cursor: 'pointer',
      borderRadius: '20px',
      border: 'none',
      outline: 'none',
    },
    hover: {
      backgroundColor: '#45b549',
    }
  },
  customInput: {
    default: {
      label: {
        position: 'relative',
        boxSizing: 'border-box',
        display: 'grid',
        width: '100%',
        maxWidth: 280,
      },
      input: {
        boxSizing: 'border-box',
        width: '100%',
        border: 0,
        fontFamily: 'inherit',
        padding: '12px 0',
        height: '48px',
        fontSize: 16,
        fontWeight: 500,
        borderBottom: '2px solid #C8CCD4',
        background: 'none',
        borderRadius: 0,
        color: '#223254',
        transition: 'all .15s ease'
      },
      spanText: {
        boxSizing: 'border-box',
        position: 'absolute',
        top: '16px',
        left: 0,
        fontSize: 16,
        color: '#9098A9',
        fontWeight: 500,
        transformOrigin: '0 0',
        transition: 'all .2s ease'
      },
      spanBorder: {
        boxSizing: 'border-box',
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '2px',
        width: '100%',
        background: '#0077FF',
        transform: 'scaleX(0)',
        transformOrigin: '0 0',
        transition: 'all .15s ease'
      },
    },
    hover: {
      input: {
        background: 'rgba(#223254,.03)'
      },
      // spanText: {
      //   color: '#0077FF',
      //   transform: 'translateY(-26px) scale(.75)'
      // },
      spanBorder: {
        transform: 'scaleX(1)'
      }
    },
    focus: {
      input:{
        background: 'none',
        outline: 'none',
        borderBottom: 'none',
      },
      spanText: {
        color: '#0077FF',
        transform: 'translateY(-26px) scale(.75)'
      },
      // spanBorder: {
      //   transform: 'scaleX(1)'
      // }
    }
  }
}