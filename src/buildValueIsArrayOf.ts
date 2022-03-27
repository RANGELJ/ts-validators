import throwValidationError from './throwValidationError'
import type { Validator, ValidatorOptions } from './types'
import valueIsArray from './valueIsArray'

const buildValueIsArrayOf = <T>(
    itemValidator: Validator<T>,
) => ((value: unknown, options?: ValidatorOptions): value is T[] => {
    const shouldThrowErrorOnFail = options?.shouldThrowErrorOnFail

    if (!valueIsArray(value)) {
        if (shouldThrowErrorOnFail) {
            throwValidationError(options.path)
        }
        return false
    }

    const itemNotOfTypeIndex = value
        .findIndex((item, itemIndex) => !itemValidator(item, options ? {
            ...options,
            path: [...options.path, itemIndex],
        } : undefined))

    if (itemNotOfTypeIndex !== -1) {
        if (shouldThrowErrorOnFail) {
            throwValidationError([...options.path, itemNotOfTypeIndex])
        }
        return false
    }

    return true
}) as Validator<T[]>

export default buildValueIsArrayOf
