import { makeId } from './util2';
import * as rutil from './rulesutil';
import * as util from './util';

import MoveFilter from './filter';

export function readRules(ctx, fenData) {

  const { board } = fenData;

  let ranges = readRanges(board),
      attacks = readAttacks(board);

  let moves = readMoves(ctx, board, ranges, attacks);

  let filter = new MoveFilter();
  filter.init(moves);

  return {
    ranges,
    attacks,
    moves,
    filter
  };
  
}

const moveId = makeId('move');


function readMoves(ctx, board, allRanges, allAttacks) {

  const { moveFactory } = ctx;

  let allMoves = [],
      fromMoves = {},
      toMoves = {};

  function addMove(from, to) {
    let move = moveFactory.acquire(_ => _.init({
      id: moveId(),
      board,
      from,
      to
    }));

    fromMoves[from] = fromMoves[from] || {};
    toMoves[to] = toMoves[to] || {};

    allMoves.push(move);
    fromMoves[from][to] = move;
    toMoves[to][from] = move;
  };

  for (let attackerSquare in allAttacks) {
    let attackerPiece = board[attackerSquare];
    if (!util.pawnPiece(attackerPiece)) {
      continue;
    }
    let attackedSquares = allAttacks[attackerSquare];
    for (let attackedSquare of attackedSquares) {
      addMove(attackerSquare, attackedSquare);
    }
  }

  for (let rangerSquare in allRanges) {
    let rangesSquares = allRanges[rangerSquare];
    for (let rangedSquare of rangesSquares) {
      addMove(rangerSquare, rangedSquare);
    }
  }
  
  return { allMoves,
           fromMoves,
           toMoves };
}

function readCaptures(board, allAttacks) {
  let res = {};

  for (let attackerSquare in allAttacks) {

    let attackerPiece = board[attackerSquare];
    let attackedSquares = allAttacks[attackerSquare];

    let captures = [];

    for (let attackedSquare of attackedSquares) {

      let attackedPiece = board[attackedSquare];

      if (attackedPiece && 
          util.oppositePiece(attackerPiece, attackedPiece)) {
        captures.push(attackedSquare);
      }
    }
    res[attackerSquare] = captures;    
  }
  return res;
}

function readAttacks(board) {
  let res = {};
  for (let square in board) {
    let piece = board[square];
    let attackF = ofAttack(piece);
    if (attackF) {
      res[square] = attackF(square);
    }
  }
  return res;
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

function ofAttack(piece) {
  switch (piece.role) {
  case 'pawn':
    return pawnAttackForColor(piece.color);
  default:
    return ofRange(piece);
  }
}

function ofRange(piece) {
  switch (piece.role) {
  case 'rook':
    return rookRange;
  case 'queen':
    return queenRange;
  case 'bishop':
    return bishopRange;
  case 'knight':
    return knightRange;
  case 'king':
    return kingRange;
  case 'pawn':
    return pawnRangeForColor(piece.color);
  default:
    return null;
  }
}

const pawnAttackForColor = color => square => {
  if (color === 'white') {
    return rutil.whitePawnAttacks[square];
  } else {
    return rutil.blackPawnAttacks[square];
  }
};

const pawnRangeForColor = color => square => {
  let rank = util.rank(square);
  return (() => {
    if (color === 'white') {
      if (rank === util.whiteBaseRank) {
        return rutil.whitePawnBaseRange;
      } else {
        return rutil.whitePawnRange;
      }
    }
    if (color === 'black') {
      if (rank === util.blackBaseRank) {
        return rutil.blackPawnBaseRange;
      } else {
        return rutil.blackPawnRange;
      }
    }
    return [];
  })()[square];
};
const kingRange = square => rutil.kingRange[square];
const knightRange = square => rutil.knightRange[square];
const rookRange = square => rutil.straightRange[square];
const bishopRange = square => rutil.diagonalRange[square];
const queenRange = square => {
  return [
    ...rutil.straightRange[square],
    ...rutil.diagonalRange[square]
  ];
}
