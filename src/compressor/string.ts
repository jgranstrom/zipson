import { DATE_REGEX, REF_STRING_TOKEN, REGEX_STRING_TOKEN, ESCAPED_STRING_TOKEN, STRING_TOKEN, REFERENCE_HEADER_LENGTH, UNREFERENCED_STRING_TOKEN, REGEX_UNREFERENCED_STRING_TOKEN, ESCAPED_UNREFERENCED_STRING_TOKEN, STRING_IDENT_PREFIX } from "../constants";
import { Context, InvertedIndex, CompressOptions, Compressors } from "./common";
import { ZipsonWriter } from "./writer";
import { compressInteger } from "../util";

/**
 * Compress string to
 */
export function compressString(
  compressors: Compressors,
  context: Context,
  obj: string,
  invertedIndex: InvertedIndex,
  writer: ZipsonWriter,
  options: CompressOptions
) {
  let foundRef: string | undefined;

  //
  const stringIdent = STRING_IDENT_PREFIX + obj;

  // Detect if string is utc timestamp if enabled
  if(options.detectUtcTimestamps && obj[obj.length -1] === 'Z' && obj.match(DATE_REGEX)) {
    const date = Date.parse(obj);
    compressors.date(compressors, context, date, invertedIndex, writer, options);
  } else if((foundRef = invertedIndex.stringMap[stringIdent]) !== void 0) {
    writer.write(`${REF_STRING_TOKEN}${foundRef}`)
  } else {
    const ref = compressInteger(invertedIndex.stringCount);
    const newRef = `${STRING_TOKEN}${obj.replace(REGEX_STRING_TOKEN, ESCAPED_STRING_TOKEN)}${STRING_TOKEN}`;
    if(ref.length + REFERENCE_HEADER_LENGTH + 1 < newRef.length) {
      invertedIndex.stringMap[stringIdent] = ref;
      invertedIndex.stringCount++;
      writer.write(newRef)
    } else {
      writer.write(`${UNREFERENCED_STRING_TOKEN}${obj.replace(REGEX_UNREFERENCED_STRING_TOKEN, ESCAPED_UNREFERENCED_STRING_TOKEN)}${UNREFERENCED_STRING_TOKEN}`);
    }
  }
}