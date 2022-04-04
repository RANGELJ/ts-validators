import buildValidator from './buildValidator'
import type { TypeValidationError, Validator, ValidatorOptions } from './types'
import valueIsRecord from './valueIsRecord';
import valueIsString from './valueIsString';
import valueIsTypeValidationError from './valueIsTypeValidationError';

type InferType<V> = V extends Validator<infer T> ? T : any;

const buildValueIsOneOf = <T extends Validator<any>>(
    validators: T[]
) => {
    const validationFunction = (value: unknown, options?: ValidatorOptions): value is InferType<T> => {
        let hasSuccessfulValidator = false
        const optionErrors: TypeValidationError[] = []

        for (let validatorIndex = 0; validatorIndex < validators.length; validatorIndex += 1) {
            const validator = validators[validatorIndex]

            try {
                hasSuccessfulValidator = validator(value, options)

                if (hasSuccessfulValidator) {
                    break
                }
            } catch (error) {
                if (!valueIsTypeValidationError(error)) {
                    throw error
                }
                optionErrors.push(error)
            }
        }

        if (!hasSuccessfulValidator && optionErrors.length > 0) {
            throw optionErrors[0]
        }

        return hasSuccessfulValidator
    }

    return buildValidator(
        validators.map((validator) => validator.typeName).join(' | '),
        validationFunction,
    )
}

export default buildValueIsOneOf