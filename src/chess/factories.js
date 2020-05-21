import Pool from 'poolf';

import Fen from './fen';
import Rules from './rules';

import Move from './move';
import Captures from './captures';
import SelfDefense from './selfdefense';

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
export const makeSelfDefenseFactory = ctx =>
  factoryMaker(() => new SelfDefense(ctx));

export const makeRulesFactory = ctx =>
  factoryMaker(() => new Rules(ctx));
export const makeFenFactory = ctx =>
  factoryMaker(() => new Fen(ctx));


export const injectIntoContext = (ctx) => {
  ctx.fenFactory = makeFenFactory(ctx);
  ctx.rulesFactory = makeRulesFactory(ctx);

  ctx.moveFactory = makeMoveFactory(ctx);
  ctx.captureFactory = makeCapturesFactory(ctx);
  ctx.selfDefenseFactory = makeSelfDefenseFactory(ctx);
};
