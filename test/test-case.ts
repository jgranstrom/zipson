import {CompressOptions} from "../lib";
import {parse, parseIncremental, stringify} from "../src";
import {expect} from "chai";

export class TestCase {
    constructor(
        public name: string,
        private obj: any,
        private tokens: string[],
        private options: CompressOptions = {}
    ) {}

    compress() {
        const compressed = stringify(this.obj, this.options);
        expect(compressed).to.equal(this.tokens.join(''));
    }

    decompress() {
        const decompressed = parse(this.tokens.join(''));
        expect(decompressed).to.deep.equal(this.obj);
    }

    decompressIncremental() {
        const all = this.tokens.join('');
        for(let i = 0; i < all.length; i++) {
            for(let j = i; j < all.length; j++) {
                const increment = parseIncremental();
                increment(all.slice(0, i));
                increment(all.slice(i, j));
                increment(all.slice(j));
                expect(increment(null)).to.deep.equal(this.obj);
            }
        }
    }
}