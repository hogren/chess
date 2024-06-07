'use client'

import styles from './page.module.css'
import ChessBoard from './ChessBoard'
import ChessMoveList from './ChessMoveList'
import { useState } from 'react'

export default function Game() {
  const [moveList, setMoveList] = useState<string>("");
  return (
    <main className={styles.main}>
      <ChessBoard />
      <ChessMoveList />
    </main>
  );
}
