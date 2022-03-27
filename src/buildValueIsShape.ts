import type { ShapeValidator, Validator } from './types'
import valueIsRecord from './valueIsRecord'

type A = { a?: string }

type B = ShapeValidator<A>

const buildValueIsShape = <T extends Record<string | number, unknown>>(
    shape: ShapeValidator<T>
) => {
    const validators = Object.entries(shape)

    return ((value: unknown): value is T => {
        if (!valueIsRecord(value)) {
            return false
        }
        return !validators.some(([valuePropName, validator]) => {
            if (!validator) {
                return true
            }
    
            return !validator(value[valuePropName])
        })
    }) as Validator<T>
}

export default buildValueIsShape
