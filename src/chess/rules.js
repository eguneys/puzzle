import { makeId } from './util2';
import * as rutil from './rulesutil';
import * as util from './util';

import Pieces from './pieces';
import MoveFilter from './filter';

const moveId = makeId('move');

import { readRanges, readAttacks } from './rulesOld';

export default function Rules(ctx) {
  
  let fen;

  let ranges,
      attacks,
      piecesByColor = {
        white: new Pieces(ctx, 'white'),
        black: new Pieces(ctx, 'black')
      },
      moves,
      threats = new MoveFilter(),
      filter = new MoveFilter();

  this.fen = () => fen;
  this.depth = () => fen.depth();
  this.board = () => fen.data().board;
  this.activeColor = () => fen.data().activeColor;
  this.ranges = (square) => ranges[square];
  this.attacks = (square) => attacks[square];
  this.pieces = (color) => piecesByColor[color];
  this.moves = () => moves;
  this.threats = threats;
  this.filter = filter;

  this.init = data => {
    fen = data.fen;

    let board = this.board();
    let activeColor = this.activeColor();

    ranges = readRanges(board);
    attacks = readAttacks(board);
    moves = readMoves(activeColor, board, ranges, attacks);

    piecesByColor.white.init(board);
    piecesByColor.black.init(board);

    threats.init({ 
      ownerColor: util.oppositeColor(activeColor),
      moves: moves.threatMoves });
    filter.init({ 
      ownerColor: activeColor,
      moves: moves.selfMoves });
  };

  const selfRules = this;

  function readMoves(activeColor, board, allRanges, allAttacks) {

    const { moveFactory } = ctx;

    let selfMoves = [],
        threatMoves = [],
        fromMoves = {},
        toMoves = {};

    function addMove(from, to) {
      let move = moveFactory.acquire(_ => _.init({
        id: moveId(),
        rules: selfRules,
        from,
        to
      }));
      let fromColor = util.colorPiece(board[from]);

      fromMoves[from] = fromMoves[from] || {};
      toMoves[to] = toMoves[to] || {};


      (fromColor === activeColor)?selfMoves.push(move):
        threatMoves.push(move);

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
    
    return { selfMoves,
             threatMoves,
             fromMoves,
             toMoves };
  }
}
