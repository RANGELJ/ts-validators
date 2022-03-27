import type { Validator, ValidatorOptions } from './types'
import valueIsArray from './valueIsArray'

const buildValueIsArrayOf = <T>(
    itemValidator: Validator<T>,
    defaultOptions?: ValidatorOptions,
) => ((value: unknown, options?: ValidatorOptions): value is T[] => {
    const debugLogIsEnabled = defaultOptions?.debugLogIsEnabled || options?.debugLogIsEnabled

    if (!valueIsArray(value)) {
        if (debugLogIsEnabled) {
            console.log('Validating arrayOf, value should be an array')
        }
        return false
    }

    const itemNotOfTypeIndex = value.findIndex((item) => !itemValidator(item, defaultOptions))

    if (itemNotOfTypeIndex !== -1) {
        if (debugLogIsEnabled) {
            console.log(`Validating arrayOf, item should be of type T at index ${itemNotOfTypeIndex}`)
        }
        return false
    }

    return true
}) as Validator<T[]>

export default buildValueIsArrayOf
