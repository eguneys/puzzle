import * as rutil from './rulesutil';

export function readRules(fenData) {

  const { board } = fenData;

  return {
    range: readRanges(board)
  };
  
}


function readRanges(board) {
  let res = {};
  for (let square in board) {
    let piece = board[square];
    let rangeF = ofRange(piece);
    res[square] = rangeF(square);
  }
  return res;
}

function ofRange(piece) {
  switch (piece.role) {
  case 'rook':
    return rookRange;
  default:
    return queenRange;
  }
}

const rookRange = square => rutil.straightRange[square];
const queenRange = square => {
  return [
    ...rutil.straightRange[square],
    ...rutil.diagonalRange[square]
  ];
}
