import { log, is, deep_is, array_is } from 'testfu';

import * as util from './util';

import { readFen } from '../fen';
import { readRules } from '../rules';
import * as facs from '../factories';

export default function RulesTest() {

  log('rules test');
  

  let ctx = {
  };

  ctx.moveFactory = facs.makeMoveFactory(ctx);
  ctx.captureFactory = facs.makeCapturesFactory(ctx);

  let rookFen = readFen('8/8/8/8/8/8/4R3/8 w - - 0 1');
  let rookRules = readRules(ctx, rookFen);

  array_is('rook on e2 ranges', rookRules.ranges['e2'], util.markedSquares(`
....x...
....x...
....x...
....x...
....x...
....x...
xxxx.xxx
....x...
`));

  let queenFen = readFen('8/8/2r2p2/8/8/5Q2/8/8 w - - 0 1');
  let queenRules = readRules(ctx, queenFen);

  array_is('queen on f3 captures', 
           queenRules.filter.captures()
             .map(_ => _.to()),
           util.markedSquares(`
........
........
..x..x..
........
........
........
........
........
`));
  
}
