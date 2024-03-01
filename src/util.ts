import {
  FLOAT_COMPRESSION_PRECISION,
  FLOAT_EXPONENT_DELIMITER,
  FLOAT_FULL_PRECISION_DELIMITER,
  FLOAT_REDUCED_PRECISION_DELIMITER
} from './constants';

const maxInteger = 2147483648;
const minInteger = -2147483649;
const base62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * Convert number to base62 string
 */
export function compressInteger(number: number) {
  if(number === 0) { return '0'; }

  let result = '';
  let carry = number < 0 ? -number: number;
  let current = 0;
  let fraction;
  while(carry > 0) {
    carry = carry / 62;
    fraction = carry % 1;
    current = ((fraction * 62) + 0.1) << 0
    carry -= fraction;
    result = base62[current] + result
  }
  result = number < 0 ? '-' + result : result;

  return result;
}

/**
 * Convert base62 string to number
 */
export function decompressInteger(compressedInteger: string): number {
  let value = 0;
  if(compressedInteger[0] === '0') {
    return value;
  } else {
    let negative = compressedInteger[0] === '-';
    let multiplier = 1;
    const leftBound = negative ? 1 : 0;
    for(let i = compressedInteger.length - 1; i >= leftBound; i--) {
      const code = compressedInteger.charCodeAt(i);
      let current = code - 48;
      if(code >= 97) { current -= 13 }
      else if(code >= 65) { current -= 7 }
      value += current * multiplier;
      multiplier *= 62;
    }

    return negative ? -value : value;
  }
}

/**
 * Convert float to base62 string for integer and fraction
 */
export function compressFloat(float: number, fullPrecision: boolean = false): string {
  const [mantissa, exponent] = float.toString().split('e');

  if (exponent) {
    float = parseFloat(mantissa);
  }

  let result;
  if(fullPrecision) {
    const [integer, fraction] = float.toString().split('.');
    const operator = integer === '-0' ? '-' : '';
    result = `${operator}${compressInteger(parseInt(integer))}${FLOAT_FULL_PRECISION_DELIMITER}${fraction}`;
  } else {
    const integer = float >= maxInteger ? Math.floor(float) : float <= minInteger ? Math.ceil(float) : float << 0;
    const fraction = Math.round((FLOAT_COMPRESSION_PRECISION * (float % 1)));
    result = `${compressInteger(integer)}${FLOAT_REDUCED_PRECISION_DELIMITER}${compressInteger(fraction)}`;
  }

  if (exponent) {
    result = `${result}${FLOAT_EXPONENT_DELIMITER}${compressInteger(parseInt(exponent))}`;
  }

  return result;
}

/**
 * Convert base62 integer and fraction to float
 */
export function decompressFloat(compressedFloat: string): number {
  const [mantissa, exponent] = compressedFloat.split(FLOAT_EXPONENT_DELIMITER);

  let float;
  if(mantissa.includes(FLOAT_FULL_PRECISION_DELIMITER)) {
    const [integer, fraction] = mantissa.split(FLOAT_FULL_PRECISION_DELIMITER);
    const mult = integer === '-0' ? -1 : 1;
    const uncompressedInteger = decompressInteger(integer);
    float = mult * parseFloat(uncompressedInteger + '.' + fraction);
  } else {
    const [integer, fraction] = mantissa.split(FLOAT_REDUCED_PRECISION_DELIMITER);
    const uncompressedInteger = decompressInteger(integer);
    const uncompressedFraction = decompressInteger(fraction);
    float = uncompressedInteger + uncompressedFraction / FLOAT_COMPRESSION_PRECISION;
  }

  if (exponent) {
    float *= 10 ** decompressInteger(exponent)
  }

  return float;
}