import { Validator } from "./types"
import valueIsRecord from "./valueIsRecord"

const buildValueIsShape = <T extends Record<string | number, Validator<unknown>>>(shape: T) => {
    const validators = Object.entries(shape)
    return (value: unknown): value is {
        [K in keyof T]: T[K] extends Validator<infer U> ? U : never;
    } => {
        if (!valueIsRecord(value)) {
            return false
        }
        return !validators.some(([valuePropName, validator]) => {
            if (!validator) {
                return true
            }
    
            return !validator(value[valuePropName])
        })
    }
}

export default buildValueIsShape
