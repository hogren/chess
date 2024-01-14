import styles from './case.module.css'

type Props = {
  color: string;
}

export default function Case({ color }: Props) {
  return (
    <div className={styles.case + ' ' + styles[color]} />
  );
}
