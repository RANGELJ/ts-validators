import { Validator } from './types'

const valueIsString = (value: unknown): value is string => typeof value === 'string'

export default valueIsString as Validator<string>
