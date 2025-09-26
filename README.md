# TypeShaper

A lightweight TypeScript utility library providing comprehensive type guards, type narrowing, and runtime assertions for safer JavaScript/TypeScript code.

## Installation

```bash
npm install typeshaper
```

## Usage

```typescript
import { assertArrayMapOf, assertDefined, assertPropString, assertPropNumber, assertPropArrayOf, assertPropArrayMapOf, isString } from 'typeshaper';

const users: unknown = await fetchUserListFromSomewhere();

assertArrayMapOf(users, function (user) {
  assertDefined(user);
  assertPropString(user, 'name');
  assertPropNumber(user, 'age');
  assertPropArrayOf(user, 'tags', isString);
  assertPropArrayMapOf(user, 'posts', function (post) {
    assertDefined(post);
    assertPropString(post, 'title');
    assertPropString(post, 'content');
    return post;
  });
  return user;
});

/** from this point onward, `users` is guaranteed to be of type:
 * Array<{
 *   name: string;
 *   age: number;
 *   tags: Array<string>;
 *   posts: Array<{ title: string; content: string; }>;
 * }>
 */

```
