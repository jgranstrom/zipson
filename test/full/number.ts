import {describe, it} from "mocha";
import {TestCase} from "../test-case";
import {
    FLOAT_EXPONENT_DELIMITER,
    FLOAT_FULL_PRECISION_DELIMITER,
    FLOAT_REDUCED_PRECISION_DELIMITER,
    FLOAT_TOKEN,
    INTEGER_SMALL_TOKEN_ELEMENT_OFFSET,
    INTEGER_SMALL_TOKENS,
    UNREFERENCED_INTEGER_TOKEN
} from "../../lib/constants";


const testCases = [
    new TestCase('small-integer',
        1,
        [INTEGER_SMALL_TOKENS[INTEGER_SMALL_TOKEN_ELEMENT_OFFSET + 1]]
    ),
    new TestCase('big-integer',
        61,
        [UNREFERENCED_INTEGER_TOKEN, 'z']
    ),
    new TestCase('float',
        0.123,
        [FLOAT_TOKEN, '0', FLOAT_REDUCED_PRECISION_DELIMITER, '1z']
    ),
    new TestCase('float-negative',
        -0.123,
        [FLOAT_TOKEN, '0', FLOAT_REDUCED_PRECISION_DELIMITER, '-1z']
    ),
    new TestCase('float-full-precision',
        0.1234567,
        [FLOAT_TOKEN, '0', FLOAT_FULL_PRECISION_DELIMITER, '1234567'],
        {fullPrecisionFloats: true}
    ),
    new TestCase('float-full-precision-negative',
        -0.1234567,
        [FLOAT_TOKEN, '-0', FLOAT_FULL_PRECISION_DELIMITER, '1234567'],
        {fullPrecisionFloats: true}
    ),
    new TestCase('float-exp-positive',
        1.23e+123,
        [FLOAT_TOKEN, '1', FLOAT_FULL_PRECISION_DELIMITER, '23', FLOAT_EXPONENT_DELIMITER, '1z'],
        {fullPrecisionFloats: true}
    ),
    new TestCase('float-exp-negative',
        1.23e-123,
        [FLOAT_TOKEN, '1', FLOAT_FULL_PRECISION_DELIMITER, '23', FLOAT_EXPONENT_DELIMITER, '-1z'],
        {fullPrecisionFloats: true}
    ),
    new TestCase('float-exp-positive',
        1e+1,
        [UNREFERENCED_INTEGER_TOKEN, 'A'],
    ),
    new TestCase('float-exp-negative',
        1e-1,
        [FLOAT_TOKEN, '0', FLOAT_REDUCED_PRECISION_DELIMITER, '1c'],
    ),
];

describe('Number', function() {
    for(let i = 0; i < testCases.length; i++) {
        const testCase = testCases[i];

        describe(testCase.name, function() {
            it('compress', function() {
                testCase.compress();
            });
            it('decompress', function() {
                testCase.decompress();
            });
            it('decompress-incremental', function() {
                testCase.decompressIncremental();
            });
        });
    }
})