import Case from './Case'
import styles from './line.module.css'
import { BoardMap } from '../../model/BoardMap'

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
  boardMap: BoardMap;
}

export default function Line({ number, boardMap }: Props) {
  return (
    <div className={styles.line}>
      <span className={styles.header}>{number}</span>
      {cases.map((caseOpts) =>
        <Case
          color={0 === (number + caseOpts.number) % 2 ? 'white' : 'black'}
          piece={boardMap[number - 1][caseOpts.number]}
          lineNumber={number}
          columnLetter={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][caseOpts.number]}
          key={number + ' ' + caseOpts.number}
        />
      )}
    </div>
  );
}


