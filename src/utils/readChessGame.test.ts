import { readChessGame, Board, Piece, getEmptyBoard } from './readChessGame'

test('no move', () => {
  const initialBoard = getStartBoard();
  const resultBoard = readChessGame(initialBoard, "");
  assertBoardsAreEquals(initialBoard, resultBoard);
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
  const resultBoard = readChessGame(getStartBoard(), "d2d3 g8f6");

  const expectedBoard = normalize([
    'RbNbBbQbKbBb. Rb',
    'PbPbPbPbPbPbPbPb',
    '. . . . . Nb. . ',
    '. . . . . . . . ',
    '. . . . . . . . ',
    '. . . Pw. . . . ',
    'PwPwPw. PwPwPwPw',
    'RwNwBwQwKwBwNwRw',
  ]);

  assertBoardsAreEquals(expectedBoard, resultBoard);
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

function assertBoardsAreEquals(expected: Board, actual: Board): true {
  for (let rowNum = 0; rowNum < 8; rowNum++) {
    for (let colNum = 0; colNum < 8; colNum++) {
      if (
        (null === expected[rowNum][colNum] && null !== actual[rowNum][colNum]) ||
        (null !== expected[rowNum][colNum] && null === actual[rowNum][colNum]) ||
        (expected[rowNum][colNum]?.code !== actual[rowNum][colNum]?.code) ||
        (expected[rowNum][colNum]?.color !== actual[rowNum][colNum]?.color)
      ) {
        console.error('expected:', denormalize(expected));
        console.error('actual:', denormalize(actual));
        const colLetter = String.fromCharCode(colNum + 97);
        throw new Error(`Boards are not equals, see position ${colLetter}${rowNum} !`);
      }
    }
  }
  return true;
}
