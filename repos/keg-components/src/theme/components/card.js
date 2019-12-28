import { colors } from '../colors'

export const card = {
  container: {
    $android: {
      elevation: 1,
    },
    $all: {
      backgroundColor: '#ffffff',
      borderWidth: 1,
      padding: 15,
      margin: 15,
      marginBottom: 0,
      borderColor: '#e1e8ee',
      shadowColor: 'rgba(0,0,0, .2)',
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: 1,
      shadowRadius: 1,
    },
  },
  wrapper: {
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 14,
    color: '#43484d',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  divider: {
    marginBottom: 15,
    hairlineWidth: 1,
  },
  image: {
    title: {
      marginTop: 15,
    },
    wrapper: {},
    image: {}
  },
  featured: {
    title: {
      fontSize: 18,
      marginBottom: 8,
      color: '#ffffff',
      fontWeight: '800',
    },
    subtitle: {
      fontSize: 13,
      marginBottom: 8,
      color: '#ffffff',
      fontWeight: '400',
    }
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignSelf: 'stretch',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
}