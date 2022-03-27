import type { Validator } from './types'

const buildValueIsOneOf = <T, T2>(
    validator1: Validator<T>,
    validator2: Validator<T2>,
) => ((value: unknown): value is T | T2 => {
    if (validator1(value)) {
        return true
    }
    if (validator2(value)) {
        return true
    }
    return false
}) as Validator<T | T2>

export default buildValueIsOneOf