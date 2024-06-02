export type Piece = {
  code?: string;
  color: 'black' | 'white';
}

export type BoardLine = [Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null, Piece | null];

export type Board = [
  BoardLine,
  BoardLine,
  BoardLine,
  BoardLine,
  BoardLine,
  BoardLine,
  BoardLine,
  BoardLine
];

export function getEmptyBoard(): Board {
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

function copyBoard(source: Board): Board {
  const newBoard: Board = getEmptyBoard();

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
      row: 8 - Number(posFrom.substring(1, 2)),
      col: posFrom.substring(0, 1).charCodeAt(0) - 97,
    },
    to: {
      row: 8 - Number(posTo.substring(1, 2)),
      col: posTo.substring(0, 1).charCodeAt(0) - 97
    }
  };
}

export function readChessGame(board: Board, moves: string): Board {
  let oldBoard = board;
  let newBoard: Board = oldBoard;

  for (let i = 0; i + 4 <= moves.length; i += 5) {
    newBoard = copyBoard(oldBoard);
    const ply = decomposePly(moves.substring(i, i + 4));
    newBoard[ply.to.row][ply.to.col] = oldBoard[ply.from.row][ply.from.col];
    newBoard[ply.from.row][ply.from.col] = null;
    oldBoard = newBoard;
  }

  return newBoard;
}
