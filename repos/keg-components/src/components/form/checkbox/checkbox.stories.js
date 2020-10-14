import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Switch, Checkbox } from '../../'
import { action } from '@storybook/addon-actions'
import { StoryWrap, Split } from 'StoryWrap'
import { Text } from '../../'

storiesOf('Form/Checkbox', module)
  .add('Default', () => (
    <StoryWrap>
      <Checkbox onChange={action('Checkbox Click!')} />
    </StoryWrap>
  ))
  .add('Custom', () => (
    <StoryWrap>
      <Checkbox
        CheckboxComponent={<Switch onChange={action('Switch Click!')} />}
      />
    </StoryWrap>
  ))
  .add('Side Text', () => (
    <StoryWrap>
      <Checkbox
        LeftComponent='Left Text'
        onChange={action('Checkbox Click!')}
      />
      <Split />
      <Checkbox
        RightComponent='Right Text'
        onChange={action('Checkbox Click!')}
      />
      <Split />
      <Checkbox
        LeftComponent='Left Text'
        RightComponent='Right Text'
        onChange={action('Checkbox Click!')}
      />
    </StoryWrap>
  ))
  .add('Close Text', () => (
    <StoryWrap>
      <Checkbox
        close
        LeftComponent='Left Text'
        onChange={action('Checkbox Click!')}
      />
      <Split />
      <Checkbox
        close
        RightComponent='Right Text'
        onChange={action('Checkbox Click!')}
      />
      <Split />
      <Checkbox
        close
        LeftComponent='Left Text'
        RightComponent='Right Text'
        onChange={action('Checkbox Click!')}
      />
    </StoryWrap>
  ))
  .add('Disabled Check', () => {
    const [ checkSet, setCheckSet ] = useState(new Set())
    const onChange = num => {
      if (checkSet.has(num)) {
        checkSet.delete(num)
        action('Checkbox cleared!')()
      }
      else {
        checkSet.add(num)
        action('Checkbox filled!')()
      }
      setCheckSet(new Set(checkSet))
    }

    const disableCheck = checkSet.size >= 2

    return (
      <StoryWrap>
        <Text style={{ marginBottom: 25 }}>
          You will be unable to check a third box, but you can always uncheck
          one
        </Text>
        <Checkbox
          onChange={() => onChange(1)}
          disableCheck={disableCheck}
        />
        <Split />
        <Checkbox
          onChange={() => onChange(2)}
          disableCheck={disableCheck}
        />
        <Split />
        <Checkbox
          onChange={() => onChange(3)}
          disableCheck={disableCheck}
        />
      </StoryWrap>
    )
  })
  .add('Disabled Uncheck', () => {
    const [ count, setCount ] = useState(0)

    const onChange = () => {
      setCount(count + 1)
      action('Checkbox Click!')()
    }

    const disableUncheck = count >= 1

    return (
      <StoryWrap>
        <Text style={{ marginBottom: 25 }}>
          Once you check a box, you cannot uncheck it
        </Text>
        <Checkbox
          onChange={onChange}
          disableUncheck={disableUncheck}
        />
        <Split />
        <Checkbox
          onChange={onChange}
          disableUncheck={disableUncheck}
        />
        <Split />
        <Checkbox
          onChange={onChange}
          disableUncheck={disableUncheck}
        />
      </StoryWrap>
    )
  })
  .add('Disabled', () => {
    return (
      <StoryWrap>
        <Checkbox disabled={true} />
        <Checkbox
          checked={true}
          disabled={true}
        />
      </StoryWrap>
    )
  })
