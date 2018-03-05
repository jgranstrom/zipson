/**
 * Basic scalar types
 */
export type Scalar = string | null | undefined | boolean | number;

/**
 * Skip scalar slug type
 */
export interface SkipScalar {}
export const SKIP_SCALAR: SkipScalar = {};

/**
 * Referenced values indexed by order of occurence
 */
export interface OrderedIndex {
  strings: string[];
  integers: number[];
  floats: number[];
  dates: string[];
  lpDates: string[];
}

/**
 * Target type differentiators
 */
export enum TargetType {
  ARRAY,
  OBJECT,
  SCALAR,
  TEMPLATE_OBJECT,
  TEMPLATE_OBJECT_PROPERTIES,
  TEMPLATE_OBJECT_ELEMENTS,
}

/**
 * A current output target of specified type
 */
export type Target = ScalarTarget | ArrayTarget | ObjectTarget | TemplateObjectTarget | TemplateObjectPropertiesTarget | TemplateObjectElementsTarget;

/**
 * Basic output targets
 */
export interface BaseTarget<T> { type: T; value: any; }
export interface ScalarTarget extends BaseTarget<TargetType.SCALAR> { value: any; }
export interface ArrayTarget extends BaseTarget<TargetType.ARRAY> { value: any[]; }
export interface ObjectTarget extends BaseTarget<TargetType.OBJECT> { key?: any }

/**
 *  Template object output targets
 */
export interface TemplateObjectTarget extends BaseTarget<TargetType.TEMPLATE_OBJECT> {
  value: void;
  paths: string[][];
  level: number;
  currentRoute: string[];
  currentToken?: string;
  currentTokens: string[];
  parentTarget: ArrayTarget | ObjectTarget;
}
export interface TemplateObjectIntermediateTarget<T> extends BaseTarget<T> {
  paths: string[][];
  currentObject: any;
  currentPathIndex: number;
  expectedPaths: number;
}
export interface TemplateObjectPropertiesTarget extends TemplateObjectIntermediateTarget<TargetType.TEMPLATE_OBJECT_PROPERTIES> {
  value: any;
}
export interface TemplateObjectElementsTarget extends TemplateObjectIntermediateTarget<TargetType.TEMPLATE_OBJECT_ELEMENTS> {
  value: any[];
}

/**
 * Decompression cursor state
 */
export type Cursor = {
  index: number;
  rootTarget: ScalarTarget;
  stack: Target[];
  pointer: number;
  currentTarget: Target;
  drain: boolean;
}
