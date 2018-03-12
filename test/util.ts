import { expect } from 'chai';
import { describe, it } from 'mocha';
import { compressFloat, decompressFloat, compressInteger, decompressInteger } from '../src/util';

describe('util', function() {
  describe('float', function() {
    it('reduced precision', function() {
      for(let i = -1000; i < 1000; i+= Math.random()) {
        const compressed = compressFloat(i);
        const decompressed = decompressFloat(compressed);
        expect(Math.round(i * 1000)).to.equal(Math.round(decompressed * 1000));
      }
    });

    it('full precision', function() {
      for(let i = -1000; i < 1000; i+= Math.random()) {
        const compressed = compressFloat(i, true);
        const decompressed = decompressFloat(compressed);
        expect(i).to.equal(decompressed);
      }
    });
  });

  describe('float-small', function() {
    it('reduced precision', function() {
      for(let i = -1; i < 1; i += 0.1 * Math.random()) {
        const compressed = compressFloat(i);
        const decompressed = decompressFloat(compressed);
        expect(Math.round(i * 1000)).to.equal(Math.round(decompressed * 1000));
      }
    });

    it('full precision', function() {
      for(let i = -1; i < 1; i += 0.1 * Math.random()) {
        const compressed = compressFloat(i, true);
        const decompressed = decompressFloat(compressed);
        expect(i).to.equal(decompressed);
      }
    });
  });

  describe('integer', function() {
    it('big', function() {
      for(let i = -1000000; i < 1000000; i+= Math.round(Math.random() * 10000)) {
        const compressed = compressInteger(i);
        const decompressed = decompressInteger(compressed);
        expect(i).to.equal(decompressed);
      }
    });

    it('small', function() {
      for(let i = -100; i < 100; i++) {
        const compressed = compressInteger(i);
        const decompressed = decompressInteger(compressed);
        expect(i).to.equal(decompressed);
      }
    });
  });
});