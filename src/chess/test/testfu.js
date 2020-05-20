export { log, is, array_is } from 'testfu';

import { makeTester } from 'testfu';

const fails = messages => ({ fails: messages });

const deep_is_matcher = (a, b) => {
  let messages = [];

  return fails(messages);
};

export const deep_is = makeTester(deep_is_matcher);
