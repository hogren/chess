export default function getImageUrl(color: string, piece: string): string {
  let url = '/chess_pieces/Chess_' + piece;
  if ('white' === color) {
    url += 'l';
  } else {
    url += 'd';
  }
  url += 't45.svg.png';
  return url;
}

