'use client'

import { useContext } from 'react'
import { SelectedContext } from './SelectedContext'
import { UpdateSelectedContext } from './SelectedContext'
import styles from './case.module.css'
import getImageUrl from '../../utils/getImageUrl'

type Piece = {
  piece: string;
  color: string;
};

type Props = {
  color: string;
  piece?: Piece;
  lineNumber: number;
  columnLetter: string;
}

export default function Case({ color, piece, lineNumber, columnLetter }: Props) {
  const { line: selectedLine, column: selectedColumn } = useContext(SelectedContext);
  const update = useContext(UpdateSelectedContext);

  const handleClick = () => {
    if (undefined !== update) {
      update(columnLetter, lineNumber);
    }
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
