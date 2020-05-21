
export default function MoveFilter() {

  let moves,
      captures,
      selfDefenses;

  this.captures = () => captures;
  this.selfDefenseFrom = (square) => 
  selfDefenses
    .filter(_ => _.from() === square);
  
  this.init = (data) => {
    moves = data.allMoves;

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
