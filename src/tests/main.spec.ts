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
import buildValueIsConstant from '../buildValueIsConstant'

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

    const valueIsBaseShape = buildValueIsShape<TestType>('TestType', {
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

    const valueIsNested: Validator<Nested> = buildValueIsShape<Nested>('Nested', {
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

    const valueIsCString = buildValueIsConstant('CString')

    assert.strictEqual(valueIsCString(undefined), false)
    assert.strictEqual(valueIsCString('CString'), true)

    type TestArrayShape = {
        a: {
            b: string;
        };
    }

    const valueIsTestArrayShape = buildValueIsArrayOf(buildValueIsShape<TestArrayShape>('TestArrayShape', {
        a: buildValueIsShape<TestArrayShape['a']>('TestArrayShape', {
            b: valueIsString,
        }),
    }))

    assert.strictEqual(valueIsTestArrayShape([
        {
            a: {
                b: '',
            },
        },
    ]), true)

    valueIsTestArrayShape([
        {
            a: {},
        },
    ], {
        path: [],
        shouldThrowErrorOnFail: true,
    })
}

main()
