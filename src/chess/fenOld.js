import * as util from './util';

export const moveFen = (fen, from, to) => {
  let { board: iBoard,
        activeColor: iActive,
        castles: iCastles,
        enPassant: iEnPassant,
        halfMove: iHalfMove,
        fullMove: iFullMove } = readFen(fen);

  iBoard[to] = iBoard[from];
  delete iBoard[from];

  let sBoard = writeBoard(iBoard),
      sActive = writeActive(iActive),
      sCastles = writeCastles(iCastles),
      sEnPassant = writeEnPassant(iEnPassant),
      sHalfMove = writeHalfMove(iHalfMove),
      sFullMove = writeFullMove(iFullMove);

  return [sBoard,
          sActive,
          sCastles,
          sEnPassant,
          sHalfMove,
          sFullMove].join(' ');
};

const writeBoard = board => {
  let res = '';
  for (let rank of util.ranks) {
    let sLine = '';
    let empties = 0;
    for (let file of util.files) {
      let square = util.square(file, rank);

      if (!board[square]) {
        empties++; continue;
      } else {
        if (empties > 0) {
          sLine += empties;
          empties = 0;
        }
        sLine += board[square].forsyth;
      }
    }
    if (empties > 0) {
      sLine += empties;
    }
    res += sLine + (rank===0?"":"/");
  }
  return res;
};

const writeActive = active => {
  return '';
};

const writeCastles = castles => {
  return '';
};

const writeEnPassant = enPassant => {
  return '';
};

const writeHalfMove = halfMove => {
  return '';
};

const writeFullMove = fullMove => {
  return '';
}


// 8/8/8/8/8/8/4R3/8 w - - 0 1
export const readFen = (fen) => {

  let [board,
       activeColor,
       castles,
       enPassant,
       halfMove,
       fullMove] = fen.split(' ');

  
  return {
    board: readBoard(board)
  };
};

export const readBoard = board => {
  let res = {};
  let lines = board.split('/');

  lines.forEach((line, iRank) => {
    res = { ...res, ...readBoardLine(line, iRank) };
  });
  return res;
};

const readBoardLine = (line, iRank) => {
  let res = {};
  let iFile = 0;

  for (let char of line) {
    if (char >= '1' && char <= '8') {
      iFile += parseInt(char);
      continue;
    }
    let rank = util.ranks[iRank],
        file = util.files[iFile];

    iFile++;

    res[(file+rank)] = util.allByForsyth[char];
  }
  return res;
};
