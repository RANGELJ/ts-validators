import type { TypeValidationError, ValidationPath } from './types'

const throwValidationError = (path: ValidationPath) => {
    const error: TypeValidationError = new Error(`Value validation - invalid value at path: ${path.join('.')}`)
    error.path = path
    throw error
}

export default throwValidationError
