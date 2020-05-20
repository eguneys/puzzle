import { Chess } from 'chess.js';

export default function ChessJs() {

  let fen;
  let chess = new Chess();
  
  this.init = (data) => {
    fen = data;
    chess.load(fen);
  };


  this.fen = () => chess.fen();
  this.square = square => chess.get(square);
  this.moves = () => chess.moves();

  this.makeMove = move => chess.move(move);

  this.makeClone = () => {
    let cj = new ChessJs();
    cj.init(fen);
    return cj;
  };

  this.makeCloneMove = (move) => {
    let cj = this.makeClone();
    cj.makeMove(move);
    return cj;
  };

}
