import { readFen, moveFen } from './fenOld';
import Rules from './rules';

export default function Fen(ctx) {

  let { fenFactory } = ctx;

  let rules = new Rules(ctx);

  let fen;
  let data;
  let depth;

  this.depth = () => depth;
  this.data = () => data;
  this.rules = () => rules;

  this.init = (_data) => {
    fen = _data.fen;
    depth = _data.depth;

    data = readFen(fen);

    rules.init({ fen: this });
  };

  this.doMove = (from, to) => {
    let iBoard = data.board;

    iBoard[to] = iBoard[from];
    delete iBoard[from];
  };

  this.moveClone = (from, to) => {
    let newFen = fenFactory.acquire(_ => _.init({
      fen,
      depth: depth + 1
    }));

    newFen.doMove(from, to);

    return newFen;
  };
}
