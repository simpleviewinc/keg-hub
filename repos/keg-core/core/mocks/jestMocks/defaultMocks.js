import { setMocks } from './setMocks'
import { RNSvg } from '../react-native-svg'
import {
  FBApp,
  FBAnalytics,
  FBCrashlytics,
  FBDynamicLinks,
  FBFirestore,
  FBIid,
  FBInAppMessaging,
} from '../firebase'

/**
 * Helper to auto mock items that should ALWAYS be mocked
 */
export const defaultMocks = () =>
  setMocks({
    'react-native-svg': RNSvg,
    '@react-native-firebase/app': FBApp,
    '@react-native-firebase/analytics': FBAnalytics,
    '@react-native-firebase/crashlytics': FBCrashlytics,
    '@react-native-firebase/dynamic-links': FBDynamicLinks,
    '@react-native-firebase/firestore': FBFirestore,
    '@react-native-firebase/iid': FBIid,
    '@react-native-firebase/in-app-messaging': FBInAppMessaging,
  })
