import valueIsArray from "./valueIsArray"

const buildValueIsArrayOf = <T>(
    itemValidator: (item: unknown) => item is T
) => (value: unknown): value is T[] => {
    if (!valueIsArray(value)) {
        return false
    }
    return !value.some((item) => !itemValidator(item))
}

export default buildValueIsArrayOf
