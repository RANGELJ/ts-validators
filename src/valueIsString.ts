import buildValidator from './buildValidator'

const validationFunction = (value: unknown): value is string => typeof value === 'string'

const valueIsString = buildValidator(
    'string',
    validationFunction,
)

export default valueIsString
