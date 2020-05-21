export const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
export const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


export const square = (file, rank) => file + rank;

export const file = square => square[0];
export const rank = square => square[1];

export const squares = (() => {
  let res = [];
  for (let file of files) {
    for (let rank of ranks) {
      res.push(square(file, rank));
    }
  }
  return res;
})();

export const whiteBaseRank = '2';
export const blackBaseRank = '7';
export const whitePromoteRank = '8';
export const blackPromoteRank = '1';

export const colors = ['white', 'black'];

export const isOppositeColor = (c1, c2) => (c1 === 'white')?c2==='black':c2==='white';

export const isOppositePiece = (c1, c2) => isOppositeColor(c1.color, c2.color);

export const isRolePiece = (c1, role) => rolePiece(c1) === role;
export const isColorPiece = (c1, color) => colorPiece(c1) === color;

export const oppositeColor = c1 => c1 === 'white' ? 'black': 'white';

export const colorPiece = c1 => c1.color;
export const rolePiece = c1 => c1.role;

export const pawnPiece = c1 => rolePiece(c1) === 'pawn';

export const roles = ['knight', 'pawn', 'king', 'queen', 'rook', 'bishop'];

export const whiteKnight = { color: 'white',
                      role: 'knight',
                      forsyth: 'N' };
export const whiteBishop = { color: 'white',
                      role: 'bishop',
                      forsyth: 'B' };
export const whitePawn = { color: 'white',
                    role: 'pawn',
                    forsyth: 'P' };
export const whiteKing = { color: 'white',
                    role: 'king',
                    forsyth: 'K' };
export const whiteRook = { color: 'white',
                    role: 'rook',
                    forsyth: 'R' };
export const whiteQueen = { color: 'white',
                     role: 'queen',
                     forsyth: 'Q' };

export const blackKnight = { color: 'black',
                      role: 'knight',
                      forsyth: 'n' };
export const blackBishop = { color: 'black',
                      role: 'bishop',
                      forsyth: 'b' };
export const blackPawn = { color: 'black',
                    role: 'pawn',
                    forsyth: 'p' };
export const blackKing = { color: 'black',
                    role: 'king',
                    forsyth: 'k' };
export const blackRook = { color: 'black',
                    role: 'rook',
                    forsyth: 'r' };
export const blackQueen = { color: 'black',
                     role: 'queen',
                     forsyth: 'q' };

export const whitePieces = [whiteKnight, whiteBishop, whitePawn, whiteKing, whiteRook, whiteQueen];
export const blackPieces = [blackKnight, blackBishop, blackPawn, blackKing, blackRook, blackQueen];

export const allPieces = [...whitePieces, ...blackPieces];

export const allForsyth = allPieces.map(_ => _.forsyth);

export const allByForsyth = (() => {
  let res = {};
  allPieces.forEach(piece => {
    res[piece.forsyth] = piece;
  });
  return res;
})();
