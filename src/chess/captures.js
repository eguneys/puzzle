export default function Captures(ctx) {

  let move;

  let from = this.from = () => move.from();
  let to = this.to = () => move.to();
  let board = this.board = () => move.board();

  this.init = (data) => {
    move = data.move;
  };
}
