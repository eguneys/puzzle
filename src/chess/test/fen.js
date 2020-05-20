import { log, is, deep_is } from './testfu';

import { whiteRook } from '../util';
import { readFen } from '../fen';

export default function FenTest() {

  log('fen test');
  

  let rookFen = readFen('8/8/8/8/8/8/4R3/8 w - - 0 1');

  deep_is('rook on e2', rookFen.board['e2'], whiteRook);
  
}
