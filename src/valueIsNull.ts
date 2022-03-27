import { Validator } from './types'

const valueIsNull = (value: unknown): value is null => value === null

export default valueIsNull as Validator<null>
