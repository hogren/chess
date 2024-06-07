export default function getImageUrl(color: string, pieceCode: string): string {
  let url = '/chess_pieces/Chess_' + pieceCode.toLowerCase();
  if ('white' === color) {
    url += 'l';
  } else {
    url += 'd';
  }
  url += 't45.svg.png';
  return url;
}

