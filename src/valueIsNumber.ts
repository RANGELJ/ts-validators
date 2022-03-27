import buildValidator from './buildValidator'
import { Validator } from './types'

const validationFunction = (value: unknown): value is number => {
    if (typeof value !== 'number'){
         return false
    }
    if (Number.isNaN(value)) {
        return false
    }
    return true
}

const valueIsNumber = buildValidator(
    'number',
    validationFunction,
)

export default valueIsNumber
