import { suite, test, only } from 'mocha-typescript';
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

@suite class ArrayHomogenousSpec {
  @test empty() {
    testPackUnpack([]);
  }

  @test nullOne() {
    testPackUnpackHomogeneousArray(null, ONE);
  }

  @test nullMany() {
    testPackUnpackHomogeneousArray(null, MANY);
  }

  @test undefinedOne() {
    testPackUnpackHomogeneousArray(undefined, ONE);
  }

  @test undefinedMany() {
    testPackUnpackHomogeneousArray(undefined, MANY);
  }

  @test booleanTrueOne() {
    testPackUnpackHomogeneousArray(true, ONE);
  }

  @test booleanTrueMany() {
    testPackUnpackHomogeneousArray(true, MANY);
  }

  @test booleanFalseOne() {
    testPackUnpackHomogeneousArray(false, ONE);
  }

  @test booleanFalseMany() {
    testPackUnpackHomogeneousArray(false, MANY);
  }

  @test integerPositiveSmallOne() {
    for(let i = 0; i < 10; i++) {
      testPackUnpackHomogeneousArray(i, ONE);
    }
  }

  @test integerPositiveSmallMany() {
    for(let i = 0; i < 10; i++) {
      testPackUnpackHomogeneousArray(i, MANY);
    }
  }

  @test integerNegativeSmallOne() {
    for(let i = -1; i > -10; i--) {
      testPackUnpackHomogeneousArray(i, ONE);
    }
  }

  @test integerNegativeSmallMany() {
    for(let i = -1; i > -10; i--) {
      testPackUnpackHomogeneousArray(i, MANY);
    }
  }

  @test integerPositiveBigOne() {
    testPackUnpackHomogeneousArray(12301230, ONE);
  }

  @test integerPositiveBigMany() {
    testPackUnpackHomogeneousArray(12301230, MANY);
  }

  @test integerNegativeBigOne() {
    testPackUnpackHomogeneousArray(-12301230, ONE);
  }

  @test integerNegativeBigMany() {
    testPackUnpackHomogeneousArray(-12301230, MANY);
  }

  @test floatPositiveSmallOne() {
    testPackUnpackHomogeneousArray(15.555, ONE, 2, true);
  }

  @test floatNegativeSmallOne() {
    testPackUnpackHomogeneousArray(-15.55, ONE, 2, true);
  }

  @test stringShortOne() {
    testPackUnpackHomogeneousArray('a', ONE);
  }

  @test stringShortMany() {
    testPackUnpackHomogeneousArray('a', MANY);
  }

  @test stringShortSingleQuoteOne() {
    // Single quotes in very short strings must be escape thus would add one to baseline compressed size
    testPackUnpackHomogeneousArray("'", ONE, 1);
  }

  @test stringShortSingleQuoteMany() {
    // Single quotes in very short strings must be escape thus would add one to baseline compressed size
    testPackUnpackHomogeneousArray("'", MANY, 1);
  }

  @test stringShortDoubleQuoteOne() {
    testPackUnpackHomogeneousArray('"', ONE);
  }

  @test stringShortDoubleQuoteMany() {
    testPackUnpackHomogeneousArray('"', MANY);
  }

  @test stringLongOne() {
    testPackUnpackHomogeneousArray('aoasdfjalisruhgalsiuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc', ONE);
  }

  @test stringLongMany() {
    testPackUnpackHomogeneousArray('aoasdfjalisruhgalsiuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc', MANY);
  }

  @test stringLongSingleQuotesOne() {
    testPackUnpackHomogeneousArray('\'aoasdfjalisruhgals\'iuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc\'', ONE);
  }

  @test stringLongSingleQuotesMany() {
    testPackUnpackHomogeneousArray('\'aoasdfjalisruhgals\'iuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc\'', MANY);
  }

  @test stringLongDoubleQuotesOne() {
    testPackUnpackHomogeneousArray('"aoasdfjalisruhgals"iuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc"', ONE);
  }

  @test stringLongDoubleQuotesMany() {
    testPackUnpackHomogeneousArray('"aoasdfjalisruhgals"iuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc"', MANY);
  }

  @test objectOne() {
    testPackUnpackHomogeneousArray({ x: 123 }, ONE);
  }

  @test objectMany() {
    testPackUnpackHomogeneousArray({ x: 123 }, MANY);
  }

  @test objectNestedOne() {
    testPackUnpackHomogeneousArray({ x: 123, y: { z: 'asd{f]s' }, z: [234, '{]324asd' ] }, ONE);
  }

  @test objectNestedMany() {
    testPackUnpackHomogeneousArray({ x: 123, y: { z: 'asd{f]s' }, z: [234, '{]324asd' ] }, MANY);
  }
}
