import { suite, test, only } from 'mocha-typescript';
import { testPackUnpack } from './util';

@suite class ScalarSpec {
  @test null() {
    testPackUnpack(null);
  }

  @test undefined() {
    testPackUnpack(undefined);
  }

  @test booleanTrue() {
    testPackUnpack(true);
  }

  @test booleanFalse() {
    testPackUnpack(false);
  }

  @test booleanBoxedTrue() {
    testPackUnpack(Boolean(true));
  }

  @test booleanBoxedFalse() {
    testPackUnpack(Boolean(false));
  }

  @test integerPositiveSmall() {
    for(let i = 0; i < 10; i++) {
      testPackUnpack(i);
    }
  }

  @test integerNegativeSmall() {
    for(let i = -1; i > -10; i--) {
      testPackUnpack(i);
    }
  }

  @test integerBoxedPositiveSmall() {
    for(let i = 0; i < 10; i++) {
      testPackUnpack(Number(i));
    }
  }

  @test integerBoxedNegativeSmall() {
    for(let i = -1; i > -10; i--) {
      testPackUnpack(Number(i));
    }
  }

  @test integerPositiveBig() {
    testPackUnpack(12301230);
  }

  @test integerNegativeBig() {
    testPackUnpack(-12301230);
  }

  @test integerBoxedPositiveBig() {
    testPackUnpack(Number(12301230));
  }

  @test integerBoxedNegativeBig() {
    testPackUnpack(Number(-12301230));
  }

  @test floatPositiveSmall() {
    testPackUnpack(5.999, 2, true);
  }

  @test floatNegativeSmall() {
    testPackUnpack(-15.55, 2, true);
  }

  @test floatBoxedPositiveSmall() {
    testPackUnpack(Number(5.999), 2, true);
  }

  @test floatBoxedNegativeSmall() {
    testPackUnpack(Number(-15.55), 2, true);
  }

  @test floatFullPrecisionPositive() {
    testPackUnpack(5.9234827938, 2, false, { fullPrecisionFloats: true });
  }

  @test floatFullPrecisionNegative() {
    testPackUnpack(-15.552345411, 2, false, { fullPrecisionFloats: true });
  }

  @test stringShort() {
    testPackUnpack('a');
  }

  @test stringBoxedShort() {
    testPackUnpack(String('a'));
  }

  @test stringShortSingleQuote() {
    testPackUnpack("'", 1);
  }

  @test stringShortDoubleQuote() {
    testPackUnpack('"');
  }

  @test stringLong() {
    testPackUnpack('aoasdfjalisruhgalsiuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc');
  }

  @test stringBoxedLong() {
    testPackUnpack(String('aoasdfjalisruhgalsiuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc'));
  }

  @test stringLongSingleQuotes() {
    testPackUnpack('\'aoasdfjalisruhgals\'iuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc\'');
  }

  @test stringLongDoubleQuotes() {
    testPackUnpack('"aoasdfjalisruhgals"iuhfdlsajdlifuashrlifuhsaildjfsalkhglasurflasjdfklsandfasurliausnlc"');
  }

  @test stringDate() {
    testPackUnpack('2018-01-01T00:00:00Z');
  }

  @test stringDateWithDetection() {
    testPackUnpack('2018-01-01T00:00:00.000Z', 0, false, { detectUtcTimestamps: true });
  }

  @test stringNoneDateWithDetection() {
    testPackUnpack('aosdjaoisdjai', 0, false, { detectUtcTimestamps: true });
  }

  @test date() {
    testPackUnpack(new Date());
  }
}