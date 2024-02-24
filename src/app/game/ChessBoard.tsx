'use client'

import Line from './Line'
import HeaderLine from './HeaderLine'
type LineOpts = {
  number: number;
}
import { SelectedContext } from './SelectedContext'
import { UpdateSelectedContext } from './SelectedContext'
import { useState } from 'react'

const lines: LineOpts[] = [];

for (let i = 8; i > 0; i--) {
  lines.push({ number: i });
}

export default function ChessBoard() {
  const [selectedColumn, setSelectedColumn] = useState<string | undefined>('A');
  const [selectedLine, setSelectedLine] = useState<number | undefined>(7);

  const handleSelect = (column: string, line: number) => {
    setSelectedColumn(column);
    setSelectedLine(line);
  }

  return (
    <>
      <HeaderLine />
      <SelectedContext.Provider value={{ line: selectedLine, column: selectedColumn }}>
        <UpdateSelectedContext.Provider value={handleSelect}>

          {
            lines.map(
              (lineOpts) => <Line
                number={lineOpts.number}
              />
            )
          }
        </UpdateSelectedContext.Provider>
      </SelectedContext.Provider>
    </>
  );
}
