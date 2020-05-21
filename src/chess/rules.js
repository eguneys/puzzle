import { makeId } from './util2';
import * as rutil from './rulesutil';
import * as util from './util';

import MoveFilter from './filter';

const moveId = makeId('move');

import { readRanges, readAttacks } from './rulesOld';

export default function Rules(ctx) {
  
  let board;

  let ranges,
      attacks,
      moves,
      filter = new MoveFilter();

  this.board = () => board;
  this.ranges = (square) => ranges[square];
  this.attacks = (square) => attacks[square];
  this.moves = () => moves;
  this.filter = filter;

  this.init = fenData => {
    board = fenData.board;

    ranges = readRanges(board);
    attacks = readAttacks(board);
    moves = readMoves(board, ranges, attacks);

    filter.init(moves);
  };
  
  const selfRules = this;

  function readMoves(board, allRanges, allAttacks) {

    const { moveFactory } = ctx;

    let allMoves = [],
        fromMoves = {},
        toMoves = {};

    function addMove(from, to) {
      let move = moveFactory.acquire(_ => _.init({
        id: moveId(),
        rules: selfRules,
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
}
