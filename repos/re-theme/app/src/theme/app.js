const textStyle = {
  backgroundColor: '#fefefe',
  color: '#333333',
  borderBottom: '1px solid #e5ecea',
}

export const app = {
  grid: {
    title: {
      ...textStyle,
      width: '100%',
      marginBottom: 30,
      borderBottom: 'none'
    }
  },
  header: {
    default: {
      ...textStyle,
      cursor: 'pointer',
      transition: 'all .5s ease',
      width: '100%'
    },
    hover: {
      color: '#0b81fc'
    }
  },
  section: {},
  example: {
    wrapper: {
      paddingLeft: 30,
      paddingRight: 30,
      maxHeight: 0,
      width: 'auto'
    },
    grid: {
      container: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 3fr',
        border: '1px solid #cccccc',
        borderLeft: 'none',
      },
      header: {
        backgroundColor: '#e5ecea',
        borderTop: 'none',
      },
      prop: {
        padding: '8px 5px',
        borderTop: '1px solid #cccccc',
        borderLeft: '1px solid #cccccc',
      }
    }
  }
}