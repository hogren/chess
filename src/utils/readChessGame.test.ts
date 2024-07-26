import { readChessGame } from './readChessGame'
import { getStartBoard, normalize, denormalize } from './boardMapHelper'
import { BoardMap } from '@/model/BoardMap'

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

test('a entire game', () => {
  const resultBoard = readChessGame(getStartBoard(), "e2e4 e7e5\nd1f3 b8c6\nf1c5 d8g5\nf3f7");

  const expectedBoard = normalize([
    'Rb. Bb. KbBbNbRb',
    'PbPbPbPb. QwPbPb',
    '. . Nb. . . . . ',
    '. . Bw. Pb. Qb. ',
    '. . . . Pw. . . ',
    '. . . . . . . . ',
    'PwPwPwPw. PwPwPw',
    'RwNwBw. Kw. NwRw',
  ]);

  assertBoardsAreEquals(expectedBoard, resultBoard);
});

function assertBoardsAreEquals(expected: BoardMap, actual: BoardMap): true {
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
