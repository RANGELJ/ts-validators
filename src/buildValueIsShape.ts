import throwValidationError from './throwValidationError'
import type { ShapeValidator, Validator, ValidatorOptions } from './types'
import valueIsRecord from './valueIsRecord'

const buildValueIsShape = <T extends Record<string | number, unknown>>(
    shape: ShapeValidator<T>
) => {
    const validators = Object.entries(shape)

    return ((value: unknown, options?: ValidatorOptions): value is T => {
        const shouldThrowErrorOnFail = options?.shouldThrowErrorOnFail
    
        if (!valueIsRecord(value)) {
            if (shouldThrowErrorOnFail) {
                throwValidationError(options.path)
            }
            return false
        }

        return !validators.some(([valuePropName, validator]) => {
            if (!validator) {
                return true
            }
    
            const isNotValid = !validator(value[valuePropName], options ? {
                ...options,
                path: [...options.path, valuePropName],
            } : undefined)

            if (isNotValid && shouldThrowErrorOnFail) {
                throwValidationError([...options.path, valuePropName])
            }

            return isNotValid
        })
    }) as Validator<T>
}

export default buildValueIsShape
