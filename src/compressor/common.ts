import { ZipsonStringWriter, ZipsonWriter } from "./writer";

/**
 * Compression context for a single compression process
 */
export interface Context {
  arrayItemWriters: ZipsonStringWriter[];
  arrayLevel: number;
}

/**
 * Optional compression options
 */
export interface CompressOptions {
  /**
   * Automatically detect utc timestamps (i.e. 2018-01-01T00:00:00.000Z) and compress them as dates
   */
  detectUtcTimestamps?: boolean;

  /**
   * Include full precision floating point numbers in compression output (1.232323232323)
   */
  fullPrecisionFloats?: boolean;
}

/**
 * Map from discovered values to their respective reference identifiers
 */
export interface InvertedIndex {
  stringMap:  { [index: string]: string }
  integerMap: { [index: number]: string }
  floatMap:   { [index: string]: string }
  dateMap:    { [index: number]: string }
  lpDateMap:  { [index: number]: string }
  stringCount: number;
  integerCount: number;
  floatCount: number;
  dateCount: number;
  lpDateCount: number;
}

/**
 * Compression function for a specific type to compressed output on a writer
 */
export type Compressor<T> = (
  compressors: Compressors,
  context: Context,
  obj: T,
  invertedIndex: InvertedIndex,
  writer: ZipsonWriter,
  options: CompressOptions
) => void;

export interface TemplateCompressor<T> {
  /**
   *  Are we currently templating?
   */
  isTemplating: boolean;

  /**
   * Determine if we are still templating with a new object
   */
  isNextTemplateable: (obj: T, writer: ZipsonWriter) => void;

  /**
   * Compress the template structure
   */
  compressTemplate: (compressors: Compressors, context: Context, invertedIndex: InvertedIndex, writer: ZipsonWriter, options: CompressOptions) => void;

  /**
   * Compress values with template structure
   */
  compressTemplateValues: (compressors: Compressors, context: Context, invertedIndex: InvertedIndex, writer: ZipsonWriter, options: CompressOptions, obj: T) => void;

  /**
   * Finalize the compressed template
   */
  end: (writer: ZipsonWriter) => void;
}

/**
 * All available compressors for specific types
 */
export interface Compressors {
  any: Compressor<any>
  array: Compressor<any[]>,
  object: Compressor<any>,
  string: Compressor<string>,
  date: Compressor<number>,
  number: Compressor<number>,
  template: {
    Object: new (a: any, b: any) => TemplateCompressor<any>;
  }
}