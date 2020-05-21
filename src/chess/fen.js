import * as util from './util';

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

const readBoard = board => {
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
