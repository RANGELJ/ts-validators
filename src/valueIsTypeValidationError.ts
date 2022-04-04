import buildRecursiveValidator from './buildRecursiveValidator'
import buildValueIsArrayOf from './buildValueIsArrayOf'
import buildValueIsOneOf from './buildValueIsOneOf'
import buildValueIsShape from './buildValueIsShape'
import { TypeValidationError } from './types'
import valueIsNumber from './valueIsNumber'
import valueIsString from './valueIsString'

const valueIsTypeValidationError = buildValueIsShape<TypeValidationError>('TypeValidationError', {
    expectedTypeName: valueIsString,
    path: buildValueIsArrayOf(buildRecursiveValidator(() => buildValueIsOneOf([
        valueIsString,
        valueIsNumber,
    ]))),
})

export default valueIsTypeValidationError
