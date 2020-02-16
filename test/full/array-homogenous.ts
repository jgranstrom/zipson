import { describe, it } from 'mocha';
import { testPackUnpack } from './util';

const ONE = 1;
const MANY = 10;
function testPackUnpackHomogeneousArray(element: any, count: number, expectedCompressionOffset?: number, roughly?: boolean) {
  const arr: any[] = [];
  for(let i = 0; i < count; i++) {
    arr.push(element);
  }
  testPackUnpack(arr, expectedCompressionOffset, roughly);
}

describe('array-homogenous', function() {
  it('empty', function() {
    testPackUnpack([]);
  });

  it('nullOne', function() {
    testPackUnpackHomogeneousArray(null, ONE);
  });

  it('nullMany', function() {
    testPackUnpackHomogeneousArray(null, MANY);
  });

  it('undefinedOne', function() {
    testPackUnpackHomogeneousArray(undefined, ONE);
  });

  it('undefinedMany', function() {
    testPackUnpackHomogeneousArray(undefined, MANY);
  });

  it('booleanTrueOne', function() {
    testPackUnpackHomogeneousArray(true, ONE);
  });

  it('booleanTrueMany', function() {
    testPackUnpackHomogeneousArray(true, MANY);
  });

  it('booleanFalseOne', function() {
    testPackUnpackHomogeneousArray(false, ONE);
  });

  it('booleanFalseMany', function() {
    testPackUnpackHomogeneousArray(false, MANY);
  });

  it('integerPositiveSmallOne', function() {
    for(let i = 0; i < 10; i++) {
      testPackUnpackHomogeneousArray(i, ONE);
    }
  });

  it('integerPositiveSmallMany', function() {
    for(let i = 0; i < 10; i++) {
      testPackUnpackHomogeneousArray(i, MANY);
    }
  });

  it('integerNegativeSmallOne', function() {
    for(let i = -1; i > -10; i--) {
      testPackUnpackHomogeneousArray(i, ONE);
    }
  });

  it('integerNegativeSmallMany', function() {
    for(let i = -1; i > -10; i--) {
      testPackUnpackHomogeneousArray(i, MANY);
    }
  });

  it('integerPositiveBigOne', function() {
    testPackUnpackHomogeneousArray(12301230, ONE);
  });

  it('integerPositiveBigMany', function() {
    testPackUnpackHomogeneousArray(12301230, MANY);
  });

  it('integerNegativeBigOne', function() {
    testPackUnpackHomogeneousArray(-12301230, ONE);
  });

  it('integerNegativeBigMany', function() {
    testPackUnpackHomogeneousArray(-12301230, MANY);
  });

  it('floatPositiveSmallOne', function() {
    testPackUnpackHomogeneousArray(15.555, ONE, 2, true);
  });

  it('floatNegativeSmallOne', function() {
    testPackUnpackHomogeneousArray(-15.55, ONE, 2, true);
  });

  it('stringShortOne', function() {
    testPackUnpackHomogeneousArray('a', ONE);
  });

  it('stringShortMany', function() {
    testPackUnpackHomogeneousArray('a', MANY);
  });

  it('stringShortSingleQuoteOne', function() {
    // ,Single quotes in very short strings must be escape thus would add one to baseline compressed size
    testPackUnpackHomogeneousArray("'", ONE, 1);
  });

  it('stringShortSingleQuoteMany', function() {
    // ,Single quotes in very short strings must be escape thus would add one to baseline compressed size
    testPackUnpackHomogeneousArray("'", MANY, 1);
  });

  it('stringShortDoubleQuoteOne', function() {
    testPackUnpackHomogeneousArray('"', ONE);
  });

  it('stringShortDoubleQuoteMany', function() {
    testPackUnpackHomogeneousArray('"', MANY);
  });

  it('stringLongOne', function() {
    testPackUnpackHomogeneousArray('aoasdfjalisruhgalsiuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc', ONE);
  });

  it('stringLongMany', function() {
    testPackUnpackHomogeneousArray('aoasdfjalisruhgalsiuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc', MANY);
  });

  it('stringLongSingleQuotesOne', function() {
    testPackUnpackHomogeneousArray('\'aoasdfjalisruhgals\'iuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc\'', ONE);
  });

  it('stringLongSingleQuotesMany', function() {
    testPackUnpackHomogeneousArray('\'aoasdfjalisruhgals\'iuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc\'', MANY);
  });

  it('stringLongDoubleQuotesOne', function() {
    testPackUnpackHomogeneousArray('"aoasdfjalisruhgals"iuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc"', ONE);
  });

  it('stringLongDoubleQuotesMany', function() {
    testPackUnpackHomogeneousArray('"aoasdfjalisruhgals"iuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc"', MANY);
  });

  it('stringEscapeCharacterOne', function() {
    testPackUnpackHomogeneousArray('aoasdfjalisruhgals\\iuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc', MANY);
  });

  it('stringEscapeCharacterMultiple', function() {
    testPackUnpackHomogeneousArray('aoasdfjalisruhgals\\\\iuhfdlsajdlifuashrlifuhsaildjfsalkhglas\\urflasjdfklsandfasurliausnlc', MANY);
  });

  it('stringEscapeCharacterEnd', function() {
    testPackUnpackHomogeneousArray('aoasdfjalisruhgals\\\\iuhfdlsajdlifuashrlifuhsaildjfsalkhglas\\urflasjdfklsandfasurliausnlc\\', MANY);
  });

  it('objectOne', function() {
    testPackUnpackHomogeneousArray({ x: 123 }, ONE);
  });

  it('objectMany', function() {
    testPackUnpackHomogeneousArray({ x: 123 }, MANY);
  });

  it('objectNestedOne', function() {
    testPackUnpackHomogeneousArray({ x: 123, y: { z: 'asd{f]s' }, z: [234, '{]324asd' ] }, ONE);
  });

  it('objectNestedMany', function() {
    testPackUnpackHomogeneousArray({ x: 123, y: { z: 'asd{f]s' }, z: [234, '{]324asd' ] }, MANY);
  });
});
