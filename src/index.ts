import { compress, makeInvertedIndex, CompressOptions, makeCompressContext } from './compress';
import { ARRAY_START_TOKEN, ARRAY_END_TOKEN } from './constants';
import { ZipsonWriter, ZipsonStringWriter } from './compressor/writer';
import { decompress, makeOrderedIndex, decompressIncremental } from './decompress';
export * from './compressor/writer';
export * from './compressor/common';
export * from './decompressor/common';

/**
 * Parse a zipson data string
 */
export function parse(data: string): any {
  const orderedIndex = makeOrderedIndex();
  return decompress(data, orderedIndex);
}

/**
 * Incrementally parse a zipson data string in chunks
 */
export function parseIncremental() {
  const orderedIndex = makeOrderedIndex();
  const { cursor, increment } = decompressIncremental(orderedIndex);
  return function(data: string | null) {
    increment(data);
    if(data === null) { return cursor.rootTarget.value; }
  }
}

/**
 * Stringify any data to a zipson writer
 */
export function stringifyTo(data: any, writer: ZipsonWriter, options: CompressOptions = {}): void {
  const invertedIndex = makeInvertedIndex();
  const context = makeCompressContext();
  compress(context, data, invertedIndex, writer, options);
  writer.end();
}

/**
 * Stringify any data to a string
 */
export function stringify(data: any, options?: CompressOptions): string {
  const writer = new ZipsonStringWriter();
  stringifyTo(data, writer, options);
  return writer.value;
}
