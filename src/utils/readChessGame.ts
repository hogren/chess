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

function decomposeMove(move: string) {
  const posFrom = move.substring(0, 2);
  const posTo = move.substring(2, 4);
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
  const newBoard: Board = copyBoard(board);

  if (0 < moves.length) {
    const move = decomposeMove(moves.substring(0, 4));
    newBoard[move.to.row][move.to.col] = board[move.from.row][move.from.col];
    newBoard[move.from.row][move.from.col] = null;
  }
  return newBoard;
}
