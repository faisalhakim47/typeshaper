// @ts-check

/**
 * @param {unknown} value
 * @returns {value is null | undefined}
 */
export function isNullable(value) {
  return value === undefined || value === null;
}

/**
 * @param {unknown} value
 * @returns {value is NonNullable<unknown>}
 */
export function isDefined(value) {
  return value !== undefined && value !== null;
}

/**
 * @param {unknown} value
 * @returns {value is boolean}
 */
export function isBoolean(value) {
  return typeof value === 'boolean';
}

/**
 * @param {unknown} value
 * @returns {value is number}
 */
export function isNumber(value) {
  return typeof value === 'number' && !Number.isNaN(value);
}

/**
 * @param {unknown} value
 * @returns {value is string}
 */
export function isString(value) {
  return typeof value === 'string';
}

/**
 * @param {unknown} value
 * @returns {value is Function}
 */
export function isFunction(value) {
  return typeof value === 'function';
}

/**
 * @template T
 * @param {new (...args: unknown[]) => T} constructor
 * @returns {(value: unknown) => value is T}
 */
export function isInstanceOf(constructor) {
  /**
   * @template T
   * @param {unknown} value
   * @returns {value is T}
   */
  return function (value) {
    return value instanceof constructor;
  };
}

/**
 * @param {unknown} value
 * @returns {value is Array<unknown>}
 */
export function isArray(value) {
  return Array.isArray(value);
}

/**
 * @template {((value: unknown) => value is any)[]} C
 * @param {C} checks
 * @returns {(value: unknown) => value is C[number] extends (v: unknown) => v is infer U ? U : never}
 */
export function check(...checks) {
  /**
   * @param {unknown} value
   * @returns {value is C[number] extends (v: unknown) => v is infer U ? U : never}
   */
  return function (value) {
    return checks.some((check) => check(value));
  };
}

/**
 * @param {unknown} value
 * @returns {value is boolean | null | undefined}
 */
export function isNullableBoolean(value) {
  return check(isNullable, isBoolean)(value);
}

/**
 * @template T
 * @param {unknown} values
 * @param {(value: unknown) => value is T} predicate
 * @returns {values is Array<T>}
 */
export function isArrayOf(values, predicate) {
  return (isArray(values) && values.every(predicate));
}

/**
 * @template T
 * @param {unknown} values
 * @param {(value: unknown) => T} predicate
 * @returns {values is Array<T>}
 */
export function isArrayMapOf(values, predicate) {
  return (isArray(values) && values.every(predicate));
}

/**
 * @param {unknown} value
 * @returns {value is number | null | undefined}
 */
export function isNullableNumber(value) {
  return check(isNullable, isNumber)(value);
}

/**
 * @param {unknown} value
 * @returns {value is string | null | undefined}
 */
export function isNullableString(value) {
  return check(isNullable, isString)(value);
}

/**
 * @param {unknown} value
 * @returns {value is Function | null | undefined}
 */
export function isNullableFunction(value) {
  return check(isNullable, isFunction)(value);
}

/**
 * @template T
 * @param {new (...args: unknown[]) => T} constructor
 * @returns {(value: unknown) => value is T | null | undefined}
 */
export function isNullableInsanceOf(constructor) {
  /**
   * @template T
   * @param {unknown} value
   * @returns {value is T | null | undefined}
   */
  return function (value) {
    return check(isNullable, isInstanceOf(constructor))(value);
  };
}

/**
 * @param {unknown} value
 * @returns {value is Array<unknown> | null | undefined}
 */
export function isNullableArray(value) {
  return check(isNullable, isArray)(value);
}

/** @typedef {string|number|symbol} PropKey */

/**
 * @template {((value: unknown) => value is any)} C
 * @template {PropKey} K
 * @param {C} check
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, C extends (v: unknown) => v is infer U ? U : never>}
 */
export function hasProp(check, value, prop) {
  return check(/** @type {Record<PropKey, unknown>} */(value)[prop]);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, unknown>}
 */
export function hasPropDefined(value, prop) {
  return hasProp(isDefined, value, prop);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, boolean>}
 */
export function hasPropBoolean(value, prop) {
  return hasProp(isBoolean, value, prop);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, number>}
 */
export function hasPropNumber(value, prop) {
  return hasProp(isNumber, value, prop);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, string>}
 */
export function hasPropString(value, prop) {
  return hasProp(isString, value, prop);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, Function>}
 */
export function hasPropFunction(value, prop) {
  return hasProp(isFunction, value, prop);
}

/**
 * @template {PropKey} K
 * @template V
 * @param {new (...args: unknown[]) => V} constructor
 * @returns {(value: unknown, prop: K) => value is Record<K, V>}
 */
export function hasPropInstanceOf(constructor) {
  /**
   * @template {PropKey} K
   * @template V
   * @param {unknown} value
   * @param {K} prop
   * @returns {value is Record<K, V>}
   */
  return function (value, prop) {
    return hasProp(isInstanceOf(constructor), value, prop);
  };
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, Array<unknown>>}
 */
export function hasPropArray(value, prop) {
  return hasPropDefined(value, prop) && isArray(value[prop]);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, boolean | null | undefined>}
 */
export function hasPropNullableBoolean(value, prop) {
  return hasProp(check(isNullable, isBoolean), value, prop);
}

/**
 * @template {PropKey} K
 * @template T
 * @param {unknown} value
 * @param {K} prop
 * @param {(value: unknown) => value is T} predicate
 * @returns {value is Record<K, Array<T>>}
 */
export function hasPropArrayOf(value, prop, predicate) {
  return hasPropArray(value, prop) &&
    isArrayOf(value[prop], predicate);
}

/**
 * @template {PropKey} K
 * @template T
 * @param {unknown} value
 * @param {K} prop
 * @param {(value: unknown) => T} predicate
 * @returns {value is Record<K, Array<T>>}
 */
export function hasPropArrayMapOf(value, prop, predicate) {
  return hasPropArray(value, prop) &&
    isArrayMapOf(value[prop], predicate);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, number | null | undefined>}
 */
export function hasPropNullableNumber(value, prop) {
  return hasProp(isNullableNumber, value, prop);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, string | null | undefined>}
 */
export function hasPropNullableString(value, prop) {
  return hasProp(isNullableString, value, prop);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, Function | null | undefined>}
 */
export function hasPropNullableFunction(value, prop) {
  return hasProp(isNullableFunction, value, prop);
}

/**
 * @template {PropKey} K
 * @template V
 * @param {new (...args: unknown[]) => V} constructor
 * @returns {(value: unknown, prop: K) => value is Record<K, V | null | undefined>}
 */
export function hasPropNullableInstanceOf(constructor) {
  /**
   * @template {PropKey} K
   * @template V
   * @param {unknown} value
   * @param {K} prop
   * @returns {value is Record<K, V | null | undefined>}
   */
  return function (value, prop) {
    return hasProp(isNullableInsanceOf(constructor), value, prop);
  };
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, Array<unknown> | null | undefined>}
 */
export function hasPropNullableArray(value, prop) {
  return hasProp(isNullableArray, value, prop);
}

/**
 * @template {(value: unknown) => value is any} C
 * @param {C} check
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is C extends (v: unknown) => v is infer U ? U : never}
 */
export function assert(check, value, message) {
  if (!check(value)) {
    throw new Error(message || 'value is not of expected type');
  }
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is NonNullable<unknown>}
 */
export function assertDefined(value, message) {
  assert(isDefined, value, message || 'value is not defined');
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is boolean}
 */
export function assertBoolean(value, message) {
  assert(isBoolean, value, message || 'value is not a boolean');
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is number}
 */
export function assertNumber(value, message) {
  assert(isNumber, value, message || 'value is not a number');
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is string}
 */
export function assertString(value, message) {
  assert(isString, value, message || 'value is not a string');
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is Function}
 */
export function assertFunction(value, message) {
  assert(isFunction, value, message || 'value is not a function');
}

/**
 * @template T
 * @param {new (...args: unknown[]) => T} constructor
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is T}
 */
export function assertInstanceOf(constructor, value, message) {
  assert(isInstanceOf(constructor), value, message || 'value is not an instance of expected class');
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is Array<unknown>}
 */
export function assertArray(value, message) {
  assert(isArray, value, message || 'value is not an array');
}

/**
 * @template T
 * @param {unknown} values
 * @param {(value: unknown) => value is T} predicate
 * @param {string} [message]
 * @returns {asserts values is Array<T>}
 */
export function assertArrayOf(values, predicate, message) {
  if (!isArrayOf(values, predicate)) {
    throw new Error(message || 'value is not an array of expected type');
  }
}

/**
 * @template T
 * @param {unknown} values
 * @param {(value: unknown) => T} predicate
 * @param {string} [message]
 * @returns {asserts values is Array<T>}
 */
export function assertArrayMapOf(values, predicate, message) {
  if (!isArrayMapOf(values, predicate)) {
    throw new Error(message || 'value is not an array of expected type');
  }
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is boolean | null | undefined}
 */
export function assertNullableBoolean(value, message) {
  assert(isNullableBoolean, value, message || 'value is not a nullable boolean');
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is number | null | undefined}
 */
export function assertNullableNumber(value, message) {
  assert(isNullableNumber, value, message || 'value is not a nullable number');
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is string | null | undefined}
 */
export function assertNullableString(value, message) {
  assert(isNullableString, value, message || 'value is not a nullable string');
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is Function | null | undefined}
 */
export function assertNullableFunction(value, message) {
  assert(isNullableFunction, value, message || 'value is not a nullable function');
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is Array<unknown> | null | undefined}
 */
export function assertNullableArray(value, message) {
  assert(isNullableArray, value, message || 'value is not a nullable array');
}

/**
 * @template {PropKey} K
 * @template {(value: unknown) => value is any} C
 * @param {C} check
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, C extends (v: unknown) => v is infer U ? U : never>}
 */
export function assertProp(check, value, prop, message) {
  if (!hasProp(check, value, prop)) {
    throw new Error(message || `property "${String(prop)}" is not of expected type`);
  }
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, unknown>}
 */
export function assertPropDefined(value, prop, message) {
  assertProp(isDefined, value, prop, message || `property "${String(prop)}" is not defined`);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, boolean>}
 */
export function assertPropBoolean(value, prop, message) {
  assertProp(isBoolean, value, prop, message || `property "${String(prop)}" is not a boolean`);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, number>}
 */
export function assertPropNumber(value, prop, message) {
  assertProp(isNumber, value, prop, message || `property "${String(prop)}" is not a number`);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, string>}
 */
export function assertPropString(value, prop, message) {
  assertProp(isString, value, prop, message || `property "${String(prop)}" is not a string`);
}


/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, Function>}
 */
export function assertPropFunction(value, prop, message) {
  assertProp(isFunction, value, prop, message || `property "${String(prop)}" is not a function`);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, Array<unknown>>}
 */
export function assertPropArray(value, prop, message) {
  assertProp(isArray, value, prop, message || `property "${String(prop)}" is not an array`);
}

/**
 * @template {PropKey} K
 * @template T
 * @param {unknown} value
 * @param {K} prop
 * @param {(value: unknown) => value is T} predicate
 * @param {string} [message]
 * @returns {asserts value is Record<K, Array<T>>}
 */
export function assertPropArrayOf(value, prop, predicate, message) {
  if (!hasPropArrayOf(value, prop, predicate)) {
    throw new Error(
      message || `property "${String(prop)}" is not an array of expected type`
    );
  }
}

/**
 * @template {PropKey} K
 * @template T
 * @param {unknown} value
 * @param {K} prop
 * @param {(value: unknown) => T} predicate
 * @param {string} [message]
 * @returns {asserts value is Record<K, Array<T>>}
 */
export function assertPropArrayMapOf(value, prop, predicate, message) {
  if (!hasPropArrayMapOf(value, prop, predicate)) {
    throw new Error(
      message || `property "${String(prop)}" is not an array of expected type`
    );
  }
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, boolean | null | undefined>}
 */
export function assertPropNullableBoolean(value, prop, message) {
  assertProp(isNullableBoolean, value, prop, message || `property "${String(prop)}" is not a nullable boolean`);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, number | null | undefined>}
 */
export function assertPropNullableNumber(value, prop, message) {
  assertProp(isNullableNumber, value, prop, message || `property "${String(prop)}" is not a nullable number`);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, string | null | undefined>}
 */
export function assertPropNullableString(value, prop, message) {
  assertProp(isNullableString, value, prop, message || `property "${String(prop)}" is not a nullable string`);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, Function | null | undefined>}
 */
export function assertPropNullableFunction(value, prop, message) {
  assertProp(isNullableFunction, value, prop, message || `property "${String(prop)}" is not a nullable function`);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, Array<unknown> | null | undefined>}
 */
export function assertPropNullableArray(value, prop, message) {
  assertProp(isNullableArray, value, prop, message || `property "${String(prop)}" is not a nullable array`);
}

/**
 * @template {PropKey} K
 * @template V
 * @param {unknown} object
 * @param {K} prop
 * @param {V} value
 * @returns {asserts object is Record<K, V>}
 */
export function setPropValue(object, prop, value) {
  if (isDefined(object)) {
    (/** @type {any} */ (object))[prop] = value;
  }
}
