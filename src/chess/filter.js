
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

    kingNotInCheck = moves.flatMap(_ => {
      return _.afterNotInCheck(ownerColor);
    });

    captures = moves.flatMap(_ => {
      let capture = _.ideaCaptures();
      return capture?[capture]:[];
    });

    selfDefenses = moves.flatMap(_ => {
      let selfDefense = _.ideaSelfDefense();
      return selfDefense?[selfDefense]:[];
    });
  };

}
