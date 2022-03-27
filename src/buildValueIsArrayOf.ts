import buildValidator from './buildValidator'
import throwValidationError from './throwValidationError'
import type { Validator, ValidatorOptions } from './types'
import valueIsArray from './valueIsArray'

const buildValueIsArrayOf = <T>(
    itemValidator: Validator<T>,
) => {
    const typeName = `Array<${itemValidator.typeName}>`

    const validationFunction = (value: unknown, options?: ValidatorOptions): value is T[] => {
        if (!valueIsArray(value)) {
            if (options) {
                throwValidationError(
                    options.path,
                    typeName,
                    value,
                )
            }
            return false
        }
    
        const itemNotOfTypeIndex = value
            .findIndex((item, itemIndex) => !itemValidator(item, options ? {
                ...options,
                path: [...options.path, itemIndex],
            } : undefined))
    
        if (itemNotOfTypeIndex !== -1) {
            return false
        }
    
        return true
    }

    return buildValidator(
        typeName,
        validationFunction,
    )
}

export default buildValueIsArrayOf
