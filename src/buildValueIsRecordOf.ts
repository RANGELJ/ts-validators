import buildValidator from './buildValidator'
import throwValidationError from './throwValidationError'
import { Validator, ValidatorOptions } from './types'
import valueIsRecord from './valueIsRecord'

const buildValueIsRecordOf = <T>(itemValidator: Validator<T>) => {
    const typeName = `Record<${itemValidator.typeName}>`

    const validationFunction = (value: unknown, options?: ValidatorOptions): value is Record<string | number, T> => {
        if (!valueIsRecord(value)){
            if (options) {
                throwValidationError(
                    options.path,
                    typeName,
                    value,
                )
            }
            return false
        }
        return !Object.entries(value).some(([propName, propValue]) => !itemValidator(propValue, options
            ? {
                ...options,
                path: [...options.path, propName]
            }
            : undefined))
    }

    return buildValidator(typeName, validationFunction)
}

export default buildValueIsRecordOf
