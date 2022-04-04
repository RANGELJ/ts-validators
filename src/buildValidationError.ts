import { TypeValidationError, ValidationPath } from './types'

type Args = {
    path: ValidationPath;
    expectedTypeName: string;
    actualValue: unknown;
}

const buildBaseValidationError = ({
    path,
    expectedTypeName,
    actualValue,
}: Args) => {
    const pathString = path.length < 1 ? '' : `:Path: ${path.join('.')}`

    const error: Error & Partial<TypeValidationError> = new Error(`Expecting: ${expectedTypeName}, recieved: ${actualValue} ${pathString}`)

    error.expectedTypeName = expectedTypeName
    error.path = path

    return error
}

export default buildBaseValidationError
