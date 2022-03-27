import type { TypeValidationError, ValidationPath } from './types'

const throwValidationError = (
    path: ValidationPath,
    expectedTypeName: string,
    actualValue: unknown
) => {
    const pathString = path.length < 1 ? '' : `:Path: ${path.join('.')}`

    const error: TypeValidationError = new Error(`Expecting: ${expectedTypeName}, recieved: ${actualValue} ${pathString}`)
    error.path = path
    throw error
}

export default throwValidationError
