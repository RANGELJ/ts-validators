import buildValidator from './buildValidator'
import throwValidationError from './throwValidationError'
import type { ShapeValidator, Validator, ValidatorOptions } from './types'
import valueIsRecord from './valueIsRecord'

const buildValueIsShape = <T extends Record<string | number, unknown>>(
    typeName: string,
    shape: ShapeValidator<T>,
) => {
    const validators = Object.entries(shape)

    const validationFunction = (value: unknown, options?: ValidatorOptions): value is T => {
        if (!valueIsRecord(value)) {
            if (options) {
                throwValidationError(
                    options.path,
                    typeName,
                    value,
                )
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

            return isNotValid
        })
    }

    return buildValidator(
        typeName,
        validationFunction,
    )
}

export default buildValueIsShape
