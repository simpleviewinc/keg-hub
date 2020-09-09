import React from 'react'
import { View } from 'KegView'
import { Text } from '../typography/text'
import PropTypes from 'prop-types'
import { get } from '@keg-hub/jsutils'
import { TouchableIcon } from '../icon'
import { Copy } from '../../assets/icons'
import { useThemePath } from '../../hooks'
import { Clipboard } from 'react-native'
import { useThemeTypeAsClass } from 'KegTypeAsClass'

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
    className,
    maxLines = 100,
    styles,
    text,
    type = 'default',
    themePath = `textBox.outlined.${type}`,
    useClipboard = false,
  } = props

  const style = useThemePath(themePath, styles)

  return (
    <View
      className={useThemeTypeAsClass(
        themePath || type,
        'keg-textbox',
        className
      )}
      style={style.main}
    >
      <View
        className='keg-textbox-container'
        style={get(style, 'content.wrapper')}
      >
        <Text
          className='keg-textbox-text'
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
            Component={Copy}
            size={15}
            className='keg-textbox-clipboard'
            touchStyle={get(style, 'content.clipboard')}
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
