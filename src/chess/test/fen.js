import { log, is, deep_is } from './testfu';

import { whiteRook } from '../util';

import { readFen, moveFen } from '../fenOld';

export default function FenTest() {

  log('fen test');
  

  let rookFen = '8/8/8/8/8/8/4R3/8 w - - 0 1';

  deep_is('rook on e2', readFen(rookFen).board['e2'], whiteRook);

  let rookMoveData = readFen(moveFen(rookFen, 'e2', 'e3'));

  is('rook on e2', rookMoveData.board['e2'], undefined);
  is('rook on e3', rookMoveData.board['e3'], whiteRook);
}
