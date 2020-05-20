import { log, is, deep_is, array_is } from './testfu';

import * as util from 'util';

import FChess from '../fchess';

export default function FTest() {

  log('ftest');

  let fc = new FChess();
  
  let rookFen = '8/8/8/8/8/8/4R3/8 w - - 0 1';

  fc.init(rookFen);


  
}
