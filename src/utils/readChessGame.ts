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

export function readChessGame(board: Board, moves: string): Board {
  const newBoard: Board = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null]
  ];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      newBoard[i][j] = board[i][j];
    }
  }

  if (0 < moves.length) {
    const posFrom = moves.substring(0, 2);
    const posTo = moves.substring(2, 4);
    const rowFromNum = 8 - Number(posFrom.substring(1, 2));
    const colFromNum = posFrom.substring(0, 1).charCodeAt(0) - 97;
    const rowToNum = 8 - Number(posTo.substring(1, 2));
    const colToNum = posTo.substring(0, 1).charCodeAt(0) - 97;
    newBoard[rowToNum][colToNum] = board[rowFromNum][colFromNum];
    newBoard[rowFromNum][colFromNum] = null;
  }
  return newBoard;
}
