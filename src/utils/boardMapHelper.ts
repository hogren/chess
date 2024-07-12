import { BoardMap } from '../model/BoardMap';
import { Piece } from '../model/Piece';

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

export function normalize(board: string[]): BoardMap {
  const result: BoardMap = getEmptyBoard();
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 16; j += 2) {
      const color = board[i].substr(j + 1, 1);
      if (' ' !== color) {
        result[7 - i][j / 2] = {
          color: 'b' === color ? 'black' : 'white',
          code: board[i].substr(j, 1)
        } as Piece;
      }
    }
  }
  return result;
}

export function denormalize(board: BoardMap): string[] {
  let output = ["", "", "", "", "", "", "", ""];
  for (let i = 7; i >= 0; i--) {
    for (let j = 0; j < 8; j++) {
      const place = board[i][j];
      if (null === place) {
        output[7 - i] += '. ';
      } else {
        output[7 - i] += place.code;
        output[7 - i] += 'black' === place.color ? 'b' : 'w';
      }
    }
  }
  return output;
}

export function getStartBoard() {
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
