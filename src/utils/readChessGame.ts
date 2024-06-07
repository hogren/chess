import { BoardMap } from '../model/BoardMap';

export function getEmptyBoard(): BoardMap {
  return [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
  ];
}

function copyBoard(source: BoardMap): BoardMap {
  const newBoard: BoardMap = getEmptyBoard();

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      newBoard[i][j] = source[i][j];
    }
  }

  return newBoard;
}

function decomposePly(ply: string) {
  const posFrom = ply.substring(0, 2);
  const posTo = ply.substring(2, 4);
  console.log('posFrom', posFrom)
  console.log('posTo', posTo)
  return {
    from: {
      row: 8 - Number(posFrom.substring(1, 2)),
      col: posFrom.substring(0, 1).charCodeAt(0) - 97,
    },
    to: {
      row: 8 - Number(posTo.substring(1, 2)),
      col: posTo.substring(0, 1).charCodeAt(0) - 97
    }
  };
}

export function readChessGame(board: BoardMap, moves: string): BoardMap {
  let oldBoard = board;
  let newBoard: BoardMap = oldBoard;
  console.log('moves', moves);
  for (let i = 0; i + 4 <= moves.length; i += 5) {
    newBoard = copyBoard(oldBoard);
    const ply = decomposePly(moves.substring(i, i + 4));
    console.log('ply', ply);
    newBoard[ply.to.row][ply.to.col] = oldBoard[ply.from.row][ply.from.col];
    newBoard[ply.from.row][ply.from.col] = null;
    oldBoard = newBoard;
  }

  return newBoard;
}
