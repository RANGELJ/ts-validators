import buildValidator from './buildValidator'

const validationFunction = (value: unknown): value is unknown => true

const valueIsUnknown = buildValidator(
    'unknown',
    validationFunction,
)

export default valueIsUnknown
