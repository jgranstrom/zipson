import { describe, it } from 'mocha';
import { testPackUnpack } from './util';
import * as dummyjson from 'dummy-json';

function getData() {
  return dummyjson.parse(`{
    "users": [
      {{#repeat 100}}
      {
        "id": {{@index}},
        "name": "{{firstName}} {{lastName}}",
        "work": "{{company}}",
        "email": "{{email}}",
        "dob": "{{date '1900' '2000' 'YYYY'}}",
        "address": "{{int 1 100}} {{street}}",
        "city": "{{city}}",
        "optedin": {{boolean}},
        "values": [
          {{#repeat 100}}
          {{int 0 99999}}
          {{/repeat}}
        ],
        "floats": [
          {{#repeat 100}}
          {{float 0 20000000}}
          {{/repeat}}
        ]
      }
      {{/repeat}}
    ],
    "images": [
      {{#repeat 100}}
      "img{{@index}}.png"
      {{/repeat}}
    ],
    "coordinates": {
      "x": {{float -50 50 '0.00'}},
      "y": {{float -25 25 '0.00'}}
    },
    "price": {{int 0 99999}}
  }`);
};

describe('chaos', function() {
  it('roughly', function() {
    const data = JSON.parse(getData());
    testPackUnpack(data, 0, true);
  });

  it('fullPrecision', function() {
    const data = JSON.parse(getData());
    testPackUnpack(data, 0, false, { fullPrecisionFloats: true });
  });
});
