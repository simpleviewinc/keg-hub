/**
 * Helper to build a new jest function every time it's called
 */
const noOp = () => jest.fn(() => {})

/**
 * Firebase app object override
 */
export const FBApp = {}

/**
 * Firebase Analytics mock functions
 */
export const FBAnalytics = async () => {
  return {
    setCurrentScreen: noOp(),
    setUserId: noOp(),
    setUserProperty: noOp(),
    logEvent: noOp(),
  }
}

/**
 * Firebase IID mock functions
 */
export const FBIid = jest.fn(async () => {
  return { get: noOp() }
})

/**
 * Firebase In App Messaging mock functions
 */
export const FBInAppMessaging = jest.fn(async () => {
  return { setMessagesDisplaySuppressed: noOp() }
})

/**
 * Firebase Crashlytics mock functions
 */
export const FBCrashlytics = { log: noOp(), crash: noOp(), recordError: noOp() }

/**
 * Firebase Firestore mock functions
 */
export const FBFirestore = { collection: noOp(), settings: noOp() }

/**
 * Firebase Dynamic Links object override
 */
export const FBDynamicLinks = {}
