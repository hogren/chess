import Line from './Line'

type LineOpts = {
  number: number;
}

const lines: LineOpts[] = [];

for (let i = 0; i < 8; i++) {
  lines.push({ number: i + 1 });
}

export default function ChessBoard() {
  return (
    <>
      {lines.map((lineOpts) => <Line number={lineOpts.number} />)}
    </>
  );
}
