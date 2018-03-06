import { DATE_LOW_PRECISION, REF_LP_DATE_TOKEN, LP_DATE_TOKEN, REFERENCE_HEADER_LENGTH, UNREFERENCED_LP_DATE_TOKEN, REF_DATE_TOKEN, DATE_TOKEN, UNREFERENCED_DATE_TOKEN } from "../constants";
import { Context, InvertedIndex, CompressOptions, Compressors } from "./common";
import { ZipsonWriter } from "./writer";
import { compressInteger } from "../util";

/**
 * Compress date (as unix timestamp) to writer
 */
export function compressDate(
  compressors: Compressors,
  context: Context,
  obj: number,
  invertedIndex: InvertedIndex,
  writer: ZipsonWriter,
  options: CompressOptions
) {
  let foundRef: string | undefined;

  /**
   * Determine if we should represent the date with low precision
   */
  const lowPrecisionDate = obj / DATE_LOW_PRECISION;
  const isLowPrecision = lowPrecisionDate % 1 === 0;

  if(isLowPrecision) {
    if((foundRef = invertedIndex.lpDateMap[lowPrecisionDate]) !== void 0) {
      writer.write(`${REF_LP_DATE_TOKEN}${foundRef}`);
    } else {
      const ref = compressInteger(invertedIndex.lpDateCount);
      const compressedDate = compressInteger(lowPrecisionDate);
      const newRef = `${LP_DATE_TOKEN}${compressedDate}`;
      if(ref.length + REFERENCE_HEADER_LENGTH < newRef.length) {
        invertedIndex.lpDateMap[lowPrecisionDate] = ref;
        invertedIndex.lpDateCount++;
        writer.write(newRef)
      } else {
        writer.write(`${UNREFERENCED_LP_DATE_TOKEN}${compressedDate}`);
      }
    }
  } else {
    if((foundRef = invertedIndex.dateMap[obj]) !== void 0) {
      writer.write(`${REF_DATE_TOKEN}${foundRef}`)
    } else {
      const ref = compressInteger(invertedIndex.dateCount);
      const compressedDate = compressInteger(obj);
      const newRef = `${DATE_TOKEN}${compressedDate}`;
      if(ref.length + REFERENCE_HEADER_LENGTH < newRef.length) {
        invertedIndex.dateMap[obj] = ref;
        invertedIndex.dateCount++;
        writer.write(newRef)
      } else {
        writer.write(`${UNREFERENCED_DATE_TOKEN}${compressedDate}`);
      }
    }
  }
}