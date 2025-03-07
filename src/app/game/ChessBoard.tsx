'use client'
import Line from './Line'
import HeaderLine from './HeaderLine'
import { SelectedContext } from './SelectedContext'
import { UpdateSelectedContext } from './SelectedContext'
import { useState } from 'react'
import { readChessGame } from '@/utils/readChessGame'
import { getStartBoard, denormalize } from '@/utils/boardMapHelper'
import { BoardMap } from '@/model/BoardMap';
import { useSearchParams } from 'next/navigation'

type LineOpts = {
  number: number;
}
const lines: LineOpts[] = [];

for (let i = 8; i > 0; i--) {
  lines.push({ number: i });
}

export default function ChessBoard() {
  const searchParams = useSearchParams()
  const gameId = searchParams.get('id');
  const player = searchParams.get('player');
  const token = searchParams.get('token');

  const [selectedColumn, setSelectedColumn] = useState<string | undefined>(undefined);
  const [selectedLine, setSelectedLine] = useState<number | undefined>(undefined);

  const [map, setMap] = useState<BoardMap | undefined>(undefined);

  if (undefined === map) {
    if (null === gameId) {
      setMap(getStartBoard());
    } else {
      fetch('/game/board/' + gameId + '?player=' + player + '&token=' + token)
        .then((res) => {
          if (res.status !== 200) {
            res.json().then((json) => {
              console.error(res.status + ": " + json?.error);
              setMap(getStartBoard());
            });
          } else {
            res.json().then((json) => {
              setMap(json);
            });
          }
        });
    }
    return null;
  }

  const handleSelect = (column: string, line: number) => {
    if (selectedColumn === undefined || selectedLine === undefined) {
      setSelectedColumn(column);
      setSelectedLine(line);
    } else {
      const move = '' + selectedColumn + (selectedLine) + column + (line);
      fetch('/game/board/' + gameId + '/update', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ move: move }),
      }).then((res) => {
        if (200 === res.status) {
          setMap(readChessGame(map, move));
        }
      }).finally(() => {
        setSelectedColumn(undefined);
        setSelectedLine(undefined);
      });

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
