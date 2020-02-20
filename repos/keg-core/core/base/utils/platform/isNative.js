import { Platform } from 'react-native'

/**
 * @returns { Boolean } true if the current platform is a native device (android or ios)
 */
export const isNative = () => (Platform.OS !== 'web')