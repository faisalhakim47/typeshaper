# TypeShaper

A lightweight TypeScript utility library providing type guards and type assertions for runtime type checking and narrowing.

## Installation

```bash
npm install typeshaper
```

## Features

- **Type Guards**: Functions that narrow down TypeScript types at runtime using type predicates
- **Type Assertions**: Functions that throw errors if values don't match expected types
- **Property Validators**: Check if objects have properties of specific types
- **Array Validators**: Validate arrays and their element types
- **Zero Dependencies**: Lightweight with no external dependencies
- **Full TypeScript Support**: Complete type definitions included

## API Reference

### Basic Type Guards

Type guards return `true` if the value matches the expected type, `false` otherwise.

```typescript
import { isDefined, isBoolean, isNumber, isString, isFunction, isArray } from 'typeshaper';

// Check if value is not null or undefined
isDefined(value: unknown): value is NonNullable<unknown>

// Check primitive types
isBoolean(value: unknown): value is boolean
isNumber(value: unknown): value is number
isString(value: unknown): value is string
isFunction(value: unknown): value is Function
isArray(value: unknown): value is Array<unknown>
```

#### Examples

```typescript
const userInput: unknown = "hello";

if (isString(userInput)) {
  // TypeScript now knows userInput is a string
  console.log(userInput.toUpperCase()); // ✅ Safe to use string methods
}

if (isDefined(userInput)) {
  // TypeScript knows userInput is not null or undefined
  console.log(userInput); // ✅ Safe to use
}
```

### Array Type Guards

```typescript
import { isArrayOf } from 'typeshaper';

// Validate array with custom predicate
isArrayOf<T>(values: unknown, predicate: (value: unknown) => T): values is Array<T>
```

#### Examples

```typescript
const data: unknown = ["1", "2", "3"];

if (isArrayOf(data, isString)) {
  // TypeScript knows data is string[]
  data.forEach(str => console.log(str.length)); // ✅ Safe string operations
}

// Custom predicate example
interface User { name: string; age: number; }

const isUser = (value: unknown): value is User =>
  typeof value === 'object' &&
  value !== null &&
  'name' in value &&
  'age' in value &&
  isString((value as any).name) &&
  isNumber((value as any).age);

if (isArrayOf(users, isUser)) {
  // TypeScript knows users is User[]
  users.forEach(user => console.log(user.name)); // ✅ Safe User operations
}
```

### Property Type Guards

Check if an object has a property of a specific type.

```typescript
import {
  hasPropDefined,
  hasPropBoolean,
  hasPropNumber,
  hasPropString,
  hasPropFunction,
  hasPropArray,
  hasPropArrayOf
} from 'typeshaper';

// Check if object has property with specific type
hasPropDefined<K>(value: unknown, prop: K): value is Record<K, unknown>
hasPropBoolean<K>(value: unknown, prop: K): value is Record<K, boolean>
hasPropNumber<K>(value: unknown, prop: K): value is Record<K, number>
hasPropString<K>(value: unknown, prop: K): value is Record<K, string>
hasPropFunction<K>(value: unknown, prop: K): value is Record<K, Function>
hasPropArray<K>(value: unknown, prop: K): value is Record<K, Array<unknown>>
hasPropArrayOf<K, T>(value: unknown, prop: K, predicate: (value: unknown) => T): value is Record<K, Array<T>>
```

#### Examples

```typescript
const apiResponse: unknown = {
  name: "John",
  age: 30,
  isActive: true,
  scores: [85, 92, 78]
};

if (hasPropString(apiResponse, 'name')) {
  // TypeScript knows apiResponse has a 'name' property of type string
  console.log(apiResponse.name.toUpperCase()); // ✅ Safe string operations
}

if (hasPropNumber(apiResponse, 'age') && apiResponse.age > 18) {
  // TypeScript knows apiResponse has an 'age' property of type number
  console.log("Adult user"); // ✅ Safe number operations
}

if (hasPropArrayOf(apiResponse, 'scores', isNumber)) {
  // TypeScript knows apiResponse.scores is number[]
  const average = apiResponse.scores.reduce((a, b) => a + b, 0) / apiResponse.scores.length;
}
```

### Type Assertions

Type assertions throw an error if the value doesn't match the expected type.

```typescript
import {
  assertDefined,
  assertBoolean,
  assertNumber,
  assertString,
  assertFunction,
  assertArray,
  assertArrayOf
} from 'typeshaper';

// Assertions throw if type doesn't match
assertDefined(value: unknown, message?: string): asserts value is NonNullable<unknown>
assertBoolean(value: unknown, message?: string): asserts value is boolean
assertNumber(value: unknown, message?: string): asserts value is number
assertString(value: unknown, message?: string): asserts value is string
assertFunction(value: unknown, message?: string): asserts value is Function
assertArray(value: unknown, message?: string): asserts value is Array<unknown>
assertArrayOf<T>(values: unknown, predicate: (value: unknown) => T, message?: string): asserts values is Array<T>
```

#### Examples

```typescript
function processUser(data: unknown) {
  assertString(data.name, "User name must be a string");
  assertNumber(data.age, "User age must be a number");

  // TypeScript now knows data.name is string and data.age is number
  return {
    displayName: data.name.toUpperCase(),
    isAdult: data.age >= 18
  };
}

try {
  const result = processUser({ name: "John", age: 25 });
  console.log(result); // { displayName: "JOHN", isAdult: true }
} catch (error) {
  console.error("Invalid user data:", error.message);
}
```

### Property Type Assertions

```typescript
import {
  assertPropDefined,
  assertPropBoolean,
  assertPropNumber,
  assertPropString,
  assertPropFunction,
  assertPropArray,
  assertPropArrayOf
} from 'typeshaper';

// Property assertions throw if property doesn't exist or has wrong type
assertPropDefined<K>(value: unknown, prop: K, message?: string): asserts value is Record<K, unknown>
assertPropBoolean<K>(value: unknown, prop: K, message?: string): asserts value is Record<K, boolean>
assertPropNumber<K>(value: unknown, prop: K, message?: string): asserts value is Record<K, number>
assertPropString<K>(value: unknown, prop: K, message?: string): asserts value is Record<K, string>
assertPropFunction<K>(value: unknown, prop: K, message?: string): asserts value is Record<K, Function>
assertPropArray<K>(value: unknown, prop: K, message?: string): asserts value is Record<K, Array<unknown>>
assertPropArrayOf<K, T>(value: unknown, prop: K, predicate: (value: unknown) => T, message?: string): asserts value is Record<K, Array<T>>
```

#### Examples

```typescript
function validateConfig(config: unknown) {
  assertPropString(config, 'apiUrl', "Config must have apiUrl as string");
  assertPropNumber(config, 'timeout', "Config must have timeout as number");
  assertPropBoolean(config, 'debug', "Config must have debug as boolean");

  // TypeScript now knows the exact shape of config
  return {
    url: config.apiUrl.toLowerCase(),
    timeoutMs: config.timeout * 1000,
    isDebugMode: config.debug
  };
}
```

## Common Patterns

### Validating API Responses

```typescript
function processApiResponse(response: unknown) {
  // Validate required fields
  assertPropString(response, 'status');

  if (response.status === 'success') {
    assertPropDefined(response, 'data');
    assertPropArrayOf(response.data, 'users', (user) => {
      assertDefined(user);
      assertPropString(user, 'name');
      assertPropNumber(user, 'id');
      return user;
    });

    // Now TypeScript knows the exact structure
    return response.data.users.map(user => ({
      displayName: user.name.toUpperCase(),
      userId: user.id
    }));
  }

  throw new Error(`API error: ${response.status}`);
}
```

### Safe JSON Parsing

```typescript
function parseUserConfig(jsonString: string) {
  const parsed: unknown = JSON.parse(jsonString);

  // Validate the parsed object structure
  assertPropString(parsed, 'theme', "Config must have theme");
  assertPropBoolean(parsed, 'notifications', "Config must have notifications setting");

  if (hasPropArray(parsed, 'preferences')) {
    assertArrayOf(parsed.preferences, isString, "Preferences must be string array");
  }

  return {
    theme: parsed.theme,
    notifications: parsed.notifications,
    preferences: parsed.preferences || []
  };
}
```

### Environment Variable Validation

```typescript
function validateEnv() {
  const env = process.env;

  assertPropString(env, 'DATABASE_URL', "DATABASE_URL environment variable is required");
  assertPropString(env, 'API_KEY', "API_KEY environment variable is required");

  if (hasPropString(env, 'PORT')) {
    const port = parseInt(env.PORT, 10);
    assertNumber(port, "PORT must be a valid number");
  }

  return {
    databaseUrl: env.DATABASE_URL,
    apiKey: env.API_KEY,
    port: env.PORT ? parseInt(env.PORT, 10) : 3000
  };
}
```
