import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useThemePath } from '../../hooks'
import PropTypes from 'prop-types'
import { P } from '../typography'
import { Button } from '../button'
import { View } from 'KegView'
import { get } from '@keg-hub/jsutils'
import { useThemeTypeAsClass } from 'KegTypeAsClass'
import { StyleInjector } from '@keg-hub/re-theme/styleInjector'
import { Input as KegInput } from '../internal/input.web'

/**
 * Wrap the internal component with the Styles Injector Hoc
 * <br/>This allows us to add the styles as css classes
 */
const Input = StyleInjector(KegInput, {
  displayName: 'FilePickerInput',
  className: 'keg-file-picker-input',
})

/**
 * A component for selecting files from the user's system. Looks better than a basic input element,
 * and accepts style objects for styling further
 * @param {Object} props - props object. Accepts all standard <input /> props which will be passed to the input element. Additional props:
 * @param {String} props.title - the text inside the button
 * @param {Object} props.style - style for the wrapping View
 * @param {Object} props.buttonStyle - style for the button
 * @param {Object} props.fileStyle - style for the file name text
 * @param {Object} props.themePath - theme type path for everything except the button
 * @param {Object} props.buttonThemePath - theme type path for the button itself (@see Button)
 * @param {Boolean} props.showFile - if true, it will show the file name next to the input
 * @param {Function} props.onFilePicked - function called when a file was selected and handles extracting the file for you: file => { ... }
 * @param {Boolean} props.openOnMount - opens filepicker on component mount
 * @param {Object} ref - an optional ref to the underlying input element
 */
export const FilePicker = React.forwardRef((props, ref) => {
  const {
    className,
    onChange,
    title,
    children,
    style = {},
    showFile = true,
    onFilePicked,
    themePath = 'filePicker.default',
    buttonThemePath = 'button.contained.default',
    capture,
    openOnMount = false,
    ...args
  } = props

  const componentTheme = useThemePath(themePath)

  // store the file selected by the user
  const [ file, setFile ] = useState({})

  // handle user selecting a file
  const handleInputChange = useCallback(
    event => {
      onChange && onChange(event)

      const file = event.target.files[0]
      file && onFilePicked && onFilePicked(file)
      file && setFile(file)
    },
    [ onChange, onFilePicked, setFile ]
  )

  // make an input ref so that we can call the input's click() handler to start picking files
  // when the user clicks the button
  const refToInput = useRef()

  const clickInput = useCallback(
    () => refToInput.current && refToInput.current.click(),
    [refToInput]
  )

  // if openOnMount is set to true, then immediately open the file picker
  useEffect(() => {
    openOnMount && clickInput()
  }, [])

  return (
    <View
      className={useThemeTypeAsClass(
        themePath || type,
        'keg-filepicker',
        className
      )}
      style={[ get(componentTheme, 'main'), style ]}
    >
      <Button
        content={title}
        onClick={clickInput}
        style={get(componentTheme, 'content.button')}
        themePath={buttonThemePath}
      >
        { children }
      </Button>

      {
        // show the file name if the flag is set for it
        showFile && (
          <P style={get(componentTheme, 'content.file')}>{ file.name }</P>
        )
      }

      { /* this input is hidden from the user, but is still used for selecting a file */ }
      <Input
        {...args}
        ref={input => {
          ref && (ref.current = input)
          refToInput.current = input
        }}
        onChange={handleInputChange}
        style={get(componentTheme, 'content.input')}
        type='file'
        capture={capture}
      />
    </View>
  )
})

FilePicker.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  buttonStyle: PropTypes.object,
  fileStyle: PropTypes.object,
  themePath: PropTypes.string,
  buttonThemePath: PropTypes.string,
  onChange: PropTypes.func,
  onFilePicked: PropTypes.func,
  showFile: PropTypes.bool,
}
