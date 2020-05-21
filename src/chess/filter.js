
export default function MoveFilter() {

  let moves,
      captures;

  this.captures = () => captures;
  
  this.init = (data) => {
    moves = data.allMoves;

    captures = moves.flatMap(_ => {
      let capture = _.ideaCaptures();
      return capture?[capture]:[];
    });
  };

}
