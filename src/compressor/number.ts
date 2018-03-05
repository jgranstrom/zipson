import { INTEGER_SMALL_POS_TOKEN, INTEGER_SMALL_NEG_TOKEN, REF_INTEGER_TOKEN, INTEGER_TOKEN, REFERENCE_HEADER_LENGTH, UNREFERENCED_INTEGER_TOKEN, REF_FLOAT_TOKEN, FLOAT_TOKEN, UNREFERENCED_FLOAT_TOKEN, INTEGER_SMALL_EXCLUSIVE_BOUND_LOWER, INTEGER_SMALL_EXCLUSIVE_BOUND_UPPER } from "../constants";
import { Context, InvertedIndex, CompressOptions, Compressors } from "./common";
import { ZipsonWriter } from "./writer";
import { compressInteger, compressFloat } from "../util";

/**
 * Compress number (integer or float) to writer
 */
export function compressNumber(
  compressors: Compressors,
  context: Context,
  obj: number,
  invertedIndex: InvertedIndex,
  writer: ZipsonWriter,
  options: CompressOptions
) {
  let foundRef: string | undefined;

  if(obj % 1 === 0) {
    // CHeck if the value is a small integer
    if(obj < INTEGER_SMALL_EXCLUSIVE_BOUND_UPPER && obj > INTEGER_SMALL_EXCLUSIVE_BOUND_LOWER) {
      if(obj >= 0) {
        writer.write(`${INTEGER_SMALL_POS_TOKEN[obj]}`);
      } else {
        writer.write(`${INTEGER_SMALL_NEG_TOKEN[-obj - 1]}`);
      }
    } else if((foundRef = invertedIndex.integerMap.get(obj)) != null) {
      writer.write(`${REF_INTEGER_TOKEN}${foundRef}`)
    } else {
      const ref = compressInteger(invertedIndex.integerMap.size);
      const compressedInteger = compressInteger(obj);
      const newRef = `${INTEGER_TOKEN}${compressedInteger}`;
      if(ref.length + REFERENCE_HEADER_LENGTH < newRef.length) {
        invertedIndex.integerMap.set(obj, ref);
        writer.write(newRef)
      } else {
        writer.write(`${UNREFERENCED_INTEGER_TOKEN}${compressedInteger}`);
      }
    }
  } else {
    // Compress float prior to lookup to reuse for "same" floating values
    const compressedFloat = compressFloat(obj, options.fullPrecisionFloats);
    if((foundRef = invertedIndex.floatMap.get(compressedFloat))) {
      writer.write(`${REF_FLOAT_TOKEN}${foundRef}`)
    } else {
      const ref = compressInteger(invertedIndex.floatMap.size);
      const newRef = `${FLOAT_TOKEN}${compressedFloat}`;
      if(ref.length + REFERENCE_HEADER_LENGTH < newRef.length) {
        invertedIndex.floatMap.set(compressedFloat, ref);
        writer.write(newRef)
      } else {
        writer.write(`${UNREFERENCED_FLOAT_TOKEN}${compressedFloat}`);
      }
    }
  }
}