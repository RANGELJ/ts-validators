import buildBaseValidationError from './buildValidationError'
import type { ValidationPath } from './types'

const throwValidationError = (
    path: ValidationPath,
    expectedTypeName: string,
    actualValue: unknown
) => {
    const error = buildBaseValidationError({
        path,
        expectedTypeName,
        actualValue,
    })
    throw error
}

export default throwValidationError
