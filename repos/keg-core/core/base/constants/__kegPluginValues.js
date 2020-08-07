/**
 * Plugin constants (@see these consumed by __kegValues.js)
 */
export const PluginValues = {
  Plugins: {
    LocalStorage: {
      // A key that can be attached to an action object indicating it was loaded from storage.
      // The local storage plugin will ignore actions that have this key set to true.
      LOADED_FROM_STORAGE: Symbol(),
    },
  },
}
