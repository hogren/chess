'use client'

import { useState } from 'react';
import styles from './page.module.css'
import Button from '@/dsm/Button';

export default function Home() {
  const [gameId, setGameId] = useState<number | null>(null);
  const [blackToken, setBlackToken] = useState<string | null>(null);
  const [whiteToken, setWhiteToken] = useState<string | null>(null);


  const goToNewGame: () => void = () => {
    fetch('/game/board/create').then((res) => {
      if (200 != res.status) {
        res.json().then((data) => console.error(data.error));
      } else {
        res.json().then((data) => {
          setGameId(data.gameId ?? null);
          setBlackToken(data.blackToken ?? "");
          setWhiteToken(data.whiteToken ?? "");
        });
      }
    });
  }

  return (
    <main className={styles.main}>
      <Button onClick={goToNewGame} title={"Create a game"} />
      {
        null !== gameId && <div>
          <div>Game ID : {gameId}</div>
          <div>Black token : {blackToken}</div>
          <div>White token : {whiteToken}</div>
        </div>
      }
    </main>
  )
}
