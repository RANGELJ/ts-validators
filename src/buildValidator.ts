import throwValidationError from './throwValidationError'
import { Validator, ValidatorOptions } from './types'

const EMPTY_FUNCTION = () => {
    throw new Error('This function should never be called, it is mean only to guide the type system')
}

type ValidationFunction<T> = (value: unknown, options?: ValidatorOptions) => value is T

const buildValidator = <T>(
    typeName: string,
    simpleValidator: ValidationFunction<T>,
) => {
    const validator: Validator<T> = (value, options): value is T  => {
        const isValid = simpleValidator(value, options)

        if (!isValid && options) {
            throwValidationError(options.path, typeName, `${value}`)
        }

        return isValid
    }

    validator.v = EMPTY_FUNCTION as () => T
    validator.typeName = typeName

    return validator
}

export default buildValidator
