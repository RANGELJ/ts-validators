import { strict as assert } from 'assert'
import buildValueIsArrayOf from '../buildValueIsArrayOf'
import buildValueIsOneOf from '../buildValueIsOneOf'
import buildValueIsShape from '../buildValueIsShape'
import { Validator } from '../types'
import valueIsNull from '../valueIsNull'
import valueIsString from '../valueIsString'
import valueIsUndefined from '../valueIsUndefined'
import { Nested } from './testTypes'
import buildRecursiveValidator from '../buildRecursiveValidator'

const main = () => {
    const valueIsArrayOfNulls = buildValueIsArrayOf(valueIsNull)

    assert.strictEqual(valueIsArrayOfNulls(['hello']), false)

    const valueIsArrayOfString = buildValueIsArrayOf(valueIsString)

    assert.strictEqual(valueIsArrayOfString(['hello']), true)

    assert.strictEqual(valueIsArrayOfNulls(null), false)

    type TestType = {
        id: string;
        array1: string[];
    }

    const valueIsBaseShape = buildValueIsShape<TestType>({
        id: valueIsString,
        array1: valueIsArrayOfString,
    })

    assert.strictEqual(valueIsBaseShape({
        id: 'hello',
        array1: [],
    }), true)

    assert.strictEqual(valueIsBaseShape({
        id: 'hello',
    }), false)

    const valueIsNested: Validator<Nested> = buildValueIsShape<Nested>({
        a: buildValueIsOneOf(
            valueIsUndefined,
            buildRecursiveValidator(() => valueIsNested),
        ),
    })

    assert.strictEqual(valueIsNested({
        a: undefined,
    }), true)

    assert.strictEqual(valueIsNested(false), false)

    assert.strictEqual(valueIsNested({
        a: {
            a: undefined,
        },
    }), true)

    assert.strictEqual(valueIsNested({
        a: {
            a: 1,
        },
    }), false)

    type TestArrayShape = {
        a: string;
    }

    buildValueIsArrayOf(buildValueIsShape<TestArrayShape>({
        a: valueIsString,
    }))([
        {},
    ], {
        path: [],
        shouldThrowErrorOnFail: true,
    })
}

main()
