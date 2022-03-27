import buildValidator from './buildValidator'

const rawValidator = (value: unknown): value is unknown[] => Array.isArray(value)

const valueIsArray = buildValidator(
    `Array`,
    rawValidator,
)

export default valueIsArray
