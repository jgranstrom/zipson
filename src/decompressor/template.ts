import { TemplateObjectIntermediateTarget, TemplateObjectPropertiesTarget, TemplateObjectElementsTarget } from "..";

function appendTemplateObjectValue(templateObjectTarget: TemplateObjectIntermediateTarget<any>, targetValue: any) {
  const currentPath = templateObjectTarget.paths[templateObjectTarget.currentPathIndex];
  let i = 0;
  let targetObject = templateObjectTarget.currentObject;

  for(; i < currentPath.length - 1; i++) {
    const fragment = currentPath[i];
    targetObject = targetObject[fragment] = targetObject[fragment] || {};
  }

  // Undefined values are tokenized for templated object in order to keep field order
  // so we filter them in parsing to avoid including them in parsed result
  if(targetValue !== void 0) {
    targetObject[currentPath[i]] = targetValue;
  }
}

/**
 * Append a parsed value to template object by properties
 */
export function appendTemplateObjectPropertiesValue(templateObjectElementsTarget: TemplateObjectPropertiesTarget, targetValue: any) {
  // If we have a negative path index that is the root identifier for a new object
  if(templateObjectElementsTarget.currentPathIndex === -1) {
    templateObjectElementsTarget.value[targetValue] = templateObjectElementsTarget.currentObject = {};
  } else {
    appendTemplateObjectValue(templateObjectElementsTarget, targetValue);
  }

  // If we got all path values, rotate to negative 1 for the next object
  if(++templateObjectElementsTarget.currentPathIndex === templateObjectElementsTarget.expectedPaths) {
    templateObjectElementsTarget.currentPathIndex = -1;
  }
}

/**
 * Append a parsed value to template object by elements
 */
export function appendTemplateObjectElementsValue(templateObjectPropertiesTarget: TemplateObjectElementsTarget, targetValue: any) {
  // If we have the first path value create a new element
  if(templateObjectPropertiesTarget.currentPathIndex === 0) {
    templateObjectPropertiesTarget.currentObject = {};
    templateObjectPropertiesTarget.value.push(templateObjectPropertiesTarget.currentObject);
  }

  appendTemplateObjectValue(templateObjectPropertiesTarget, targetValue);

  // If we got all path values, rotate to 0 for the next element
  if(++templateObjectPropertiesTarget.currentPathIndex === templateObjectPropertiesTarget.expectedPaths) {
    templateObjectPropertiesTarget.currentPathIndex = 0;
  }
}