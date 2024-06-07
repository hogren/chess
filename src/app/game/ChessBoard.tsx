'use client'

import Line from './Line'
import HeaderLine from './HeaderLine'
import { SelectedContext } from './SelectedContext'
import { UpdateSelectedContext } from './SelectedContext'
import { useState } from 'react'
import { readChessGame } from '../../utils/readChessGame'
import { getStartBoard } from '../../utils/boardMapHelper'
import { BoardMap } from '../../model/BoardMap';
import { Piece } from '../../model/Piece';

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
