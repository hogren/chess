'use client'

import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './page.module.css'
import Button from '@/dsm/Button';
import InfoDiv from '@/dsm/InfoDiv';

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
      {null === gameId && <Button onClick={goToNewGame} title={"Create a game"} />}
      {
        null !== gameId && <InfoDiv>
          <div>Game ID : {gameId}</div>
          <div>Black token : <a href={"/game?id=" + gameId + "&black_token=" + blackToken}>{blackToken}</a></div>
          <div>White token : <a href={"/game?id=" + gameId + "&white_token=" + whiteToken}>{whiteToken}</a></div>
        </InfoDiv >
      }
    </main >
  )
}
