// @flow

type PropToCSSFunc = (prop: any) => string
type PropsToCSSFunc = (props: Object) => string

const applyWhenTruthy = (
  propName: string,
  func: PropToCSSFunc
): PropsToCSSFunc => props => {
  const value = props[propName]
  return value ? func(value) : ''
}

module.exports = applyWhenTruthy
