'use client'

import Line from './Line'
import HeaderLine from './HeaderLine'
import { SelectedContext } from './SelectedContext'
import { UpdateSelectedContext } from './SelectedContext'
import { useState } from 'react'

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
