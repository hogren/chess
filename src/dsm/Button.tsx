import styles from "./button.module.css"

type Props = {
  onClick?: () => void;
  title: string;
}

export default function Button({ onClick, title }: Props) {
  return <button className={styles.button} onClick={onClick} role="button">{title}</button>
}
