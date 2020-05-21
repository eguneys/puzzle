import { readFen, moveFen } from './fenOld';

export default function Fen(ctx) {

  let { fenFactory, rulesFactory } = ctx;

  let fen;
  let data;

  this.init = (_data) => {
    fen = _data.fen;

    data = readFen(fen);

  };

  this.rules = () => {
    return rulesFactory.acquire(_ => _.init(data));
  };

  this.move = (from, to) => {

    let newFen = moveFen(fen, from, to);

    return fenFactory.acquire(_ => _.init({
      fen: newFen
    }));
  };
  
}
