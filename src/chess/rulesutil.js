import * as util from './util';


function diffSquare(from, d) {
  const iFile = util.files.indexOf(util.file(from)),
        iRank = util.ranks.indexOf(util.rank(from));

  const iFile2 = iFile + d[0],
        iRank2 = iRank + d[1];

  if (iFile2 < 0 || iFile2 > 7 ||
      iRank2 < 0 || iRank2 > 7)
    return null;

  const file = util.files[iFile2];
  const rank = util.ranks[iRank2];

  return util.square(file, rank);
}

const vFiles = [[1, 0],
               [2, 0],
               [3, 0],
               [4, 0],
               [5, 0],
               [6, 0],
               [7, 0],
               [-1, 0],
               [-2, 0],
               [-3, 0],
               [-4, 0],
               [-5, 0],
               [-6, 0],
               [-7, 0]];

const vRanks = [[0, 1],
               [0, 2],
               [0, 3],
               [0, 4],
               [0, 5],
               [0, 6],
               [0, 7],
               [0, -1],
               [0, -2],
               [0, -3],
               [0, -4],
               [0, -5],
               [0, -6],
               [0, -7]];

const vDiagonals = [
  [1,1],
  [2,2],
  [3,3],
  [4,4],
  [5,5],
  [6,6],
  [7,7],
  [-1,1],
  [-2,2],
  [-3,3],
  [-4,4],
  [-5,5],
  [-6,6],
  [-7,7],
  [1,-1],
  [2,-2],
  [3,-3],
  [4,-4],
  [5,-5],
  [6,-6],
  [7,-7],
  [-1,-1],
  [-2,-2],
  [-3,-3],
  [-4,-4],
  [-5,-5],
  [-6,-6],
  [-7,-7],
];

const vKnights = [
  [1,2],
  [1,-2],
  [2,1],
  [2,-1],
  [-1,2],
  [-1,-2],
  [-2, 1],
  [-2, -1]
];

const vKingDiagonals = [
  [1,1],
  [1,-1],
  [-1, 1],
  [-1, -1]
];

const vKingFiles = [
  [0,1],
  [0,-1]
];

const vKingRanks = [
  [1,0],
  [-1, 0]
];

const vKingUps = [
  [1, 1],
  [-1, 1],
  [0, 1]
];

const vKingDowns = [
  [1, -1],
  [-1, -1],
  [0, -1]
];

const vKingLefts = [
  [-1, 1],
  [-1, -1],
  [-1, 0]
];

const vKingRights = [
  [1, 1],
  [1, -1],
  [1, 0]
];

const vKings = [
  ...vKingDiagonals,
  ...vKingFiles,
  ...vKingRanks
];

const vPawnAttacksWhite = [
  [1, 1],
  [-1,1]
];

const vPawnAttacksBlack = [
  [1,-1],
  [-1,-1]
];

const vPawnMovesWhiteBase = [
  [0, 1],
  [0,2]
];

const vPawnMovesWhite = [
  [0, 1]
];

const vPawnMovesBlackBase = [
  [0,-1],
  [0, -2]
];

const vPawnMovesBlack = [
  [0, -1]
];

const vStraights = [...vFiles, ...vRanks];

const toSquaresOfV = vV => {
  let res = {};

  for (let fromSquare of util.squares) {
    let toSquares = [];
    for (let d of vV) {
      let toSquare = diffSquare(fromSquare, d);

      if (toSquare) {
        toSquares.push(toSquare);
      }
    }
    res[fromSquare] = toSquares;
  }

  return res;
};

export const whitePawnBaseRange = toSquaresOfV(vPawnMovesWhiteBase);
export const whitePawnRange = toSquaresOfV(vPawnMovesWhite);
export const blackPawnBaseRange = toSquaresOfV(vPawnMovesBlackBase);
export const blackPawnRange = toSquaresOfV(vPawnMovesBlack);

export const whitePawnAttacks = toSquaresOfV(vPawnAttacksWhite);
export const blackPawnAttacks = toSquaresOfV(vPawnAttacksBlack);


export const straightRange = toSquaresOfV(vStraights);
export const diagonalRange = toSquaresOfV(vDiagonals);
export const knightRange = toSquaresOfV(vKnights);
export const kingRange = toSquaresOfV(vKings);
