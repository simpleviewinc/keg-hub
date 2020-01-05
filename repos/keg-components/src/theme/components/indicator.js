export const indicator = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 230,
    width: 230,
  },
  image: {
    $all: {
      width: '50%',
      margin: 'auto',
      maxWidth: '300px',
      maxHeight: '300px',
    },
    $web: {
      position: 'relative',
    },
    $native: {
      height: '100%',
      position: 'relative',
    }
  }
}