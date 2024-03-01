import { describe, it } from 'mocha';
import { testPackUnpack } from './util';

describe('array-mixed', function() {
    it('oneOfEach', function() {
    testPackUnpack([
      1,
      null,
      undefined,
      1029831209,
      -1.1029831209e+123,
      { x: 123, y: { z: 'asd{f]s' }, z: [234, '{]324asd' ] },
      -5,
      0,
      'x',
      { x: 123 },
      'faösodifjaosödfijasödofijasdöofijasodöfijasdoöfijasdoöfijsadoöfijsadfsdjfsadfhiarsl',
      "foaisdjfoas'dfasd'f'dfs'adfasdf'",
      'aosdifjao"oijsdfioJ"sdfoij"',
    ], 0, true);
  });

  it('withRepititions', function() {
    testPackUnpack([
      1,
      1,
      1,
      null,
      { x: 123 },
      undefined,
      1029831209,
      -1.1029831209e-123,
      -1.1029831209e-123,
      1,
      -5,
      { x: 123, y: { z: 'asd{f]s' }, z: [234, '{]324asd' ] },
      { x: 123, y: { z: 'asd{f]s' }, z: [234, '{]324asd' ] },
      null,
      null,
      null,
      0,
      { x: 123, y: { z: 'asd{f]s' }, z: [234, '{]324asd' ] },
      'x',
      'faösodifjaosödfijasödofijasdöofijasodöfijasdoöfijasdoöfijsadoöfijsadfsdjfsadfhiarsl',
      "foaisdjfoas'dfasd'f'dfs'adfasdf'",
      'aosdifjao"oijsdfioJ"sdfoij"',
      'faösodifjaosödfijasödofijasdöofijasodöfijasdoöfijasdoöfijsadoöfijsadfsdjfsadfhiarsl',
      'faösodifjaosödfijasödofijasdöofijasodöfijasdoöfijasdoöfijsadoöfijsadfsdjfsadfhiarsl',
      -5,
      1029831209,
      1029831209,
      { x: 123 },
      1029831209,
    ], 0, true);
  });
});
