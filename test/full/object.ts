import { suite, test, only } from 'mocha-typescript';
import { testPackUnpack } from './util';

@suite class ObjectSpec {
  @test empty() {
    testPackUnpack({});
  }

  @test homogenous() {
    testPackUnpack({ x: 1, y: 2, z: 3 });
  }

  @test mixed() {
    testPackUnpack({ x: 1, y: 212301230, z: 'asdfioj{{', 'i': '', 'longkey': true, 'nope': undefined });
  }

  @test nested() {
    testPackUnpack({
      x: 1, y: 212301230,
      z: 'asdfioj{{', 'i': '',
      longerkey: true,
      nope: undefined,
      float: 113123.432,
      nest: {
        x: 1, y: 212301230,
        float: 0.312,
        z: 'asdfioj{{', 'i': '',
        longerkey: true,
        nope: undefined,
        yep: {
          5: [null],
          string: '""asoidj{}sidofj',
        }
      },
      array_nest: [
        {
          x: 1, y: 212301230,
          z: 'asdfioj{{', 'i': '',
          longerkey: true,
          nope: undefined
        },
        {
          x: 1, y: 212301230,
          z: 'asdfioj{{', 'i': '',
          longerkey: true,
          nope: undefined
        }
      ]
    }, 0, true);
  }
}
