/**
 * @param {unknown} value
 * @returns {value is null | undefined}
 */
export function isNullable(value: unknown): value is null | undefined;
/**
 * @param {unknown} value
 * @returns {value is NonNullable<unknown>}
 */
export function isDefined(value: unknown): value is NonNullable<unknown>;
/**
 * @param {unknown} value
 * @returns {value is boolean}
 */
export function isBoolean(value: unknown): value is boolean;
/**
 * @param {unknown} value
 * @returns {value is number}
 */
export function isNumber(value: unknown): value is number;
/**
 * @param {unknown} value
 * @returns {value is string}
 */
export function isString(value: unknown): value is string;
/**
 * @param {unknown} value
 * @returns {value is Function}
 */
export function isFunction(value: unknown): value is Function;
/**
 * @template T
 * @param {new (...args: unknown[]) => T} constructor
 * @returns {(value: unknown) => value is T}
 */
export function isInstanceOf<T>(constructor: new (...args: unknown[]) => T): (value: unknown) => value is T;
/**
 * @param {unknown} value
 * @returns {value is Array<unknown>}
 */
export function isArray(value: unknown): value is Array<unknown>;
/**
 * @template {((value: unknown) => value is any)[]} C
 * @param {C} checks
 * @returns {(value: unknown) => value is C[number] extends (v: unknown) => v is infer U ? U : never}
 */
export function check<C extends ((value: unknown) => value is any)[]>(...checks: C): (value: unknown) => value is C[number] extends (v: unknown) => v is infer U ? U : never;
/**
 * @param {unknown} value
 * @returns {value is boolean | null | undefined}
 */
export function isNullableBoolean(value: unknown): value is boolean | null | undefined;
/**
 * @template T
 * @param {unknown} values
 * @param {(value: unknown) => value is T} predicate
 * @returns {values is Array<T>}
 */
export function isArrayOf<T>(values: unknown, predicate: (value: unknown) => value is T): values is Array<T>;
/**
 * @template T
 * @param {unknown} values
 * @param {(value: unknown) => T} predicate
 * @returns {values is Array<T>}
 */
export function isArrayMapOf<T>(values: unknown, predicate: (value: unknown) => T): values is Array<T>;
/**
 * @param {unknown} value
 * @returns {value is number | null | undefined}
 */
export function isNullableNumber(value: unknown): value is number | null | undefined;
/**
 * @param {unknown} value
 * @returns {value is string | null | undefined}
 */
export function isNullableString(value: unknown): value is string | null | undefined;
/**
 * @param {unknown} value
 * @returns {value is Function | null | undefined}
 */
export function isNullableFunction(value: unknown): value is Function | null | undefined;
/**
 * @template T
 * @param {new (...args: unknown[]) => T} constructor
 * @returns {(value: unknown) => value is T | null | undefined}
 */
export function isNullableInsanceOf<T>(constructor: new (...args: unknown[]) => T): (value: unknown) => value is T | null | undefined;
/**
 * @param {unknown} value
 * @returns {value is Array<unknown> | null | undefined}
 */
export function isNullableArray(value: unknown): value is Array<unknown> | null | undefined;
/** @typedef {string|number|symbol} PropKey */
/**
 * @template {((value: unknown) => value is any)} C
 * @template {PropKey} K
 * @param {C} check
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, C extends (v: unknown) => v is infer U ? U : never>}
 */
export function hasProp<C extends ((value: unknown) => value is any), K extends PropKey>(check: C, value: unknown, prop: K): value is Record<K, C extends (v: unknown) => v is infer U ? U : never>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, unknown>}
 */
export function hasPropDefined<K extends PropKey>(value: unknown, prop: K): value is Record<K, unknown>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, boolean>}
 */
export function hasPropBoolean<K extends PropKey>(value: unknown, prop: K): value is Record<K, boolean>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, number>}
 */
export function hasPropNumber<K extends PropKey>(value: unknown, prop: K): value is Record<K, number>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, string>}
 */
export function hasPropString<K extends PropKey>(value: unknown, prop: K): value is Record<K, string>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, Function>}
 */
export function hasPropFunction<K extends PropKey>(value: unknown, prop: K): value is Record<K, Function>;
/**
 * @template {PropKey} K
 * @template V
 * @param {new (...args: unknown[]) => V} constructor
 * @returns {(value: unknown, prop: K) => value is Record<K, V>}
 */
export function hasPropInstanceOf<K extends PropKey, V>(constructor: new (...args: unknown[]) => V): (value: unknown, prop: K) => value is Record<K, V>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, Array<unknown>>}
 */
export function hasPropArray<K extends PropKey>(value: unknown, prop: K): value is Record<K, Array<unknown>>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, boolean | null | undefined>}
 */
export function hasPropNullableBoolean<K extends PropKey>(value: unknown, prop: K): value is Record<K, boolean | null | undefined>;
/**
 * @template {PropKey} K
 * @template T
 * @param {unknown} value
 * @param {K} prop
 * @param {(value: unknown) => value is T} predicate
 * @returns {value is Record<K, Array<T>>}
 */
export function hasPropArrayOf<K extends PropKey, T>(value: unknown, prop: K, predicate: (value: unknown) => value is T): value is Record<K, Array<T>>;
/**
 * @template {PropKey} K
 * @template T
 * @param {unknown} value
 * @param {K} prop
 * @param {(value: unknown) => T} predicate
 * @returns {value is Record<K, Array<T>>}
 */
export function hasPropArrayMapOf<K extends PropKey, T>(value: unknown, prop: K, predicate: (value: unknown) => T): value is Record<K, Array<T>>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, number | null | undefined>}
 */
export function hasPropNullableNumber<K extends PropKey>(value: unknown, prop: K): value is Record<K, number | null | undefined>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, string | null | undefined>}
 */
export function hasPropNullableString<K extends PropKey>(value: unknown, prop: K): value is Record<K, string | null | undefined>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, Function | null | undefined>}
 */
export function hasPropNullableFunction<K extends PropKey>(value: unknown, prop: K): value is Record<K, Function | null | undefined>;
/**
 * @template {PropKey} K
 * @template V
 * @param {new (...args: unknown[]) => V} constructor
 * @returns {(value: unknown, prop: K) => value is Record<K, V | null | undefined>}
 */
export function hasPropNullableInstanceOf<K extends PropKey, V>(constructor: new (...args: unknown[]) => V): (value: unknown, prop: K) => value is Record<K, V | null | undefined>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @returns {value is Record<K, Array<unknown> | null | undefined>}
 */
export function hasPropNullableArray<K extends PropKey>(value: unknown, prop: K): value is Record<K, Array<unknown> | null | undefined>;
/**
 * @template {(value: unknown) => value is any} C
 * @param {C} check
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is C extends (v: unknown) => v is infer U ? U : never}
 */
export function assert<C extends (value: unknown) => value is any>(check: C, value: unknown, message?: string): asserts value is C extends (v: unknown) => v is infer U ? U : never;
/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is NonNullable<unknown>}
 */
export function assertDefined(value: unknown, message?: string): asserts value is NonNullable<unknown>;
/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is boolean}
 */
export function assertBoolean(value: unknown, message?: string): asserts value is boolean;
/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is number}
 */
export function assertNumber(value: unknown, message?: string): asserts value is number;
/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is string}
 */
export function assertString(value: unknown, message?: string): asserts value is string;
/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is Function}
 */
export function assertFunction(value: unknown, message?: string): asserts value is Function;
/**
 * @template T
 * @param {new (...args: unknown[]) => T} constructor
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is T}
 */
export function assertInstanceOf<T>(constructor: new (...args: unknown[]) => T, value: unknown, message?: string): asserts value is T;
/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is Array<unknown>}
 */
export function assertArray(value: unknown, message?: string): asserts value is Array<unknown>;
/**
 * @template T
 * @param {unknown} values
 * @param {(value: unknown) => value is T} predicate
 * @param {string} [message]
 * @returns {asserts values is Array<T>}
 */
export function assertArrayOf<T>(values: unknown, predicate: (value: unknown) => value is T, message?: string): asserts values is Array<T>;
/**
 * @template T
 * @param {unknown} values
 * @param {(value: unknown) => T} predicate
 * @param {string} [message]
 * @returns {asserts values is Array<T>}
 */
export function assertArrayMapOf<T>(values: unknown, predicate: (value: unknown) => T, message?: string): asserts values is Array<T>;
/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is boolean | null | undefined}
 */
export function assertNullableBoolean(value: unknown, message?: string): asserts value is boolean | null | undefined;
/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is number | null | undefined}
 */
export function assertNullableNumber(value: unknown, message?: string): asserts value is number | null | undefined;
/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is string | null | undefined}
 */
export function assertNullableString(value: unknown, message?: string): asserts value is string | null | undefined;
/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is Function | null | undefined}
 */
export function assertNullableFunction(value: unknown, message?: string): asserts value is Function | null | undefined;
/**
 * @param {unknown} value
 * @param {string} [message]
 * @returns {asserts value is Array<unknown> | null | undefined}
 */
export function assertNullableArray(value: unknown, message?: string): asserts value is Array<unknown> | null | undefined;
/**
 * @template {PropKey} K
 * @template {(value: unknown) => value is any} C
 * @param {C} check
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, C extends (v: unknown) => v is infer U ? U : never>}
 */
export function assertProp<K extends PropKey, C extends (value: unknown) => value is any>(check: C, value: unknown, prop: K, message?: string): asserts value is Record<K, C extends (v: unknown) => v is infer U ? U : never>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, unknown>}
 */
export function assertPropDefined<K extends PropKey>(value: unknown, prop: K, message?: string): asserts value is Record<K, unknown>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, boolean>}
 */
export function assertPropBoolean<K extends PropKey>(value: unknown, prop: K, message?: string): asserts value is Record<K, boolean>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, number>}
 */
export function assertPropNumber<K extends PropKey>(value: unknown, prop: K, message?: string): asserts value is Record<K, number>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, string>}
 */
export function assertPropString<K extends PropKey>(value: unknown, prop: K, message?: string): asserts value is Record<K, string>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, Function>}
 */
export function assertPropFunction<K extends PropKey>(value: unknown, prop: K, message?: string): asserts value is Record<K, Function>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, Array<unknown>>}
 */
export function assertPropArray<K extends PropKey>(value: unknown, prop: K, message?: string): asserts value is Record<K, Array<unknown>>;
/**
 * @template {PropKey} K
 * @template T
 * @param {unknown} value
 * @param {K} prop
 * @param {(value: unknown) => value is T} predicate
 * @param {string} [message]
 * @returns {asserts value is Record<K, Array<T>>}
 */
export function assertPropArrayOf<K extends PropKey, T>(value: unknown, prop: K, predicate: (value: unknown) => value is T, message?: string): asserts value is Record<K, Array<T>>;
/**
 * @template {PropKey} K
 * @template T
 * @param {unknown} value
 * @param {K} prop
 * @param {(value: unknown) => T} predicate
 * @param {string} [message]
 * @returns {asserts value is Record<K, Array<T>>}
 */
export function assertPropArrayMapOf<K extends PropKey, T>(value: unknown, prop: K, predicate: (value: unknown) => T, message?: string): asserts value is Record<K, Array<T>>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, boolean | null | undefined>}
 */
export function assertPropNullableBoolean<K extends PropKey>(value: unknown, prop: K, message?: string): asserts value is Record<K, boolean | null | undefined>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, number | null | undefined>}
 */
export function assertPropNullableNumber<K extends PropKey>(value: unknown, prop: K, message?: string): asserts value is Record<K, number | null | undefined>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, string | null | undefined>}
 */
export function assertPropNullableString<K extends PropKey>(value: unknown, prop: K, message?: string): asserts value is Record<K, string | null | undefined>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, Function | null | undefined>}
 */
export function assertPropNullableFunction<K extends PropKey>(value: unknown, prop: K, message?: string): asserts value is Record<K, Function | null | undefined>;
/**
 * @template {PropKey} K
 * @param {unknown} value
 * @param {K} prop
 * @param {string} [message]
 * @returns {asserts value is Record<K, Array<unknown> | null | undefined>}
 */
export function assertPropNullableArray<K extends PropKey>(value: unknown, prop: K, message?: string): asserts value is Record<K, Array<unknown> | null | undefined>;
/**
 * @template {PropKey} K
 * @template V
 * @param {unknown} object
 * @param {K} prop
 * @param {V} value
 * @returns {asserts object is Record<K, V>}
 */
export function setPropValue<K extends PropKey, V>(object: unknown, prop: K, value: V): asserts object is Record<K, V>;
export type PropKey = string | number | symbol;
