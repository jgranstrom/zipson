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
    testPackUnpack({ x: 1, y: 212301230, z: 'asdfioj{{', 'i': '', 'longkey': true, 'nope': undefined });
  });

  it('nested empty object', function() {
    testPackUnpack({ a: { 1: {} }, c: 42 })
  })
  
  it('nested empty object template 1', function() {
    testPackUnpack({ a: { 1: {} }, b: { 1: {} }, c: 42 })
  })

  it('nested empty object template 2', function() {
    testPackUnpack({ c: 42, a: { 1: {} }, b: { 1: {} } })
  })

  it('nested', function() {
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
  });
});
