import buildValidator from './buildValidator'
import { Validator, ValidatorOptions } from './types'

const buildValueIsBothTypes = <A, B>(
    validatorA: Validator<A>,
    validatorB: Validator<B>
): Validator<A & B> => {
     const validationFunction = (value: unknown, options?: ValidatorOptions): value is A & B => {
         if (!validatorA(value, options)){
             return false
         }
         if (!validatorB(value, options)) {
             return false
         }

         return true
     }

     return buildValidator(
         `${validatorA.typeName} & ${validatorB.typeName}`,
         validationFunction,
     )
}

export default buildValueIsBothTypes
