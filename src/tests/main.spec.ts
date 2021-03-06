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
import valueIsTypeValidationError from '../valueIsTypeValidationError'
import buildValueIsBothTypes from '../buildValueIsBothTypes'
import valueIsUnknown from '../valueIsUnknown'

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
        a: buildValueIsOneOf([
            buildRecursiveValidator(() => valueIsNested),
            valueIsUndefined,
        ]),
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

    const valueIsOneOfConstants = buildValueIsOneOf([
        buildValueIsConstant('A'),
        buildValueIsConstant('B'),
        buildValueIsConstant('C'),
    ])

    valueIsOneOfConstants('C', {
        path: [],
        shouldThrowErrorOnFail: true,
    })

    try {
        valueIsOneOfConstants('D', {
            path: [],
            shouldThrowErrorOnFail: true,
        })
    } catch (error) {
        if (!valueIsTypeValidationError(error)) {
            throw error
        }
        assert.strictEqual(error.expectedTypeName, 'A')
    }

    type AddA = {
        a: string;
    }

    type AddB = {
        b: string;
    }

    const valueIsAddA = buildValueIsShape<AddA>('AddA', {
        a: valueIsString,
    })

    const valueIsAddB = buildValueIsShape<AddB>('AddB', {
        b: valueIsString,
    })

    const valueIsAandB = buildValueIsBothTypes(
        valueIsAddA,
        valueIsAddB,
    )

    assert.strictEqual(valueIsAandB({
        a: 'hello',
    }), false)

    assert.strictEqual(valueIsAandB({
        a: 'hello',
        b: 'hello',
    }), true)

    type TestWithUnknown = {
        a: unknown;
    }

    buildValueIsShape<TestWithUnknown>('TestWithUnknown', {
        a: valueIsUnknown,
    })
}

main()
