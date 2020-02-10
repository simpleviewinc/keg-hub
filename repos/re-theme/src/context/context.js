/** @module context */
'use strict'

import React from 'react'
import { getDefaultTheme } from '../theme/default'

/**
 * Creates the initial theme context
 */
export const ReThemeContext = React.createContext(getDefaultTheme())