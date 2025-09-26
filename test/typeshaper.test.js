// @ts-check
import { describe, it } from 'node:test';
import {
  ok,
  notEqual,
  equal,
  notDeepEqual,
  throws,
  doesNotThrow,
} from 'node:assert/strict';
import {
  isNullable,
  isDefined,
  isBoolean,
  isNumber,
  isString,
  isFunction,
  isInstanceOf,
  isArray,
  check,
  isNullableBoolean,
  isArrayOf,
  isArrayMapOf,
  isNullableNumber,
  isNullableString,
  isNullableFunction,
  isNullableInsanceOf,
  isNullableArray,
  hasProp,
  hasPropDefined,
  hasPropBoolean,
  hasPropNumber,
  hasPropString,
  hasPropFunction,
  hasPropInstanceOf,
  hasPropArray,
  hasPropNullableBoolean,
  hasPropArrayOf,
  hasPropArrayMapOf,
  hasPropNullableNumber,
  hasPropNullableString,
  hasPropNullableFunction,
  hasPropNullableInstanceOf,
  hasPropNullableArray,
  assert,
  assertDefined,
  assertBoolean,
  assertNumber,
  assertString,
  assertFunction,
  assertInstanceOf,
  assertArray,
  assertArrayOf,
  assertArrayMapOf,
  assertNullableBoolean,
  assertNullableNumber,
  assertNullableString,
  assertNullableFunction,
  assertNullableArray,
  assertProp,
  assertPropDefined,
  assertPropBoolean,
  assertPropNumber,
  assertPropString,
  assertPropFunction,
  assertPropArray,
  assertPropArrayOf,
  assertPropArrayMapOf,
  assertPropNullableBoolean,
  assertPropNullableNumber,
  assertPropNullableString,
  assertPropNullableFunction,
  assertPropNullableArray,
  setPropValue,
} from '../lib/typeshaper.js';

describe('Basic type checkers', () => {
  describe('isNullable', () => {
    it('should return true for null', () => {
      ok(isNullable(null));
    });

    it('should return true for undefined', () => {
      ok(isNullable(undefined));
    });

    it('should return false for other values', () => {
      ok(!isNullable(0));
      ok(!isNullable(''));
      ok(!isNullable(false));
      ok(!isNullable([]));
      ok(!isNullable({}));
    });
  });

  describe('isDefined', () => {
    it('should return false for null and undefined', () => {
      ok(!isDefined(null));
      ok(!isDefined(undefined));
    });

    it('should return true for other values', () => {
      ok(isDefined(0));
      ok(isDefined(''));
      ok(isDefined(false));
      ok(isDefined([]));
      ok(isDefined({}));
    });
  });

  describe('isBoolean', () => {
    it('should return true for boolean values', () => {
      ok(isBoolean(true));
      ok(isBoolean(false));
    });

    it('should return false for non-boolean values', () => {
      ok(!isBoolean(null));
      ok(!isBoolean(undefined));
      ok(!isBoolean(0));
      ok(!isBoolean(1));
      ok(!isBoolean('true'));
      ok(!isBoolean([]));
      ok(!isBoolean({}));
    });
  });

  describe('isNumber', () => {
    it('should return true for valid numbers', () => {
      ok(isNumber(0));
      ok(isNumber(1));
      ok(isNumber(-1));
      ok(isNumber(3.14));
      ok(isNumber(Infinity));
      ok(isNumber(-Infinity));
    });

    it('should return false for NaN', () => {
      ok(!isNumber(NaN));
    });

    it('should return false for non-number values', () => {
      ok(!isNumber(null));
      ok(!isNumber(undefined));
      ok(!isNumber('123'));
      ok(!isNumber(true));
      ok(!isNumber([]));
      ok(!isNumber({}));
    });
  });

  describe('isString', () => {
    it('should return true for string values', () => {
      ok(isString(''));
      ok(isString('hello'));
      ok(isString('123'));
    });

    it('should return false for non-string values', () => {
      ok(!isString(null));
      ok(!isString(undefined));
      ok(!isString(123));
      ok(!isString(true));
      ok(!isString([]));
      ok(!isString({}));
    });
  });

  describe('isFunction', () => {
    it('should return true for functions', () => {
      ok(isFunction(() => {}));
      ok(isFunction(function() {}));
      ok(isFunction(Array));
      ok(isFunction(console.log));
    });

    it('should return false for non-function values', () => {
      ok(!isFunction(null));
      ok(!isFunction(undefined));
      ok(!isFunction(123));
      ok(!isFunction('function'));
      ok(!isFunction([]));
      ok(!isFunction({}));
    });
  });

  describe('isArray', () => {
    it('should return true for arrays', () => {
      ok(isArray([]));
      ok(isArray([1, 2, 3]));
      ok(isArray(new Array()));
    });

    it('should return false for non-array values', function() {
      ok(!isArray(null));
      ok(!isArray(undefined));
      ok(!isArray(123));
      ok(!isArray('array'));
      ok(!isArray({}));
      ok(!isArray(arguments));
    });
  });

  describe('isInstanceOf', () => {
    class TestClass {}

    it('should return a function that checks instanceof', () => {
      const checker = isInstanceOf(TestClass);
      ok(typeof checker === 'function');
    });

    it('should correctly identify instances', () => {
      const checker = isInstanceOf(TestClass);
      const instance = new TestClass();
      ok(checker(instance));
    });

    it('should return false for non-instances', () => {
      const checker = isInstanceOf(TestClass);
      ok(!checker({}));
      ok(!checker(null));
      ok(!checker('test'));
    });

    it('should work with built-in constructors', () => {
      const dateChecker = isInstanceOf(Date);
      ok(dateChecker(new Date()));
      ok(!dateChecker('2023-01-01'));
    });
  });
});

describe('Composite type checkers', () => {
  describe('check', () => {
    it('should return true if any check passes', () => {
      const checker = check(isString, isNumber);
      ok(checker('test'));
      ok(checker(123));
    });

    it('should return false if no check passes', () => {
      const checker = check(isString, isNumber);
      ok(!checker(true));
      ok(!checker([]));
      ok(!checker(null));
    });
  });

  describe('isNullableBoolean', () => {
    it('should return true for boolean values', () => {
      ok(isNullableBoolean(true));
      ok(isNullableBoolean(false));
    });

    it('should return true for null and undefined', () => {
      ok(isNullableBoolean(null));
      ok(isNullableBoolean(undefined));
    });

    it('should return false for other values', () => {
      ok(!isNullableBoolean(0));
      ok(!isNullableBoolean('true'));
      ok(!isNullableBoolean([]));
    });
  });

  describe('isNullableNumber', () => {
    it('should return true for numbers', () => {
      ok(isNullableNumber(0));
      ok(isNullableNumber(123));
      ok(isNullableNumber(3.14));
    });

    it('should return true for null and undefined', () => {
      ok(isNullableNumber(null));
      ok(isNullableNumber(undefined));
    });

    it('should return false for other values', () => {
      ok(!isNullableNumber('123'));
      ok(!isNullableNumber(true));
      ok(!isNullableNumber([]));
    });
  });

  describe('isNullableString', () => {
    it('should return true for strings', () => {
      ok(isNullableString(''));
      ok(isNullableString('hello'));
    });

    it('should return true for null and undefined', () => {
      ok(isNullableString(null));
      ok(isNullableString(undefined));
    });

    it('should return false for other values', () => {
      ok(!isNullableString(123));
      ok(!isNullableString(true));
      ok(!isNullableString([]));
    });
  });

  describe('isNullableFunction', () => {
    it('should return true for functions', () => {
      ok(isNullableFunction(() => {}));
      ok(isNullableFunction(console.log));
    });

    it('should return true for null and undefined', () => {
      ok(isNullableFunction(null));
      ok(isNullableFunction(undefined));
    });

    it('should return false for other values', () => {
      ok(!isNullableFunction(123));
      ok(!isNullableFunction('function'));
      ok(!isNullableFunction([]));
    });
  });

  describe('isNullableArray', () => {
    it('should return true for arrays', () => {
      ok(isNullableArray([]));
      ok(isNullableArray([1, 2, 3]));
    });

    it('should return true for null and undefined', () => {
      ok(isNullableArray(null));
      ok(isNullableArray(undefined));
    });

    it('should return false for other values', () => {
      ok(!isNullableArray(123));
      ok(!isNullableArray('array'));
      ok(!isNullableArray({}));
    });
  });

  describe('isArrayOf', () => {
    it('should return true for arrays where all elements match predicate', () => {
      ok(isArrayOf([1, 2, 3], isNumber));
      ok(isArrayOf(['a', 'b', 'c'], isString));
      ok(isArrayOf([], isNumber));
    });

    it('should return false for arrays with mismatched elements', () => {
      ok(!isArrayOf([1, 2, 'three'], isNumber));
      ok(!isArrayOf(['a', 2, 'c'], isString));
    });

    it('should return false for non-arrays', () => {
      ok(!isArrayOf('not array', isString));
      ok(!isArrayOf(null, isString));
    });
  });

  describe('isArrayMapOf', () => {
    it('should return true for arrays where predicate returns truthy for all elements', () => {
      ok(isArrayMapOf([1, 2, 3], (x) => {
        assertNumber(x);
        return x;
      }));
      ok(isArrayMapOf(['a', 'b'], (x) => typeof x === 'string'));
      ok(isArrayMapOf([], () => false));
    });

    it('should return false for non-arrays', () => {
      ok(!isArrayMapOf('not array', () => true));
    });
  });
});

describe('Property checkers', () => {
  describe('hasProp', () => {
    it('should check if object has property with correct type', () => {
      const obj = { name: 'test', age: 25 };
      ok(hasProp(isString, obj, 'name'));
      ok(hasProp(isNumber, obj, 'age'));
    });

    it('should return false for wrong type', () => {
      const obj = { name: 'test' };
      ok(!hasProp(isNumber, obj, 'name'));
    });

    it('should return false for missing property', () => {
      const obj = {};
      ok(!hasProp(isString, obj, 'name'));
    });
  });

  describe('hasPropDefined', () => {
    it('should return true for defined properties', () => {
      const obj = { name: 'test', count: 0, flag: false };
      ok(hasPropDefined(obj, 'name'));
      ok(hasPropDefined(obj, 'count'));
      ok(hasPropDefined(obj, 'flag'));
    });

    it('should return false for null/undefined properties', () => {
      const obj = { name: null, age: undefined };
      ok(!hasPropDefined(obj, 'name'));
      ok(!hasPropDefined(obj, 'age'));
    });
  });

  describe('hasPropBoolean', () => {
    it('should return true for boolean properties', () => {
      const obj = { flag: true, enabled: false };
      ok(hasPropBoolean(obj, 'flag'));
      ok(hasPropBoolean(obj, 'enabled'));
    });

    it('should return false for non-boolean properties', () => {
      const obj = { flag: 'true', count: 1 };
      ok(!hasPropBoolean(obj, 'flag'));
      ok(!hasPropBoolean(obj, 'count'));
    });
  });

  describe('hasPropNumber', () => {
    it('should return true for number properties', () => {
      const obj = { age: 25, score: 3.14, zero: 0 };
      ok(hasPropNumber(obj, 'age'));
      ok(hasPropNumber(obj, 'score'));
      ok(hasPropNumber(obj, 'zero'));
    });

    it('should return false for non-number properties', () => {
      const obj = { age: '25', score: NaN };
      ok(!hasPropNumber(obj, 'age'));
      ok(!hasPropNumber(obj, 'score'));
    });
  });

  describe('hasPropString', () => {
    it('should return true for string properties', () => {
      const obj = { name: 'test', empty: '' };
      ok(hasPropString(obj, 'name'));
      ok(hasPropString(obj, 'empty'));
    });

    it('should return false for non-string properties', () => {
      const obj = { name: 123, flag: true };
      ok(!hasPropString(obj, 'name'));
      ok(!hasPropString(obj, 'flag'));
    });
  });

  describe('hasPropFunction', () => {
    it('should return true for function properties', () => {
      const obj = { method: () => {}, fn: console.log };
      ok(hasPropFunction(obj, 'method'));
      ok(hasPropFunction(obj, 'fn'));
    });

    it('should return false for non-function properties', () => {
      const obj = { method: 'function', fn: null };
      ok(!hasPropFunction(obj, 'method'));
      ok(!hasPropFunction(obj, 'fn'));
    });
  });

  describe('hasPropInstanceOf', () => {
    class TestClass {}

    it('should return a function that checks property instanceof', () => {
      const checker = hasPropInstanceOf(TestClass);
      ok(typeof checker === 'function');
    });

    it('should correctly check property instances', () => {
      const checker = hasPropInstanceOf(Date);
      const obj = { created: new Date(), name: 'test' };
      ok(checker(obj, 'created'));
      ok(!checker(obj, 'name'));
    });
  });

  describe('hasPropArray', () => {
    it('should return true for array properties', () => {
      const obj = { items: [1, 2, 3], empty: [] };
      ok(hasPropArray(obj, 'items'));
      ok(hasPropArray(obj, 'empty'));
    });

    it('should return false for non-array properties', () => {
      const obj = { items: 'array', count: 3 };
      ok(!hasPropArray(obj, 'items'));
      ok(!hasPropArray(obj, 'count'));
    });
  });

  describe('hasPropArrayOf', () => {
    it('should check if property is array of specific type', () => {
      const obj = { numbers: [1, 2, 3], strings: ['a', 'b'] };
      ok(hasPropArrayOf(obj, 'numbers', isNumber));
      ok(hasPropArrayOf(obj, 'strings', isString));
    });

    it('should return false for mixed arrays', () => {
      const obj = { mixed: [1, 'two', 3] };
      ok(!hasPropArrayOf(obj, 'mixed', isNumber));
    });
  });

  describe('nullable property checkers', () => {
    describe('hasPropNullableBoolean', () => {
      it('should accept boolean or null/undefined', () => {
        const obj = { flag: true, maybe: null, undef: undefined };
        ok(hasPropNullableBoolean(obj, 'flag'));
        ok(hasPropNullableBoolean(obj, 'maybe'));
        ok(hasPropNullableBoolean(obj, 'undef'));
      });
    });

    describe('hasPropNullableNumber', () => {
      it('should accept number or null/undefined', () => {
        const obj = { count: 5, maybe: null, undef: undefined };
        ok(hasPropNullableNumber(obj, 'count'));
        ok(hasPropNullableNumber(obj, 'maybe'));
        ok(hasPropNullableNumber(obj, 'undef'));
      });
    });

    describe('hasPropNullableString', () => {
      it('should accept string or null/undefined', () => {
        const obj = { name: 'test', maybe: null, undef: undefined };
        ok(hasPropNullableString(obj, 'name'));
        ok(hasPropNullableString(obj, 'maybe'));
        ok(hasPropNullableString(obj, 'undef'));
      });
    });
  });
});

describe('Assert functions', () => {
  describe('assert', () => {
    it('should not throw for valid values', () => {
      doesNotThrow(() => assert(isString, 'test'));
      doesNotThrow(() => assert(isNumber, 123));
    });

    it('should throw for invalid values', () => {
      throws(() => assert(isString, 123));
      throws(() => assert(isNumber, 'test'));
    });

    it('should use custom error message', () => {
      throws(
        () => assert(isString, 123, 'Custom error'),
        /Custom error/
      );
    });
  });

  describe('assertDefined', () => {
    it('should not throw for defined values', () => {
      doesNotThrow(() => assertDefined(0));
      doesNotThrow(() => assertDefined(''));
      doesNotThrow(() => assertDefined(false));
    });

    it('should throw for null and undefined', () => {
      throws(() => assertDefined(null));
      throws(() => assertDefined(undefined));
    });
  });

  describe('assertBoolean', () => {
    it('should not throw for booleans', () => {
      doesNotThrow(() => assertBoolean(true));
      doesNotThrow(() => assertBoolean(false));
    });

    it('should throw for non-booleans', () => {
      throws(() => assertBoolean(0));
      throws(() => assertBoolean('true'));
    });
  });

  describe('assertNumber', () => {
    it('should not throw for numbers', () => {
      doesNotThrow(() => assertNumber(0));
      doesNotThrow(() => assertNumber(123));
      doesNotThrow(() => assertNumber(3.14));
    });

    it('should throw for non-numbers', () => {
      throws(() => assertNumber('123'));
      throws(() => assertNumber(NaN));
    });
  });

  describe('assertString', () => {
    it('should not throw for strings', () => {
      doesNotThrow(() => assertString(''));
      doesNotThrow(() => assertString('test'));
    });

    it('should throw for non-strings', () => {
      throws(() => assertString(123));
      throws(() => assertString(true));
    });
  });

  describe('assertFunction', () => {
    it('should not throw for functions', () => {
      doesNotThrow(() => assertFunction(() => {}));
      doesNotThrow(() => assertFunction(console.log));
    });

    it('should throw for non-functions', () => {
      throws(() => assertFunction('function'));
      throws(() => assertFunction({}));
    });
  });

  describe('assertInstanceOf', () => {
    class TestClass {}

    it('should not throw for correct instances', () => {
      const instance = new TestClass();
      doesNotThrow(() => assertInstanceOf(TestClass, instance));
    });

    it('should throw for incorrect instances', () => {
      throws(() => assertInstanceOf(TestClass, {}));
      throws(() => assertInstanceOf(Date, 'not a date'));
    });
  });

  describe('assertArray', () => {
    it('should not throw for arrays', () => {
      doesNotThrow(() => assertArray([]));
      doesNotThrow(() => assertArray([1, 2, 3]));
    });

    it('should throw for non-arrays', () => {
      throws(() => assertArray('not array'));
      throws(() => assertArray({}));
    });
  });

  describe('assertArrayOf', () => {
    it('should not throw for valid typed arrays', () => {
      doesNotThrow(() => assertArrayOf([1, 2, 3], isNumber));
      doesNotThrow(() => assertArrayOf(['a', 'b'], isString));
    });

    it('should throw for invalid arrays', () => {
      throws(() => assertArrayOf([1, 'two'], isNumber));
      throws(() => assertArrayOf('not array', isNumber));
    });
  });

  describe('property assertions', () => {
    describe('assertProp', () => {
      it('should not throw for valid property types', () => {
        const obj = { name: 'test', age: 25 };
        doesNotThrow(() => assertProp(isString, obj, 'name'));
        doesNotThrow(() => assertProp(isNumber, obj, 'age'));
      });

      it('should throw for invalid property types', () => {
        const obj = { name: 'test' };
        throws(() => assertProp(isNumber, obj, 'name'));
        throws(() => assertProp(isString, obj, 'missing'));
      });
    });

    describe('assertPropDefined', () => {
      it('should not throw for defined properties', () => {
        const obj = { name: 'test', count: 0 };
        doesNotThrow(() => assertPropDefined(obj, 'name'));
        doesNotThrow(() => assertPropDefined(obj, 'count'));
      });

      it('should throw for undefined properties', () => {
        const obj = { name: null };
        throws(() => assertPropDefined(obj, 'name'));
        throws(() => assertPropDefined(obj, 'missing'));
      });
    });

    describe('assertPropBoolean', () => {
      it('should not throw for boolean properties', () => {
        const obj = { flag: true };
        doesNotThrow(() => assertPropBoolean(obj, 'flag'));
      });

      it('should throw for non-boolean properties', () => {
        const obj = { flag: 'true' };
        throws(() => assertPropBoolean(obj, 'flag'));
      });
    });

    describe('assertPropArray', () => {
      it('should not throw for array properties', () => {
        const obj = { items: [1, 2, 3] };
        doesNotThrow(() => assertPropArray(obj, 'items'));
      });

      it('should throw for non-array properties', () => {
        const obj = { items: 'not array' };
        throws(() => assertPropArray(obj, 'items'));
      });
    });
  });
});

describe('Utility functions', () => {
  describe('setPropValue', () => {
    it('should set property value on object', () => {
      const obj = {};
      setPropValue(obj, 'name', 'test');
      equal(obj.name, 'test');
    });

    it('should overwrite existing properties', () => {
      const obj = { name: 'old' };
      setPropValue(obj, 'name', 'new');
      equal(obj.name, 'new');
    });

    it('should throw for null/undefined objects', () => {
      throws(() => setPropValue(null, 'prop', 'value'));
      throws(() => setPropValue(undefined, 'prop', 'value'));
    });
  });
});
