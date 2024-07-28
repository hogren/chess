import Database from '@/utils/db';
import { getChessGameHistory } from './getChessGameHistory';
import { checkMove } from './checkMove';

export async function addMove(gameId: number, move: string): Promise<boolean> {
  const history = await getChessGameHistory(gameId) ?? '';

  if (checkMove(history, move)) {
    const [result,] = await Database.execute('UPDATE chess_game SET history = CONCAT(IFNULL(history, ""), IF(ISNULL(history), "", " "), ?) WHERE id LIKE ?', [move, gameId]);
    return "affectedRows" in result && 1 === result.affectedRows;
  }

  return false;
}
