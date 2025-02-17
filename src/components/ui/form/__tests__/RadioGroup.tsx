import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Form } from './FormHelper'
import RadioGroup from '../RadioGroup'

test('RadioGroup can change state', async () => {
  const user = userEvent.setup()
  const submitFn = jest.fn()
  const defaultValues = { testRadioGroup: '1' }
  render(
    <Form
      onSubmit={submitFn}
      defaultValues={defaultValues}
    >
      <RadioGroup
        groupLabel='Test group'
        name='testRadioGroup'
        labels={['one', 'two']}
        values={['1', '2']}
      />
      <button type='submit'>OK</button>
    </Form>
  )

  await user.click(screen.getByRole('button'))

  expect(submitFn).toHaveBeenCalledTimes(1)
  expect(submitFn).toBeCalledWith(
    { testRadioGroup: '1' },
    expect.anything()) // we don't care about form 'ref' param but we have to ack it

  // select the other option
  await user.click(screen.getByLabelText('two'))
  // submit again
  await user.click(screen.getByRole('button'))

  expect(submitFn).toBeCalledWith({ testRadioGroup: '2' }, expect.anything())
})
