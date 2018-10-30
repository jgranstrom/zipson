import { describe, it } from 'mocha';

import { testPackUnpack } from './util';

describe('scalar', function() {
  it('null', function() {
    testPackUnpack(null);
  });

  it('undefined', function() {
    testPackUnpack(undefined);
  });

  it('booleanTrue', function() {
    testPackUnpack(true);
  });

  it('booleanFalse', function() {
    testPackUnpack(false);
  });

  it('booleanBoxedTrue', function() {
    testPackUnpack(Boolean(true));
  });

  it('booleanBoxedFalse', function() {
    testPackUnpack(Boolean(false));
  });

  it('integerPositiveSmall', function() {
    for(let i = 0; i < 10; i++) {
      testPackUnpack(i);
    }
  });

  it('integerNegativeSmall', function() {
    for(let i = -1; i > -10; i--) {
      testPackUnpack(i);
    }
  });

  it('integerBoxedPositiveSmall', function() {
    for(let i = 0; i < 10; i++) {
      testPackUnpack(Number(i));
    }
  });

  it('integerBoxedNegativeSmall', function() {
    for(let i = -1; i > -10; i--) {
      testPackUnpack(Number(i));
    }
  });

  it('integerPositiveBig', function() {
    testPackUnpack(12301230);
  });

  it('integerPositiveBigger', function() {
    testPackUnpack(123012342310);
  });

  it('integerNegativeBig', function() {
    testPackUnpack(-12301230);
  });

  it('integerNegativeBigger', function() {
    testPackUnpack(-123014323230);
  });

  it('integerBoxedPositiveBig', function() {
    testPackUnpack(Number(12301230));
  });

  it('integerBoxedNegativeBig', function() {
    testPackUnpack(Number(-12301230));
  });

  it('floatPositiveSmall', function() {
    testPackUnpack(5.999, 2, true);
  });

  it('floatNegativeSmall', function() {
    testPackUnpack(-15.55, 2, true);
  });

  it('floatBoxedPositiveSmall', function() {
    testPackUnpack(Number(5.999), 2, true);
  });

  it('floatBoxedNegativeSmall', function() {
    testPackUnpack(Number(-15.55), 2, true);
  });

  it('floatFullPrecisionPositive', function() {
    testPackUnpack(5.9234827938, 2, false, { fullPrecisionFloats: true });
  });

  it('floatFullPrecisionNegative', function() {
    testPackUnpack(-15.552345411, 2, false, { fullPrecisionFloats: true });
  });

  it('floatPositiveL1X', function() {
    testPackUnpack(2147483646.23423, 2, true);
  });

  it('floatPositiveL1Y', function() {
    testPackUnpack(2147483646.63423, 2, true);
  });

  it('floatPositiveL2X', function() {
    testPackUnpack(2147483647.23423, 2, true);
  });

  it('floatPositiveL2Y', function() {
    testPackUnpack(2147483647.73423, 2, true);
  });

  it('floatPositiveL3X', function() {
    testPackUnpack(2147483648.23423, 2, true);
  });

  it('floatPositiveL3Y', function() {
    testPackUnpack(2147483648.73423, 2, true);
  });

  it('floatNegativeL1X', function() {
    testPackUnpack(-2147483646.23423, 2, true);
  });

  it('floatNegativeL1Y', function() {
    testPackUnpack(-2147483646.63423, 2, true);
  });

  it('floatNegativeL2X', function() {
    testPackUnpack(-2147483647.23423, 2, true);
  });

  it('floatNegativeL2Y', function() {
    testPackUnpack(-2147483647.63423, 2, true);
  });

  it('floatNegativeL3X', function() {
    testPackUnpack(-2147483648.23423, 2, true);
  });

  it('floatNegativeL3Y', function() {
    testPackUnpack(-2147483648.63423, 2, true);
  });

  it('floatNegativeL4X', function() {
    testPackUnpack(-2147483649.23423, 2, true);
  });

  it('floatNegativeL4Y', function() {
    testPackUnpack(-2147483649.63423, 2, true);
  });

  it('stringShort', function() {
    testPackUnpack('a');
  });

  it('stringBoxedShort', function() {
    testPackUnpack(String('a'));
  });

  it('stringShortSingleQuote', function() {
    testPackUnpack("'", 1);
  });

  it('stringShortDoubleQuote', function() {
    testPackUnpack('"');
  });

  it('stringLong', function() {
    testPackUnpack('aoasdfjalisruhgalsiuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc');
  });

  it('stringBoxedLong', function() {
    testPackUnpack(String('aoasdfjalisruhgalsiuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc'));
  });

  it('stringLongSingleQuotes', function() {
    testPackUnpack('\'aoasdfjalisruhgals\'iuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc\'');
  });

  it('stringLongDoubleQuotes', function() {
    testPackUnpack('"aoasdfjalisruhgals"iuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc"');
  });

  it('stringDate', function() {
    testPackUnpack('2018-01-01T00:00:00Z');
  });

  it('stringDateWithDetection', function() {
    testPackUnpack('2018-01-01T00:00:00.000Z', 0, false, { detectUtcTimestamps: true });
  });

  it('stringNoneDateWithDetection', function() {
    testPackUnpack('aosdjaoisdjai', 0, false, { detectUtcTimestamps: true });
  });

  it('date', function() {
    testPackUnpack(new Date());
  });
});