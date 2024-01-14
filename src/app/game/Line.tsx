import Case from './Case'
import styles from './line.module.css'

type CaseOpts = {
  number: number;
}

const cases: CaseOpts[] = [];

for (let i = 0; i < 8; i++) {
  cases.push({
    number: i
  });
}

type Props = {
  number: number;
}

export default function Line({ number }: Props) {
  return (
    <div className={styles.line}>
      {cases.map((caseOpts) => <Case color={0 === (number + caseOpts.number) % 2 ? 'black' : 'white'} />)}
    </div>
  );
}


