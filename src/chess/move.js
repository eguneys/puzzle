import * as util from './util';

export default function Move(ctx) {

  let { rulesFactory, captureFactory, selfDefenseFactory } = ctx;

  let id,
      rules,
      from,
      to;

  this.id = () => id;
  this.from = () => from;
  this.to = () => to;
  this.rules = () => rules;

  this.afterRules = (depth) => {
    
  }; 

  let board = this.board = (square) => rules.board()[square];
  let getPiece = this.piece = () => board(from);
  
  let getColor = this.color = () => util.colorPiece(getPiece());
  let getRole = this.role = () => util.rolePiece(getPiece());

  let destPiece = this.destPiece = () => board(to);

  let getDestColor = this.destColor = () => {
    let p = destPiece();
    return p ? util.colorPiece(p) : null;
  };

  let getDestRole = this.destRole = () => {
    let p = destPiece();
    return p ? util.rolePiece(p) : null;
  };

  let ideas;

  this.init = (data) => {
    id = data.id;
    rules = data.rules;
    from = data.from;
    to = data.to;

    ideas = {};

    initIdeas();
  };

  const captures = () => {
    let destColor = getDestColor();
    return destColor && util.oppositeColor(destColor, getColor());
  };

  const makeCapture = () => {
    return captureFactory.acquire(_ => _.init({
      move: this
    }));
  };

  const makeSelfDefense = () => {
    return selfDefenseFactory.acquire(_ => _.init({
      move: this
    }));    
  };

  const initIdeas = () => {
    if (captures()) {
      ideas['captures'] = makeCapture();
    }


    ideas['selfdefense'] = makeSelfDefense();
  };

  this.ideaCaptures = () => ideas['captures'];
  this.ideaSelfDefense = () => ideas['selfdefense'];
}
