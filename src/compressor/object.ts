import { OBJECT_START_TOKEN, OBJECT_END_TOKEN } from "../constants";
import { Context, InvertedIndex, CompressOptions, Compressors } from "./common";
import { ZipsonWriter } from "./writer";
import { isObject } from "./util";

/**
 * Compress object to writer
 */
export function compressObject(
  compressors: Compressors,
  context: Context,
  obj: any,
  invertedIndex: InvertedIndex,
  writer: ZipsonWriter,
  options: CompressOptions
) {
  writer.write(OBJECT_START_TOKEN);
  const keys = Object.keys(obj);

  // Create a template object for first two keys in object
  let templateObject = new compressors.template.Object(obj[keys[0]], obj[keys[1]]);

  // Compress template is templating
  if(templateObject.isTemplating) {
    templateObject.compressTemplate(compressors, context, invertedIndex, writer, options);
  }

  for(let i = 0; i < keys.length; i++) {
    // Determine if still templating after the two first keys
    if(i > 1 && templateObject.isTemplating) {
      templateObject.isNextTemplateable(obj[keys[i]], writer);
    }

    if(templateObject.isTemplating) {
      // Compress id and template values if templating
      compressors.string(compressors, context, keys[i], invertedIndex, writer, options);
      templateObject.compressTemplateValues(compressors, context, invertedIndex, writer, options, obj[keys[i]]);
    } else {
      // Compress object key and value if not templating
      const key = keys[i];
      const val = obj[key];
      if(val !== undefined) {
        compressors.string(compressors, context, key, invertedIndex, writer, options);
        compressors.any(compressors, context, val, invertedIndex, writer, options);
      }
    }
  };

  // Finalize template object if still templating
  if(templateObject.isTemplating) {
    templateObject.end(writer);
  }

  writer.write(OBJECT_END_TOKEN);
}
