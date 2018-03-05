import { InvertedIndex, Context, CompressOptions, Compressors } from "./common";
import { ZipsonWriter } from "./writer";
import { BOOLEAN_TRUE_TOKEN, BOOLEAN_FALSE_TOKEN, NULL_TOKEN, UNDEFINED_TOKEN } from "../constants";

/**
 * Compress any data type to writer
 */
export function compressAny(
  compressors: Compressors,
  context: Context,
  obj: any,
  invertedIndex: InvertedIndex,
  writer: ZipsonWriter,
  options: CompressOptions
) {
  const type = typeof obj;

  if(type === 'number') {
    compressors.number(compressors, context, obj, invertedIndex, writer, options);
  } else if(type === 'string') {
    compressors.string(compressors, context, obj, invertedIndex, writer, options);
  } else if(type === 'boolean') {
    writer.write(obj ? BOOLEAN_TRUE_TOKEN : BOOLEAN_FALSE_TOKEN);
  } else if(obj === null) {
    writer.write(NULL_TOKEN);
  } else if(obj === undefined) {
    writer.write(UNDEFINED_TOKEN);
  } else if(Array.isArray(obj)) {
    compressors.array(compressors, context, obj, invertedIndex, writer, options);
  } else if(obj instanceof Date) {
    compressors.date(compressors, context, obj.getTime(), invertedIndex, writer, options);
  } else {
    compressors.object(compressors, context, obj, invertedIndex, writer, options);
  }
}