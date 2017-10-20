# styled-apply-when-truthy

A small utility function for applying some CSS string only when a given prop is truthy.

```js
// This...
${props => props.color ? `color: ${props.color};` : ''}

// can be written as...
${applyWhenTruthy('color', val => `color: ${val};`)}

// Or this...
import { availableColors } from 'my-theme'
${props => props.color ? `color: ${availableColors[props.color]};` : ''}

// can be written as...
import { availableColors } from 'my-theme'
${applyWhenTruthy('color', val => `color: ${availableColors[val]};`)}
```

When there are several rules like this in a component, I find that the implementation of a styled-component is easier to read if you call `applyWhenTruthy` outside of the tagged template literal.

For example the following text component that has props for `bold`, `inline`, and `size`.

```js
import styled from 'styled-components'
import { fontSizes, lineHeights } from 'my-theme'

const Text = styled.p`
  ${props => props.bold ? 'font-weight: bold' : ''};
  ${props => props.inline ? 'display: inline' : ''}
  ${props => props.size ? `font-size: ${fontSizes[size]}` : ''};
  ${props => props.size ? `line-height: ${lineHeights[size]}` : ''};
`
```

Could be rewritten as:

```js
import styled from 'styled-components'
import applyWhenTruthy from 'apply-when-truthy'
import { fontSizes, lineHeights } from 'my-theme'

const propsToBold = applyWhenTruthy(
  'bold',
  _ => 'font-weight: bold;'
)
const propsToDisplay = applyWhenTruthy(
  'inline',
  _ => 'display: inline;'
)
const propsToFontSize = applyWhenTruthy(
  'size',
  val => `font-size: ${fontSizes[val]};`
)
const propsToLineHeight = applyWhenTruthy(
  'size',
  val => `line-height: ${lineHeights[val]};`
)

const Text = styled.p`
  ${propsToBold}
  ${propsToDisplay}
  ${propsToFontSize}
  ${propsToLineHeight}
`
```

This made the code longer, but it cleans up the tagged template literal that defines our `Text` component which I find nice :)