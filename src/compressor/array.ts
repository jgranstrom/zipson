import { ARRAY_REPEAT_COUNT_THRESHOLD, ARRAY_REPEAT_MANY_TOKEN, ARRAY_REPEAT_TOKEN, ARRAY_END_TOKEN, ARRAY_START_TOKEN } from "../constants";
import { Context, InvertedIndex, CompressOptions, Compressors } from "./common";
import { ZipsonWriter, ZipsonStringWriter } from "./writer";
import { compressInteger } from "../util";
import { isObject } from "./util";

/**
 * Compress array to writer
 */
export function compressArray(
  compressors: Compressors,
  context: Context,
  array: any[],
  invertedIndex: InvertedIndex,
  writer: ZipsonWriter,
  options: CompressOptions
) {
  // Increase context array level and create a new element writer if needed
  context.arrayLevel++;
  if(context.arrayLevel > context.arrayItemWriters.length) {
    context.arrayItemWriters.push(new ZipsonStringWriter());
  }

  // Get the element and parent writer
  const arrayItemWriter = context.arrayItemWriters[context.arrayLevel - 1];
  const parentWriter = context.arrayItemWriters[context.arrayLevel - 2] || writer;

  parentWriter.write(ARRAY_START_TOKEN);
  let previousItem = '';
  let repeatedTimes = 0;
  let repeatManyCount = 0;

  // Create a template object for first two keys in object
  let templateObject = new compressors.template.Object(array[0], array[1]);

  // Compress template is templating
  if(templateObject.isTemplating) {
    templateObject.compressTemplate(compressors, context, invertedIndex, parentWriter, options);
  }

  for(let i = 0; i < array.length; i++) {
    let item = array[i];
    arrayItemWriter.value = '';

    // Make undefined elements into null values
    if(item === undefined) { item = null }

    // Determine if still templating after the two first elements
    if(i > 1 && templateObject.isTemplating) {
      templateObject.isNextTemplateable(array[i], parentWriter);
    }

    if(templateObject.isTemplating) {
      // Compress template values if templating
      templateObject.compressTemplateValues(compressors, context, invertedIndex, arrayItemWriter, options, array[i]);
    } else {
      // Compress any element otherwise
      compressors.any(compressors, context, item, invertedIndex, arrayItemWriter, options);
    }

    // Check if we wrote an identical elements
    if(arrayItemWriter.value === previousItem) {
      // Count repetitions and see if we repeated enough to use a many token
      repeatedTimes++;
      if(repeatedTimes >= ARRAY_REPEAT_COUNT_THRESHOLD) {
        // Write a many token if needed and count how many "many"-times we repeated
        if(repeatManyCount === 0) {
          parentWriter.write(ARRAY_REPEAT_MANY_TOKEN);
        }
        repeatManyCount++;
      } else {
        // Default to standard repeat token
        parentWriter.write(ARRAY_REPEAT_TOKEN);
      }
    } else {
      repeatedTimes = 0;
      if(repeatManyCount > 0) {
        // If we repeated many times, write the count before the next element
        parentWriter.write(compressInteger(repeatManyCount));
        repeatManyCount = 0;
      }
      parentWriter.write(arrayItemWriter.value);
      previousItem = arrayItemWriter.value;
    }
  }

  // If still repeating may, write the final repeat count
  if(repeatManyCount > 0) {
    parentWriter.write(compressInteger(repeatManyCount));
  }

  // Finalize template object if still templating
  if(templateObject.isTemplating) {
    templateObject.end(parentWriter);
  }

  parentWriter.write(ARRAY_END_TOKEN);

  context.arrayLevel--;
}
