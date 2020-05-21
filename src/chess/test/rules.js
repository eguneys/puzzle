import { log, is, deep_is, array_is } from 'testfu';

import * as util from './util';

import * as facs from '../factories';

export default function RulesTest() {

  log('rules test');
  

  let ctx = {
  };

  facs.injectIntoContext(ctx);

  const { fenFactory } = ctx;
  
  const makeFen = (fen) => fenFactory.acquire(_ => _.init({ fen }));

  let rookFen = makeFen('8/8/8/8/8/8/4R3/8 w - - 0 1');
  let rookRules = rookFen.rules();

  array_is('rook on e2 ranges', rookRules.ranges('e2'), util.markedSquares(`
....x...
....x...
....x...
....x...
....x...
....x...
xxxx.xxx
....x...
`));

  let queenFen = makeFen('8/8/2r2p2/8/8/5Q2/8/8 w - - 0 1');
  let queenRules = queenFen.rules();

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

  let defence1Fen = makeFen('8/8/8/4bb2/8/8/P2P4/R2K4 w - - 0 1');
  let defence1Rules = defence1Fen.rules();

  array_is('defence 1 rook vs bishop pair', 
           defence1Rules.filter.selfDefenseFrom('a1')
           .map(_ => _.to()), util.markedSquares(`
x.......
x.......
x.......
x.......
x.......
x.......
x.......
..xxxxxx
`));


//   let check1Fen = makeFen('4k3/8/2b5/8/8/8/8/R7 w - - 0 1');
//   array_is('check rook vs king', 
//            check1Fen.rules().filter.opponentInCheck()
//            .map(_ => _.to()), util.markedSquares(`
// x.......
// ........
// ........
// ........
// ........
// ........
// ........
// ....x...
// `));
  
}
