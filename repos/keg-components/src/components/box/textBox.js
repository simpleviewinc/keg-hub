import React from 'react'
import { useTheme } from '@keg-hub/re-theme'
import { useThemePath } from '../../hooks'
import { Clipboard, Text } from 'react-native'
import { View } from 'KegView'
import { TouchableIcon } from '../icon'
import { get } from '@keg-hub/jsutils'
import PropTypes from 'prop-types'
import { noPropObj } from '../../utils/helpers/noop'
import { spacedJoin } from '../../utils/helpers/spacedJoin'

/**
 * A Text Box for showing text. Includes a copy to clipboard button.
 * @param {Object} props
 * @param {String} props.text - string text to display
 * @param {String} props.themePath - path to a theme file containing the following properties:
 *  - main: for the root View
 *  - content.wrapper: for the container enveloping the text
 *  - content.text: for the text inside the container
 *  - content.clipboard: for the clipboard icon
 * @param {Object} props.styles - any styles to override those at themePath
 * @param {Boolean} props.useClipboard - if true, renders a copy button for copying text to clipboard
 * @param {Number} props.maxLines - maximum number of lines of text. Defaults to 100.
 */
export const TextBox = props => {
  const {
    classNames=noPropObj,
    text,
    themePath = 'textBox.outlined.default',
    styles=noPropObj,
    useClipboard = false,
    maxLines = 100,
  } = props
  
  const theme = useTheme()
  const [style] = useThemePath(themePath, styles)

  return (
    <View
      className={spacedJoin(classNames.main, ['keg-textbox'])}
      style={theme.join(style.main, styles)}
    >
      <View
        className={spacedJoin(
          classNames.content.wrapper,
          ['keg-textbox-wrapper']
        )}
        style={get(style, 'content.wrapper')}
      >
        <Text
          className={spacedJoin(
            classNames.content.text,
            ['keg-textbox-text']
          )}
          numberOfLines={maxLines}
          style={get(style, 'content.text')}
        >
          { text || '' }
        </Text>
      </View>

      { /* A copy icon that copies the content to system clipboard on press */ }
      <Text>
        { useClipboard && text && (
          <TouchableIcon
            name={'copy'}
            size={15}
            className={spacedJoin(
              classNames.content.clipboard,
              ['keg-textbox-clipboard']
            )}
            wrapStyle={get(style, 'content.clipboard')}
            onPress={_ => text && Clipboard.setString(text)}
          />
        ) }
      </Text>
    </View>
  )
}

TextBox.propTypes = {
  text: PropTypes.string,
  themePath: PropTypes.string,
  styles: PropTypes.object,
}
