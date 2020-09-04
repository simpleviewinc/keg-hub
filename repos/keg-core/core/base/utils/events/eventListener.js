import { logData } from '@keg-hub/jsutils'

let KegEventListener

/**
 * Stores events based on event names, which can then be called at another time in a different location
 *
 * @export
 * @class EventListener
 */
export class EventListener {
  listeners = {}

  on = (event, cb) => {
    if (!this.listeners[event]) this.listeners[event] = new Set()

    if (this.listeners[event].has(cb))
      return logData(
        `Listener already exists for router event: \`${event}\``,
        `error`
      )

    this.listeners[event].add(cb)
    return this
  }

  emit = (event, ...data) => {
    const listeners = this.listeners[event]
    if (!listeners || !listeners.size) return false

    listeners.forEach(cb => cb(...data))

    return true
  }

  off = (event, cb) => {
    this.listeners[event].delete(cb)
    return this
  }
}

/**
 * Gets the App Event Emitter, if one does not exist it creates it
 *
 * @returns {EventListener|Object} - Instance of an EventListener
 */
export const getEventListener = () => {
  KegEventListener = KegEventListener || new EventListener()

  return KegEventListener
}
