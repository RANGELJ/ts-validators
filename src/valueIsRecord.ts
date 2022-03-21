import valueIsArray from './valueIsArray'

const valueIsRecord = (value: unknown): value is Record<string | number, unknown> => {
    if (typeof value !== 'object') {
        return false
    }
    if (value === null) {
        return false
    }
    if (valueIsArray(value)) {
        return false
    }
    return true
}

export default valueIsRecord
