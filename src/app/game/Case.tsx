'use client'

import { useContext } from 'react'
import { SelectedContext } from './SelectedContext'
import { UpdateSelectedContext } from './SelectedContext'
import styles from './case.module.css'

type Props = {
  color: string;
  piece?: {
    piece: string;
    color: string;
  };
  lineNumber: number;
  columnLetter: string;
}

const getImageUrl = (color: string, piece: string): string => {
  let url = '/chess_pieces/Chess_' + piece;
  if ('white' === color) {
    url += 'l';
  } else {
    url += 'd';
  }
  url += 't45.svg.png';
  return url;
}

export default function Case({ color, piece, lineNumber, columnLetter }: Props) {
  const { line: selectedLine, column: selectedColumn } = useContext(SelectedContext);
  const update = useContext(UpdateSelectedContext);

  const handleClick = () => {
    if (undefined !== update) {
      update(columnLetter, lineNumber);
    }
    console.log(columnLetter, lineNumber);
  }

  const selected = lineNumber === selectedLine && columnLetter === selectedColumn;
  return (
    <div className={styles.case + ' ' + styles[color] + ' ' + (selected ? styles.selected : '')} onClick={handleClick}>
      <span className={styles['piece-' + piece?.color]}>
        {undefined !== piece ? <img src={getImageUrl(piece.color, piece.piece)} /> : null}
      </span>
    </div>
  );
}
