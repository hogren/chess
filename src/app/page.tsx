'use client'

import styles from './page.module.css'

const goToNewGame: () => void = () => {
  fetch('/game/board/create').then((res) => {
    if (200 != res.status) {
      res.json().then((data) => console.error(data.error));
    } else {
      res.json().then((data) => {
        if (undefined !== data.link) {
          document.location.href = data.link
        }
      });
    }
  });
}

export default function Home() {
  return (
    <main className={styles.main}>
      <a onClick={() => goToNewGame()}>Create a game</a>
    </main>
  )
}
