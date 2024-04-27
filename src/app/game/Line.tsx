import Case from './Case'
import styles from './line.module.css'
import useBoardMap from '../../hooks/useBoardMap'

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
  selectedColumn?: string;
}

export default function Line({ number, selectedColumn, onSelect }: Props) {
  const map = useBoardMap();
  return (
    <div className={styles.line}>
      <span className={styles.header}>{number}</span>
      {cases.map((caseOpts) =>
        <Case
          color={0 === (number + caseOpts.number) % 2 ? 'white' : 'black'}
          piece={map[number - 1][caseOpts.number]}
          lineNumber={number}
          columnLetter={['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][caseOpts.number]}
        />
      )}
    </div>
  );
}


