import { Validator } from './types'

const buildRecursiveValidator = <T>(validatorFactory: () => Validator<T>) => ((
    ...params
) => validatorFactory()(...params)) as Validator<T>

export default buildRecursiveValidator
