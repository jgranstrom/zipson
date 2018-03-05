import { OrderedIndex, Cursor, TargetType, SKIP_SCALAR } from "./common";
import { decompressScalar } from "./scalar";
import { ARRAY_END_TOKEN, OBJECT_END_TOKEN } from "../constants";
import { appendTemplateObjectPropertiesValue, appendTemplateObjectElementsValue } from './template';

export function decompressElement(c: string, cursor: Cursor, data: string, orderedIndex: OrderedIndex): boolean {
  let targetValue: any;

  if(c === ARRAY_END_TOKEN || c === OBJECT_END_TOKEN) {
    targetValue = cursor.currentTarget.value;
    cursor.currentTarget = cursor.stack[cursor.pointer - 1];
    cursor.pointer--;
  } else {
    targetValue = decompressScalar(c, data, cursor, orderedIndex);
    if(targetValue === SKIP_SCALAR) { return false; }
  }

  if(cursor.currentTarget.type === TargetType.SCALAR) {
    cursor.currentTarget.value = targetValue;
  } else if(cursor.currentTarget.type === TargetType.ARRAY) {
    cursor.currentTarget.value[cursor.currentTarget.value.length] = targetValue;
  } else if(cursor.currentTarget.type === TargetType.OBJECT) {
    if(cursor.currentTarget.key) {
      cursor.currentTarget.value[cursor.currentTarget.key] = targetValue;
      cursor.currentTarget.key = void 0;
    } else {
      cursor.currentTarget.key = targetValue;
    }
  } else if(cursor.currentTarget.type === TargetType.TEMPLATE_OBJECT) {
    cursor.currentTarget.currentToken = targetValue;
    cursor.currentTarget.currentTokens.push(targetValue);
  } else if(cursor.currentTarget.type === TargetType.TEMPLATE_OBJECT_PROPERTIES) {
    appendTemplateObjectPropertiesValue(cursor.currentTarget, targetValue);
  } else if(cursor.currentTarget.type === TargetType.TEMPLATE_OBJECT_ELEMENTS) {
    appendTemplateObjectElementsValue(cursor.currentTarget, targetValue);
  }

  return true;
}