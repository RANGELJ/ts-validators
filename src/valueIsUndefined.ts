import buildValidator from './buildValidator'
import { Validator } from './types'

const validationFunction = (value: unknown): value is undefined => value === undefined

const valueIsUndefined = buildValidator(
    'undefined',
    validationFunction,
)

export default valueIsUndefined
