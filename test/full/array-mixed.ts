import { suite, test, only } from 'mocha-typescript';
import { testPackUnpack } from './util';

@suite class ArrayMixedSpec {
  @test oneOfEach() {
    testPackUnpack([
      1,
      null,
      undefined,
      1029831209,
      { x: 123, y: { z: 'asd{f]s' }, z: [234, '{]324asd' ] },
      -5,
      0,
      'x',
      { x: 123 },
      'faösodifjaosödfijasödofijasdöofijasodöfijasdoöfijasdoöfijsadoöfijsadfsdjfsadfhiarsl',
      "foaisdjfoas'dfasd'f'dfs'adfasdf'",
      'aosdifjao"oijsdfioJ"sdfoij"',
    ]);
  }

  @test withRepititions() {
    testPackUnpack([
      1,
      1,
      1,
      null,
      { x: 123 },
      undefined,
      1029831209,
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
    ]);
  }
}
