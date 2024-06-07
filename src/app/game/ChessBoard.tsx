'use client'

import Line from './Line'
import HeaderLine from './HeaderLine'
import { SelectedContext } from './SelectedContext'
import { UpdateSelectedContext } from './SelectedContext'
import { useState } from 'react'
import { readChessGame } from '../../utils/readChessGame'
import { BoardMap } from '../../model/BoardMap';

type LineOpts = {
  number: number;
}
const lines: LineOpts[] = [];

for (let i = 8; i > 0; i--) {
  lines.push({ number: i });
}

export default function ChessBoard() {
  const [selectedColumn, setSelectedColumn] = useState<string | undefined>(undefined);
  const [selectedLine, setSelectedLine] = useState<number | undefined>(undefined);
  const [map, setMap] = useState<BoardMap>(getStartBoard());

  const handleSelect = (column: string, line: number) => {
    if (selectedColumn === undefined || selectedLine === undefined) {
      setSelectedColumn(column);
      setSelectedLine(line);
    } else {
      const move = '' + selectedColumn + (9 - selectedLine) + column + (9 - line);
      setMap(readChessGame(map, move));
      setSelectedColumn(undefined);
      setSelectedLine(undefined);
    }
  }

  return (
    <>
      <SelectedContext.Provider value={{ line: selectedLine, column: selectedColumn }}>
        <UpdateSelectedContext.Provider value={handleSelect}>

          {
            lines.map(
              (lineOpts) => <Line
                number={lineOpts.number}
                key={lineOpts.number}
                boardMap={map}
              />
            )
          }
        </UpdateSelectedContext.Provider>
      </SelectedContext.Provider>
      <HeaderLine />
    </>
  );
}

const normalize = (board: string[]): BoardMap => {
  const result: BoardMap = getEmptyBoard();
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

const denormalize = (board: BoardMap): string[] => {
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
    'RwNwBwQwKwBwNwRw',
    'PwPwPwPwPwPwPwPw',
    '. . . . . . . . ',
    '. . . . . . . . ',
    '. . . . . . . . ',
    '. . . . . . . . ',
    'PbPbPbPbPbPbPbPb',
    'RbNbBbQbKbBbNbRb',
  ];

  return normalize(initialBoard);
}

function getInitialBoardMap(): BoardMap {
  return [
    [
      {
        piece: 'r',
        color: 'white',
      },
      {
        piece: 'n',
        color: 'white',
      },
      {
        piece: 'b',
        color: 'white',
      },
      {
        piece: 'q',
        color: 'white',
      },
      {
        piece: 'k',
        color: 'white',
      },
      {
        piece: 'b',
        color: 'white',
      },
      {
        piece: 'n',
        color: 'white',
      },
      {
        piece: 'r',
        color: 'white',
      }
    ],
    [
      {
        piece: 'p',
        color: 'white',
      },
      {
        piece: 'p',
        color: 'white',
      },
      {
        piece: 'p',
        color: 'white',
      },
      {
        piece: 'p',
        color: 'white',
      },
      {
        piece: 'p',
        color: 'white',
      },
      {
        piece: 'p',
        color: 'white',
      },
      {
        piece: 'p',
        color: 'white',
      },
      {
        piece: 'p',
        color: 'white',
      }
    ],
    [],
    [],
    [],
    [],
    [
      {
        piece: 'p',
        color: 'black',
      },
      {
        piece: 'p',
        color: 'black',
      },
      {
        piece: 'p',
        color: 'black',
      },
      {
        piece: 'p',
        color: 'black',
      },
      {
        piece: 'p',
        color: 'black',
      },
      {
        piece: 'p',
        color: 'black',
      },
      {
        piece: 'p',
        color: 'black',
      },
      {
        piece: 'p',
        color: 'black',
      }
    ],
    [
      {
        piece: 'r',
        color: 'black',
      },
      {
        piece: 'n',
        color: 'black',
      },
      {
        piece: 'b',
        color: 'black',
      },
      {
        piece: 'q',
        color: 'black',
      },
      {
        piece: 'k',
        color: 'black',
      },
      {
        piece: 'b',
        color: 'black',
      },
      {
        piece: 'n',
        color: 'black',
      },
      {
        piece: 'r',
        color: 'black',
      }
    ],
  ];

}
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
