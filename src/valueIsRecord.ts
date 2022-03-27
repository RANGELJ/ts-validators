import buildValidator from './buildValidator'
import { Validator } from './types'
import valueIsArray from './valueIsArray'

const validationFunction = (value: unknown): value is Record<string | number, unknown> => {
    if (typeof value !== 'object') {
        return false
    }

    if (value === null) {
        return false
    }

    if (valueIsArray(value)) {
        return false
    }

    return true
}

const valueIsRecord = buildValidator(
    'Record',
    validationFunction,
)

export default valueIsRecord
