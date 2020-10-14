import { capitalize } from './capitalize'

/**
 * Turns a path string into a camel-cased string, if there is more than one
 * step in the path. If there isn't, just returns path.
 * @param {string} path 
 * @return {string} camel-cased string
 * @example
 * camelCasePath('settings.agendaMap.Count') -> 'settingsAgendaMapCount'
 * camelCasePath('settings') -> 'settings'
 */
export const camelCasePath = (path) => {
  const split = path.split('.')
  const camelCasedSplit = split.map(
    (str, idx) => idx > 0
      ? capitalize(str, false)
      : str
  )

  return camelCasedSplit.length > 1 
    ? camelCasedSplit.join('')
    : path
}
