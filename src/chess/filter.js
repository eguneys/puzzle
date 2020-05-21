
const flatMaybe = fn => _ => {
  let res = fn(_);
  return res?[res]:[];
}; 

export default function MoveFilter() {

  let moves,
      ownerColor;

  let noMovesLeft,
      kingNotInCheck,
      captures,
      selfDefenses;

  this.noMovesLeft = () => noMovesLeft;
  this.kingNotInCheck = () => kingNotInCheck;

  this.captures = () => captures;
  this.selfDefenseFrom = (square) => 
  selfDefenses
    .filter(_ => _.from() === square);
  
  this.init = (data) => {
    moves = data.moves;
    ownerColor = data.ownerColor;

    noMovesLeft = moves.length === 0;

    kingNotInCheck = moves.flatMap(
      flatMaybe(_ => _.afterNotInCheck(ownerColor))
    );
    captures = moves.flatMap(flatMaybe(_ => _.ideaCaptures()));
    selfDefenses = moves.flatMap(flatMaybe(_ => _.ideaSelfDefense()));
  };

}
