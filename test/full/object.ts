import { describe, it } from 'mocha';
import { testPackUnpack } from './util';


describe('object', function() {
  it('empty', function() {
    testPackUnpack({});
  });

  it('homogenous', function() {
    testPackUnpack({ x: 1, y: 2, z: 3 });
  });

  it('mixed', function() {
    testPackUnpack({ x: 1, y: 0.212301230e-123, z: 'asdfioj{{', 'i': '', 'longkey': true, 'nope': undefined }, 0, true);
  });

  it('nested', function() {
    testPackUnpack({
      x: 1, y: 212301230,
      z: 'asdfioj{{', 'i': '',
      longerkey: true,
      nope: undefined,
      float: 113123.432,
      nest: {
        x: 1, y: 0.212301230e-123322,
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
          x: 1, y: 0.212301230e-123322,
          z: 'asdfioj{{', 'i': '',
          longerkey: true,
          nope: undefined
        },
        {
          x: 1, y: 0.212301230e-123322,
          z: 'asdfioj{{', 'i': '',
          longerkey: true,
          nope: undefined
        }
      ]
    }, 0, true);
  });
});
