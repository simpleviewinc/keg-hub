export const button = {
  default: {
    $all: {
      borderColor: "rgba(0,0,0,.3)",
      borderWidth: 1,
      padding: 8,
      borderRadius: 4,
      outline: 'none',
      textAlign: 'center',
      margin: 'auto'
    },
    $web: {
      cursor: "pointer"
    },
  },
  active: {
    opacity: 0.3
  },
  hover: {
    borderColor: "rgba(0,0,0,1)",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  outlined: {
    borderColor: "rgba(0,0,0,.29)",
    borderWidth: 1,
    paddingHorizontal: 16,
    outline: 'none',
  },
  contained: {
    paddingHorizontal: 16,
    outline: 'none',
  },
  disabled: {
    $web: {
      opacity: 0.3,
      cursor: "not-allowed"
    },
    $native: {
      opacity: 0.3,
    }
  }
}