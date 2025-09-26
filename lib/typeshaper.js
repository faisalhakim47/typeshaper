// @ts-check

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
 * @returns {value is boolean | null | undefined}
 */
export function isNullableBoolean(value) {
  return value === null || value === undefined || isBoolean(value);
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
 * @returns {value is number | null | undefined}
 */
export function isNullableNumber(value) {
  return value === null || value === undefined || isNumber(value);
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
 * @returns {value is string | null | undefined}
 */
export function isNullableString(value) {
  return value === null || value === undefined || isString(value);
}

/**
 * @param {unknown} value
 * @returns {value is Function}
 */
export function isFunction(value) {
  return typeof value === 'function';
}

/**
 * @param {unknown} value
 * @returns {value is Function | null | undefined}
 */
export function isNullableFunction(value) {
  return value === null || value === undefined || isFunction(value);
}

/**
 * @param {unknown} value
 * @returns {value is Array<unknown>}
 */
export function isArray(value) {
  return Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {value is Array<unknown> | null | undefined}
 */
export function isNullableArray(value) {
  return value === null || value === undefined || Array.isArray(value);
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

/** @typedef {string|number|symbol} PropKey */

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, unknown>}
 */
export function hasPropDefined(value, prop) {
  return (
    isDefined(value) &&
    typeof value === 'object' &&
    prop in value &&
    isDefined(/** @type {Record<K, unknown>} */(value)[prop])
  );
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, boolean>}
 */
export function hasPropBoolean(value, prop) {
  return hasPropDefined(value, prop) && isBoolean(value[prop]);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, boolean | null | undefined>}
 */
export function hasPropNullableBoolean(value, prop) {
  return (
    isDefined(value) &&
    typeof value === 'object' &&
    prop in value &&
    isNullableBoolean(/** @type {Record<K, unknown>} */(value)[prop])
  );
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, number>}
 */
export function hasPropNumber(value, prop) {
  return hasPropDefined(value, prop) && isNumber(value[prop]);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, number | null | undefined>}
 */
export function hasPropNullableNumber(value, prop) {
  return (
    isDefined(value) &&
    typeof value === 'object' &&
    prop in value &&
    isNullableNumber(/** @type {Record<K, unknown>} */(value)[prop])
  );
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, string>}
 */
export function hasPropString(value, prop) {
  return hasPropDefined(value, prop) && isString(value[prop]);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, string | null | undefined>}
 */
export function hasPropNullableString(value, prop) {
  return (
    isDefined(value) &&
    typeof value === 'object' &&
    prop in value &&
    isNullableString(/** @type {Record<K, unknown>} */(value)[prop])
  );
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, Function>}
 */
export function hasPropFunction(value, prop) {
  return hasPropDefined(value, prop) && isFunction(value[prop]);
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, Function | null | undefined>}
 */
export function hasPropNullableFunction(value, prop) {
  return (
    isDefined(value) &&
    typeof value === 'object' &&
    prop in value &&
    isNullableFunction(/** @type {Record<K, unknown>} */(value)[prop])
  );
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
 * @returns {value is Record<K, Array<unknown> | null | undefined>}
 */
export function hasPropNullableArray(value, prop) {
  return (
    isDefined(value) &&
    typeof value === 'object' &&
    prop in value &&
    isNullableArray(/** @type {Record<K, unknown>} */(value)[prop])
  );
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
  return hasPropDefined(value, prop) &&
    isArray(value[prop]) &&
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
  return hasPropDefined(value, prop) &&
    isArray(value[prop]) &&
    isArrayMapOf(value[prop], predicate);
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is NonNullable<unknown>}
 */
export function assertDefined(value, message) {
  if (!isDefined(value)) {
    throw new Error(message || 'value is not defined');
  }
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is boolean}
 */
export function assertBoolean(value, message) {
  if (!isBoolean(value)) {
    throw new Error(message || 'value is not a boolean');
  }
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is boolean | null | undefined}
 */
export function assertNullableBoolean(value, message) {
  if (!isNullableBoolean(value)) {
    throw new Error(message || 'value is not a nullable boolean');
  }
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is number}
 */
export function assertNumber(value, message) {
  if (!isNumber(value)) {
    throw new Error(message || 'value is not a number');
  }
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is number | null | undefined}
 */
export function assertNullableNumber(value, message) {
  if (!isNullableNumber(value)) {
    throw new Error(message || 'value is not a nullable number');
  }
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is string}
 */
export function assertString(value, message) {
  if (!isString(value)) {
    throw new Error(message || 'value is not a string');
  }
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is string | null | undefined}
 */
export function assertNullableString(value, message) {
  if (!isNullableString(value)) {
    throw new Error(message || 'value is not a nullable string');
  }
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is Function}
 */
export function assertFunction(value, message) {
  if (!isFunction(value)) {
    throw new Error(message || 'value is not a function');
  }
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is Function | null | undefined}
 */
export function assertNullableFunction(value, message) {
  if (!isNullableFunction(value)) {
    throw new Error(message || 'value is not a nullable function');
  }
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is Array<unknown>}
 */
export function assertArray(value, message) {
  if (!isArray(value)) {
    throw new Error(message || 'value is not an array');
  }
}

/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is Array<unknown> | null | undefined}
 */
export function assertNullableArray(value, message) {
  if (!isNullableArray(value)) {
    throw new Error(message || 'value is not a nullable array');
  }
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
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, unknown>}
 */
export function assertPropDefined(value, prop, message) {
  if (!hasPropDefined(value, prop)) {
    throw new Error(message || `property "${String(prop)}" is not defined`);
  }
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, boolean>}
 */
export function assertPropBoolean(value, prop, message) {
  if (!hasPropBoolean(value, prop)) {
    throw new Error(message || `property "${String(prop)}" is not a boolean`);
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
  if (!hasPropNullableBoolean(value, prop)) {
    throw new Error(message || `property "${String(prop)}" is not a nullable boolean`);
  }
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, number>}
 */
export function assertPropNumber(value, prop, message) {
  if (!hasPropNumber(value, prop)) {
    throw new Error(message || `property "${String(prop)}" is not a number`);
  }
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, number | null | undefined>}
 */
export function assertPropNullableNumber(value, prop, message) {
  if (!hasPropNullableNumber(value, prop)) {
    throw new Error(message || `property "${String(prop)}" is not a nullable number`);
  }
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, string>}
 */
export function assertPropString(value, prop, message) {
  if (!hasPropString(value, prop)) {
    throw new Error(message || `property "${String(prop)}" is not a string`);
  }
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, string | null | undefined>}
 */
export function assertPropNullableString(value, prop, message) {
  if (!hasPropNullableString(value, prop)) {
    throw new Error(message || `property "${String(prop)}" is not a nullable string`);
  }
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, Function>}
 */
export function assertPropFunction(value, prop, message) {
  if (!hasPropFunction(value, prop)) {
    throw new Error(message || `property "${String(prop)}" is not a function`);
  }
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, Function | null | undefined>}
 */
export function assertPropNullableFunction(value, prop, message) {
  if (!hasPropNullableFunction(value, prop)) {
    throw new Error(message || `property "${String(prop)}" is not a nullable function`);
  }
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, Array<unknown>>}
 */
export function assertPropArray(value, prop, message) {
  if (!hasPropArray(value, prop)) {
    throw new Error(message || `property "${String(prop)}" is not an array`);
  }
}

/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, Array<unknown> | null | undefined>}
 */
export function assertPropNullableArray(value, prop, message) {
  if (!hasPropNullableArray(value, prop)) {
    throw new Error(message || `property "${String(prop)}" is not a nullable array`);
  }
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
