/**
 * Precision constants
 */
export const FLOAT_COMPRESSION_PRECISION = 1000;
export const DATE_LOW_PRECISION = 100000;

/**
 * Floating point delimiters
 */
export const FLOAT_FULL_PRECISION_DELIMITER = ',';
export const FLOAT_REDUCED_PRECISION_DELIMITER = '.';

/**
 * Data type tokens
 */
export const INTEGER_TOKEN = '¢';
export const FLOAT_TOKEN = '£';
export const STRING_TOKEN = '¨';
export const DATE_TOKEN = 'ø';
export const LP_DATE_TOKEN = '±';
export const UNREFERENCED_INTEGER_TOKEN  = '¤';
export const UNREFERENCED_FLOAT_TOKEN = '¥';
export const UNREFERENCED_STRING_TOKEN = '´';
export const UNREFERENCED_DATE_TOKEN = 'æ';
export const UNREFERENCED_LP_DATE_TOKEN = 'ÿ';
export const REF_INTEGER_TOKEN = 'ç';
export const REF_FLOAT_TOKEN = 'Ý';
export const REF_STRING_TOKEN = 'ß';
export const REF_DATE_TOKEN = '×';
export const REF_LP_DATE_TOKEN = 'ü';
export const NULL_TOKEN = '§'
export const UNDEFINED_TOKEN = 'µ'
export const BOOLEAN_TRUE_TOKEN = '»';
export const BOOLEAN_FALSE_TOKEN = '«';

/**
 * String escape tokens
 */
export const ESCAPE_CHARACTER = '\\';
export const ESCAPED_STRING_TOKEN = `${ESCAPE_CHARACTER}${STRING_TOKEN}`;
export const ESCAPED_UNREFERENCED_STRING_TOKEN = `${ESCAPE_CHARACTER}${UNREFERENCED_STRING_TOKEN}`

/**
 * Regex lookups
 */
export const REGEX_STRING_TOKEN = new RegExp(STRING_TOKEN, 'g');
export const REGEX_ESCAPED_STRING_TOKEN = new RegExp(ESCAPE_CHARACTER + ESCAPED_STRING_TOKEN, 'g');
export const REGEX_UNREFERENCED_STRING_TOKEN = new RegExp(UNREFERENCED_STRING_TOKEN, 'g');
export const REGEX_UNREFERENCED_ESCAPED_STRING_TOKEN = new RegExp(ESCAPE_CHARACTER + ESCAPED_UNREFERENCED_STRING_TOKEN, 'g');
export const DATE_REGEX = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z/;

/**
 * Structural tokens
 */
export const OBJECT_START_TOKEN = '{';
export const OBJECT_END_TOKEN = '}';
export const TEMPLATE_OBJECT_START = '¦';
export const TEMPLATE_OBJECT_END = '‡';
export const TEMPLATE_OBJECT_FINAL = '—';
export const ARRAY_START_TOKEN = '|';
export const ARRAY_END_TOKEN = '÷';
export const ARRAY_REPEAT_TOKEN = 'þ';
export const ARRAY_REPEAT_MANY_TOKEN = '^';
export const ARRAY_REPEAT_COUNT_THRESHOLD = 4;

/**
 * General tokenization constants
 */
export const REFERENCE_HEADER_LENGTH = 1;
export const DELIMITING_TOKENS_THRESHOLD = 122;

/**
 * Small integer tokens
 */
export const INTEGER_SMALL_EXCLUSIVE_BOUND_LOWER = -10;
export const INTEGER_SMALL_EXCLUSIVE_BOUND_UPPER = 10;
export const INTEGER_SMALL_POS_TOKEN = ['ì', 'í', 'î', 'ï', 'ð', 'ñ', 'ò', 'ó', 'ô', 'õ'];
export const INTEGER_SMALL_NEG_TOKEN = ['¹', '²', '³', '¼', '¿', '¸', '¶', '¬', '°'];
export const INTEGER_SMALL_TOKENS = new Map<string, number>();
INTEGER_SMALL_POS_TOKEN.forEach((token, idx) => {
  INTEGER_SMALL_TOKENS.set(token, idx);
});
INTEGER_SMALL_NEG_TOKEN.forEach((token, idx) => {
  INTEGER_SMALL_TOKENS.set(token, -idx - 1);
});
