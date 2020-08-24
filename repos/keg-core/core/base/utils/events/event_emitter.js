import { logData } from '@svkeg/jsutils'

let KegEventEmitter

/**
 * Stores events based on event names, which can then be called at another time in a different location
 *
 * @export
 * @class EventEmitter
 */
export class EventEmitter {
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
 * @returns {EventEmitter|Object} - Instance of an EventEmitter
 */
export const getEventEmitter = () => {
  KegEventEmitter = KegEventEmitter || new EventEmitter()

  return KegEventEmitter
}
