import buildValidator from './buildValidator'

const validationFunction = (value: unknown): value is null => value === null

const valueIsNull = buildValidator(
    'null',
    validationFunction,
)

export default valueIsNull
