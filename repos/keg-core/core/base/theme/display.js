import { colors } from 'SVTheme/colors'

export const display = {
  content: {
    top: {
      display: 'flex',
      flex: 1,
      alignItems: 'center',
    },
    center: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    left: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    right: {
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
  },
  divider: {
    width: '100%',
    backgroundColor: colors.divider,
    height: 1,
  },
  click: {
    cursor: 'pointer',
  },
  noRadius: {
    borderRadius: 0,
  },
}
