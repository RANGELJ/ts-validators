import buildValidator from './buildValidator'
import type { Validator, ValidatorOptions } from './types'

type InferType<V> = V extends Validator<infer T> ? T : any;

const buildValueIsOneOf = <T extends Validator<any>>(
    validators: T[]
) => {
    const validationFunction = (value: unknown, options?: ValidatorOptions): value is InferType<T> => {
        const successfulValidator = validators.some((validator) => validator(value, options))
        if (successfulValidator) {
            return true
        }
        return false
    }

    return buildValidator(
        validators.map((validator) => validator.typeName).join(' | '),
        validationFunction,
    )
}

export default buildValueIsOneOf