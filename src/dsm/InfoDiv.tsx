import { ReactElement } from 'react'
import styles from "./info-div.module.css"

export default function InfoDiv({ children }: { children: ReactElement[] }) {
  return <div className={styles.container}>{children}</div>
}
