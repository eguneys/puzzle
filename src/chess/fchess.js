import { readFen } from './fen';

export default function FChess() {
  
  let fen;

  let data;

  this.init = _fen => {
    fen = _fen;

    data = readFen(fen);
  };


}
