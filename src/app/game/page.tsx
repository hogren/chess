import styles from './page.module.css'
import ChessBoard from './ChessBoard'

export default function Game() {
  return (
    <main className={styles.main}>
      <ChessBoard />
    </main>
  );
}
