import * as util from './util';

const flatMaybe = fn => _ => {
  let res = fn(_);
  return res?[res]:[];
}; 

export default function MoveFilter() {

  let moves,
      ownerColor,
      opponentColor;

  let noMovesLeft,
      kingNotInCheck,
      opponentInCheck,
      captures,
      selfDefenses;

  this.noMovesLeft = () => noMovesLeft;
  this.kingNotInCheck = () => kingNotInCheck;

  this.opponentInCheck = () => opponentInCheck;

  this.captures = () => captures;
  this.selfDefenseFrom = (square) => 
  selfDefenses
    .filter(_ => _.from() === square);
  
  this.init = (data) => {
    moves = data.moves;
    ownerColor = data.ownerColor;
    opponentColor = util.oppositeColor(ownerColor);

    noMovesLeft = moves.length === 0;

    captures = moves.flatMap(flatMaybe(_ => _.ideaCaptures()));
    selfDefenses = moves.flatMap(flatMaybe(_ => _.ideaSelfDefense()));
  };

}
