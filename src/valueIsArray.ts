import { Validator } from './types'

const valueIsArray = (value: unknown): value is unknown[] => Array.isArray(value)

export default valueIsArray as Validator<unknown[]>
