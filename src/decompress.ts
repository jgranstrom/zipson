import { Target, TargetType, Cursor, OrderedIndex } from "./decompressor/common";
import { decompressStages } from "./decompressor/stages";

/**
 * Create an ordered index for decompression
 */
export function makeOrderedIndex(): OrderedIndex {
  return {
    strings: [],
    integers: [],
    floats: [],
    dates: [],
    lpDates: [],
  }
}

/**
 * Create a new cursor with a root target for specified drain mode
 */
function makeCursor(drain: boolean): Cursor {
  const rootTarget: Target = { type: TargetType.SCALAR, value: void 0 };
  const stack: Target[] = new Array(10);
  stack[0] = rootTarget;

  return { index: 0, rootTarget, stack, currentTarget: rootTarget, pointer: 0, drain };
}

/**
 * Decompress data string with provided ordered index
 */
export function decompress(data: string, orderedIndex: OrderedIndex) {
  const cursor = makeCursor(true);
  decompressStages(cursor, data, orderedIndex);
  return cursor.rootTarget.value;
}

/**
 * Decompress zipson data incrementally by providing each chunk of data in sequence
 */
export function decompressIncremental(orderedIndex) {
  const cursor = makeCursor(false);

  // Keep an internal buffer for any unterminated chunks of data
  let buffer = '';
  function increment(data: string | null) {
    if(data === null) {
      // Move cursor to drain mode if we got the last chunk of data
      cursor.drain = true;
    }
    else if(data.length === 0) { return; }
    else { buffer += data; }

    // Decompress an determine amount of buffer that was parsed
    const cursorIndexBefore = cursor.index;
    decompressStages(cursor, buffer, orderedIndex);
    const movedAmount = cursor.index - cursorIndexBefore;

    // Rotate parsed data out of buffer and move cursor back to next parsing position
    if(movedAmount > 0) {
      buffer = buffer.substring(movedAmount);
      cursor.index -= movedAmount;
    }
  }

  return { increment, cursor };
}
