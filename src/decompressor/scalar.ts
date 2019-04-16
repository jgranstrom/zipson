import { STRING_TOKEN, UNREFERENCED_STRING_TOKEN, ESCAPE_CHARACTER, DELIMITING_TOKENS_THRESHOLD,
  ARRAY_REPEAT_MANY_TOKEN, REF_STRING_TOKEN, REF_INTEGER_TOKEN, REF_FLOAT_TOKEN,
  REF_DATE_TOKEN, REF_LP_DATE_TOKEN, INTEGER_TOKEN, FLOAT_TOKEN, DATE_TOKEN, LP_DATE_TOKEN,
  UNREFERENCED_INTEGER_TOKEN, REGEX_UNREFERENCED_ESCAPED_STRING_TOKEN, DATE_LOW_PRECISION,
  UNREFERENCED_FLOAT_TOKEN, UNREFERENCED_DATE_TOKEN, UNREFERENCED_LP_DATE_TOKEN, BOOLEAN_TRUE_TOKEN,
  BOOLEAN_FALSE_TOKEN, NULL_TOKEN, UNDEFINED_TOKEN, REGEX_ESCAPED_STRING_TOKEN,
  INTEGER_SMALL_TOKEN_EXCLUSIVE_BOUND_LOWER, INTEGER_SMALL_TOKEN_EXCLUSIVE_BOUND_UPPER, INTEGER_SMALL_TOKEN_OFFSET,
  REGEX_ESCAPED_ESCAPE_CHARACTER
} from "../constants";

import { SKIP_SCALAR, OrderedIndex, Cursor, Scalar, SkipScalar } from "./common";
import { decompressInteger, decompressFloat } from "../util";

export function decompressScalar(token: string, data: string, cursor: Cursor, orderedIndex: OrderedIndex): Scalar | SkipScalar {
  const startIndex = cursor.index;
  let endIndex = cursor.index + 1;

  // Find end index of token value
  let foundStringToken;
  if(
    ((token === STRING_TOKEN) && (foundStringToken = STRING_TOKEN))
    || ((token === UNREFERENCED_STRING_TOKEN) && (foundStringToken = UNREFERENCED_STRING_TOKEN))
  ) {
    let escaped = true;
    while(escaped && endIndex < data.length) {
      endIndex = data.indexOf(foundStringToken, endIndex);
      let iNumEscapeCharacters = 1;
      escaped = false;
      while(data[endIndex - iNumEscapeCharacters] === ESCAPE_CHARACTER) {
          escaped = iNumEscapeCharacters % 2 === 1;
          iNumEscapeCharacters++;
      }
      endIndex++;
    }
    if(endIndex <= startIndex) { endIndex = data.length; }
  } else {
    while(!(data.charCodeAt(endIndex) > DELIMITING_TOKENS_THRESHOLD) && endIndex < data.length) {
      endIndex++;
    }
  }

  if(!cursor.drain && endIndex === data.length) { return SKIP_SCALAR; }

  // Update cursor end index
  cursor.index = endIndex - 1;

  const tokenCharCode = token.charCodeAt(0);

  // Decompress the token value
  if(tokenCharCode > INTEGER_SMALL_TOKEN_EXCLUSIVE_BOUND_LOWER && tokenCharCode < INTEGER_SMALL_TOKEN_EXCLUSIVE_BOUND_UPPER) {
    return tokenCharCode + INTEGER_SMALL_TOKEN_OFFSET;
  } else if(token === ARRAY_REPEAT_MANY_TOKEN) {
    return decompressInteger(data.substring(startIndex + 1, endIndex));
  } else if(token === REF_STRING_TOKEN) {
    return orderedIndex.strings[decompressInteger(data.substring(startIndex + 1, endIndex))];
  } else if(token === REF_INTEGER_TOKEN) {
    return orderedIndex.integers[decompressInteger(data.substring(startIndex + 1, endIndex))];
  } else if(token === REF_FLOAT_TOKEN) {
    return orderedIndex.floats[decompressInteger(data.substring(startIndex + 1, endIndex))];
  } else if(token === REF_DATE_TOKEN) {
    return orderedIndex.dates[decompressInteger(data.substring(startIndex + 1, endIndex))];
  } else if(token === REF_LP_DATE_TOKEN) {
    return orderedIndex.lpDates[decompressInteger(data.substring(startIndex + 1, endIndex))];
  } else if(token === STRING_TOKEN) {
    return orderedIndex.strings[orderedIndex.strings.length] = data.substring(startIndex + 1, endIndex - 1).replace(REGEX_ESCAPED_ESCAPE_CHARACTER, ESCAPE_CHARACTER).replace(REGEX_ESCAPED_STRING_TOKEN, STRING_TOKEN);
  } else if(token === INTEGER_TOKEN) {
    return orderedIndex.integers[orderedIndex.integers.length] = decompressInteger(data.substring(startIndex + 1, endIndex));
  } else if(token === FLOAT_TOKEN) {
    return orderedIndex.floats[orderedIndex.floats.length] = decompressFloat(data.substring(startIndex + 1, endIndex));
  } else if(token === DATE_TOKEN) {
    return orderedIndex.dates[orderedIndex.dates.length] = new Date(decompressInteger(data.substring(startIndex + 1, endIndex))).toISOString();
  } else if(token === LP_DATE_TOKEN) {
    return orderedIndex.lpDates[orderedIndex.lpDates.length] = new Date(DATE_LOW_PRECISION * decompressInteger(data.substring(startIndex + 1, endIndex))).toISOString();
  } else if(token === UNREFERENCED_STRING_TOKEN) {
    return data.substring(startIndex + 1, endIndex - 1).replace(REGEX_ESCAPED_ESCAPE_CHARACTER, ESCAPE_CHARACTER).replace(REGEX_UNREFERENCED_ESCAPED_STRING_TOKEN, UNREFERENCED_STRING_TOKEN);
  } else if(token === UNREFERENCED_INTEGER_TOKEN) {
    return decompressInteger(data.substring(startIndex + 1, endIndex));
  } else if(token === UNREFERENCED_FLOAT_TOKEN) {
    return decompressFloat(data.substring(startIndex + 1, endIndex));
  } else if(token === UNREFERENCED_DATE_TOKEN) {
    return new Date(decompressInteger(data.substring(startIndex + 1, endIndex))).toISOString();
  } else if(token === UNREFERENCED_LP_DATE_TOKEN) {
    return new Date(DATE_LOW_PRECISION * decompressInteger(data.substring(startIndex + 1, endIndex))).toISOString();
  } else if(token === BOOLEAN_TRUE_TOKEN) {
    return true;
  } else if(token === BOOLEAN_FALSE_TOKEN) {
    return false;
  } else if(token === NULL_TOKEN) {
    return null;
  } else if(token === UNDEFINED_TOKEN) {
    return undefined;
  }

  throw new Error(`Unexpected scalar ${token} at ${startIndex}-${endIndex}`);
}