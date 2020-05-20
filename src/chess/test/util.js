export const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
export const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];


export function markedSquares(str) {
  let res = [];

  let sranks = str.trim().split('\n');
  for (let iRank in sranks) {
    let sfiles = sranks[iRank];
    for (let iFile in sfiles) {
      let char = sfiles[iFile];

      if (char === 'x') {
        let rank = ranks[iRank],
            file = files[iFile];

        res.push(file+rank);
      }
    }
  }
  return res;
}
