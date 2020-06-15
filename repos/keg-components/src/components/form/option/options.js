import { Option } from 'KegOption'

export const Options = ({ options }) => {
  return (
    isArr(options) &&
    options.map(option => (
      <Option
        {...option}
        key={
          option.key || option.id || option.label || option.value || option.text
        }
      />
    ))
  )
}
