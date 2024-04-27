import { readChessGame, Board, Piece, getEmptyBoard } from './readChessGame'

test('no move', () => {
  const initialBoard = getStartBoard();
  const resultBoard = readChessGame(initialBoard, "");
  expect(resultBoard).toEqual(initialBoard);
});

test('one ply', () => {
  const resultBoard = readChessGame(getStartBoard(), "c2c3");

  const expectedBoard = normalize([
    'RbNbBbQbKbBbNbRb',
    'PbPbPbPbPbPbPbPb',
    '. . . . . . . . ',
    '. . . . . . . . ',
    '. . . . . . . . ',
    '. . Pw. . . . . ',
    'PwPw. PwPwPwPwPw',
    'RwNwBwQwKwBwNwRw',
  ]);

  expect(resultBoard).toEqual(expectedBoard);
});

test('one full move', () => {
  const resultBoard = readChessGame(getStartBoard(), "c2c3 g8f6");

  const expectedBoard = normalize([
    'RbNbBbQbKbBb. Rb',
    'PbPbPbPbPbPbPbPb',
    '. . . . . Nb. . ',
    '. . . . . . . . ',
    '. . . . . . . . ',
    '. . Pw. . . . . ',
    'PwPw. PwPwPwPwPw',
    'RwNwBwQwKwBwNwRw',
  ]);

  expect(resultBoard).toEqual(expectedBoard);
});

const normalize = (board: string[]): Board => {
  const result: Board = getEmptyBoard();
  for (let i = 7; i >= 0; i--) {
    for (let j = 0; j < 16; j += 2) {
      const color = board[i].substr(j + 1, 1);
      if (' ' !== color) {
        result[i][j / 2] = {
          color: 'b' === color ? 'black' : 'white',
          code: board[i].substr(j, 1)
        } as Piece;
      }
    }
  }
  return result;
}

const denormalize = (board: Board): string[] => {
  let output = ["", "", "", "", "", "", "", ""];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const place = board[i][j];
      if (null === place) {
        output[i] += '. ';
      } else {
        output[i] += place.code;
        output[i] += 'black' === place.color ? 'b' : 'w';
      }
    }
  }
  return output;
}

const getStartBoard = () => {
  const initialBoard = [
    'RbNbBbQbKbBbNbRb',
    'PbPbPbPbPbPbPbPb',
    '. . . . . . . . ',
    '. . . . . . . . ',
    '. . . . . . . . ',
    '. . . . . . . . ',
    'PwPwPwPwPwPwPwPw',
    'RwNwBwQwKwBwNwRw',
  ];

  return normalize(initialBoard);
}
