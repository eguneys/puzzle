import Pool from 'poolf';

import Move from './move';
import Captures from './captures';

const factoryMaker = (onCreate) => {
  let pMoves = new Pool(onCreate);

  return {
    acquire(onInit) {
      return pMoves.acquire(onInit);
    },
    release(move) {
      pMoves.release(move);
    },
    releaseAll() {
      pMoves.releaseAll();
    }
  };
};

export const makeMoveFactory = ctx =>
  factoryMaker(() => new Move(ctx));
export const makeCapturesFactory = ctx =>
  factoryMaker(() => new Captures(ctx));
