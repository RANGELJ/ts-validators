import { Validator } from './types'

const valueIsUndefined = (value: unknown): value is undefined => value === undefined

export default valueIsUndefined as Validator<undefined>
