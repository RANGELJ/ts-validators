import buildValidator from './buildValidator'

const validationFunction = (value: unknown): value is boolean => value === true || value === false

const valueIsBoolean = buildValidator(
    'boolean',
    validationFunction,
)

export default valueIsBoolean
