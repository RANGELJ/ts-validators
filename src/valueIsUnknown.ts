import buildValidator from './buildValidator'
import { ValidatorOptions } from './types'

const validationFunction = (value: unknown): value is unknown => true

const valueIsUnknown = buildValidator(
    'unknown',
    validationFunction,
)

export default valueIsUnknown
