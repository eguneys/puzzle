import { log, is, deep_is, array_is } from 'testfu';

import { readFen } from '../fen';
import { readRules } from '../rules';

import * as util from './util';

export default function RulesTest() {

  log('rules test');
  

  let rookFen = readFen('8/8/8/8/8/8/4R3/8 w - - 0 1');
  let rookRules = readRules(rookFen);

  array_is('rook on e2', rookRules.range['e2'], util.markedSquares(`
....x...
....x...
....x...
....x...
....x...
....x...
xxxx.xxx
....x...
`));
  
}
