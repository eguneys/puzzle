import * as util from './util';

export default function Pieces(ctx, color) {
  
  let kings = this.kings = [],
      queens = this.queens = [],
      rooks = this.rooks = [],
      bishops = this.bishops = [],
      knights = this.knights = [],
      pawns = this.pawns = [];

  let piecesByRole = {
    'king': kings,
    'queen': queens,
    'rook': rooks,
    'bishop': bishops,
    'knight': knights,
    'pawn': pawns
  };

  this.init = data => {
    let board = data;

    for (let role in piecesByRole) {
      let pieces = piecesByRole[role];

      pieces = [];

      for (let square in board) {
        let piece = board[square];
        if (util.isColorPiece(piece, color) &&
            util.isRolePiece(piece, role)) {
          pieces.push(square);
        }
      }
    }
    
  };

}
