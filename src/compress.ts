import { compressAny } from "./compressor/any";
import { compressArray } from "./compressor/array";
import { compressString } from "./compressor/string";
import { compressNumber } from "./compressor/number";
import { compressObject } from "./compressor/object";
import { Compressors, Context, InvertedIndex, CompressOptions } from "./compressor/common";
import { compressDate } from "./compressor/date";
import { ZipsonWriter } from "./compressor/writer";
import { TemplateObject } from "./compressor/template/object";
export * from "./compressor/common";

const compressors: Compressors = {
  any: compressAny,
  array: compressArray,
  object: compressObject,
  string: compressString,
  date: compressDate,
  number: compressNumber,
  template: {
    Object: TemplateObject
  }
}

/**
 * Create a new compression context
 */
export function makeCompressContext(): Context {
  return {
    arrayItemWriters: [],
    arrayLevel: 0,
  };
}

/**
 * Create an inverted index for compression
 */
export function makeInvertedIndex(): InvertedIndex {
  return {
    stringMap: new Map(),
    integerMap: new Map(),
    floatMap: new Map(),
    dateMap: new Map(),
    lpDateMap: new Map(),
  }
}

/**
 * Compress all data onto a provided writer
 */
export function compress(
  context: Context,
  obj: any,
  invertedIndex: InvertedIndex,
  writer: ZipsonWriter,
  options: CompressOptions) {
  compressors.any(compressors, context, obj, invertedIndex, writer, options);
}