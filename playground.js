// @ts-check

import { assertArrayMapOf, assertDefined, assertPropString, assertProp, assertPropNumber, assertPropArrayOf, assertPropArrayMapOf, isString, isInstanceOf } from './lib/typeshaper.js';

const users = /** @type {unknown} */ (undefined);

assertArrayMapOf(users, function (user) {
  assertDefined(user);
  assertPropString(user, 'name');
  assertPropNumber(user, 'age');
  assertPropArrayOf(user, 'tags', isString);
  assertPropArrayMapOf(user, 'posts', function (post) {
    assertDefined(post);
    assertPropString(post, 'title');
    assertPropString(post, 'content');
    assertProp(isInstanceOf(Date), post, 'createdAt');
    return post;
  });
  return user;
});

users[0].posts[0].createdAt.getDate(); // should not error
