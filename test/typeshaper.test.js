// @ts-check
import { describe, it } from 'node:test';
import {
  strictEqual,
  doesNotThrow,
  throws,
} from 'node:assert';
import {
  assertArray,
  assertArrayMapOf,
  assertArrayOf,
  assertBoolean,
  assertDefined,
  assertFunction,
  assertNullableArray,
  assertNullableBoolean,
  assertNullableFunction,
  assertNullableNumber,
  assertNullableString,
  assertNumber,
  assertPropArray,
  assertPropArrayMapOf,
  assertPropArrayOf,
  assertPropBoolean,
  assertPropDefined,
  assertPropFunction,
  assertPropNullableArray,
  assertPropNullableBoolean,
  assertPropNullableFunction,
  assertPropNullableNumber,
  assertPropNullableString,
  assertPropNumber,
  assertPropString,
  assertString,
  hasPropArray,
  hasPropArrayMapOf,
  hasPropArrayOf,
  hasPropBoolean,
  hasPropDefined,
  hasPropFunction,
  hasPropNullableArray,
  hasPropNullableBoolean,
  hasPropNullableFunction,
  hasPropNullableNumber,
  hasPropNullableString,
  hasPropNumber,
  hasPropString,
  isArray,
  isArrayMapOf,
  isArrayOf,
  isBoolean,
  isDefined,
  isFunction,
  isNullableArray,
  isNullableBoolean,
  isNullableFunction,
  isNullableNumber,
  isNullableString,
  isNumber,
  isString,
  setPropValue
} from '../lib/typeshaper.js';

describe('Type Guard Functions', () => {
  describe('isDefined', () => {
    it('should return true for defined values', () => {
      strictEqual(isDefined(0), true);
      strictEqual(isDefined(false), true);
      strictEqual(isDefined(''), true);
      strictEqual(isDefined([]), true);
      strictEqual(isDefined({}), true);
      strictEqual(isDefined(() => { }), true);
    });

    it('should return false for null and undefined', () => {
      strictEqual(isDefined(null), false);
      strictEqual(isDefined(undefined), false);
    });
  });

  describe('isBoolean', () => {
    it('should return true for boolean values', () => {
      strictEqual(isBoolean(true), true);
      strictEqual(isBoolean(false), true);
    });

    it('should return false for non-boolean values', () => {
      strictEqual(isBoolean(0), false);
      strictEqual(isBoolean(1), false);
      strictEqual(isBoolean('true'), false);
      strictEqual(isBoolean('false'), false);
      strictEqual(isBoolean(null), false);
      strictEqual(isBoolean(undefined), false);
      strictEqual(isBoolean([]), false);
      strictEqual(isBoolean({}), false);
    });
  });

  describe('isNumber', () => {
    it('should return true for valid numbers', () => {
      strictEqual(isNumber(0), true);
      strictEqual(isNumber(1), true);
      strictEqual(isNumber(-1), true);
      strictEqual(isNumber(3.14), true);
      strictEqual(isNumber(Infinity), true);
      strictEqual(isNumber(-Infinity), true);
    });

    it('should return false for NaN', () => {
      strictEqual(isNumber(NaN), false);
    });

    it('should return false for non-number values', () => {
      strictEqual(isNumber('123'), false);
      strictEqual(isNumber(true), false);
      strictEqual(isNumber(false), false);
      strictEqual(isNumber(null), false);
      strictEqual(isNumber(undefined), false);
      strictEqual(isNumber([]), false);
      strictEqual(isNumber({}), false);
    });
  });

  describe('isString', () => {
    it('should return true for string values', () => {
      strictEqual(isString(''), true);
      strictEqual(isString('hello'), true);
      strictEqual(isString('123'), true);
      strictEqual(isString(String(123)), true);
    });

    it('should return false for non-string values', () => {
      strictEqual(isString(123), false);
      strictEqual(isString(true), false);
      strictEqual(isString(false), false);
      strictEqual(isString(null), false);
      strictEqual(isString(undefined), false);
      strictEqual(isString([]), false);
      strictEqual(isString({}), false);
    });
  });

  describe('isFunction', () => {
    it('should return true for function values', () => {
      strictEqual(isFunction(() => { }), true);
      strictEqual(isFunction(function () { }), true);
      strictEqual(isFunction(Math.max), true);
      strictEqual(isFunction(console.log), true);
      strictEqual(isFunction(Array), true);
    });

    it('should return false for non-function values', () => {
      strictEqual(isFunction(123), false);
      strictEqual(isFunction('function'), false);
      strictEqual(isFunction(true), false);
      strictEqual(isFunction(null), false);
      strictEqual(isFunction(undefined), false);
      strictEqual(isFunction([]), false);
      strictEqual(isFunction({}), false);
    });
  });

  describe('isArray', () => {
    it('should return true for array values', () => {
      strictEqual(isArray([]), true);
      strictEqual(isArray([1, 2, 3]), true);
      strictEqual(isArray(new Array()), true);
      strictEqual(isArray(Array.from('abc')), true);
    });

    it('should return false for non-array values', () => {
      strictEqual(isArray('array'), false);
      strictEqual(isArray(123), false);
      strictEqual(isArray(true), false);
      strictEqual(isArray(null), false);
      strictEqual(isArray(undefined), false);
      strictEqual(isArray({}), false);
      strictEqual(isArray({ length: 3 }), false);
    });
  });

  describe('isArrayOf', () => {
    it('should return true for arrays where all elements match predicate', () => {
      strictEqual(isArrayOf([1, 2, 3], isNumber), true);
      strictEqual(isArrayOf(['a', 'b', 'c'], isString), true);
      strictEqual(isArrayOf([true, false], isBoolean), true);
      strictEqual(isArrayOf([], isString), true); // empty arrays should pass
    });

    it('should return false for arrays where some elements do not match predicate', () => {
      strictEqual(isArrayOf([1, '2', 3], isNumber), false);
      strictEqual(isArrayOf(['a', 2, 'c'], isString), false);
      strictEqual(isArrayOf([true, 1], isBoolean), false);
    });

    it('should return false for non-arrays', () => {
      strictEqual(isArrayOf('abc', isString), false);
      strictEqual(isArrayOf(123, isNumber), false);
      strictEqual(isArrayOf({ 0: 'a', 1: 'b', length: 2 }, isString), false);
    });
  });

  describe('isNullableBoolean', () => {
    it('should return true for boolean values, null, and undefined', () => {
      strictEqual(isNullableBoolean(true), true);
      strictEqual(isNullableBoolean(false), true);
      strictEqual(isNullableBoolean(null), true);
      strictEqual(isNullableBoolean(undefined), true);
    });

    it('should return false for non-boolean values', () => {
      strictEqual(isNullableBoolean(0), false);
      strictEqual(isNullableBoolean(1), false);
      strictEqual(isNullableBoolean('true'), false);
      strictEqual(isNullableBoolean('false'), false);
      strictEqual(isNullableBoolean([]), false);
      strictEqual(isNullableBoolean({}), false);
    });
  });

  describe('isNullableNumber', () => {
    it('should return true for valid numbers, null, and undefined', () => {
      strictEqual(isNullableNumber(0), true);
      strictEqual(isNullableNumber(1), true);
      strictEqual(isNullableNumber(-1), true);
      strictEqual(isNullableNumber(3.14), true);
      strictEqual(isNullableNumber(Infinity), true);
      strictEqual(isNullableNumber(-Infinity), true);
      strictEqual(isNullableNumber(null), true);
      strictEqual(isNullableNumber(undefined), true);
    });

    it('should return false for NaN', () => {
      strictEqual(isNullableNumber(NaN), false);
    });

    it('should return false for non-number values', () => {
      strictEqual(isNullableNumber('123'), false);
      strictEqual(isNullableNumber(true), false);
      strictEqual(isNullableNumber(false), false);
      strictEqual(isNullableNumber([]), false);
      strictEqual(isNullableNumber({}), false);
    });
  });

  describe('isNullableString', () => {
    it('should return true for string values, null, and undefined', () => {
      strictEqual(isNullableString(''), true);
      strictEqual(isNullableString('hello'), true);
      strictEqual(isNullableString('123'), true);
      strictEqual(isNullableString(String(123)), true);
      strictEqual(isNullableString(null), true);
      strictEqual(isNullableString(undefined), true);
    });

    it('should return false for non-string values', () => {
      strictEqual(isNullableString(123), false);
      strictEqual(isNullableString(true), false);
      strictEqual(isNullableString(false), false);
      strictEqual(isNullableString([]), false);
      strictEqual(isNullableString({}), false);
    });
  });

  describe('isNullableFunction', () => {
    it('should return true for function values, null, and undefined', () => {
      strictEqual(isNullableFunction(() => { }), true);
      strictEqual(isNullableFunction(function () { }), true);
      strictEqual(isNullableFunction(Math.max), true);
      strictEqual(isNullableFunction(console.log), true);
      strictEqual(isNullableFunction(Array), true);
      strictEqual(isNullableFunction(null), true);
      strictEqual(isNullableFunction(undefined), true);
    });

    it('should return false for non-function values', () => {
      strictEqual(isNullableFunction(123), false);
      strictEqual(isNullableFunction('function'), false);
      strictEqual(isNullableFunction(true), false);
      strictEqual(isNullableFunction([]), false);
      strictEqual(isNullableFunction({}), false);
    });
  });

  describe('isNullableArray', () => {
    it('should return true for array values, null, and undefined', () => {
      strictEqual(isNullableArray([]), true);
      strictEqual(isNullableArray([1, 2, 3]), true);
      strictEqual(isNullableArray(new Array()), true);
      strictEqual(isNullableArray(Array.from('abc')), true);
      strictEqual(isNullableArray(null), true);
      strictEqual(isNullableArray(undefined), true);
    });

    it('should return false for non-array values', () => {
      strictEqual(isNullableArray('array'), false);
      strictEqual(isNullableArray(123), false);
      strictEqual(isNullableArray(true), false);
      strictEqual(isNullableArray({}), false);
      strictEqual(isNullableArray({ length: 3 }), false);
    });
  });
});

describe('Property Type Guard Functions', () => {
  describe('hasPropDefined', () => {
    it('should return true for objects with defined property', () => {
      strictEqual(hasPropDefined({ a: 1 }, 'a'), true);
      strictEqual(hasPropDefined({ a: 0 }, 'a'), true);
      strictEqual(hasPropDefined({ a: false }, 'a'), true);
      strictEqual(hasPropDefined({ a: '' }, 'a'), true);
      strictEqual(hasPropDefined({ a: [] }, 'a'), true);
      strictEqual(hasPropDefined({ 0: 'value' }, 0), true);
    });

    it('should return false for objects with undefined or null property', () => {
      strictEqual(hasPropDefined({ a: null }, 'a'), false);
      strictEqual(hasPropDefined({ a: undefined }, 'a'), false);
    });

    it('should return false for objects without the property', () => {
      strictEqual(hasPropDefined({}, 'a'), false);
      strictEqual(hasPropDefined({ b: 1 }, 'a'), false);
    });

    it('should return false for non-objects', () => {
      strictEqual(hasPropDefined(null, 'a'), false);
      strictEqual(hasPropDefined(undefined, 'a'), false);
      strictEqual(hasPropDefined(123, 'a'), false);
      strictEqual(hasPropDefined('string', 'a'), false);
    });
  });

  describe('hasPropBoolean', () => {
    it('should return true for objects with boolean property', () => {
      strictEqual(hasPropBoolean({ flag: true }, 'flag'), true);
      strictEqual(hasPropBoolean({ flag: false }, 'flag'), true);
    });

    it('should return false for objects with non-boolean property', () => {
      strictEqual(hasPropBoolean({ flag: 1 }, 'flag'), false);
      strictEqual(hasPropBoolean({ flag: 'true' }, 'flag'), false);
      strictEqual(hasPropBoolean({ flag: null }, 'flag'), false);
    });
  });

  describe('hasPropNumber', () => {
    it('should return true for objects with number property', () => {
      strictEqual(hasPropNumber({ count: 5 }, 'count'), true);
      strictEqual(hasPropNumber({ count: 0 }, 'count'), true);
      strictEqual(hasPropNumber({ count: -1 }, 'count'), true);
      strictEqual(hasPropNumber({ count: 3.14 }, 'count'), true);
    });

    it('should return false for objects with non-number property', () => {
      strictEqual(hasPropNumber({ count: '5' }, 'count'), false);
      strictEqual(hasPropNumber({ count: NaN }, 'count'), false);
      strictEqual(hasPropNumber({ count: null }, 'count'), false);
    });
  });

  describe('hasPropString', () => {
    it('should return true for objects with string property', () => {
      strictEqual(hasPropString({ name: 'John' }, 'name'), true);
      strictEqual(hasPropString({ name: '' }, 'name'), true);
      strictEqual(hasPropString({ name: '123' }, 'name'), true);
    });

    it('should return false for objects with non-string property', () => {
      strictEqual(hasPropString({ name: 123 }, 'name'), false);
      strictEqual(hasPropString({ name: true }, 'name'), false);
      strictEqual(hasPropString({ name: null }, 'name'), false);
    });
  });

  describe('hasPropFunction', () => {
    it('should return true for objects with function property', () => {
      strictEqual(hasPropFunction({ fn: () => { } }, 'fn'), true);
      strictEqual(hasPropFunction({ fn: function () { } }, 'fn'), true);
      strictEqual(hasPropFunction({ fn: Math.max }, 'fn'), true);
    });

    it('should return false for objects with non-function property', () => {
      strictEqual(hasPropFunction({ fn: 'function' }, 'fn'), false);
      strictEqual(hasPropFunction({ fn: 123 }, 'fn'), false);
      strictEqual(hasPropFunction({ fn: null }, 'fn'), false);
    });
  });

  describe('hasPropArray', () => {
    it('should return true for objects with array property', () => {
      strictEqual(hasPropArray({ items: [] }, 'items'), true);
      strictEqual(hasPropArray({ items: [1, 2, 3] }, 'items'), true);
      strictEqual(hasPropArray({ items: new Array() }, 'items'), true);
    });

    it('should return false for objects with non-array property', () => {
      strictEqual(hasPropArray({ items: 'array' }, 'items'), false);
      strictEqual(hasPropArray({ items: { length: 3 } }, 'items'), false);
      strictEqual(hasPropArray({ items: null }, 'items'), false);
    });
  });

  describe('hasPropArrayOf', () => {
    it('should return true for objects with array property of specific type', () => {
      strictEqual(hasPropArrayOf({ numbers: [1, 2, 3] }, 'numbers', isNumber), true);
      strictEqual(hasPropArrayOf({ strings: ['a', 'b'] }, 'strings', isString), true);
      strictEqual(hasPropArrayOf({ empty: [] }, 'empty', isString), true);
    });

    it('should return false for objects with array property of wrong type', () => {
      strictEqual(hasPropArrayOf({ mixed: [1, 'a', 3] }, 'mixed', isNumber), false);
      strictEqual(hasPropArrayOf({ items: 'not array' }, 'items', isString), false);
    });
  });

  describe('hasPropNullableBoolean', () => {
    it('should return true for objects with boolean, null, or undefined property', () => {
      strictEqual(hasPropNullableBoolean({ flag: true }, 'flag'), true);
      strictEqual(hasPropNullableBoolean({ flag: false }, 'flag'), true);
      strictEqual(hasPropNullableBoolean({ flag: null }, 'flag'), true);
      strictEqual(hasPropNullableBoolean({ flag: undefined }, 'flag'), true);
    });

    it('should return false for objects with non-boolean property', () => {
      strictEqual(hasPropNullableBoolean({ flag: 1 }, 'flag'), false);
      strictEqual(hasPropNullableBoolean({ flag: 'true' }, 'flag'), false);
    });

    it('should return false for objects without the property', () => {
      strictEqual(hasPropNullableBoolean({}, 'flag'), false);
    });
  });

  describe('hasPropNullableNumber', () => {
    it('should return true for objects with number, null, or undefined property', () => {
      strictEqual(hasPropNullableNumber({ count: 5 }, 'count'), true);
      strictEqual(hasPropNullableNumber({ count: 0 }, 'count'), true);
      strictEqual(hasPropNullableNumber({ count: -1 }, 'count'), true);
      strictEqual(hasPropNullableNumber({ count: 3.14 }, 'count'), true);
      strictEqual(hasPropNullableNumber({ count: null }, 'count'), true);
      strictEqual(hasPropNullableNumber({ count: undefined }, 'count'), true);
    });

    it('should return false for objects with non-number property', () => {
      strictEqual(hasPropNullableNumber({ count: '5' }, 'count'), false);
      strictEqual(hasPropNullableNumber({ count: NaN }, 'count'), false);
    });

    it('should return false for objects without the property', () => {
      strictEqual(hasPropNullableNumber({}, 'count'), false);
    });
  });

  describe('hasPropNullableString', () => {
    it('should return true for objects with string, null, or undefined property', () => {
      strictEqual(hasPropNullableString({ name: 'John' }, 'name'), true);
      strictEqual(hasPropNullableString({ name: '' }, 'name'), true);
      strictEqual(hasPropNullableString({ name: '123' }, 'name'), true);
      strictEqual(hasPropNullableString({ name: null }, 'name'), true);
      strictEqual(hasPropNullableString({ name: undefined }, 'name'), true);
    });

    it('should return false for objects with non-string property', () => {
      strictEqual(hasPropNullableString({ name: 123 }, 'name'), false);
      strictEqual(hasPropNullableString({ name: true }, 'name'), false);
    });

    it('should return false for objects without the property', () => {
      strictEqual(hasPropNullableString({}, 'name'), false);
    });
  });

  describe('hasPropNullableFunction', () => {
    it('should return true for objects with function, null, or undefined property', () => {
      strictEqual(hasPropNullableFunction({ fn: () => { } }, 'fn'), true);
      strictEqual(hasPropNullableFunction({ fn: function () { } }, 'fn'), true);
      strictEqual(hasPropNullableFunction({ fn: Math.max }, 'fn'), true);
      strictEqual(hasPropNullableFunction({ fn: null }, 'fn'), true);
      strictEqual(hasPropNullableFunction({ fn: undefined }, 'fn'), true);
    });

    it('should return false for objects with non-function property', () => {
      strictEqual(hasPropNullableFunction({ fn: 'function' }, 'fn'), false);
      strictEqual(hasPropNullableFunction({ fn: 123 }, 'fn'), false);
    });

    it('should return false for objects without the property', () => {
      strictEqual(hasPropNullableFunction({}, 'fn'), false);
    });
  });

  describe('hasPropNullableArray', () => {
    it('should return true for objects with array, null, or undefined property', () => {
      strictEqual(hasPropNullableArray({ items: [] }, 'items'), true);
      strictEqual(hasPropNullableArray({ items: [1, 2, 3] }, 'items'), true);
      strictEqual(hasPropNullableArray({ items: new Array() }, 'items'), true);
      strictEqual(hasPropNullableArray({ items: null }, 'items'), true);
      strictEqual(hasPropNullableArray({ items: undefined }, 'items'), true);
    });

    it('should return false for objects with non-array property', () => {
      strictEqual(hasPropNullableArray({ items: 'array' }, 'items'), false);
      strictEqual(hasPropNullableArray({ items: { length: 3 } }, 'items'), false);
    });

    it('should return false for objects without the property', () => {
      strictEqual(hasPropNullableArray({}, 'items'), false);
    });
  });
});

describe('Assertion Functions', () => {
  describe('assertDefined', () => {
    it('should not throw for defined values', () => {
      doesNotThrow(() => assertDefined(0));
      doesNotThrow(() => assertDefined(false));
      doesNotThrow(() => assertDefined(''));
      doesNotThrow(() => assertDefined([]));
      doesNotThrow(() => assertDefined({}));
    });

    it('should throw for null and undefined', () => {
      throws(() => assertDefined(null), /value is not defined/);
      throws(() => assertDefined(undefined), /value is not defined/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertDefined(null, 'Custom message'), /Custom message/);
    });
  });

  describe('assertBoolean', () => {
    it('should not throw for boolean values', () => {
      doesNotThrow(() => assertBoolean(true));
      doesNotThrow(() => assertBoolean(false));
    });

    it('should throw for non-boolean values', () => {
      throws(() => assertBoolean(1), /value is not a boolean/);
      throws(() => assertBoolean('true'), /value is not a boolean/);
      throws(() => assertBoolean(null), /value is not a boolean/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertBoolean(1, 'Not boolean'), /Not boolean/);
    });
  });

  describe('assertNumber', () => {
    it('should not throw for valid numbers', () => {
      doesNotThrow(() => assertNumber(0));
      doesNotThrow(() => assertNumber(1));
      doesNotThrow(() => assertNumber(-1));
      doesNotThrow(() => assertNumber(3.14));
    });

    it('should throw for non-numbers and NaN', () => {
      throws(() => assertNumber('123'), /value is not a number/);
      throws(() => assertNumber(NaN), /value is not a number/);
      throws(() => assertNumber(true), /value is not a number/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertNumber('123', 'Not a number'), /Not a number/);
    });
  });

  describe('assertString', () => {
    it('should not throw for string values', () => {
      doesNotThrow(() => assertString(''));
      doesNotThrow(() => assertString('hello'));
      doesNotThrow(() => assertString('123'));
    });

    it('should throw for non-string values', () => {
      throws(() => assertString(123), /value is not a string/);
      throws(() => assertString(true), /value is not a string/);
      throws(() => assertString(null), /value is not a string/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertString(123, 'Not a string'), /Not a string/);
    });
  });

  describe('assertFunction', () => {
    it('should not throw for function values', () => {
      doesNotThrow(() => assertFunction(() => { }));
      doesNotThrow(() => assertFunction(function () { }));
      doesNotThrow(() => assertFunction(Math.max));
    });

    it('should throw for non-function values', () => {
      throws(() => assertFunction('function'), /value is not a function/);
      throws(() => assertFunction(123), /value is not a function/);
      throws(() => assertFunction(null), /value is not a function/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertFunction('fn', 'Not a function'), /Not a function/);
    });
  });

  describe('assertArray', () => {
    it('should not throw for array values', () => {
      doesNotThrow(() => assertArray([]));
      doesNotThrow(() => assertArray([1, 2, 3]));
      doesNotThrow(() => assertArray(new Array()));
    });

    it('should throw for non-array values', () => {
      throws(() => assertArray('array'), /value is not an array/);
      throws(() => assertArray({ length: 3 }), /value is not an array/);
      throws(() => assertArray(null), /value is not an array/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertArray('arr', 'Not an array'), /Not an array/);
    });
  });

  describe('assertArrayOf', () => {
    it('should not throw for arrays of correct type', () => {
      doesNotThrow(() => assertArrayOf([1, 2, 3], isNumber));
      doesNotThrow(() => assertArrayOf(['a', 'b'], isString));
      doesNotThrow(() => assertArrayOf([], isString));
    });

    it('should throw for arrays with wrong element types', () => {
      throws(() => assertArrayOf([1, 'a', 3], isNumber), /value is not an array of expected type/);
      throws(() => assertArrayOf('not array', isString), /value is not an array of expected type/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertArrayOf([1, 'a'], isNumber, 'Mixed array'), /Mixed array/);
    });
  });

  describe('assertNullableBoolean', () => {
    it('should not throw for boolean values, null, and undefined', () => {
      doesNotThrow(() => assertNullableBoolean(true));
      doesNotThrow(() => assertNullableBoolean(false));
      doesNotThrow(() => assertNullableBoolean(null));
      doesNotThrow(() => assertNullableBoolean(undefined));
    });

    it('should throw for non-boolean values', () => {
      throws(() => assertNullableBoolean(1), /value is not a nullable boolean/);
      throws(() => assertNullableBoolean('true'), /value is not a nullable boolean/);
      throws(() => assertNullableBoolean([]), /value is not a nullable boolean/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertNullableBoolean(1, 'Not nullable boolean'), /Not nullable boolean/);
    });
  });

  describe('assertNullableNumber', () => {
    it('should not throw for valid numbers, null, and undefined', () => {
      doesNotThrow(() => assertNullableNumber(0));
      doesNotThrow(() => assertNullableNumber(1));
      doesNotThrow(() => assertNullableNumber(-1));
      doesNotThrow(() => assertNullableNumber(3.14));
      doesNotThrow(() => assertNullableNumber(null));
      doesNotThrow(() => assertNullableNumber(undefined));
    });

    it('should throw for non-numbers and NaN', () => {
      throws(() => assertNullableNumber('123'), /value is not a nullable number/);
      throws(() => assertNullableNumber(NaN), /value is not a nullable number/);
      throws(() => assertNullableNumber(true), /value is not a nullable number/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertNullableNumber('123', 'Not nullable number'), /Not nullable number/);
    });
  });

  describe('assertNullableString', () => {
    it('should not throw for string values, null, and undefined', () => {
      doesNotThrow(() => assertNullableString(''));
      doesNotThrow(() => assertNullableString('hello'));
      doesNotThrow(() => assertNullableString('123'));
      doesNotThrow(() => assertNullableString(null));
      doesNotThrow(() => assertNullableString(undefined));
    });

    it('should throw for non-string values', () => {
      throws(() => assertNullableString(123), /value is not a nullable string/);
      throws(() => assertNullableString(true), /value is not a nullable string/);
      throws(() => assertNullableString([]), /value is not a nullable string/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertNullableString(123, 'Not nullable string'), /Not nullable string/);
    });
  });

  describe('assertNullableFunction', () => {
    it('should not throw for function values, null, and undefined', () => {
      doesNotThrow(() => assertNullableFunction(() => { }));
      doesNotThrow(() => assertNullableFunction(function () { }));
      doesNotThrow(() => assertNullableFunction(Math.max));
      doesNotThrow(() => assertNullableFunction(null));
      doesNotThrow(() => assertNullableFunction(undefined));
    });

    it('should throw for non-function values', () => {
      throws(() => assertNullableFunction('function'), /value is not a nullable function/);
      throws(() => assertNullableFunction(123), /value is not a nullable function/);
      throws(() => assertNullableFunction([]), /value is not a nullable function/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertNullableFunction('fn', 'Not nullable function'), /Not nullable function/);
    });
  });

  describe('assertNullableArray', () => {
    it('should not throw for array values, null, and undefined', () => {
      doesNotThrow(() => assertNullableArray([]));
      doesNotThrow(() => assertNullableArray([1, 2, 3]));
      doesNotThrow(() => assertNullableArray(new Array()));
      doesNotThrow(() => assertNullableArray(null));
      doesNotThrow(() => assertNullableArray(undefined));
    });

    it('should throw for non-array values', () => {
      throws(() => assertNullableArray('array'), /value is not a nullable array/);
      throws(() => assertNullableArray({ length: 3 }), /value is not a nullable array/);
      throws(() => assertNullableArray(123), /value is not a nullable array/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertNullableArray('arr', 'Not nullable array'), /Not nullable array/);
    });
  });
});

describe('Property Assertion Functions', () => {
  describe('assertPropDefined', () => {
    it('should not throw for objects with defined property', () => {
      doesNotThrow(() => assertPropDefined({ a: 1 }, 'a'));
      doesNotThrow(() => assertPropDefined({ a: 0 }, 'a'));
      doesNotThrow(() => assertPropDefined({ a: false }, 'a'));
    });

    it('should throw for objects with undefined/null property or missing property', () => {
      throws(() => assertPropDefined({ a: null }, 'a'), /property "a" is not defined/);
      throws(() => assertPropDefined({}, 'a'), /property "a" is not defined/);
      throws(() => assertPropDefined(null, 'a'), /property "a" is not defined/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertPropDefined({}, 'a', 'Missing prop'), /Missing prop/);
    });
  });

  describe('assertPropBoolean', () => {
    it('should not throw for objects with boolean property', () => {
      doesNotThrow(() => assertPropBoolean({ flag: true }, 'flag'));
      doesNotThrow(() => assertPropBoolean({ flag: false }, 'flag'));
    });

    it('should throw for objects with non-boolean property', () => {
      throws(() => assertPropBoolean({ flag: 1 }, 'flag'), /property "flag" is not a boolean/);
      throws(() => assertPropBoolean({}, 'flag'), /property "flag" is not a boolean/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertPropBoolean({ flag: 1 }, 'flag', 'Bad flag'), /Bad flag/);
    });
  });

  describe('assertPropNumber', () => {
    it('should not throw for objects with number property', () => {
      doesNotThrow(() => assertPropNumber({ count: 5 }, 'count'));
      doesNotThrow(() => assertPropNumber({ count: 0 }, 'count'));
    });

    it('should throw for objects with non-number property', () => {
      throws(() => assertPropNumber({ count: '5' }, 'count'), /property "count" is not a number/);
      throws(() => assertPropNumber({}, 'count'), /property "count" is not a number/);
    });
  });

  describe('assertPropString', () => {
    it('should not throw for objects with string property', () => {
      doesNotThrow(() => assertPropString({ name: 'John' }, 'name'));
      doesNotThrow(() => assertPropString({ name: '' }, 'name'));
    });

    it('should throw for objects with non-string property', () => {
      throws(() => assertPropString({ name: 123 }, 'name'), /property "name" is not a string/);
      throws(() => assertPropString({}, 'name'), /property "name" is not a string/);
    });
  });

  describe('assertPropFunction', () => {
    it('should not throw for objects with function property', () => {
      doesNotThrow(() => assertPropFunction({ fn: () => { } }, 'fn'));
      doesNotThrow(() => assertPropFunction({ fn: Math.max }, 'fn'));
    });

    it('should throw for objects with non-function property', () => {
      throws(() => assertPropFunction({ fn: 'function' }, 'fn'), /property "fn" is not a function/);
      throws(() => assertPropFunction({}, 'fn'), /property "fn" is not a function/);
    });
  });

  describe('assertPropArray', () => {
    it('should not throw for objects with array property', () => {
      doesNotThrow(() => assertPropArray({ items: [] }, 'items'));
      doesNotThrow(() => assertPropArray({ items: [1, 2] }, 'items'));
    });

    it('should throw for objects with non-array property', () => {
      throws(() => assertPropArray({ items: 'array' }, 'items'), /property "items" is not an array/);
      throws(() => assertPropArray({}, 'items'), /property "items" is not an array/);
    });
  });

  describe('assertPropArrayOf', () => {
    it('should not throw for objects with array property of correct type', () => {
      doesNotThrow(() => assertPropArrayOf({ numbers: [1, 2, 3] }, 'numbers', isNumber));
      doesNotThrow(() => assertPropArrayOf({ strings: ['a', 'b'] }, 'strings', isString));
    });

    it('should throw for objects with array property of wrong type', () => {
      throws(() => assertPropArrayOf({ mixed: [1, 'a'] }, 'mixed', isNumber),
        /property "mixed" is not an array of expected type/);
      throws(() => assertPropArrayOf({}, 'items', isString),
        /property "items" is not an array of expected type/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertPropArrayOf({ mixed: [1, 'a'] }, 'mixed', isNumber, 'Bad array'), /Bad array/);
    });
  });

  describe('assertPropNullableBoolean', () => {
    it('should not throw for objects with boolean, null, or undefined property', () => {
      doesNotThrow(() => assertPropNullableBoolean({ flag: true }, 'flag'));
      doesNotThrow(() => assertPropNullableBoolean({ flag: false }, 'flag'));
      doesNotThrow(() => assertPropNullableBoolean({ flag: null }, 'flag'));
      doesNotThrow(() => assertPropNullableBoolean({ flag: undefined }, 'flag'));
    });

    it('should throw for objects with non-boolean property', () => {
      throws(() => assertPropNullableBoolean({ flag: 1 }, 'flag'), /property "flag" is not a nullable boolean/);
      throws(() => assertPropNullableBoolean({}, 'flag'), /property "flag" is not a nullable boolean/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertPropNullableBoolean({ flag: 1 }, 'flag', 'Bad nullable flag'), /Bad nullable flag/);
    });
  });

  describe('assertPropNullableNumber', () => {
    it('should not throw for objects with number, null, or undefined property', () => {
      doesNotThrow(() => assertPropNullableNumber({ count: 5 }, 'count'));
      doesNotThrow(() => assertPropNullableNumber({ count: 0 }, 'count'));
      doesNotThrow(() => assertPropNullableNumber({ count: null }, 'count'));
      doesNotThrow(() => assertPropNullableNumber({ count: undefined }, 'count'));
    });

    it('should throw for objects with non-number property', () => {
      throws(() => assertPropNullableNumber({ count: '5' }, 'count'), /property "count" is not a nullable number/);
      throws(() => assertPropNullableNumber({}, 'count'), /property "count" is not a nullable number/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertPropNullableNumber({ count: '5' }, 'count', 'Bad nullable count'), /Bad nullable count/);
    });
  });

  describe('assertPropNullableString', () => {
    it('should not throw for objects with string, null, or undefined property', () => {
      doesNotThrow(() => assertPropNullableString({ name: 'John' }, 'name'));
      doesNotThrow(() => assertPropNullableString({ name: '' }, 'name'));
      doesNotThrow(() => assertPropNullableString({ name: null }, 'name'));
      doesNotThrow(() => assertPropNullableString({ name: undefined }, 'name'));
    });

    it('should throw for objects with non-string property', () => {
      throws(() => assertPropNullableString({ name: 123 }, 'name'), /property "name" is not a nullable string/);
      throws(() => assertPropNullableString({}, 'name'), /property "name" is not a nullable string/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertPropNullableString({ name: 123 }, 'name', 'Bad nullable name'), /Bad nullable name/);
    });
  });

  describe('assertPropNullableFunction', () => {
    it('should not throw for objects with function, null, or undefined property', () => {
      doesNotThrow(() => assertPropNullableFunction({ fn: () => { } }, 'fn'));
      doesNotThrow(() => assertPropNullableFunction({ fn: Math.max }, 'fn'));
      doesNotThrow(() => assertPropNullableFunction({ fn: null }, 'fn'));
      doesNotThrow(() => assertPropNullableFunction({ fn: undefined }, 'fn'));
    });

    it('should throw for objects with non-function property', () => {
      throws(() => assertPropNullableFunction({ fn: 'function' }, 'fn'), /property "fn" is not a nullable function/);
      throws(() => assertPropNullableFunction({}, 'fn'), /property "fn" is not a nullable function/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertPropNullableFunction({ fn: 'function' }, 'fn', 'Bad nullable fn'), /Bad nullable fn/);
    });
  });

  describe('assertPropNullableArray', () => {
    it('should not throw for objects with array, null, or undefined property', () => {
      doesNotThrow(() => assertPropNullableArray({ items: [] }, 'items'));
      doesNotThrow(() => assertPropNullableArray({ items: [1, 2] }, 'items'));
      doesNotThrow(() => assertPropNullableArray({ items: null }, 'items'));
      doesNotThrow(() => assertPropNullableArray({ items: undefined }, 'items'));
    });

    it('should throw for objects with non-array property', () => {
      throws(() => assertPropNullableArray({ items: 'array' }, 'items'), /property "items" is not a nullable array/);
      throws(() => assertPropNullableArray({}, 'items'), /property "items" is not a nullable array/);
    });

    it('should use custom error message when provided', () => {
      throws(() => assertPropNullableArray({ items: 'array' }, 'items', 'Bad nullable items'), /Bad nullable items/);
    });
  });
});

describe('Array Map Functions', () => {
  describe('isArrayMapOf', () => {
    it('should return true for arrays where predicate returns truthy for every element', () => {
      strictEqual(isArrayMapOf([1, 2, 3], (v) => typeof v === 'number'), true);
      strictEqual(isArrayMapOf(['a', 'b'], (v) => typeof v === 'string'), true);
      strictEqual(isArrayMapOf([], (v) => v), true);
    });

    it('should return false for non-arrays or when predicate returns falsy', () => {
      strictEqual(isArrayMapOf([1, '2', 3], (v) => typeof v === 'number'), false);
      strictEqual(isArrayMapOf('not array', (v) => typeof v === 'string'), false);
    });
  });

  describe('hasPropArrayMapOf', () => {
    it('should return true for objects with array property where predicate returns truthy for every element', () => {
      strictEqual(hasPropArrayMapOf({ numbers: [1, 2, 3] }, 'numbers', (v) => typeof v === 'number'), true);
      strictEqual(hasPropArrayMapOf({ empty: [] }, 'empty', (v) => v), true);
    });

    it('should return false for wrong types or missing property', () => {
      strictEqual(hasPropArrayMapOf({ mixed: [1, 'a'] }, 'mixed', (v) => typeof v === 'number'), false);
      strictEqual(hasPropArrayMapOf({}, 'items', (v) => typeof v === 'string'), false);
      strictEqual(hasPropArrayMapOf({ items: 'not array' }, 'items', (v) => typeof v === 'string'), false);
    });
  });

  describe('assertArrayMapOf', () => {
    it('should not throw for arrays where predicate returns truthy for every element', () => {
      doesNotThrow(() => assertArrayMapOf([1, 2, 3], (v) => typeof v === 'number'));
      doesNotThrow(() => assertArrayMapOf([], (v) => v));
    });

    it('should throw for arrays with wrong element types or non-arrays', () => {
      throws(() => assertArrayMapOf([1, 'a', 3], (v) => typeof v === 'number'), /value is not an array of expected type/);
      throws(() => assertArrayMapOf('not array', (v) => v), /value is not an array of expected type/);
      throws(() => assertArrayMapOf([1, 'a'], (v) => typeof v === 'number', 'Mixed map array'), /Mixed map array/);
    });
  });

  describe('assertPropArrayMapOf', () => {
    it('should not throw for object properties that are arrays whose elements pass predicate', () => {
      doesNotThrow(() => assertPropArrayMapOf({ numbers: [1, 2, 3] }, 'numbers', (v) => typeof v === 'number'));
    });

    it('should throw when property missing or wrong type', () => {
      throws(() => assertPropArrayMapOf({ mixed: [1, 'a'] }, 'mixed', (v) => typeof v === 'number'), /property "mixed" is not an array of expected type/);
      throws(() => assertPropArrayMapOf({}, 'items', (v) => typeof v === 'string'), /property "items" is not an array of expected type/);
      throws(() => assertPropArrayMapOf({ mixed: [1, 'a'] }, 'mixed', (v) => typeof v === 'number', 'Bad array map'), /Bad array map/);
    });
  });
});

describe('setPropValue', () => {
  it('should set property on defined objects', () => {
    const obj = {};
    setPropValue(obj, 'a', 42);
    strictEqual(obj.a, 42);
  });

  it('should not throw when object is null or undefined', () => {
    doesNotThrow(() => setPropValue(null, 'a', 1));
    doesNotThrow(() => setPropValue(undefined, 'a', 1));
  });
});