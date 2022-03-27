import buildValidator from './buildValidator'

type BaseTypes = string | number | boolean

const buildValueIsConstant = <T extends BaseTypes>(
    constant: T
) => {
    const validationFunction = (value: unknown): value is T => value === constant

    return buildValidator(`${constant}`, validationFunction)
}

export default buildValueIsConstant
