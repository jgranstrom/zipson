import { ARRAY_START_TOKEN, OBJECT_START_TOKEN, ARRAY_REPEAT_TOKEN, ARRAY_REPEAT_MANY_TOKEN,
    TEMPLATE_OBJECT_START, TEMPLATE_OBJECT_END, TEMPLATE_OBJECT_FINAL } from "../constants";
import { Cursor, OrderedIndex, ArrayTarget, TargetType, Target, TemplateObjectTarget, SkipScalar, SKIP_SCALAR } from "./common";
import { decompressScalar } from "./scalar";
import { decompressElement } from "./element";

export function decompressStages(cursor: Cursor, data: string, orderedIndex: OrderedIndex) {
  for(; cursor.index < data.length; cursor.index++) {
    const c = data[cursor.index];

    if(c === ARRAY_START_TOKEN) {
      cursor.currentTarget = { type: TargetType.ARRAY, value: [] };
      cursor.stack[++cursor.pointer] = cursor.currentTarget;
    } else if(c === OBJECT_START_TOKEN) {
      cursor.currentTarget = { type: TargetType.OBJECT, value: {} };
      cursor.stack[++cursor.pointer] = cursor.currentTarget;
    } else if(c === ARRAY_REPEAT_TOKEN && (cursor.currentTarget.type === TargetType.ARRAY || cursor.currentTarget.type === TargetType.TEMPLATE_OBJECT_ELEMENTS)) {
      const repeatedItem = cursor.currentTarget.value[cursor.currentTarget.value.length - 1];
      cursor.currentTarget.value.push(repeatedItem);
    } else if(c === ARRAY_REPEAT_MANY_TOKEN && (cursor.currentTarget.type === TargetType.ARRAY || cursor.currentTarget.type === TargetType.TEMPLATE_OBJECT_ELEMENTS)) {
      const repeatCount = <number | SkipScalar>decompressScalar(data[cursor.index], data, cursor, orderedIndex);
      if(repeatCount === SKIP_SCALAR) { return; }
      const repeatedItem = cursor.currentTarget.value[cursor.currentTarget.value.length - 1];
      for(let i = 0; i < repeatCount; i++) { cursor.currentTarget.value.push(repeatedItem); }
    } else if(c === TEMPLATE_OBJECT_START && (cursor.currentTarget.type === TargetType.TEMPLATE_OBJECT || cursor.currentTarget.type === TargetType.OBJECT || cursor.currentTarget.type === TargetType.ARRAY)) {
      if(cursor.currentTarget.type !== TargetType.TEMPLATE_OBJECT) {
        const parentTarget = cursor.currentTarget;
        cursor.currentTarget = { type: TargetType.TEMPLATE_OBJECT, value: void 0, currentTokens: [], currentRoute: [], paths: [], level: 0, parentTarget };
        cursor.stack[++cursor.pointer] = cursor.currentTarget;
      } else {
        // Add any found tokens prior to next nested as separate paths
        for(let i = 0; i < cursor.currentTarget.currentTokens.length - 1; i++) {
          const currentToken = cursor.currentTarget.currentTokens[i];
          cursor.currentTarget.paths.push([...cursor.currentTarget.currentRoute, currentToken]);
        }
        // Add most recent token as part of next path
        if(cursor.currentTarget.currentToken != null) {
          cursor.currentTarget.currentRoute.push(cursor.currentTarget.currentToken);
        }
        // Clear tokens for nested object
        cursor.currentTarget.currentTokens = [];
        cursor.currentTarget.level++;
      }
    } else if(c === TEMPLATE_OBJECT_END && cursor.currentTarget.type === TargetType.TEMPLATE_OBJECT) {
      for(let i = 0; i < cursor.currentTarget.currentTokens.length; i++) {
        const currentToken = cursor.currentTarget.currentTokens[i];
        cursor.currentTarget.paths.push([...cursor.currentTarget.currentRoute, currentToken]);
      }
      cursor.currentTarget.currentTokens = [];
      cursor.currentTarget.currentRoute = cursor.currentTarget.currentRoute.slice(0, -1);
      cursor.currentTarget.level--;

      if(cursor.currentTarget.level < 0) {
        const paths = cursor.currentTarget.paths;
        const parentTarget = cursor.currentTarget.parentTarget;
        cursor.pointer--;
        if(parentTarget.type === TargetType.ARRAY) {
          cursor.currentTarget = { type: TargetType.TEMPLATE_OBJECT_ELEMENTS, value: parentTarget.value, paths, currentPathIndex: 0, expectedPaths: paths.length, currentObject: {} };
        } else if(parentTarget.type === TargetType.OBJECT) {
          cursor.currentTarget = { type: TargetType.TEMPLATE_OBJECT_PROPERTIES, value: parentTarget.value, paths, currentPathIndex: -1, expectedPaths: paths.length, currentObject: {} };
        }
        cursor.stack[++cursor.pointer] = cursor.currentTarget;
      }
    } else if(c === TEMPLATE_OBJECT_FINAL) {
      cursor.currentTarget = cursor.stack[--cursor.pointer];
    } else {
      if(!decompressElement(c, cursor, data, orderedIndex)) {
        return;
      }
    }
  }
}