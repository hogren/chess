import { BoardMap } from '@/model/BoardMap';
import { getEmptyBoard } from '@/utils/boardMapHelper'

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
  return {
    from: {
      row: Number(posFrom.substring(1, 2)) - 1,
      col: posFrom.substring(0, 1).charCodeAt(0) - 97,
    },
    to: {
      row: Number(posTo.substring(1, 2)) - 1,
      col: posTo.substring(0, 1).charCodeAt(0) - 97
    }
  };
}

export function readChessGame(board: BoardMap, moves: string): BoardMap {
  let oldBoard = board;
  let newBoard: BoardMap = oldBoard;
  for (let i = 0; i + 4 <= moves.length; i += 5) {
    newBoard = copyBoard(oldBoard);
    const ply = decomposePly(moves.substring(i, i + 4));
    newBoard[ply.to.row][ply.to.col] = oldBoard[ply.from.row][ply.from.col];
    newBoard[ply.from.row][ply.from.col] = null;
    oldBoard = newBoard;
  }

  return newBoard;
}
