import { strict as assert } from 'assert'
import buildValueIsArrayOf from '../buildValueIsArrayOf'
import buildValueIsShape from '../buildValueIsShape'
import valueIsNull from '../valueIsNull'
import valueIsString from '../valueIsString'

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
}

main()
